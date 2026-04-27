// Practice section + interactive 7-stage Lifecycle

const Practice = () => {
  const { t } = useI18n();
  const principles = [
    ['practice.principle.1.t', 'practice.principle.1.b'],
    ['practice.principle.2.t', 'practice.principle.2.b'],
    ['practice.principle.3.t', 'practice.principle.3.b'],
    ['practice.principle.4.t', 'practice.principle.4.b'],
  ];
  return (
    <Section id="practice" idx="01" label={t('practice.eyebrow')}
      title={t('practice.title')} sub={t('practice.body')}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 24 }}>
        {principles.map(([tk, bk], i) => (
          <div key={tk} className="s2f-hover-reveal" style={{
            padding: '28px 24px', border: `1px solid ${TOKENS.rule}`,
            background: TOKENS.bgRaised, position: 'relative',
            ...chamfer(12), minHeight: 200,
          }}>
            <div style={{ fontFamily: FONT_MONO, fontSize: 10, color: TOKENS.fgFaint,
              letterSpacing: '0.22em', marginBottom: 18 }}>0{i+1}</div>
            <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-0.012em', marginBottom: 10 }}>
              {t(tk)}
            </div>
            <p style={{ margin: 0, fontSize: 14, lineHeight: 1.5, color: TOKENS.fgSoft }}>{t(bk)}</p>
            <div style={{ position: 'absolute', top: 14, right: 14, color: TOKENS.tealLight, fontFamily: FONT_MONO, fontSize: 10 }}>+</div>
          </div>
        ))}
      </div>
    </Section>
  );
};

const Lifecycle = () => {
  const { t, lang } = useI18n();
  const [active, setActive] = React.useState(1);
  const stages = ['01','02','03','04','05','06','07'];

  return (
    <Section id="lifecycle" idx="02" label={t('lifecycle.eyebrow')}
      title={t('lifecycle.title')} sub={t('lifecycle.sub')} tone="raised">
      <div style={{ fontFamily: FONT_MONO, fontSize: 11, color: TOKENS.fgMute, marginTop: -32, marginBottom: 36, letterSpacing: '0.16em' }}>
        ↳ {t('lifecycle.hint')}
      </div>

      {/* timeline */}
      <div style={{ position: 'relative', height: 270, marginBottom: 48 }}>
        {/* baseline */}
        <div style={{ position: 'absolute', left: 30, right: 30, top: 120, height: 1, background: TOKENS.rule }}></div>
        <div style={{
          position: 'absolute', left: 30, top: 120, height: 1,
          width: `${(active / (stages.length - 1)) * 100}%`,
          background: `linear-gradient(90deg, ${TOKENS.tealDeep}, ${TOKENS.tealLight})`,
          transition: 'width .4s cubic-bezier(.2,.7,.3,1)',
        }}></div>

        {stages.map((n, i) => {
          const left = `calc(30px + (100% - 60px) * ${i / (stages.length - 1)})`;
          const isActive = i === active;
          return (
            <button key={n} onClick={() => setActive(i)}
              onMouseEnter={() => setActive(i)}
              style={{
                position: 'absolute', left, top: 0, transform: 'translateX(-50%)',
                width: 150, background: 'transparent', border: 'none', cursor: 'pointer',
                color: 'inherit', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
                padding: 0,
              }}>
              <div style={{
                fontFamily: FONT_MONO, fontSize: 10,
                color: isActive ? TOKENS.tealLight : TOKENS.fgMute, letterSpacing: '0.2em',
              }}>{n}</div>
              <div style={{
                width: isActive ? 18 : 10, height: isActive ? 18 : 10,
                background: isActive ? TOKENS.teal : TOKENS.bg,
                border: `1.5px solid ${isActive ? TOKENS.tealLight : TOKENS.fgMute}`,
                marginTop: isActive ? 28 : 32,
                boxShadow: isActive ? `0 0 0 8px rgba(95,184,196,0.18)` : 'none',
                transform: 'rotate(45deg)',
                transition: 'all .25s',
              }}></div>
              <div style={{
                marginTop: 22, fontWeight: isActive ? 700 : 500,
                fontSize: 16, letterSpacing: '-0.005em',
                color: isActive ? TOKENS.fg : TOKENS.fgSoft,
              }}>{t(`lc.${n}.t`)}</div>
              <div style={{ fontFamily: FONT_MONO, fontSize: 9, color: TOKENS.fgFaint, letterSpacing: '0.16em', marginTop: -6 }}>
                {t(`lc.${n}.es`).toUpperCase()}
              </div>
            </button>
          );
        })}
      </div>

      {/* detail panel */}
      <div style={{
        display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 32,
        padding: 32, border: `1px solid ${TOKENS.rule}`, background: TOKENS.bgPanel, ...chamfer(14),
      }}>
        <div>
          <Tag>{stages[active]} · {t(`lc.${stages[active]}.t`).toUpperCase()}</Tag>
          <h3 style={{
            margin: '20px 0 14px', fontSize: 38, fontWeight: 600, letterSpacing: '-0.02em',
            color: TOKENS.fg,
          }}>{t(`lc.${stages[active]}.t`)}</h3>
          <p style={{ margin: 0, fontSize: 17, lineHeight: 1.55, color: TOKENS.fgSoft, maxWidth: 520 }}>
            {t(`lc.${stages[active]}.d`)}
          </p>
          <div style={{
            marginTop: 24, paddingTop: 18, borderTop: `1px solid ${TOKENS.ruleSoft}`,
            display: 'flex', gap: 22, alignItems: 'center',
            fontFamily: FONT_MONO, fontSize: 11, letterSpacing: '0.14em', color: TOKENS.fgMute,
          }}>
            <span>DELIVERABLE</span>
            <span style={{ color: TOKENS.fg, letterSpacing: '0.06em' }}>{t(`lc.${stages[active]}.deliv`)}</span>
          </div>
        </div>
        <div style={{ minHeight: 280 }}>
          <Borrador label={`STAGE ${stages[active]}\n${t(`lc.${stages[active]}.t`).toUpperCase()}\n[ MEDIA · WORKSHOP PHOTO ]`} h="100%" />
        </div>
      </div>
    </Section>
  );
};

Object.assign(window, { Practice, Lifecycle });
