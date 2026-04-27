// Sticky top nav + EN/ES toggle + footer
const NavBar = () => {
  const { t, lang, setLang } = useI18n();
  const links = [
    ['#practice',     'nav.capabilities'],
    ['#lifecycle',    'nav.workshop'],
    ['#platforms',    'nav.platforms'],
    ['#industries',   'nav.industries'],
    ['#configurator', 'nav.brief'],
    ['#academy',      'nav.academy'],
    ['#news',         'nav.lab'],
  ];
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: scrolled ? 'rgba(11,21,24,0.92)' : 'rgba(11,21,24,0.6)',
      backdropFilter: 'saturate(140%) blur(10px)',
      WebkitBackdropFilter: 'saturate(140%) blur(10px)',
      borderBottom: `1px solid ${scrolled ? TOKENS.rule : 'transparent'}`,
      transition: 'background .18s, border-color .18s',
    }}>
      <div style={{
        maxWidth: 1440, margin: '0 auto', padding: '0 32px',
        height: 68, display: 'grid', gridTemplateColumns: '220px 1fr auto',
        alignItems: 'center', gap: 16,
      }}>
        <a href="#top" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <img src="assets/s2f-mark.png" alt=""
            style={{ height: 32, width: 32, objectFit: 'contain', filter: 'drop-shadow(0 0 6px rgba(95,184,196,0.3))' }} />
          <img src="assets/s2f-wordmark.png" alt="Sketch2Fly"
            style={{ height: 22, filter: 'brightness(0) invert(1)' }} />
        </a>
        <nav style={{
          display: 'flex', gap: 22, justifyContent: 'center',
          fontSize: 12, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase',
          color: TOKENS.fgSoft,
        }}>
          {links.map(([href, k]) => (
            <a key={k} href={href} className="s2f-link">{t(k)}</a>
          ))}
        </nav>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            display: 'flex', fontFamily: FONT_MONO, fontSize: 11,
            border: `1px solid ${TOKENS.rule}`, ...chamfer(6),
          }}>
            {['en','es'].map(L => (
              <button key={L} onClick={() => setLang(L)} style={{
                padding: '6px 11px', background: lang === L ? TOKENS.teal : 'transparent',
                color: lang === L ? TOKENS.bg : TOKENS.fgSoft,
                border: 'none', cursor: 'pointer', fontFamily: FONT_MONO, fontSize: 11,
                letterSpacing: '0.16em', textTransform: 'uppercase',
              }}>{L}</button>
            ))}
          </div>
          <a href="#contact" className="s2f-btn s2f-btn-primary" style={{ ...chamfer(8) }}>
            {t('nav.brief')} <span style={{ fontFamily: FONT_MONO, fontWeight: 400 }}>→</span>
          </a>
        </div>
      </div>
    </header>
  );
};

const Footer = () => {
  const { t } = useI18n();
  return (
    <footer style={{
      borderTop: `1px solid ${TOKENS.rule}`, padding: '52px 56px 32px',
      background: TOKENS.bg,
    }}>
      <div style={{ maxWidth: 1440, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr', gap: 40, alignItems: 'start' }}>
          <div>
            <img src="assets/s2f-wordmark.png" alt="Sketch2Fly"
              style={{ height: 30, filter: 'brightness(0) invert(1)', marginBottom: 14 }} />
            <p style={{ margin: 0, color: TOKENS.fgMute, fontSize: 13, lineHeight: 1.6, maxWidth: 320 }}>
              {t('foot.tagline')}
            </p>
          </div>
          {[
            { h: t('nav.platforms'), items: ['S2F-X1', 'S2F-H1', 'S2F-R1'] },
            { h: t('nav.capabilities'), items: [t('aw.academy.t'), t('aw.workshop.t'), t('aw.lab.t')] },
            { h: t('nav.contact'), items: ['San José · CRC', 'hello@sketch2fly.cr', '+506 2222 0000'] },
          ].map((col, i) => (
            <div key={i}>
              <div className="s2f-eyebrow" style={{ marginBottom: 14 }}>{col.h}</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {col.items.map(it => (
                  <li key={it} style={{ color: TOKENS.fgSoft, fontSize: 13 }}>{it}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{
          marginTop: 48, paddingTop: 22, borderTop: `1px solid ${TOKENS.ruleSoft}`,
          display: 'flex', justifyContent: 'space-between',
          fontFamily: FONT_MONO, fontSize: 10, letterSpacing: '0.16em', color: TOKENS.fgMute,
        }}>
          <span>{t('foot.copy')}</span>
          <span>09.928°N · 84.090°W · UTC-6</span>
        </div>
      </div>
    </footer>
  );
};

Object.assign(window, { NavBar, Footer });
