import React from 'react';

export default function FoodCard({ 
  title, 
  enName, 
  hunger, 
  saturation, 
  special,  // 新增特殊属性参数
  source, 
  image 
}) {
  // 来源类型样式映射
  const sourceStyle = {
    合成: { bg: '#e3f2fd', color: '#1976d2', icon: '🛠️' },
    熔炉: { bg: '#fff3e0', color: '#ef6c00', icon: '🔥' },
    其他: { bg: '#fce4ec', color: '#c2185b', icon: '🎁' }
  }[source];

  return (
    <div className="food-card">
      {/* 合成配方图 */}
      <div className="recipe-image-container">
        <img 
          src={image} 
          alt={`${title}合成配方`} 
          className="recipe-image"
        />
      </div>

      {/* 食物详细信息 */}
      <div className="food-info">
        <h3>{title} <small>({enName})</small></h3>
        
        {/* 基础属性 */}
        <div className="food-meta">
          <span 
            className="source-tag"
            style={{ 
              backgroundColor: sourceStyle.bg,
              color: sourceStyle.color
            }}
          >
          <span className="meta-item"> 🍗 饥饿值 {hunger}</span>
          <span className="meta-item">⚡ 饱和度 {saturation}</span>
            {sourceStyle.icon} {source}
          </span>
        </div>

        {/* 新增特殊属性区块 */}
        {special && (
          <div className="special-property">
            <span className="special-icon">✨</span>
            <span className="special-text">{special}</span>
          </div>
        )}
      </div>
    </div>
  );
}