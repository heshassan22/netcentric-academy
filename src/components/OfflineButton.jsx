import { useEffect, useState } from 'react';

// "Save for offline" — registers the service worker (vite-plugin-pwa / Workbox),
// which precaches the whole built site so every lesson works without a network.
export default function OfflineButton() {
  const [state, setState] = useState('idle'); // idle | saving | ready | unsupported

  useEffect(() => {
    if (!('serviceWorker' in navigator)) { setState('unsupported'); return; }
    // already saved on a previous visit?
    navigator.serviceWorker.getRegistration().then((reg) => {
      if (reg && reg.active) setState('ready');
    });
  }, []);

  async function save() {
    if (!('serviceWorker' in navigator) || state === 'ready') return;
    setState('saving');
    try {
      const { registerSW } = await import('virtual:pwa-register');
      registerSW({
        immediate: true,
        onOfflineReady() { setState('ready'); },
        onRegisteredSW(_url, reg) {
          // mark ready once the SW is active and has finished precaching
          if (reg && reg.active && !navigator.serviceWorker.controller) setState('ready');
        }
      });
    } catch (e) {
      setState('idle');
    }
  }

  if (state === 'unsupported') return null;

  const label = state === 'ready' ? '✓ Offline ready'
    : state === 'saving' ? 'Saving…'
    : '⬇ Save offline';

  return (
    <button
      className={'icon-btn offline-btn' + (state === 'ready' ? ' is-ready' : '')}
      type="button"
      onClick={save}
      disabled={state !== 'idle'}
      aria-live="polite"
      title={state === 'ready' ? 'This site is available offline' : 'Save the site to use it offline'}
    >
      {label}
    </button>
  );
}
