---
sidebar_position: 1
slug: /docs/intro
title: 🏰 锐界幻境 - 世外桃源
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { FaServer, FaUsers, FaShieldAlt, FaHeart } from 'react-icons/fa';

<div className="server-hero">

![ME-LOGO](/img/ME-logo.png "锐界幻境")
<div className="logo-glow"></div>

<h1 className="server-title">
  MiragEdge <span className="star">✰</span> 锐界幻境
  <small className="server-subtitle">独立于现实的乌托邦</small>
</h1>

</div>

<div className="feature-grid">

  <div className="feature-card server-type">
    <div className="feature-icon"><FaServer /></div>
    <h3>核心架构</h3>
    <ul>
      <li>Java 1.21.1 Purpur 核心</li>
      <li><span className="tag bedrock">Geyser 基岩版支持</span></li>
      <li><span className="tag waterfall">Waterfall 负载均衡</span></li>
    </ul>
  </div>

  <div className="feature-card hardware">
    <div className="feature-icon"><FaHeart /></div>
    <h3>硬件保障</h3>
    <ul>
      <li>i5-14600KF 超频物理机</li>
      <li>NVMe 全闪存存储阵列</li>
      <li>每日增量备份 + 异地容灾</li>
    </ul>
  </div>

  <div className="feature-card community">
    <div className="feature-icon"><FaUsers /></div>
    <h3>社区理念</h3>
    <ul>
      <li>公益化的纯净体验</li>
      <li>几乎7×24 小时管理在线</li>
      <li>跨次元社交生态</li>
    </ul>
  </div>

  <div className="feature-card security">
    <div className="feature-icon"><FaShieldAlt /></div>
    <h3>安全防护</h3>
    <ul>
      <li>混合型强力反作弊</li>
      <li>多线路负载均衡</li>
      <li>群服互通自动白名单</li>
    </ul>
  </div>

</div>

<Tabs>
  <TabItem value="vision" label="✨ 愿景使命" default>
    <div className="vision-text">
      <blockquote>
        👼🏻远离困恼之地（锐界）和天堂般的境地（幻境）<br/>
        在数字荒漠中打造一片绿洲<br/>
        让每个玩家都能找到属于自己的幻境<br/>
        <footer>—— 管理组 敬上</footer>
      </blockquote>
    </div>
  </TabItem>

  <TabItem value="join" label="🚀 加入我们">
    <div className="join-methods">
      <div className="method java">
        <h4>Java 版加入方式</h4>
        <code>miragedge.cn</code>
      </div>
      <div className="method bedrock">
        <h4>基岩版加入方式</h4>
        <code>miragedge.cn</code>
        <div className="port">端口: 19132</div>
      </div>
    </div>
  </TabItem>
</Tabs>