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
    
    const initLive2D = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log("开始初始化 Live2D");
        
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
        
        console.log("所有依赖已加载");
        
        // 2. 使用全局 PIXI 对象
        const PIXI = window.PIXI;
        console.log("PIXI 版本:", PIXI.VERSION);
        
        // 3. 初始化 PIXI 应用
        app = new PIXI.Application({
          view: canvasRef.current,
          backgroundAlpha: 0,
          width: 300,
          height: 300,
          autoStart: true,
          forceCanvas: true, // 使用 Canvas 渲染
          resolution: window.devicePixelRatio || 1
        });
        console.log("PIXI 应用已初始化");
        
        // 添加测试图形
        const testGraphics = new PIXI.Graphics();
        testGraphics.beginFill(0x00FF00);
        testGraphics.drawCircle(50, 50, 30);
        testGraphics.endFill();
        app.stage.addChild(testGraphics);
        console.log("测试图形已添加");
        
        // 4. 动态加载 Live2D 库
        const { Live2DModel } = await import('pixi-live2d-display');
        console.log("pixi-live2d-display 已加载");
        
        // 5. 加载模型
        console.log("开始加载模型...");
        const modelPath = 'https://cdn.jsdelivr.net/gh/guansss/pixi-live2d-display/test/assets/haru/haru_greeter_t03.model3.json';
        model = await Live2DModel.from(modelPath);
        console.log("模型加载成功:", model);
        
        // 6. 添加到舞台并配置
        app.stage.addChild(model);
        console.log("模型已添加到舞台");
        
        // 居中显示模型
        model.position.set(
          app.screen.width / 2,
          app.screen.height / 2
        );
        
        // 调整缩放
        model.scale.set(1.0); // 原始大小
        
        // 打印模型信息
        console.log("模型可见性:", model.visible);
        console.log("模型透明度:", model.alpha);
        console.log("模型尺寸:", model.width, model.height);
        
        // 7. 窗口调整处理
        resizeHandler = () => {
          if (model) {
            model.position.set(
              app.screen.width / 2,
              app.screen.height / 2
            );
          }
        };
        window.addEventListener('resize', resizeHandler);
        
        // 8. 添加模型更新循环
        app.ticker.add(() => {
          if (model) {
            model.update(app.ticker.deltaMS);
          }
        });
        
        setLoading(false);
        console.log("Live2D 初始化完成");
        
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
          border: '1px solid red' // 添加边框以便调试
        }}
      />
    </>
  );
};

export default Live2DWidget;