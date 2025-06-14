import { useEffect, useRef, useState } from 'react';

const Live2DWidget = () => {
  const canvasRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    let app = null;
    let model = null;
    let resizeHandler = null;
    let timeoutId = null;

    // 资源预加载函数 - 确保依赖完全加载
    const loadDependencies = () => {
      return new Promise((resolve, reject) => {
        const dependencies = [
          { name: 'Live2DCubismCore', object: window.Live2DCubismCore },
          { name: 'PIXI', object: window.PIXI }
        ];
        
        const startTime = Date.now();
        
        const checkDependencies = () => {
          // 检查所有依赖是否已加载
          const allLoaded = dependencies.every(dep => dep.object !== undefined);
          
          if (allLoaded) {
            resolve();
          } 
          // 超时处理（15秒）
          else if (Date.now() - startTime > 15000) {
            const missing = dependencies
              .filter(dep => dep.object === undefined)
              .map(dep => dep.name);
            reject(new Error(`以下依赖加载超时: ${missing.join(', ')}`));
          }
          // 每100ms检查一次
          else {
            setTimeout(checkDependencies, 100);
          }
        };
        
        checkDependencies();
      });
    };

    const initLive2D = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log("[Live2D] 开始初始化");
        
        // 1. 等待所有依赖加载完成
        await loadDependencies();
        console.log("[Live2D] 所有依赖已加载");
        
        // 2. 确保canvas已渲染到DOM
        if (!canvasRef.current || !document.contains(canvasRef.current)) {
          throw new Error("Canvas元素未渲染到DOM");
        }
        
        // 3. 使用全局PIXI对象
        const PIXI = window.PIXI;
        console.log(`[PIXI] 版本: ${PIXI.VERSION}`);
        
        // 4. 动态加载Live2D库
        const { Live2DModel } = await import('pixi-live2d-display');
        console.log("[Live2D] pixi-live2d-display已加载");
        
        // 5. 初始化PIXI应用
        app = new PIXI.Application({
          view: canvasRef.current,
          transparent: true,
          backgroundAlpha: 0,
          width: 300,
          height: 300,
          autoStart: true,
          resolution: window.devicePixelRatio || 1,
          antialias: true
        });
        console.log("[PIXI] 应用已初始化");
        
        // 6. 安全禁用交互系统（兼容不同PIXI版本）
        if (app.renderer.plugins.interaction) {
          app.renderer.plugins.interaction.destroy();
          app.renderer.plugins.interaction = null;
        }
        
        // 7. 加载模型 - 使用绝对路径
        // 注意：这里使用绝对路径 /live2d/...，确保与public目录结构匹配
        const modelPath = '/live2d/models/kp31/model.json';
        console.log(`[Live2D] 加载模型: ${modelPath}`);
        
        try {
          model = await Live2DModel.from(modelPath);
          console.log("[Live2D] 模型加载成功");
        } catch (loadError) {
          console.error("[Live2D] 模型加载失败:", loadError);
          
          // 尝试使用当前域名的完整路径
          const fullPath = `${window.location.origin}/live2d/models/Pio/model.json`;
          console.log(`[Live2D] 尝试完整路径: ${fullPath}`);
          
          try {
            model = await Live2DModel.from(fullPath);
          } catch (fullPathError) {
            throw new Error(`模型加载失败: ${fullPathError.message}`);
          }
        }
        
        // 8. 添加到舞台并配置
        app.stage.addChild(model);
        model.interactive = false;
        model.buttonMode = false;
        
        // 9. 定位和缩放模型
        model.position.set(150, 150);
        model.scale.set(0.5);
        
        // 10. 窗口调整处理
        resizeHandler = () => {
          if (!model) return;
          
          const scale = Math.min(
            window.innerWidth / 1920, 
            window.innerHeight / 1080
          );
          
          model.scale.set(scale * 0.2);
          model.position.set(
            window.innerWidth - 200 * scale,
            window.innerHeight - 400 * scale
          );
        };
        
        window.addEventListener('resize', resizeHandler);
        resizeHandler(); // 初始调整
        
        // 11. 添加模型更新循环
        app.ticker.add(() => {
          model?.update(app.ticker.deltaMS);
        });
        
        // 12. 点击事件处理
        canvasRef.current.addEventListener('click', () => {
          if (model?.motions) {
            const motions = Object.keys(model.motions);
            if (motions.length > 0) {
              const randomMotion = motions[Math.floor(Math.random() * motions.length)];
              model.motion(randomMotion);
            }
          }
        });
        
        // 13. 加载成功
        setLoading(false);
        console.log("[Live2D] 初始化完成");
        
      } catch (error) {
        console.error("[Live2D] 初始化失败:", error);
        setError(`初始化失败: ${error.message}`);
        setLoading(false);
        
        // 清理资源
        if (app) {
          app.destroy(true);
          app = null;
        }
      }
    };
    
    // 启动初始化
    initLive2D();
    
    // 组件卸载时清理
    return () => {
      // 移除事件监听器
      if (resizeHandler) {
        window.removeEventListener('resize', resizeHandler);
      }
      
      // 清理PIXI应用
      if (app) {
        try {
          app.destroy(true);
        } catch (e) {
          console.error("[清理] 销毁PIXI应用失败:", e);
        }
        app = null;
      }
      
      // 清理超时定时器
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      
      // 移除canvas点击事件
      if (canvasRef.current) {
        const newCanvas = canvasRef.current.cloneNode(true);
        canvasRef.current.parentNode.replaceChild(newCanvas, canvasRef.current);
        canvasRef.current = newCanvas;
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
          borderRadius: '5px',
          display: 'flex',
          alignItems: 'center'
        }}>
          <div className="loader" style={{
            width: '20px',
            height: '20px',
            border: '3px solid rgba(255,255,255,0.3)',
            borderRadius: '50%',
            borderTopColor: 'white',
            animation: 'spin 1s linear infinite',
            marginRight: '10px'
          }} />
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
          borderRadius: '5px',
          maxWidth: '300px'
        }}>
          <strong>加载失败:</strong> {error}
          <div style={{ marginTop: '10px' }}>
            <button onClick={() => window.location.reload()} style={{
              padding: '5px 10px',
              background: 'white',
              color: 'red',
              border: 'none',
              borderRadius: '3px',
              cursor: 'pointer',
              marginRight: '10px'
            }}>
              重试
            </button>
            <button onClick={() => setError(null)} style={{
              padding: '5px 10px',
              background: 'transparent',
              color: 'white',
              border: '1px solid white',
              borderRadius: '3px',
              cursor: 'pointer'
            }}>
              关闭
            </button>
          </div>
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
        }}
      />
      
      {/* 添加加载动画样式 */}
      <style jsx>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
};

export default Live2DWidget;