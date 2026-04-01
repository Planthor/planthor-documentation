import React, {useCallback} from 'react';
import type {Props} from '@theme/PwaReloadPopup';

export default function PwaReloadPopup({onReload}: Props): JSX.Element | null {
  const handleReload = useCallback(() => {
    onReload();
  }, [onReload]);

  return (
    <div
      style={{
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
      <span>New content is available.</span>
      <button
        onClick={handleReload}
        style={{
          background: '#3399ff',
          color: '#fff',
          border: 'none',
          padding: '0.4rem 0.9rem',
          cursor: 'pointer',
          fontWeight: 700,
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
        }}>
        Reload
      </button>
    </div>
  );
}
