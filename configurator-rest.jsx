// Tweaks panel + main app shell

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "lang": "en",
  "accentIntensity": "balanced",
  "showTicker": true,
  "showReticles": true
}/*EDITMODE-END*/;

const S2FTweaks = () => {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  return (
    <TweaksPanel title="Tweaks">
      <TweakSection title="Language">
        <TweakRadio value={tweaks.lang} onChange={(v) => setTweak('lang', v)}
          options={[{value:'en', label:'EN'}, {value:'es', label:'ES'}]} />
      </TweakSection>
      <TweakSection title="Accent intensity">
        <TweakRadio value={tweaks.accentIntensity} onChange={(v) => setTweak('accentIntensity', v)}
          options={[
            {value:'subtle', label:'Subtle'},
            {value:'balanced', label:'Balanced'},
            {value:'vivid', label:'Vivid'},
          ]} />
      </TweakSection>
      <TweakSection title="Hero chrome">
        <TweakToggle value={tweaks.showTicker} onChange={(v)=>setTweak('showTicker', v)} label="Bottom ticker" />
        <TweakToggle value={tweaks.showReticles} onChange={(v)=>setTweak('showReticles', v)} label="Corner reticles" />
      </TweakSection>
    </TweaksPanel>
  );
};

// Apply accent intensity by mutating CSS vars
const applyAccent = (intensity) => {
  const root = document.documentElement;
  if (intensity === 'subtle') {
    root.style.setProperty('--teal', '#3F7785');
    root.style.setProperty('--teal-light', '#6FA0A8');
  } else if (intensity === 'vivid') {
    root.style.setProperty('--teal', '#3FB7CB');
    root.style.setProperty('--teal-light', '#7FE0EE');
  } else {
    root.style.setProperty('--teal', TOKENS.teal);
    root.style.setProperty('--teal-light', TOKENS.tealLight);
  }
};

const App = () => {
  // Tweaks state hook (lifted)
  const [tweaks] = useTweaks(TWEAK_DEFAULTS);
  const [lang, setLang] = React.useState(tweaks.lang || 'en');
  React.useEffect(() => { setLang(tweaks.lang || 'en'); }, [tweaks.lang]);
  React.useEffect(() => { applyAccent(tweaks.accentIntensity); }, [tweaks.accentIntensity]);

  return (
    <I18nProvider lang={lang} setLang={setLang}>
      <NavBar />
      <main>
        <Hero />
        <Practice />
        <Lifecycle />
        <Platforms />
        <Industries />
        <Configurator />
        <AcademyWorkshop />
        <News />
        <Contact />
      </main>
      <Footer />
      <S2FTweaks />
    </I18nProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
