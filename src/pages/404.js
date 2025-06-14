import React, { useEffect, useRef, useState } from 'react';
import Layout from '@theme/Layout';
import styles from './404.module.css';

export default function NotFound() {
  const canvasRef = useRef(null);
  const [blocks, setBlocks] = useState([]);
  const animationRef = useRef(null);
  
  // 创建随机方块数据
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const blockTypes = [
      { name: 'grass', color: '#7CCD7C' },
      { name: 'dirt', color: '#8B5A2B' },
      { name: 'stone', color: '#7D7D7D' },
      { name: 'diamond', color: '#00FFFF' },
      { name: 'gold', color: '#FFD700' },
      { name: 'emerald', color: '#00C957' }
    ];
    
    const newBlocks = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      type: blockTypes[Math.floor(Math.random() * blockTypes.length)],
      position: {
        x: Math.random() * 100,
        y: Math.random() * 100
      },
      rotation: Math.random() * 360,
      offset: {
        x: Math.random() * 40 - 20,
        y: Math.random() * 40 - 20
      }
    }));
    
    setBlocks(newBlocks);
  }, []);

  // 粒子动画效果
  useEffect(() => {
    if (typeof window === 'undefined' || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // 设置Canvas尺寸
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    setCanvasSize();
    
    // 粒子系统
    const particles = [];
    const particleCount = window.innerWidth < 768 ? 30 : 50;
    const colors = ['#64ffda', '#00e5ff', '#2979ff', '#536dfe'];
    
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.lastUpdate = 0;
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
        if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
      }
      
      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    // 创建粒子
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
    
    // 网格优化
    const gridSize = 100;
    const grid = {};
    
    const updateGrid = () => {
      for (const key in grid) {
        delete grid[key];
      }
      
      particles.forEach(particle => {
        const gridX = Math.floor(particle.x / gridSize);
        const gridY = Math.floor(particle.y / gridSize);
        const key = `${gridX},${gridY}`;
        
        if (!grid[key]) grid[key] = [];
        grid[key].push(particle);
      });
    };
    
    // 动画循环
    let lastTimestamp = 0;
    const animate = (timestamp) => {
      // 限制帧率
      if (timestamp - lastTimestamp < 16) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }
      lastTimestamp = timestamp;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // 更新粒子位置
      particles.forEach(particle => {
        particle.update();
      });
      
      // 每5帧更新一次网格
      if (timestamp % 5 === 0) {
        updateGrid();
      }
      
      // 绘制粒子和连接线
      particles.forEach(particle => {
        particle.draw();
        
        const gridX = Math.floor(particle.x / gridSize);
        const gridY = Math.floor(particle.y / gridSize);
        
        // 只检查相邻网格
        for (let x = -1; x <= 1; x++) {
          for (let y = -1; y <= 1; y++) {
            const key = `${gridX + x},${gridY + y}`;
            if (grid[key]) {
              grid[key].forEach(otherParticle => {
                if (particle === otherParticle) return;
                
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distanceSquared = dx * dx + dy * dy;
                
                if (distanceSquared < 10000) { // 100px距离的平方
                  const distance = Math.sqrt(distanceSquared);
                  ctx.beginPath();
                  ctx.strokeStyle = particle.color;
                  ctx.lineWidth = 0.2 * (1 - distance / 100);
                  ctx.moveTo(particle.x, particle.y);
                  ctx.lineTo(otherParticle.x, otherParticle.y);
                  ctx.stroke();
                }
              });
            }
          }
        }
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    // 窗口大小调整处理
    const handleResize = () => {
      setCanvasSize();
    };
    
    window.addEventListener('resize', handleResize);
    
    // 清理函数
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Layout title="页面未找到" description="您访问的页面不存在">
      <div className={styles.container}>
        <canvas 
          ref={canvasRef}
          className={styles.particleCanvas}
        />
        
        <div className={styles.content}>
          <div className={styles.errorContainer}>
            <div className={styles.errorCode}>
              <span>4</span>
              <div className={styles.minecraftBlock404}>
                <div className={styles.blockFace}></div>
                <div className={styles.blockFace}></div>
                <div className={styles.blockFace}></div>
                <div className={styles.blockFace}></div>
                <div className={styles.blockFace}></div>
                <div className={styles.blockFace}></div>
              </div>
              <span>4</span>
            </div>
            
            <h1 className={styles.title}>页面未找到</h1>
            <p className={styles.description}>
              哎呀，看起来你访问的页面不存在或已被移除<br />
              <span className={styles.hint}>可能是链接发生了变化或页面已被删除</span>
            </p>
            
            <div className={styles.searchSection}>
              <p className={styles.searchHint}>尝试右上角搜索你需要的内容</p>
            </div>
            
            <div className={styles.actions}>
              <a href="/" className={styles.primaryButton}>
                返回首页
              </a>
              <a href="/docs/intro" className={styles.secondaryButton}>
                查看文档
              </a>
            </div>
          </div>
        </div>
        
        <div className={styles.minecraftBlocks}>
          {blocks.map(block => (
            <div 
              key={block.id}
              className={styles.minecraftBlock}
              style={{
                backgroundColor: block.type.color,
                left: `${block.position.x}%`,
                top: `${block.position.y}%`,
                transform: `rotate(${block.rotation}deg) translate(${block.offset.x}px, ${block.offset.y}px)`,
                transitionDelay: `${block.id * 100}ms`,
                opacity: 1
              }}
              data-name={block.type.name}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}