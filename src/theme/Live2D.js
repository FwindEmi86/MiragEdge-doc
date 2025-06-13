import React, { useEffect } from 'react';

export default function live2d({ children }) {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://fastly.jsdelivr.net/npm/live2d-widgets@0/autoload.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return <>{children}</>;
}