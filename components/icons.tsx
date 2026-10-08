import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function Base({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export const ArrowRight = (p: IconProps) => (
  <Base {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Base>
);

export const ArrowUpRight = (p: IconProps) => (
  <Base {...p}>
    <path d="M7 17 17 7M8 7h9v9" />
  </Base>
);

export const Check = (p: IconProps) => (
  <Base {...p}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </Base>
);

export const Menu = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </Base>
);

export const Close = (p: IconProps) => (
  <Base {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Base>
);

export const Mail = (p: IconProps) => (
  <Base {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2.5" />
    <path d="m4 7 8 6 8-6" />
  </Base>
);

export const Phone = (p: IconProps) => (
  <Base {...p}>
    <path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 6 6L15 14l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
  </Base>
);

export const Chat = (p: IconProps) => (
  <Base {...p}>
    <path d="M20 11.5a8 8 0 0 1-11.8 7L4 20l1.5-4.2A8 8 0 1 1 20 11.5Z" />
    <path d="M9 10.5h6M9 13.5h4" />
  </Base>
);

export const Pin = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 21s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12Z" />
    <circle cx="12" cy="9" r="2.5" />
  </Base>
);

export const Clock = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </Base>
);

export const Plus = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 5v14M5 12h14" />
  </Base>
);

/* Service icons */
export const Import = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 3v11M7.5 9.5 12 14l4.5-4.5" />
    <path d="M4 14v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4" />
  </Base>
);

export const Export = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 14V3M7.5 7.5 12 3l4.5 4.5" />
    <path d="M4 14v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4" />
  </Base>
);

export const Search = (p: IconProps) => (
  <Base {...p}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="m20 20-4.2-4.2" />
  </Base>
);

export const Shield = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 3 5 6v5c0 4.5 3 8.3 7 10 4-1.7 7-5.5 7-10V6l-7-3Z" />
    <path d="m9 12 2 2 4-4" />
  </Base>
);

export const Ship = (p: IconProps) => (
  <Base {...p}>
    <path d="M3 16.5 4.5 20h15l1.5-3.5L12 13l-9 3.5Z" />
    <path d="M6 15V9h12v6M12 9V4M9.5 6H12" />
  </Base>
);

export const Doc = (p: IconProps) => (
  <Base {...p}>
    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" />
    <path d="M14 3v5h5M9 13h6M9 17h4" />
  </Base>
);

/* Division icons */
export const Grain = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 21V9" />
    <path d="M12 9c0-2.5 1.5-4.5 4-5 .3 2.5-1.3 4.6-4 5ZM12 9c0-2.5-1.5-4.5-4-5-.3 2.5 1.3 4.6 4 5Z" />
    <path d="M12 14c0-2.5 1.5-4.5 4-5 .3 2.5-1.3 4.6-4 5ZM12 14c0-2.5-1.5-4.5-4-5-.3 2.5 1.3 4.6 4 5Z" />
    <path d="M12 19c0-2.5 1.5-4.5 4-5 .3 2.5-1.3 4.6-4 5ZM12 19c0-2.5-1.5-4.5-4-5-.3 2.5 1.3 4.6 4 5Z" />
  </Base>
);

export const Thread = (p: IconProps) => (
  <Base {...p}>
    <path d="M7 3h10M7 21h10" />
    <path d="M8 3v18M16 3v18" />
    <path d="m8 6 8 3M8 10l8 3M8 14l8 3" />
  </Base>
);

export const Baby = (p: IconProps) => (
  <Base {...p}>
    <path d="M10 3h4v3h-4zM9 6h6l1 3v10a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V9l1-3Z" />
    <path d="M8 12h3M8 15h3" />
  </Base>
);

export const serviceIcons = {
  import: Import,
  export: Export,
  search: Search,
  shield: Shield,
  ship: Ship,
  doc: Doc,
};

export const divisionIcons = {
  commodities: Grain,
  textiles: Thread,
  "baby-products": Baby,
} as Record<string, (p: IconProps) => React.ReactElement>;
