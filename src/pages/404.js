import React, { useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import styles from './404.module.css';

export default function NotFound() {
  
  useEffect(() => {
    // 粒子背景效果
    const canvas = document.getElementById('particle-canvas-404');
    if (canvas) {
      const ctx = canvas.getContext('2d');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      const particles = [];
      const particleCount = 100;
      const colors = ['#64ffda', '#00e5ff', '#2979ff', '#536dfe'];
      
      class Particle {
        constructor() {
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
          this.size = Math.random() * 3 + 1;
          this.speedX = Math.random() * 1 - 0.5;
          this.speedY = Math.random() * 1 - 0.5;
          this.color = colors[Math.floor(Math.random() * colors.length)];
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
      
      const createParticles = () => {
        for (let i = 0; i < particleCount; i++) {
          particles.push(new Particle());
        }
      };
      
      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particles.length; i++) {
          particles[i].update();
          particles[i].draw();
          
          // 连接粒子
          for (let j = i; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
              ctx.beginPath();
              ctx.strokeStyle = particles[i].color;
              ctx.lineWidth = 0.2;
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
            }
          }
        }
        
        requestAnimationFrame(animate);
      };
      
      createParticles();
      animate();
      
      // 窗口大小调整
      const handleResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };
      
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
    
    // 方块动画
    const createMinecraftBlocks = () => {
      const blockContainer = document.getElementById('minecraft-blocks');
      if (!blockContainer) return;
      
      const blockTypes = [
        { name: 'grass', color: '#7CCD7C' },
        { name: 'dirt', color: '#8B5A2B' },
        { name: 'stone', color: '#7D7D7D' },
        { name: 'diamond', color: '#00FFFF' },
        { name: 'gold', color: '#FFD700' },
        { name: 'emerald', color: '#00C957' }
      ];
      
      const blocks = [];
      const blockCount = 20;
      
      for (let i = 0; i < blockCount; i++) {
        const block = document.createElement('div');
        const blockType = blockTypes[Math.floor(Math.random() * blockTypes.length)];
        
        block.className = styles.minecraftBlock;
        block.style.backgroundColor = blockType.color;
        block.style.left = `${Math.random() * 100}%`;
        block.style.top = `${Math.random() * 100}%`;
        block.style.transform = `rotate(${Math.random() * 360}deg)`;
        block.style.opacity = '0';
        
        block.setAttribute('data-name', blockType.name);
        blockContainer.appendChild(block);
        blocks.push(block);
      }
      
      // 动画方块
      setTimeout(() => {
        blocks.forEach((block, index) => {
          setTimeout(() => {
            block.style.transition = 'all 0.5s ease-out';
            block.style.opacity = '1';
            block.style.transform = `translate(${Math.random() * 40 - 20}px, ${Math.random() * 40 - 20}px) rotate(${Math.random() * 360}deg)`;
          }, index * 100);
        });
      }, 500);
    };
    
    createMinecraftBlocks();
  }, []);

  return (
    <Layout>
      <div className={styles.container}>
        <canvas 
          id="particle-canvas-404" 
          className={styles.particleCanvas}
        />
        
        <div id="minecraft-blocks" className={styles.minecraftBlocks}></div>
        
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
            </p>
            
            <div className={styles.searchSection}>
              <p className={styles.searchHint}>或者尝试右上角搜索你需要的内容~</p>
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
      </div>
    </Layout>
  );
}