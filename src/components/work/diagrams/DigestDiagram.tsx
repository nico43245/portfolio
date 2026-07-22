/**
 * Diagrama mecanismului Digest imobiliar: trei surse RSS converg într-un
 * singur mesaj zilnic, livrat la oră fixă.
 *
 * Desenată, nu capturată — produsul e un mesaj în Telegram, la care nu
 * am acces, iar o captură fabricată ar fi o dovadă falsă a proiectului.
 *
 * Șirul de puncte de jos e **cadență**, nu grafic de date: rulările sunt
 * zilnice și reușite (verificat), dar un număr desenat exact ar deveni
 * fals peste o săptămână. Etichetele conțin doar fapte stabile.
 *
 * Poartă informație, deci `role="img"` cu descriere, nu `aria-hidden`.
 */
export function DigestDiagram({ label }: { label: string }) {
  const sources = ["ZF", "REALITATEA", "ECONOMICA"];
  const sourceY = [126, 186, 246];
  const cadence = 22;

  return (
    <svg
      viewBox="0 0 640 400"
      role="img"
      aria-label={label}
      className="h-full w-full bg-surface-2"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Sursele */}
      <g
        fill="var(--color-text-muted)"
        fontSize="12.5"
        letterSpacing="1.6"
        fontFamily="var(--font-mono)"
      >
        {sources.map((name, i) => (
          <text key={name} x="48" y={sourceY[i] + 4}>
            {name}
          </text>
        ))}
      </g>

      {/* Traseele care converg spre un punct comun */}
      <g fill="none" stroke="var(--color-border)" strokeWidth="1.5">
        {sourceY.map((y, i) => (
          <path
            key={i}
            d={`M 176 ${y} H 268 Q 300 ${y} 300 ${y > 186 ? y - 30 : y < 186 ? y + 30 : y} V 186 H 356`}
          />
        ))}
      </g>

      {/* Nodul de procesare */}
      <circle
        cx="300"
        cy="186"
        r="5"
        fill="var(--color-accent)"
      />

      {/* Mesajul rezultat */}
      <g transform="translate(392, 132)">
        <rect
          x="0"
          y="0"
          width="200"
          height="108"
          rx="8"
          fill="var(--color-surface)"
          stroke="var(--color-border)"
          strokeWidth="1.5"
        />
        <text
          x="18"
          y="28"
          fill="var(--color-accent)"
          fontSize="12"
          letterSpacing="1.6"
          fontFamily="var(--font-mono)"
        >
          08:00
        </text>
        {[150, 122, 164, 96].map((width, i) => (
          <rect
            key={i}
            x="18"
            y={44 + i * 14}
            width={width}
            height="4"
            rx="2"
            fill="var(--color-text)"
            opacity={0.7 - i * 0.1}
          />
        ))}
      </g>

      {/* Cadența zilnică */}
      <g transform="translate(48, 320)">
        {Array.from({ length: cadence }, (_, i) => (
          <circle
            key={i}
            cx={i * 13}
            cy="0"
            r="3"
            fill="var(--color-accent)"
            opacity={0.3 + (i / cadence) * 0.7}
          />
        ))}
      </g>

      <g
        fill="var(--color-text-muted)"
        fontSize="12.5"
        letterSpacing="1.6"
        fontFamily="var(--font-mono)"
      >
        <text x="48" y="360">zilnic · max 8 articole</text>
        <text x="592" y="360" textAnchor="end">
          github actions
        </text>
      </g>
    </svg>
  );
}
