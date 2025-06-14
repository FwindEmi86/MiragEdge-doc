// static/pixi-check.js
document.addEventListener('DOMContentLoaded', function() {
  const loadPixi = () => {
    if (!window.PIXI) {
      console.log('加载PIXI.js回退');
      
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/pixi.js@6.5.2/dist/browser/pixi.min.js';
      script.id = 'pixi-fallback-script';
      
      script.onload = () => {
        console.log('PIXI回退加载成功');
        window.dispatchEvent(new Event('pixi-loaded'));
      };
      
      script.onerror = () => {
        console.error('PIXI回退加载失败');
      };
      
      document.head.appendChild(script);
    } else {
      window.dispatchEvent(new Event('pixi-loaded'));
    }
  };
  
  // 初始检查
  if (!window.PIXI) {
    setTimeout(loadPixi, 300); // 给主脚本一点时间加载
  } else {
    window.dispatchEvent(new Event('pixi-loaded'));
  }
});