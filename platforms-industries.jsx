// Hero — animated drone trajectory over a Costa Rica outline,
// big chamfered headline, side schematic plate.

const HERO_PATH_D =
  // Stylized Costa Rica outline — ~ rectangle 600×340. Hand-tuned, not pixel-accurate.
  "M40,180 C60,120 120,90 200,90 C260,80 320,60 380,80 C430,95 470,80 520,110 C560,135 580,170 560,210 C540,255 510,290 460,300 C420,310 380,300 340,295 C290,290 240,300 200,290 C150,280 100,270 70,250 C45,235 25,215 40,180 Z";

const Hero = () => {
  const { t } = useI18n();
  return (
    <section id="top" className="s2f-blueprint-bg" style={{
      position: 'relative', minHeight: 'calc(100vh - 68px)',
      borderBottom: `1px solid ${TOKENS.rule}`, overflow: 'hidden',
    }} data-screen-label="01 Hero">
      {/* corner reticles */}
      <Reticle pos={{ top: 24, left: 24 }} />
      <Reticle pos={{ top: 24, right: 24 }} />
      <Reticle pos={{ bottom: 24, left: 24 }} />
      <Reticle pos={{ bottom: 24, right: 24 }} />

      <div style={{
        maxWidth: 1440, margin: '0 auto', padding: '40px 56px 60px',
        display: 'grid', gridTemplateColumns: '1.05fr 1fr', gap: 56,
        alignItems: 'center', minHeight: 'calc(100vh - 68px)',
      }}>
        {/* LEFT */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
          <Tag>● {t('hero.tag')}</Tag>
          <h1 style={{
            margin: 0, fontSize: 'clamp(56px, 7.6vw, 110px)', lineHeight: 0.94,
            fontWeight: 600, letterSpacing: '-0.03em', textWrap: 'balance',
          }}>
            {t('hero.title.a')}<br />
            {t('hero.title.b')}{' '}
            <span style={{ color: TOKENS.tealLight, fontStyle: 'italic', fontWeight: 500 }}>
              {t('hero.title.italic')}
            </span><br />
            {t('hero.title.c')}
          </h1>
          <p style={{ margin: 0, maxWidth: 580, fontSize: 18, lineHeight: 1.55, color: TOKENS.fgSoft }}>
            {t('hero.body')}
          </p>
          <div style={{ display: 'flex', gap: 14, marginTop: 8, flexWrap: 'wrap' }}>
            <a href="#contact" className="s2f-btn s2f-btn-primary" style={{ ...chamfer(10) }}>
              {t('hero.cta.brief')}
            </a>
            <a href="#platforms" className="s2f-btn s2f-btn-ghost" style={{ ...chamfer(10) }}>
              {t('hero.cta.platforms')}
            </a>
          </div>

          {/* mini stats row */}
          <div style={{
            marginTop: 22, display: 'grid', gridTemplateColumns: 'repeat(3,1fr)',
            borderTop: `1px solid ${TOKENS.rule}`, paddingTop: 22, gap: 18,
            fontFamily: FONT_MONO, fontSize: 11,
          }}>
            <MiniStat k={t('hero.stat.span')} v="980 mm" />
            <MiniStat k={t('hero.stat.mtow')} v="2.4 kg" />
            <MiniStat k={t('hero.stat.endurance')} v="48 min" />
          </div>
        </div>

        {/* RIGHT — animated map plate */}
        <CRMapPlate />
      </div>

      {/* bottom strip — running ticker */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 36,
        borderTop: `1px solid ${TOKENS.rule}`, background: 'rgba(11,21,24,0.7)',
        display: 'flex', alignItems: 'center', overflow: 'hidden',
        fontFamily: FONT_MONO, fontSize: 10, letterSpacing: '0.22em',
        color: TOKENS.fgMute, textTransform: 'uppercase',
      }}>
        <Ticker />
      </div>
    </section>
  );
};

