import React, { useEffect } from 'react';

useEffect(() => {
  const script = document.createElement('script');
  script.src = '/live2d/autoload.js';
  script.async = true;
  document.body.appendChild(script);
  return () => {
    document.body.removeChild(script);
  };
}, []);

export default function Home() {
  return (
    <Layout>
      <div className={styles.heroContainer}>
        <canvas 
          id="particle-canvas" 
          className={styles.particleCanvas}
        />
        
        <div className={clsx(styles.heroContent, 'container')}>
          <div className={styles.logoContainer}>
            <h1 className={styles.title}>锐界幻境</h1>
            <div className={styles.subtitle}>创新玩法 · 高版本互通 · 极致体验</div>
          </div>
          
          <div className={styles.ctaButtons}>
            <a href="/docs/intro" className={styles.primaryButton}>
              探索文档
            </a>
            <a 
              href="https://qm.qq.com/cgi-bin/qm/qr?k=r_yUquo3bQwX3bL97RwG1aVj41WIEOI3&jump_from=webapi&authKey=A76pYGWh45XBe5V4kV5m3LWyR3XRpIl30FETYB0/scIEMeRGhIEDlQWmD5HVjSbj" 
              className={styles.secondaryButton}
            >
              加入我们
            </a>
          </div>
        </div>
      </div>
      
      <div className={clsx(styles.features, 'container')}>
        <div className={styles.featureCard}>
          <div className={styles.cardIcon}>🎮</div>
          <h3>跨版本互通</h3>
          <p>支持Java版1.18+和基岩版玩家同服游玩，打破版本和设备限制</p>
        </div>
        
        <div className={styles.featureCard}>
          <div className={styles.cardIcon}>⚡</div>
          <h3>高性能优化</h3>
          <p>使用高性能设备，采用先进架构优化，稳定不卡顿</p>
        </div>
        
        <div className={styles.featureCard}>
          <div className={styles.cardIcon}>🌐</div>
          <h3>创新玩法</h3>
          <p>独家轻RPG系统、星露谷、地牢副本等多维度玩法</p>
        </div>
      </div>
      
      <div className={styles.serverInfo}>
        <div className="container">
          <h2 className={styles.sectionTitle}>服务器信息</h2>
          <div className={styles.infoGrid}>
            <div className={styles.infoCard}>
              <h3>⏰ 开放时间</h3>
              <p>7×24小时全年无休</p>
              <p>维护提前公告</p>
              <p>长期开服不换档</p>
            </div>
            <div className={styles.infoCard}>
              <h3>📌 服务器地址</h3>
              <p>miragedge.top</p>
              <p>默认端口: 25565</p>
            </div>
            <div className={styles.infoCard}>
              <h3>👥 社区理念</h3>
              <p>公益化的纯净体验</p>
              <p>几乎7×24 小时管理在线</p>
              <p>跨次元社交生态</p>
            </div>
          </div>
        </div>
      </div>
      <script src="/live2d/autoload.js"></script>
    </Layout>
  );
}