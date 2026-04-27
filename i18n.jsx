// Configurator (real state) + Academy/Workshop + News + Contact

const Configurator = () => {
  const { t } = useI18n();
  const [mission, setMission] = React.useState(0);
  const [env, setEnv]         = React.useState(2);
  const [end, setEnd]         = React.useState(2);
  const [pl, setPl]           = React.useState(1);

  // Naive recommender — pick platform by mission + endurance.
  const recommend = () => {
    if (end >= 3 || env === 2) return 'h1';
    if (mission === 2 || mission === 3) return 'r1';
    return 'x1';
  };
  const platform = recommend();
  const match = 60 + (mission === 0 ? 12 : 0) + (end === 2 ? 14 : 0) + (pl === 1 ? 8 : 0);
  const matchClamped = Math.min(98, match);

  const specs = {
    x1: [['MTOW','2.4 KG'],['ENDURANCE','48 MIN'],['CRUISE','12 M/S'],['CEILING','3 200 M'],['IP','IP54']],
    h1: [['MTOW','6.8 KG'],['ENDURANCE','180 MIN'],['CRUISE','22 M/S'],['CEILING','4 500 M'],['IP','IP55']],
    r1: [['MTOW','14 KG'],['ENDURANCE','36 MIN'],['CRUISE','10 M/S'],['CEILING','3 000 M'],['IP','IP54']],
  }[platform];

  return (
    <Section id="configurator" idx="05" label={t('cfg.eyebrow')}
      title={t('cfg.title')} sub={t('cfg.sub')} tone="raised">
      <div style={{
        display: 'grid', gridTemplateColumns: '360px 1fr 380px', gap: 0,
        border: `1px solid ${TOKENS.rule}`, background: TOKENS.bgPanel, ...chamfer(14),
        minHeight: 540,
      }}>
        {/* Left: groups */}
        <div style={{ borderRight: `1px solid ${TOKENS.ruleSoft}`, padding: '28px 28px', display: 'flex', flexDirection: 'column', gap: 22 }}>
          <CfgGroup label={t('cfg.a')} options={[0,1,2,3].map(i => t(`cfg.mission.${i}`))} active={mission} onChange={setMission} />
          <CfgGroup label={t('cfg.b')} options={[0,1,2,3].map(i => t(`cfg.env.${i}`))} active={env} onChange={setEnv} />
          <CfgGroup label={t('cfg.c')} options={[0,1,2,3].map(i => t(`cfg.end.${i}`))} active={end} onChange={setEnd} />
          <CfgGroup label={t('cfg.d')} options={[0,1,2,3].map(i => t(`cfg.pl.${i}`))} active={pl} onChange={setPl} />
        </div>
        {/* Center: render */}
        <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ fontFamily: FONT_MONO, fontSize: 10, letterSpacing: '0.18em', color: TOKENS.fgMute, display: 'flex', justifyContent: 'space-between' }}>
            <span>{t(`p.${platform}.name`).toUpperCase()} · {t(`cfg.env.${env}`).toUpperCase()} · {t(`cfg.end.${end}`).toUpperCase()}</span>
            <span style={{ color: TOKENS.tealLight }}>● {t('cfg.match')} {matchClamped}%</span>
          </div>
          <div style={{ flex: 1 }}>
            <Borrador label={`SOLIDWORKS VISUALIZE\nLIVE-UPDATING RENDER\n${t(`p.${platform}.name`)}`} h="100%" />
          </div>
        </div>
        {/* Right: telemetry */}
        <div style={{ borderLeft: `1px solid ${TOKENS.ruleSoft}`, padding: '28px 28px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div className="s2f-eyebrow">{t('cfg.recommended')}</div>
          <div style={{ fontSize: 32, fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            {t(`p.${platform}.name`)}
          </div>
          <div style={{ fontFamily: FONT_MONO, fontSize: 11, color: TOKENS.tealLight, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
            {t(`p.${platform}.tag`)}
          </div>
          <div style={{ height: 1, background: TOKENS.ruleSoft, margin: '6px 0' }}></div>
          {specs.map(([k,v]) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontFamily: FONT_MONO, fontSize: 11 }}>
              <span style={{ color: TOKENS.fgMute, letterSpacing: '0.16em' }}>{k}</span>
              <span style={{ color: TOKENS.fg }}>{v}</span>
            </div>
          ))}
          <a href="#contact" className="s2f-btn s2f-btn-primary" style={{
            marginTop: 'auto', justifyContent: 'space-between', ...chamfer(10),
          }}>
            <span>{t('cfg.send')}</span>
            <span style={{ fontFamily: FONT_MONO, fontSize: 10, opacity: 0.75 }}>S2F-BRF-{(mission*1000 + env*100 + end*10 + pl + 4000).toString().padStart(4,'0')}</span>
          </a>
        </div>
      </div>
    </Section>
  );
};

const CfgGroup = ({ label, options, active, onChange }) => (
  <div>
    <div className="s2f-eyebrow" style={{ marginBottom: 10 }}>{label}</div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {options.map((o, i) => {
        const isActive = i === active;
        return (
          <button key={i} onClick={() => onChange(i)} style={{
            padding: '11px 14px', fontSize: 13, fontWeight: 500,
            background: isActive ? TOKENS.tealDeep : 'transparent',
            color: isActive ? TOKENS.fg : TOKENS.fgSoft,
            border: `1px solid ${isActive ? TOKENS.tealLight : TOKENS.rule}`,
            cursor: 'pointer', display: 'flex', justifyContent: 'space-between',
            alignItems: 'center', textAlign: 'left',
            fontFamily: FONT_DISPLAY, ...chamfer(8),
            transition: 'all .15s',
          }}>
            <span>{o}</span>
            {isActive && <span style={{ fontFamily: FONT_MONO, fontSize: 10, color: TOKENS.tealLight }}>●</span>}
          </button>
        );
      })}
    </div>
  </div>
);

// ── ACADEMY & WORKSHOP ─────────────────────────────────────
const AcademyWorkshop = () => {
  const { t } = useI18n();
  const cards = [
    { k: 'academy', tag: '01' },
    { k: 'workshop', tag: '02' },
    { k: 'lab', tag: '03' },
  ];
  return (
    <Section id="academy" idx="06" label={t('aw.eyebrow')}
      title={t('aw.title')} sub={t('aw.sub')}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
        {cards.map(c => (
          <div key={c.k} style={{
            border: `1px solid ${TOKENS.rule}`, background: TOKENS.bgRaised,
            padding: '32px 28px', ...chamfer(14),
            display: 'flex', flexDirection: 'column', minHeight: 320,
          }}>
            <div className="s2f-eyebrow" style={{ marginBottom: 18 }}>§ {c.tag}</div>
            <div style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.018em', marginBottom: 14 }}>
              {t(`aw.${c.k}.t`)}
            </div>
            <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.55, color: TOKENS.fgSoft }}>
              {t(`aw.${c.k}.b`)}
            </p>
            <div style={{ marginTop: 'auto', paddingTop: 24 }}>
              <a href="#contact" className="s2f-link" style={{
                fontFamily: FONT_MONO, fontSize: 11, letterSpacing: '0.18em',
                textTransform: 'uppercase', color: TOKENS.tealLight,
              }}>{t(`aw.${c.k}.cta`)} →</a>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

// ── NEWS / LAB JOURNAL ─────────────────────────────────────
const News = () => {
  const { t } = useI18n();
  const items = [0,1,2];
  return (
    <Section id="news" idx="07" label={t('news.eyebrow')} title={t('news.title')} tone="raised">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
        {items.map(i => (
          <article key={i} style={{
            border: `1px solid ${TOKENS.rule}`, background: TOKENS.bg,
            ...chamfer(14), display: 'flex', flexDirection: 'column',
            transition: 'border-color .2s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = TOKENS.tealLight; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = TOKENS.rule; }}>
            <div style={{ height: 180 }}>
              <Borrador label={`PLATE\n[ MEDIA · NOTE ${i+1} ]`} h="100%" />
            </div>
            <div style={{ padding: 22, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <Tag tone="mute">{t(`news.${i}.tag`)}</Tag>
              <div style={{ fontSize: 19, fontWeight: 600, letterSpacing: '-0.012em', lineHeight: 1.25 }}>
                {t(`news.${i}.t`)}
              </div>
              <p style={{ margin: 0, color: TOKENS.fgSoft, fontSize: 13.5, lineHeight: 1.5 }}>
                {t(`news.${i}.d`)}
              </p>
              <div style={{ marginTop: 8, fontFamily: FONT_MONO, fontSize: 10,
                letterSpacing: '0.16em', color: TOKENS.fgMute }}>
                26.04.2026 · SAN JOSÉ
              </div>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
};

// ── CONTACT ─────────────────────────────────────────────────
const Contact = () => {
  const { t } = useI18n();
  const [submitted, setSubmitted] = React.useState(false);
  return (
    <Section id="contact" idx="08" label={t('contact.eyebrow')}
      title={t('contact.title')} sub={t('contact.sub')}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 40 }}>
        <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
          style={{
            border: `1px solid ${TOKENS.rule}`, background: TOKENS.bgRaised,
            padding: 32, ...chamfer(14), display: 'flex', flexDirection: 'column', gap: 18,
          }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
            <Field k="contact.f.name" />
            <Field k="contact.f.org" />
          </div>
          <Field k="contact.f.email" type="email" />
          <Field k="contact.f.mission" textarea />
          <button type="submit" className="s2f-btn s2f-btn-primary" style={{ alignSelf: 'flex-start', ...chamfer(10) }}>
            {submitted ? '● SENT — S2F-BRF-7392' : t('contact.f.send') + ' →'}
          </button>
        </form>
        <aside style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          {['where','who','when'].map(k => (
            <div key={k} style={{
              padding: '20px 22px', border: `1px solid ${TOKENS.ruleSoft}`,
              background: TOKENS.bgRaised, ...chamfer(10),
            }}>
              <div className="s2f-eyebrow" style={{ marginBottom: 8 }}>{t(`contact.detail.${k}`)}</div>
              <div style={{ fontSize: 15, color: TOKENS.fg, fontFamily: FONT_DISPLAY, fontWeight: 500 }}>
                {t(`contact.detail.${k}.b`)}
              </div>
            </div>
          ))}
        </aside>
      </div>
    </Section>
  );
};

const Field = ({ k, type = 'text', textarea }) => {
  const { t } = useI18n();
  const common = {
    background: TOKENS.bg, border: `1px solid ${TOKENS.rule}`,
    color: TOKENS.fg, padding: '14px 16px', fontFamily: FONT_DISPLAY,
    fontSize: 14, width: '100%', outline: 'none',
    ...chamfer(8),
  };
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <span className="s2f-eyebrow">{t(k)}</span>
      {textarea
        ? <textarea rows={4} style={common} placeholder="…" />
        : <input type={type} style={common} placeholder="…" />}
    </label>
  );
};

Object.assign(window, { Configurator, AcademyWorkshop, News, Contact });
