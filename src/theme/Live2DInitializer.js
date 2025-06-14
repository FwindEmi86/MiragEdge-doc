import React, { useEffect } from 'react';

const Live2DInitializer = () => {
  useEffect(() => {
    window.__live2d_core_loaded = new Promise(resolve => {
      if (window.Live2DCubismCore) {
        resolve();
      } else {
        const handleLoad = () => {
          window.removeEventListener('live2dcore:loaded', handleLoad);
          resolve();
        };
        window.addEventListener('live2dcore:loaded', handleLoad);
      }
    });
    
    return () => {
    };
  }, []);

  return null;
};

export default Live2DInitializer;