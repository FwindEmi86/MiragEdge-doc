import React, { useEffect, useRef, useState } from 'react';

const Live2DWidget = () => {
  const canvasRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    let app = null;
    let model = null;
    let resizeHandler = null;
    let tickerHandler = null;
    
    const initLive2D = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // 1. 确保所有依赖就绪
        await Promise.all([
          // 等待 Cubism Core
          new Promise(resolve => {
            if (window.Live2DCubismCore) resolve();
            else window.addEventListener('live2dcore:loaded', resolve, { once: true });
          }),
          
          // 等待 PIXI 加载
          new Promise(resolve => {
            const checkPIXI = () => {
              if (window.PIXI) resolve();
              else setTimeout(checkPIXI, 100);
            };
            checkPIXI();
          }),
          
          // 确保 Canvas 元素已渲染
          new Promise(resolve => {
            const checkCanvas = () => {
              if (canvasRef.current && document.contains(canvasRef.current)) {
                resolve();
              } else {
                setTimeout(checkCanvas, 50);
              }
            };
            checkCanvas();
          })
        ]);
        
        // 2. 使用全局 PIXI 对象
        const PIXI = window.PIXI;
        
        // 3. 初始化 PIXI 应用
        app = new PIXI.Application({
          view: canvasRef.current,
          backgroundAlpha: 0,
          width: 300,
          height: 300,
          autoStart: true,
          resolution: window.devicePixelRatio || 1,
          antialias: true
        });
        
        // 4. 动态加载 Live2D 库
        const { Live2DModel } = await import('pixi-live2d-display');
        
        // 5. 加载模型 - 添加错误处理
        try {
          model = await Live2DModel.from('https://cdn.jsdelivr.net/gh/guansss/pixi-live2d-display/test/assets/haru/haru_greeter_t03.model3.json');
        } catch (e) {
          console.error('主模型加载失败，尝试默认模型', e);
          model = await Live2DModel.from('/live2d/models/mao_pro_zh/mao_pro.model3.json');
        }
        
        // 6. 添加到舞台并配置
        app.stage.addChild(model);
        model.scale.set(0.2);
        model.position.set(
          window.innerWidth - 200,
          window.innerHeight - 400
        );
        
        // 7. 禁用模型交互（修复 isInteractive 错误）
        model.interactive = false;
        model.buttonMode = false;
        
        // 8. 添加手动交互处理（避免 PIXI 内部错误）
        let lastClickTime = 0;
        canvasRef.current.addEventListener('click', (e) => {
          const now = Date.now();
          if (now - lastClickTime < 300) return; // 防双击
          lastClickTime = now;
          
          const motions = Object.keys(model.motions);
          if (motions.length > 0) {
            const randomMotion = motions[Math.floor(Math.random() * motions.length)];
            model.motion(randomMotion);
          }
        });
        
        // 9. 窗口调整处理
        resizeHandler = () => {
          if (model) {
            model.position.set(
              window.innerWidth - 200,
              window.innerHeight - 400
            );
          }
        };
        window.addEventListener('resize', resizeHandler);
        
        // 10. 添加模型更新循环
        app.ticker.add(() => {
          if (model) {
            model.update(app.ticker.deltaMS);
          }
        });
        
        setLoading(false);
        
      } catch (error) {
        console.error('Live2D 初始化失败:', error);
        setError(error.message);
        setLoading(false);
      }
    };
    
    initLive2D();
    
    // 组件卸载时清理
    return () => {
      if (resizeHandler) {
        window.removeEventListener('resize', resizeHandler);
      }
      
      if (canvasRef.current) {
        canvasRef.current.removeEventListener('click', () => {});
      }
      
      if (app) {
        try {
          app.destroy(true);
        } catch (e) {
          console.error('销毁 PIXI 应用失败:', e);
        }
        app = null;
      }
    };
  }, []);

  return (
    <>
      {loading && (
        <div style={{
          position: 'fixed',
          right: '20px',
          bottom: '20px',
          zIndex: 998,
          background: 'rgba(0,0,0,0.7)',
          color: 'white',
          padding: '10px',
          borderRadius: '5px'
        }}>
          加载 Live2D 模型中...
        </div>
      )}
      
      {error && (
        <div style={{
          position: 'fixed',
          right: '20px',
          bottom: '20px',
          zIndex: 998,
          background: 'rgba(255,0,0,0.7)',
          color: 'white',
          padding: '10px',
          borderRadius: '5px'
        }}>
          加载失败: {error}
        </div>
      )}
      
      <canvas 
        ref={canvasRef}
        style={{
          position: 'fixed',
          right: '0',
          bottom: '0',
          width: '300px',
          height: '300px',
          zIndex: 999,
          pointerEvents: 'auto',
          display: loading || error ? 'none' : 'block'
        }}
      />
    </>
  );
};

export default Live2DWidget;