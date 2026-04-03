import React, { useCallback } from 'react';
import Translate from '@docusaurus/Translate';
export default function PwaReloadPopup({ onReload }) {
    const handleReload = useCallback(() => {
        onReload();
    }, [onReload]);
    return (<div style={{
            position: 'fixed',
            bottom: '1.5rem',
            right: '1.5rem',
            background: '#003366',
            color: '#fff',
            padding: '0.75rem 1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            zIndex: 9999,
        }}>
      <span>
        <Translate id="theme.PwaReloadPopup.message" description="The message shown in the PWA reload popup">
          New content is available.
        </Translate>
      </span>
      <button onClick={handleReload} style={{
            background: '#3399ff',
            color: '#fff',
            border: 'none',
            padding: '0.4rem 0.9rem',
            cursor: 'pointer',
            fontWeight: 700,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
        }}>
        <Translate id="theme.PwaReloadPopup.button" description="The text of the button in the PWA reload popup">
          Reload
        </Translate>
      </button>
    </div>);
}
