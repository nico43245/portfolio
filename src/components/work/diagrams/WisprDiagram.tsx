/**
 * Diagrama mecanismului Wispr local: unda sonoră intră, iese text, totul
 * în interiorul unui contur punctat care e device-ul. Ideea centrală a
 * proiectului e că nimic nu traversează conturul.
 *
 * Desenată, nu capturată — Wispr e o aplicație de menu bar, fără
 * interfață care să poată fi fotografiată util. E limpede că e o piesă
 * grafică, nu o captură de ecran.
 *
 * Spre deosebire de vizualurile pur decorative, diagrama poartă
 * informație (modelul, cuantizarea, limba, scurtătura), deci primește
 * `role="img"` și o descriere în cuvinte.
 *
 * Culorile vin din tokenii site-ului, deci se adaptează singure la temă.
 */
export function WisprDiagram({ label }: { label: string }) {
  // Bare de amplitudine descrescătoare — sunetul care se consumă pe
  // măsură ce devine text. Valori fixe, nu aleatorii: altfel s-ar
  // schimba la fiecare randare și ar produce hydration mismatch.
  const bars = [
    8, 15, 26, 19, 32, 41, 28, 47, 35, 52, 44, 30, 38, 22, 29, 16, 11, 7,
  ];

  return (
    <svg
      viewBox="0 0 640 400"
      role="img"
      aria-label={label}
      className="h-full w-full bg-surface-2"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Conturul device-ului. Punctat, ca să citească drept graniță. */}
      <rect
        x="48"
        y="70"
        width="544"
        height="230"
        rx="10"
        fill="none"
        stroke="var(--color-border)"
        strokeWidth="1.5"
        strokeDasharray="5 5"
      />

      <text
        x="64"
        y="58"
        fill="var(--color-text-muted)"
        fontSize="12"
        letterSpacing="2.4"
        fontFamily="var(--font-mono)"
      >
        DEVICE
      </text>

      {/* Unda sonoră, în stânga conturului */}
      <g transform="translate(96, 185)">
        {bars.map((height, i) => (
          <rect
            key={i}
            x={i * 9}
            y={-height / 2}
            width="3"
            height={height}
            rx="1.5"
            fill="var(--color-accent)"
            opacity={0.35 + (height / 52) * 0.65}
          />
        ))}
      </g>

      {/* Săgeata de transformare */}
      <g stroke="var(--color-text-muted)" strokeWidth="1.5" fill="none">
        <line x1="286" y1="185" x2="330" y2="185" />
        <polyline points="322,179 330,185 322,191" />
      </g>

      {/* Textul rezultat — linii care sugerează cuvinte transcrise */}
      <g transform="translate(360, 158)">
        {[132, 108, 148, 76].map((width, i) => (
          <rect
            key={i}
            x="0"
            y={i * 16}
            width={width}
            height="4"
            rx="2"
            fill="var(--color-text)"
            opacity={0.78 - i * 0.11}
          />
        ))}
      </g>

      {/* Faptele, verificate în dictate.py */}
      <g
        fill="var(--color-text-muted)"
        fontSize="12.5"
        letterSpacing="1.6"
        fontFamily="var(--font-mono)"
      >
        <text x="48" y="338">large-v3-turbo · int8 · ro</text>
        <text x="48" y="360">cmd + shift + d</text>
      </g>

      {/* Afirmația centrală a proiectului */}
      <text
        x="592"
        y="338"
        textAnchor="end"
        fill="var(--color-accent)"
        fontSize="12.5"
        letterSpacing="1.6"
        fontFamily="var(--font-mono)"
      >
        nimic nu iese
      </text>
    </svg>
  );
}