const MiniStat = ({ k, v }) => (
  <div>
    <div style={{ color: TOKENS.fgFaint, letterSpacing: '0.16em', fontSize: 10, marginBottom: 4 }}>{k}</div>
    <div style={{ color: TOKENS.fg, fontSize: 16, fontFamily: FONT_DISPLAY, fontWeight: 600, letterSpacing: '-0.01em' }}>{v}</div>
  </div>
);

const Reticle = ({ pos }) => (
  <div style={{ position: 'absolute', width: 24, height: 24, ...pos, pointerEvents: 'none' }}>
    <div style={{ position: 'absolute', top: 0, left: 0, width: 10, height: 1, background: TOKENS.tealLight, opacity: 0.55 }}></div>
    <div style={{ position: 'absolute', top: 0, left: 0, width: 1, height: 10, background: TOKENS.tealLight, opacity: 0.55 }}></div>
  </div>
);

const Ticker = () => {
  const items = [
    'SAN JOSÉ', 'CRC', '09.928°N · 84.090°W', 'EST. 2026',
    'IN-HOUSE STRUCTURES', 'OUTSOURCED ELECTRONICS · INTEGRATED HERE',
    'TRAIN · CERTIFY · FLY · SUSTAIN · RETIRE',
    'TOOLS NOT WEAPONS',
    'CENTRAL AMERICAN AEROSPACE PRACTICE',
  ];
  const all = [...items, ...items, ...items];
  return (
    <div style={{
      display: 'flex', gap: 56, whiteSpace: 'nowrap',
      animation: 's2f-ticker 60s linear infinite',
      paddingLeft: 32,
    }}>
      <style>{`@keyframes s2f-ticker { from { transform: translateX(0); } to { transform: translateX(-33.33%); } }`}</style>
      {all.map((it, i) => (
        <span key={i} style={{ display: 'inline-flex', gap: 14, alignItems: 'center' }}>
          <span style={{ color: TOKENS.tealLight }}>◆</span> {it}
        </span>
      ))}
    </div>
  );
};

