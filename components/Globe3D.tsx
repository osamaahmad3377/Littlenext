"use client";

// Interactive dotted globe (orthographic projection on <canvas>).
// Headquarters sits at the front; lanes arc out to every other region. Drag to rotate.

import { useEffect, useRef } from "react";
import { regions } from "@/lib/site";
import { globeDots } from "@/lib/globeDots";

const RAD = Math.PI / 180;
type Vec = [number, number, number];

// Land dots as [lon, lat] in radians.
const DOTS: [number, number][] = [];
for (let i = 0; i < globeDots.length; i += 2) DOTS.push([(globeDots[i] / 10) * RAD, (globeDots[i + 1] / 10) * RAD]);

const toVec = (lon: number, lat: number): Vec => [Math.cos(lat) * Math.cos(lon), Math.cos(lat) * Math.sin(lon), Math.sin(lat)];
const toLonLat = ([x, y, z]: Vec): [number, number] => [Math.atan2(y, x), Math.asin(Math.max(-1, Math.min(1, z)))];

const HQ = regions.find((r) => r.hq) ?? regions[0];
const OTHERS = regions.filter((r) => r !== HQ);

// Great-circle samples from HQ to each region, lifted off the surface in the middle.
const ARCS = OTHERS.map((r) => {
  const a = toVec(HQ.lon * RAD, HQ.lat * RAD);
  const b = toVec(r.lon * RAD, r.lat * RAD);
  const omega = Math.acos(Math.max(-1, Math.min(1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2])));
  const steps = 64;
  return Array.from({ length: steps + 1 }, (_, i) => {
    const t = i / steps;
    const s = Math.sin(omega);
    const k1 = Math.sin((1 - t) * omega) / s;
    const k2 = Math.sin(t * omega) / s;
    const v: Vec = [k1 * a[0] + k2 * b[0], k1 * a[1] + k2 * b[1], k1 * a[2] + k2 * b[2]];
    const [lon, lat] = toLonLat(v);
    return { lon, lat, h: 1 + Math.sin(Math.PI * t) * (0.04 + 0.1 * (omega / Math.PI)) };
  });
});

