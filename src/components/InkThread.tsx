/**
 * Signature element (spec §4.5): linia de cerneală bronz care se
 * „desenează" prin stroke-dashoffset. Pe hârtie ivorie e subțire și
 * discretă — un semn de condei, nu un ornament.
 *
 * Pur CSS și fără JS — se desenează la load, deci nu depinde de
 * hidratare. Decorativ: `aria-hidden`, nu poartă informație.
 */
type Props = {
  className?: string;
};

export function InkThread({ className }: Props) {
  return (
    <svg
      viewBox="0 0 1000 16"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
      className={className}
      style={{
        display: "block",
        width: "100%",
        minWidth: 0,
        height: 16,
        overflow: "visible",
      }}
    >
      <path
        d="M0,12 C 220,12 260,4 480,4 C 700,4 760,12 1000,12"
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth={1}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        pathLength={1}
        className="u-thread-draw"
      />
    </svg>
  );
}
