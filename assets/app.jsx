// Production app — no canvas, no tweaks panel, no click counter
// Reads window.__RKNET_VARIANT to decide which page to show

const TWEAKS = {
  accent: 'rust',
  serif: 'newsreader',
  wordmark: 'serif',
  heroB: 'soft',
  toneB: 'firm',
  portrait: 'show',
  formState: 'default',
  profession: 'default',
};

function App() {
  const variant = window.__RKNET_VARIANT || 'expert';
  const [ctaState, setCtaState] = React.useState('default');

  const navigate = (v) => {
    const isInSubdir = window.location.pathname.includes('/for-companies');
    if (v === 'company') {
      window.location.href = isInSubdir ? 'index.html' : 'for-companies/index.html';
    } else {
      window.location.href = isInSubdir ? '../index.html' : 'index.html';
    }
  };

  const common = { tweaks: TWEAKS, ctaState, setCtaState, onCross: navigate };

  return (
    <div className="rk-page-host">
      {variant === 'expert' && <VariantA {...common} />}
      {variant === 'company' && <VariantB {...common} />}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