export function Globe3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Aim slightly north-west of HQ so Australia and Asia both fill the disc
    const view = { lon: HQ.lon - 32, lat: HQ.lat + 22, sway: 0 };
    let size = 0;
    let dpr = 1;
    let raf = 0;
    let running = false;
    let dragging = false;
    let last = { x: 0, y: 0 };
    let resumeAt = 0;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      size = canvas.clientWidth;
      canvas.width = size * dpr;
      canvas.height = size * dpr;
    };

    const draw = (time: number) => {
      const W = size * dpr;
      const R = W * 0.38;
      const cx = W / 2;
      const cy = W / 2;
      const lon0 = (view.lon + Math.sin(view.sway) * 40) * RAD;
      const lat0 = view.lat * RAD;
      const sinLat0 = Math.sin(lat0);
      const cosLat0 = Math.cos(lat0);

      const project = (lon: number, lat: number) => {
        const cosLat = Math.cos(lat);
        const dl = lon - lon0;
        const cosDl = Math.cos(dl);
        return {
          x: cosLat * Math.sin(dl),
          y: cosLat0 * Math.sin(lat) - sinLat0 * cosLat * cosDl,
          z: sinLat0 * Math.sin(lat) + cosLat0 * cosLat * cosDl,
        };
      };

      ctx.clearRect(0, 0, W, W);

      // Atmosphere glow
      const glow = ctx.createRadialGradient(cx, cy, R * 0.9, cx, cy, R * 1.35);
      glow.addColorStop(0, "rgba(59,123,255,0.28)");
      glow.addColorStop(1, "rgba(59,123,255,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, W, W);

      // Sphere body
      const body = ctx.createRadialGradient(cx - R * 0.35, cy - R * 0.4, R * 0.1, cx, cy, R);
      body.addColorStop(0, "#1e2d52");
      body.addColorStop(0.65, "#0b1427");
      body.addColorStop(1, "#060c19");
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fillStyle = body;
      ctx.fill();
      ctx.lineWidth = 1 * dpr;
      ctx.strokeStyle = "rgba(138,182,255,0.28)";
      ctx.stroke();

      // Land dots, brighter towards the centre
      const dot = Math.max(1.1 * dpr, R / 150);
      for (const [lon, lat] of DOTS) {
        const p = project(lon, lat);
        if (p.z <= 0) continue;
        ctx.fillStyle = `rgba(190,210,255,${(0.18 + 0.67 * p.z).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(cx + p.x * R, cy - p.y * R, dot * (0.55 + 0.45 * p.z), 0, Math.PI * 2);
        ctx.fill();
      }

      // Lanes
      ARCS.forEach((arc, i) => {
        const pts = arc.map((s) => {
          const p = project(s.lon, s.lat);
          const visible = p.z >= 0.02;
          return { x: cx + p.x * R * s.h, y: cy - p.y * R * s.h, visible };
        });

        ctx.lineWidth = 1.2 * dpr;
        ctx.strokeStyle = "rgba(138,182,255,0.35)";
        ctx.beginPath();
        pts.forEach((p, j) => {
          if (!p.visible) return;
          if (j === 0 || !pts[j - 1].visible) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        });
        ctx.stroke();

        // Travelling highlight
        const period = 2600 + i * 350;
        const head = Math.floor((((time + i * 700) % period) / period) * (pts.length - 1));
        const tail = Math.max(0, head - 14);
        ctx.lineWidth = 2 * dpr;
        ctx.lineCap = "round";
        for (let j = tail + 1; j <= head; j++) {
          if (!pts[j].visible || !pts[j - 1].visible) continue;
          const a = (j - tail) / (head - tail || 1);
          ctx.strokeStyle = `rgba(${Math.round(251 - 148 * a)},${Math.round(191 + 41 * a)},${Math.round(36 + 213 * a)},${a.toFixed(2)})`;
          ctx.beginPath();
          ctx.moveTo(pts[j - 1].x, pts[j - 1].y);
          ctx.lineTo(pts[j].x, pts[j].y);
          ctx.stroke();
        }
        if (pts[head].visible) {
          ctx.fillStyle = "#fff";
          ctx.beginPath();
          ctx.arc(pts[head].x, pts[head].y, 2.2 * dpr, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Region markers and labels (labels avoid overlapping; HQ gets priority)
      ctx.font = `600 ${10 * dpr}px ui-monospace, SFMono-Regular, Menlo, monospace`;
      ctx.textBaseline = "middle";
      type Rect = { x: number; y: number; w: number; h: number };
      const placed: Rect[] = [];
      const overlaps = (a: Rect) =>
        placed.some((b) => a.x < b.x + b.w + 3 * dpr && a.x + a.w + 3 * dpr > b.x && a.y < b.y + b.h + 2 * dpr && a.y + a.h + 2 * dpr > b.y);

      const fitLabel = (text: string, x: number, y: number): Rect | null => {
        const w = ctx.measureText(text).width + 14 * dpr;
        const h = 18 * dpr;
        const lx = Math.min(Math.max(x - w / 2, 4 * dpr), W - w - 4 * dpr);
        for (const ly of [y + 9 * dpr, y - 9 * dpr - h]) {
          const r = { x: lx, y: ly, w, h };
          if (!overlaps(r)) return r;
        }
        return null;
      };

      const drawLabel = (text: string, r: Rect, hq: boolean) => {
        ctx.beginPath();
        ctx.roundRect(r.x, r.y, r.w, r.h, r.h / 2);
        ctx.fillStyle = hq ? "#fbbf24" : "rgba(3,6,13,0.8)";
        ctx.fill();
        if (!hq) {
          ctx.lineWidth = 1 * dpr;
          ctx.strokeStyle = "rgba(255,255,255,0.14)";
          ctx.stroke();
        }
        ctx.fillStyle = hq ? "#03060d" : "rgba(255,255,255,0.88)";
        ctx.fillText(text, r.x + 7 * dpr, r.y + r.h / 2 + 0.5 * dpr);
      };

      const hp = project(HQ.lon * RAD, HQ.lat * RAD);
      const hqPos = { x: cx + hp.x * R, y: cy - hp.y * R };
      const hqText = `HQ · ${HQ.name.toUpperCase()}`;
      const hqRect = hp.z > 0 ? fitLabel(hqText, hqPos.x, hqPos.y) : null;
      if (hqRect) placed.push(hqRect);

      for (const r of OTHERS) {
        const p = project(r.lon * RAD, r.lat * RAD);
        if (p.z <= 0.05) continue;
        const x = cx + p.x * R;
        const y = cy - p.y * R;
        ctx.globalAlpha = Math.min(1, p.z * 2.5);
        ctx.beginPath();
        ctx.arc(x, y, 3.6 * dpr, 0, Math.PI * 2);
        ctx.fillStyle = "#fff";
        ctx.fill();
        ctx.lineWidth = 2 * dpr;
        ctx.strokeStyle = "#3b7bff";
        ctx.stroke();
        if (p.z > 0.3) {
          const text = r.name.toUpperCase();
          const rect = fitLabel(text, x, y);
          if (rect) {
            placed.push(rect);
            drawLabel(text, rect, false);
          }
        }
        ctx.globalAlpha = 1;
      }

      if (hp.z > 0) {
        const pulse = (time % 2200) / 2200;
        ctx.beginPath();
        ctx.arc(hqPos.x, hqPos.y, (6 + pulse * 16) * dpr, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(251,191,36,${(0.45 * (1 - pulse)).toFixed(3)})`;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(hqPos.x, hqPos.y, 6 * dpr, 0, Math.PI * 2);
        ctx.fillStyle = "#fbbf24";
        ctx.fill();
        ctx.lineWidth = 2.5 * dpr;
        ctx.strokeStyle = "#03060d";
        ctx.stroke();
        if (hqRect) drawLabel(hqText, hqRect, true);
      }
    };

    const loop = (time: number) => {
      if (!dragging && !reduceMotion && time > resumeAt) view.sway += 0.004;
      draw(time);
      if (running) raf = requestAnimationFrame(loop);
    };

    const start = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const onDown = (e: PointerEvent) => {
      dragging = true;
      last = { x: e.clientX, y: e.clientY };
      canvas.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      const k = 160 / Math.max(size, 1);
      view.lon -= (e.clientX - last.x) * k;
      view.lat = Math.max(-60, Math.min(60, view.lat + (e.clientY - last.y) * k));
      last = { x: e.clientX, y: e.clientY };
      if (!running) draw(performance.now());
    };
    const onUp = () => {
      dragging = false;
      resumeAt = performance.now() + 2500;
    };

    resize();
    draw(0);
    const ro = new ResizeObserver(() => {
      resize();
      draw(performance.now());
    });
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()));
    io.observe(canvas);
    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      role="img"
      aria-label={`Globe showing trade lanes from ${HQ.name} to ${OTHERS.map((r) => r.name).join(", ")}`}
      className="aspect-square w-full cursor-grab touch-pan-y active:cursor-grabbing"
    />
  );
}
