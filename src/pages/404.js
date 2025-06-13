// src/pages/404.js
import React, { useEffect, useState, useRef } from 'react';
import Layout from '@theme/Layout';
import SearchBar from '@theme/SearchBar';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import clsx from 'clsx';

// 确保样式正确引入
import styles from './404.module.css';

export default function NotFound() {
  const { siteConfig } = useDocusaurusContext();
  const [countdown, setCountdown] = useState(5);
  const canvasRef = useRef(null);
  const blockContainerRef = useRef(null);
  const isMounted = useRef(false);

  // 组件挂载时执行
  useEffect(() => {
    isMounted.current = true;
    
    // 1. 粒子背景效果（带错误处理）
    const initParticles = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      const particles = [];
      const particleCount = 80;
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
        if (!isMounted.current) return;
        
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
        if (!isMounted.current) return;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };
      
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
        isMounted.current = false;
      };
    };

    // 2. 方块动画（带错误处理）
    const initMinecraftBlocks = () => {
      const blockContainer = blockContainerRef.current;
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
      const blockCount = 15;
      
      // 先清空容器
      blockContainer.innerHTML = '';
      
      for (let i = 0; i < blockCount; i++) {
        const block = document.createElement('div');
        const blockType = blockTypes[Math.floor(Math.random() * blockTypes.length)];
        
        block.className = clsx(styles.minecraftBlock, 'animate-fadeIn');
        block.style.backgroundColor = blockType.color;
        block.style.left = `${Math.random() * 100}%`;
        block.style.top = `${Math.random() * 100}%`;
        block.style.transform = `rotate(${Math.random() * 360}deg)`;
        block.style.opacity = '0';
        
        block.setAttribute('data-name', blockType.name);
        blockContainer.appendChild(block);
        blocks.push(block);
      }
      
      // 延迟动画，确保DOM已加载
      setTimeout(() => {
        blocks.forEach((block, index) => {
          setTimeout(() => {
            block.style.transition = 'all 0.8s ease-out';
            block.style.opacity = '1';
            block.style.transform = `translate(${Math.random() * 40 - 20}px, ${Math.random() * 40 - 20}px) rotate(${Math.random() * 360}deg)`;
          }, index * 150);
        });
      }, 300);
    };

    // 3. 倒计时逻辑（优化：使用更安全的跳转方式）
    const timer = setInterval(() => {
      if (!isMounted.current) return;
      
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          // 使用Docusaurus的路由API而非直接修改location
          // 注意：需要引入@docusaurus/router
          // import { useNavigate } from '@docusaurus/router';
          // const navigate = useNavigate();
          // navigate('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // 初始化功能
    initParticles();
    initMinecraftBlocks();

    // 组件卸载时清理
    return () => {
      clearInterval(timer);
      isMounted.current = false;
    };
  }, []);

  const popularLinks = [
    { title: '文档首页', url: '/' },
    { title: '快速开始', url: '/docs/intro' },
    { title: 'API参考', url: '/docs/api' },
    { title: '社区讨论', url: '/community' },
  ];

  return (
    <Layout
      title={`404 - ${siteConfig.title}`}
      description="页面未找到"
    >
      <div className={styles.container}>
        {/* 粒子画布（使用ref引用） */}
        <canvas 
          ref={canvasRef}
          id="particle-canvas-404" 
          className={styles.particleCanvas}
        />
        
        {/* 方块容器（使用ref引用） */}
        <div 
          ref={blockContainerRef}
          id="minecraft-blocks" 
          className={styles.minecraftBlocks}
        ></div>
        
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
              您访问的页面不存在或已被移除。<br />
              <span className={styles.countdown}>{countdown}秒后自动返回首页</span>
            </p>
            
            <div className={styles.searchSection}>
              <p className={styles.searchHint}>或者尝试搜索您需要的内容：</p>
              <div className={styles.searchBar}>
                <SearchBar />
              </div>
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
          
          <div className={styles.linksSection}>
            <h3 className={styles.sectionTitle}>热门页面</h3>
            <div className={styles.linksGrid}>
              {popularLinks.map((link, index) => (
                <a 
                  key={index} 
                  href={link.url} 
                  className={styles.linkCard}
                  onMouseEnter={() => {
                    // 简单的交互反馈
                    const block = blockContainerRef.current?.children[Math.floor(Math.random() * 15)];
                    if (block) {
                      block.style.transform = `scale(1.1) translate(${Math.random() * 40 - 20}px, ${Math.random() * 40 - 20}px) rotate(${Math.random() * 360}deg)`;
                    }
                  }}
                >
                  {link.title}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}