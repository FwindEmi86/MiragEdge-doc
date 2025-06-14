import React, { useEffect } from 'react';

const Live2DInitializer = () => {
  useEffect(() => {
    // 确保 Cubism Core 先加载
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
    
    // 清理函数
    return () => {
      // 不需要特别清理，因为 Promise 是一次性的
    };
  }, []);

  return null;
};

export default Live2DInitializer;