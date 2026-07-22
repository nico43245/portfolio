/**
 * Signature element (spec §4.5): firul auriu care se „desenează" prin
 * stroke-dashoffset.
 *
 * Varianta `hero` e pur CSS și fără JS — se desenează la load, deci nu
 * depinde de hidratare. Varianta `separator`, care trebuie declanșată la
 * scroll, ajunge în Faza B ca variantă client separată.
 *
 * Decorativ: `aria-hidden`, nu poartă informație.
 */
type Props = {
  className?: string;
};

export function GoldThread({ className }: Props) {
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
        stroke="var(--color-gold)"
        strokeWidth={1.25}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        pathLength={1}
        className="u-thread-draw"
      />
    </svg>
  );
}
