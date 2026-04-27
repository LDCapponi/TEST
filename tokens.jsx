// Platforms grid + Industries tabs

const PLATFORMS = [
  { id: 'x1', specs: { ws: '0.98 m', mtow: '2.4 kg', end: '48 min', rng: '12 km' } },
  { id: 'h1', specs: { ws: '2.10 m', mtow: '6.8 kg', end: '180 min', rng: '120 km' } },
  { id: 'r1', specs: { ws: '1.60 m', mtow: '14 kg', end: '36 min', rng: '8 km' } },
];

const Platforms = () => {
  const { t } = useI18n();
  return (
    <Section id="platforms" idx="03" label={t('platforms.eyebrow')} title={t('platforms.title')}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
        {PLATFORMS.map((p) => (
          <article key={p.id} style={{
            border: `1px solid ${TOKENS.rule}`, background: TOKENS.bgRaised,
            display: 'flex', flexDirection: 'column', ...chamfer(14),
            transition: 'border-color .2s, transform .2s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = TOKENS.tealLight; e.currentTarget.style.transform = 'translateY(-3px)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = TOKENS.rule; e.currentTarget.style.transform = 'none'; }}>
            <div style={{
              padding: '14px 18px', display: 'flex', justifyContent: 'space-between',
              fontFamily: FONT_MONO, fontSize: 10, letterSpacing: '0.18em',
              color: TOKENS.fgMute, borderBottom: `1px solid ${TOKENS.ruleSoft}`,
            }}>
              <span>FIG · {p.id.toUpperCase()}</span>
              <span style={{ color: TOKENS.tealLight }}>{t(`p.${p.id}.tag`).toUpperCase()}</span>
            </div>
            <div style={{ padding: 20, height: 240 }}>
              <Borrador label={`SOLIDWORKS\n3/4 RENDER\n${t(`p.${p.id}.name`)}`} h="100%" />
            </div>
            <div style={{ padding: '20px 22px', display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.018em' }}>{t(`p.${p.id}.name`)}</div>
              <p style={{ margin: 0, color: TOKENS.fgSoft, fontSize: 14, lineHeight: 1.55 }}>{t(`p.${p.id}.desc`)}</p>
              <div style={{
                marginTop: 8, padding: '14px 0', borderTop: `1px solid ${TOKENS.ruleSoft}`,
                display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10,
                fontFamily: FONT_MONO, fontSize: 10, letterSpacing: '0.12em', color: TOKENS.fgMute,
              }}>
                <PSpec k="WS" v={p.specs.ws} />
                <PSpec k="MTOW" v={p.specs.mtow} />
                <PSpec k="END" v={p.specs.end} />
                <PSpec k="RNG" v={p.specs.rng} />
              </div>
              <a href="#contact" className="s2f-link" style={{
                fontFamily: FONT_MONO, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase',
                color: TOKENS.tealLight, marginTop: 4,
              }}>{t('platforms.cta')}</a>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
};

const PSpec = ({ k, v }) => (
  <div>
    <div style={{ color: TOKENS.fgFaint, fontSize: 9, marginBottom: 4 }}>{k}</div>
    <div style={{ color: TOKENS.fg, fontSize: 11 }}>{v}</div>
  </div>
);

// ── INDUSTRIES — vertical tabs ───────────────────────────────
const INDS = ['ag','en','gov','sci','inf','env'];

const Industries = () => {
  const { t } = useI18n();
  const [active, setActive] = React.useState('ag');
  const specs = t(`ind.${active}.specs`);
  return (
    <Section id="industries" idx="04" label={t('industries.eyebrow')} title={t('industries.title')}>
      <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: 32 }}>
        {/* tab list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {INDS.map(k => {
            const isActive = active === k;
            return (
              <button key={k} onClick={() => setActive(k)}
                style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '14px 16px', textAlign: 'left', cursor: 'pointer',
                  background: isActive ? TOKENS.bgPanel : 'transparent',
                  color: isActive ? TOKENS.fg : TOKENS.fgSoft,
                  border: `1px solid ${isActive ? TOKENS.tealLight : TOKENS.rule}`,
                  fontFamily: FONT_DISPLAY, fontSize: 14, fontWeight: 500,
                  letterSpacing: '0.005em', transition: 'all .15s', ...chamfer(8),
                }}>
                <span>{t(`ind.${k}.t`)}</span>
                <span style={{ fontFamily: FONT_MONO, fontSize: 10, color: isActive ? TOKENS.tealLight : TOKENS.fgFaint }}>
                  {isActive ? '●' : '○'}
                </span>
              </button>
            );
          })}
        </div>

        {/* panel */}
        <div style={{
          border: `1px solid ${TOKENS.rule}`, background: TOKENS.bgRaised,
          padding: 28, ...chamfer(14), display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 28,
        }}>
          <div>
            <Tag>{active.toUpperCase()} · INDUSTRY</Tag>
            <h3 style={{ margin: '18px 0 14px', fontSize: 32, fontWeight: 600, letterSpacing: '-0.018em' }}>
              {t(`ind.${active}.t`)}
            </h3>
            <p style={{ margin: 0, fontSize: 16, lineHeight: 1.55, color: TOKENS.fgSoft }}>{t(`ind.${active}.b`)}</p>
            <div style={{ marginTop: 24, paddingTop: 20, borderTop: `1px solid ${TOKENS.ruleSoft}`,
              display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div className="s2f-eyebrow">CAPABILITIES</div>
              {Array.isArray(specs) && specs.map((s, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, fontSize: 13, fontFamily: FONT_MONO,
                  color: TOKENS.fgSoft, letterSpacing: '0.04em' }}>
                  <span style={{ color: TOKENS.tealLight }}>◆</span>{s}
                </div>
              ))}
            </div>
          </div>
          <div>
            <Borrador label={`FIELD CASE\n${t(`ind.${active}.t`).toUpperCase()}\n[ MEDIA · CAMPAIGN PHOTO ]`} h="100%" />
          </div>
        </div>
      </div>
    </Section>
  );
};

Object.assign(window, { Platforms, Industries });