// Costa Rica plate with looping drone trajectory
const CRMapPlate = () => {
  const { t } = useI18n();
  return (
    <div style={{
      position: 'relative', aspectRatio: '5/4',
      border: `1px solid ${TOKENS.rule}`, background: 'rgba(15,28,32,0.6)',
      ...chamfer(14), display: 'flex', flexDirection: 'column',
    }}>
      {/* header */}
      <div style={{
        padding: '14px 18px', display: 'flex', justifyContent: 'space-between',
        fontFamily: FONT_MONO, fontSize: 10, letterSpacing: '0.18em',
        color: TOKENS.fgMute, borderBottom: `1px solid ${TOKENS.ruleSoft}`,
      }}>
        <span><span className="s2f-pulse" style={{ color: TOKENS.tealLight }}>●</span> {t('hero.fig')}</span>
        <span>{t('hero.fig.sub')}</span>
      </div>

      {/* viz */}
      <div style={{ flex: 1, position: 'relative' }}>
        <svg viewBox="0 0 600 380" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
          <defs>
            <radialGradient id="pulse" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={TOKENS.tealLight} stopOpacity="0.6" />
              <stop offset="100%" stopColor={TOKENS.tealLight} stopOpacity="0" />
            </radialGradient>
            <linearGradient id="trail" x1="0" x2="1">
              <stop offset="0%" stopColor={TOKENS.tealLight} stopOpacity="0" />
              <stop offset="100%" stopColor={TOKENS.tealLight} stopOpacity="0.85" />
            </linearGradient>
            <pattern id="hatch3" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="6" stroke="rgba(95,184,196,0.10)" strokeWidth="1" />
            </pattern>
          </defs>

          {/* graticule */}
          {[60,120,180,240,300].map(y => (
            <line key={'h'+y} x1="20" y1={y} x2="580" y2={y} stroke="rgba(95,184,196,0.07)" />
          ))}
          {[80,160,240,320,400,480,560].map(x => (
            <line key={'v'+x} x1={x} y1="20" x2={x} y2="360" stroke="rgba(95,184,196,0.07)" />
          ))}

          {/* CR landmass */}
          <path d={HERO_PATH_D} fill="url(#hatch3)" stroke="rgba(95,184,196,0.55)" strokeWidth="1" />

          {/* waypoints */}
          {[
            { x: 130, y: 200, l: 'GUANACASTE' },
            { x: 280, y: 150, l: 'SAN JOSÉ' },
            { x: 420, y: 200, l: 'LIMÓN' },
            { x: 220, y: 250, l: 'OSA' },
          ].map((w, i) => (
            <g key={i}>
              <circle cx={w.x} cy={w.y} r="22" fill="url(#pulse)">
                <animate attributeName="r" values="14;26;14" dur="3.6s" repeatCount="indefinite" begin={`${i*0.4}s`} />
              </circle>
              <circle cx={w.x} cy={w.y} r="3" fill={TOKENS.tealLight} />
              <text x={w.x + 10} y={w.y - 8} fontFamily="JetBrains Mono, monospace" fontSize="9"
                fill="rgba(232,236,238,0.6)" letterSpacing="0.14em">{w.l}</text>
            </g>
          ))}

          {/* trajectory path */}
          <path id="traj" d="M130 200 C 200 100, 280 220, 280 150 S 380 100, 420 200 S 300 320, 220 250 S 100 250, 130 200"
            fill="none" stroke={TOKENS.tealLight} strokeWidth="1.5"
            strokeDasharray="4 6" opacity="0.55" />

          {/* moving drone glyph along path */}
          <g>
            <circle r="5" fill={TOKENS.tealLight}>
              <animateMotion dur="14s" repeatCount="indefinite"
                path="M130 200 C 200 100, 280 220, 280 150 S 380 100, 420 200 S 300 320, 220 250 S 100 250, 130 200" />
            </circle>
            <g>
              {/* tiny crosshair around drone — same animateMotion */}
              <g opacity="0.85">
                <circle r="11" fill="none" stroke={TOKENS.tealLight} strokeWidth="0.8">
                  <animateMotion dur="14s" repeatCount="indefinite"
                    path="M130 200 C 200 100, 280 220, 280 150 S 380 100, 420 200 S 300 320, 220 250 S 100 250, 130 200" />
                </circle>
              </g>
            </g>
          </g>

          {/* compass rose */}
          <g transform="translate(540 60)" fontFamily="JetBrains Mono, monospace" fontSize="8" fill="rgba(232,236,238,0.55)">
            <circle r="18" fill="none" stroke="rgba(95,184,196,0.3)" />
            <line x1="0" y1="-22" x2="0" y2="22" stroke="rgba(95,184,196,0.3)" />
            <line x1="-22" y1="0" x2="22" y2="0" stroke="rgba(95,184,196,0.3)" />
            <text x="0" y="-26" textAnchor="middle">N</text>
            <text x="26" y="3" textAnchor="start">E</text>
            <text x="0" y="32" textAnchor="middle">S</text>
            <text x="-26" y="3" textAnchor="end">W</text>
          </g>
        </svg>
      </div>

      {/* footer telemetry */}
      <div style={{
        padding: '14px 18px', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)',
        fontFamily: FONT_MONO, fontSize: 10, color: TOKENS.fgMute,
        letterSpacing: '0.14em', borderTop: `1px solid ${TOKENS.ruleSoft}`,
      }}>
        <Telem k="ALT" v="320 M" />
        <Telem k="SPD" v="12 M/S" />
        <Telem k="HDG" v="084°" />
        <Telem k="LINK" v={<span><span className="s2f-pulse" style={{ color: TOKENS.tealLight }}>●</span> NOMINAL</span>} />
      </div>
    </div>
  );
};

const Telem = ({ k, v }) => (
  <div>
    <div style={{ color: TOKENS.fgFaint, fontSize: 9 }}>{k}</div>
    <div style={{ color: TOKENS.fg, fontSize: 11, marginTop: 3 }}>{v}</div>
  </div>
);

Object.assign(window, { Hero });
