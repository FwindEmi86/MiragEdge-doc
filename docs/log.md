---
slug: /docs/log
title: 更新日志
---

<div className="log-header">
# **🏕️ 锐界幻境更新日志**  
**✨ 其实这个记录主要是给服主看的QWQ**  
📌本日志由 [**FwindEmi^狐风轩汐**](https://space.bilibili.com/359174372) 维护更新  
*最后修订时间：2025年7月*  
</div>
<div class="update-tips">
## 💡 **版本标识规范**  
- 主版本 `V.1.0.0`：体系总架构更新  
- 次版本 `V.1.1.0`：主题内容更新  
- 修订号 `V.1.1.1`：主题内优化修复更新  
</div>

---

## 最新更新

<div className="version-card">
  <h2 id="v0.3.1">
    ## V.0.3.1
    <span className="version-date">2025年7月9日</span>
  </h2>
  <div className="version-card-line"> </div>

  <div className="log-content">
    ### 游戏内容更新
    - **升级端核心版本到1.21.4**  
      - 收纳袋正式加入  
      - 苍园觉醒更新、苍白花园  
    - 传送锚点（家）的名称支持中文  
    - 取消玩家互传的同意等待时间  
    - 使用BBR2网络拥塞控制，优化TCP链路  
    - 购买国人反作弊插件，汉化并升级了混合反作弊系统
    - 购买国人同步插件  

    ### 游戏优化更新
    - 修复了点击高级附魔相关物品导致的踢出问题  
    - 修复了新版本NPC异常消失的问题  
    - 修复了一些协议错误问题  
    - 其他细节优化...  

    ### 网站优化更新
    - 去除了日志页面的更新类型定义模块
    - 优化了日志页面的版本标识规范

  </div>
</div>

<div className="version-card">
  <h2 id="v0.3.0">
    ## V.0.3.0
    <span className="version-date">2025年7月6日</span>
  </h2>
  <div className="version-card-line"> </div>
  
  <div className="log-content">
    ### 游戏质量更新
    - **加入每日挑战任务**  
      - 新制作共60个任务  
      - 每天抽取6个随机难度任务，可以赚取灵叶和物品奖励  
      - 当日全部完成即可获得10,000灵叶  
    - **加入委托任务系统**  
      - 只是加入还没实装功能  
    - **加入NPC对话系统**  
      - 完成制作云游者艾米（看板娘NPC）的对话内容  
    - **加入限时飞行系统**  
      - 幻空翼飞行  
      - 攻击怪物、玩家和被攻击会取消飞行状态  
      - 悬浮时有降低挖掘速度惩罚（就像在水底一样）  
      - 飞行时脚底有绿色粒子效果，大会员玩家可自定义粒子  
      - 计划通过每日任务/委托任务系统添加时间获取方式  

    <div className="image-center">
      <div className="image-card">
        <div className="image-container">
          <img 
            src="/img/server-log/meirirenwutiaozhan.png" 
            alt="每日任务挑战 - 来赚点外快？" 
          />
        </div>
        <div className="image-caption">每日任务挑战 - 来赚点外快？</div>
      </div>
    </div>

    ### 游戏优化更新
    - 修改java MOTD显示的支持版本为1.18-1.21  
    - 基岩版菜单添加在线系统商店（可以不去主城买东西了awa）  
    - 修改基岩版菜单文字配色为 &9靛蓝+&1深蓝（更好看了）  
    - 修改广告牌显示的货币为灵叶  
    - 其他细节优化...  
    
    <div className="image-center">
      <div className="image-card">
        <div className="image-container">
          <img 
            src="/img/server-log/befrom.png" 
            alt="基岩版表单 - 更好的文字配色" 
          />
        </div>
        <div className="image-caption">基岩版表单 - 更好的文字配色</div>
      </div>
    </div>
    
  </div>
</div>

<div className="version-card">
  <h2 id="v0.2.12">
    ## V.0.2.12
    <span className="version-date">2025年7月1日</span>
  </h2>
  <div className="version-card-line"> </div>
  
  <div className="log-content">
    ### 游戏优化更新
    - **其他优化**
      - 取消Java菜单隐藏物品栏功能
    
  </div>
  <div className="log-content">
    ### 网站优化更新
    - 为日志页面完全重构为模块化样式，优化图片展示、文字内容展示
    - 优化文档搜索算法
  </div>
</div>

<div className="version-card">
  <h2 id="v0.2.11">
    ## V.0.2.11
    <span className="version-date">2025年6月30日</span>
  </h2>
  <div className="version-card-line"> </div>
  
  <div className="log-content">
    ### 游戏优化更新
    
    #### 核心机制优化
    - **死亡系统**
      - 为所有世界启用立即重生规则
      - 解决死亡后延迟重生导致的物品丢失问题
    
    - **耕作系统调整**
      - 新增地狱疣连锁采集功能（使用锄头触发）
      - 移除作物连续下蹲催熟功能（平衡性调整）
    
    #### 兼容性与稳定性
    - **协议支持扩展**
      - 修复高版本协议异常问题
      - 支持版本范围：
        > Java版：1.18 → 1.21.6  
        > 基岩版：1.21.50 → 1.21.92  
        - *注意：Java 1.21.6资源包加载异常暂未解决，建议更换版本*
    
    - **其他优化**
      - 修复全服数据包过载导致的踢出问题
      - 优化反作弊系统，减少误判踢出
      - 降低方块交互/数据包异常的误判率
      - 允许投影等模组的快速放置功能
  </div>
</div>

<div className="version-card">
  <h2 id="v0.2.10">
    ## V.0.2.10
    <span className="version-date">2025年6月29日</span>
  </h2>
  <div className="version-card-line"> </div>

  <div className="log-content">
    ### 游戏优化更新
    
    #### BUG修复
    - 修复菜单钟表物品吞物品BUG
      - 解决物品快捷栏第一格为空时强制替换最后一格物品的问题
    - 修复离线变量系统的经济数据异常
      - 解决 `Data too long for column 'vault'` 错误
    - 修复在线奖励数据异步操作造成的堵塞
    - 修复赞助系统支付账户问题
    
    #### 功能优化
    - **菜单系统**
      - 添加物品给予失败的文字提醒
      - 修改菜单名和Lore为静态显示
      - 优化Java菜单性能（尝试解决首次打开卡顿）
      - 删除鱼店菜单多余字符 `&`
    
    - **奖励系统**
      - 在线时间奖励提醒间隔改为30分钟（原3分钟）
    
    - **视觉效果**
      - 更新群聊个人信息卡片配色（贴合锐界幻境主题）
      - 添加开启菜单时的烟花特效
    
    <div className="image-center">
      <div className="image-card">
        <div className="image-container">
          <img 
            src="/img/server-log/gerenxinxikapian.png" 
            alt="个人信息卡片 - 全新幻境主题配色" 
          />
        </div>
        <div className="image-caption">个人信息卡片 - 全新幻境主题配色</div>
      </div>
    </div>
    
    #### 内容调整
    - **神秘道具**
      - 删除牛仔超能力道具（与骑乘功能重复）
      - 删除传送师道具（存在随机传送风险）
      - 汉化三个变形生物及道具提示文本
    
    - **群聊系统**
      - 正式推出 **星玖姬多模态助手**
        > 触发方式：含关键词"星玖"/"星玖姬"或直接@  
        > 功能：支持图像/文档识别，持续更新知识库
      - 关闭狐钰星翼助手的免费AI功能
      
    <div className="image-grid">
      <div className="image-card">
        <div className="image-container">
          <img 
            src="/img/server-log/xingjiurenshe.png" 
            alt="星玖姬多模态助手" 
          />
        </div>
        <div className="image-caption">星玖姬多模态助手</div>
      </div>
      <div className="image-card">
        <div className="image-container">
          <img 
            src="/img/server-log/xingjiu-features.png" 
            alt="多模态交互功能演示" 
          />
        </div>
        <div className="image-caption">多模态交互功能演示</div>
      </div>
    </div>

  </div>
</div>

<div className="version-card">
  <h2 id="v0.2.9">
    ## V.0.2.9
    <span className="version-date">2025年6月28日</span>
  </h2>
  
  <div className="log-content">
    ### 游戏优化更新

    - 修改基础货币为：灵叶（原“苍月币”）
      - 在梦始之空和零境中自然汇聚的灵力显化物，轻盈而蕴含微弱能量。用于基础交易和维持日常所需。
    - 修改高级货币为：星痕石（原“点券”）
      - 蕴含强大且稳定的幻境能量的稀有晶石，据说是在星玖姬诞生或重要灵脉节点处产生的伴生物。用于高级物品交易、技术升级和稀有资源获取。
  </div>
</div>

<div className="version-card">
  <h2 id="v0.2.8">
    ## V.0.2.8
    <span className="version-date">2025年6月14日</span>
  </h2>
  
  <div className="log-content">
    ### 网站功能更新
    - **文档内容完善**
      - 编写了所有空白页内容，待完善
  </div>
</div>

<div className="version-card">
  <h2 id="v0.2.7">
    ## V.0.2.7
    <span className="version-date">2025年6月13日</span>
  </h2>
  
  <div className="log-content">
    ### 网站功能更新
    - **首页布局和内容完善**
      - 美化了文档站的首页
      - 编写首页中每个模块的内容
    - **侧边栏布局和内容修改**
      - 修改侧边栏布局为更加合理的顺序
      - 根据侧边栏调整整个文档的内容
  </div>
</div>

<div className="version-card">
  <h2 id="v0.2.6">
    ## V.0.2.6
    <span className="version-date">2025年6月3日</span>
  </h2>
  
  <div className="log-content">
    ### 游戏优化更新
    - **公告功能修改**
      - 每次进入主城弹出公告修改为每次更新后只弹出一次
      - 为看板娘NPC添加对话功能，并添加查看公告的选项
    - **功能添加与修复**
      - 添加NPC对话功能，提供更沉浸的NPC体验
      - 修复梦始之空世界的季节不更替问题
      - 修改新玩家称号为：初来乍到
      - 修改称号默认前缀与后缀
    - **高级附魔玩法调整**
      - 完善保护免销毁道具的词条
      - 启用附魔失败销毁物品
      - 大幅上调资源服与生存服奖励箱中刷新高级附魔书的概率
  </div>
</div>

<div className="version-card">
  <h2 id="v0.2.5">
    ## V.0.2.5
    <span className="version-date">2025年6月2日</span>
  </h2>
  
  <div className="log-content">
    ### 游戏优化更新
    - **公告功能更新**
      - 现在每次进入主城会延迟3秒显示书本公告
    - **问题修复**
      - 修复Java菜单中部分界面无权限打开的问题
      - 修复玩家菜单紫砂功能，没有权限的问题
      - 修复MOTD显示人数异常的问题
      - 修复Java菜单首次加载的卡顿问题，修改为异步处理
      - 修复Java加入服务器出生在梦始之空时资源包不加载的问题
  </div>
</div>

<div className="version-card">
  <h2 id="v0.2.4">
    ## V.0.2.4
    <span className="version-date">2025年5月31日</span>
  </h2>
  
  <div className="log-content">
    ### 游戏优化更新
    - **架构与性能优化**
      - 更换 Waterfall 反向代理为 Velocity，提升连接安全性与抗压测能力
      - 优化计算资源利用率，降低带宽压力
      - 群组系统材质包加载机制升级：客户端已下载材质不再重复加载
      - 大幅提升服务器加入/世界跳转响应速度
    - **核心系统修复**
      - 修复签到奖励无法发放至邮箱的问题
      - 修复基岩版玩家穿过竹子/钟乳石等窄碰撞箱方块时的回弹问题
      - 修复冗余连接线路异常的问题
      - 修复星玖姬向导菜单在自动发放时吞物品的问题，升级其词条为动态显示
      - 修复签到菜单无法打开过去月份界面和敏感权限意外开放的问题
    - **跨平台兼容性**
      - 修复基岩版皮肤对Java版的可见性问题
      - 修复Java披风在基岩版的显示异常
      - 基岩版菜单功能修复，Java菜单头像显示修复
      - 统一基岩版世界传送界面的颜色
    - **管理后台升级**
      - 群组服务端部署数据可视化管理后台
    - **消息系统优化**
      - 优化玩家加入/退出及跨服跳转的消息提示
      - 称号系统颜色编码支持原版格式化代码，取消原16进制编码方案并发放补偿
  </div>
</div>

<div className="version-card">
  <h2 id="v0.2.3">
    ## V.0.2.3
    <span className="version-date">2025年5月21日</span>
  </h2>
  
  <div className="log-content">
    ### 游戏优化更新
    - **消息优化**
      - 汉化部分插件英文提示内容，提升中文交互体验
      - 删除多余的加入/退出消息提示，优化显示逻辑
      - 移除资源服/生存服的签到插件，避免奖励发放异常问题
      - 优化全服插件消息提示内容
      - 更新部分插件至最新版本并修复已知问题
    - **签到系统调整**
      - 为**会员权限组**玩家新增功能：
        - 登录主城服时自动完成签到流程
        - 按不同会员等级差异化配置签到奖励
      - 重构奖励发放机制：
        - 所有签到奖励改为通过邮件系统发放
        - 每周会员礼包通过邮件发放
    - **插件优化与调整**
      - 重新添加回CMI基础插件，优化功能模块并关闭冗余功能，修复CMI异常报错
      - 修复「更多的鱼」钓鱼系统功能异常问题
      - 移除全息显示生物血量功能（已由BossBar血量显示替代）
      - 删除领取在线时间奖励时的全服广播功能
      - 为Java的MOTD版本号后添加 测试版Beta 字样
    - **反作弊系统改进**
      - 降低反作弊系统对次要行为检测的灵敏度，改善鞘翅飞行/加速时的异常拉回问题
    - **领地系统配置更新**
      - 调整梦始之空领地系统参数：
        - 各权限组领地购买价格上调 **50%**（默认权限组 `5币/格` → `7.5币/格`）
        - 提高取消领地时退回金额的比例
        - 修改领地最大范围限制：
          - 默认权限组 `XZ方向9999格` → `4999格`
          - 会员权限组 `9999格` → `5999格`
        - 调整领地创建数量上限：
          - 默认权限组 `4个` → `5个`
          - 会员权限组 `6个` → `9个`
          - 大会员权限组 `9个` → `16个`
        - 自动清除连续 **6个月未上线** 玩家的领地数据（长期未上线玩家及时登录刷新）
        - 新玩家第一次放置箱子时不再自动创建5*5的领地
    
    <div className="image-center">
      <div className="image-card">
        <div className="image-container">
          <img 
            src="/img/server-log/singin_mail.png" 
            alt="签到奖励通过邮件发放" 
          />
        </div>
        <div className="image-caption">新的邮件系统对基岩版更加友好</div>
      </div>
    </div>
  </div>
</div>

<div className="version-card">
  <h2 id="v0.2.2">
    ## V.0.2.2
    <span className="version-date">2025年5月20日</span>
  </h2>
  
  <div className="log-content">
    ### 游戏优化更新
    - **连接与显示优化**
      - 修改Java版MOTD显示内容，域名`.cn`改为`.top`
      - 动态显示最大在线人数（公式：`当前在线+1`）
      - 虚拟玩家显示机制（始终显示：`实际人数+1`）
      - 新增版本号显示（格式：`vX.X.X`）
      - 增强基岩版连接协议稳定性
    - **核心机制修复**
      - 修复资源服地狱/末地死亡后无法重生至主世界
      - 彻底解决原版装备防御值/攻击伤害异常问题
      - 修正弓箭药水伤害叠加与箭矢加速伤害计算
      - 新合成装备全面适配原版数值体系
    - **系统重构**
      - 主城邮递员更换新的邮件系统
      - 提前为签到/礼包发放预埋邮件接口
    - **交互优化**
      - 修复在线时间奖励领取失败及消息失败的问题
      - 取消Java版菜单隐藏玩家物品栏的操作避免可能的吞物品问题
    
    <div className="image-center">
      <div className="image-card">
        <div className="image-container">
          <img 
            src="/img/server-log/NewMOTD.png" 
            alt="Java版的新MOTD" 
          />
        </div>
        <div className="image-caption">Java版的新MOTD</div>
      </div>
    </div>
  </div>
</div>

<div className="version-card">
  <h2 id="v0.2.1">
    ## V.0.2.1
    <span className="version-date">2025年5月14日</span>
  </h2>
  
  <div className="log-content">
    ### 游戏优化更新
    - **跨端材质升级**
      - 为基岩版与Java版同步添加渊劫烬境世界特殊物品/装备的汉化文本与材质适配
    - **插件变更**
      - 移除了「更好的睡觉跳过夜晚」插件但依旧保留了跳过夜晚功能，同步修复因插件导致的白昼/夜晚时长异常问题
    - **核心功能修复**
      - 修复基岩版表单菜单与Java版菜单无法打开的致命性错误
      - 修复在线时间统计模块的数据记录与界面显示异常
      - 解决生存服、资源服中特殊武器装备无法正常使用的兼容性问题
    - **资源加载稳定性**
      - 修复材质包下载失败或客户端异常报错问题
  </div>
</div>

<div className="version-card">
  <h2 id="v0.2.0">
    ## V.0.2.0
    <span className="version-date">2025年5月13日</span>
  </h2>
  
  <div className="log-content">
    ### 游戏功能更新
    - **主城与NPC优化**
      - 取消零境家园的菜单入口，改为主城NPC界面进入
      - 新增主城向导及快捷传送NPC，优化玩家导航体验
      - 完善高级附魔系统，新增炼金功能并添加附魔出售NPC
      - 在主城中添加部分老玩家形象作为NPC路人
      - 提前部署未来确认加入的功能玩法NPC至服务器
      - 编写全新Java版菜单系统（部分页面存在割裂问题将在后续更新修复）
      - 为基岩版菜单重新添加在线回收功能
    - **游戏机制调整**
      - 降低反作弊系统的移动监测强度，缓解玩家移动异常拉回现象
    - **界面与交互改进**
      - 优化星玖姬向导功能及菜单物品布局
      - 重构基岩版菜单内容并修复显示问题
    - **NPC稳定性提升**
      - 修复系统商人NPC偶尔消失的问题
      - 优化主城所有NPC外观（更新皮肤并改进动作表现）
    - **服务器世界重命名**
      - 主城服：空之城 → 锐界幻境
      - 生存服：
          - 梦始地狱 → 烬渊
          - 梦始末地 → 虚湮
      - 资源服：
          - 锐界幻境 → 残墟神域
          - 锐界地狱 → 渊劫烬境
          - 锐界末地 → 骸烬终域
          - 冬日世界 → 凛骸冻渊
  </div>
</div>

<div className="version-card">
  <h2 id="v0.1.7">
    ## V.0.1.7
    <span className="version-date">2025年5月7日</span>
  </h2>
  
  <div className="log-content">
    ### 网站质量更新
    - **完善更多食物**
      - 更多食物页面的食物详细属性内容完成
    - **编写世界介绍**
      - 开始编写世界介绍页面，并完成部分基础内容
  </div>
</div>

<div className="version-card">
  <h2 id="v0.1.6">
    ## V.0.1.6
    <span className="version-date">2025年4月29日</span>
  </h2>
  
  <div className="log-content">
    ### 网站质量更新
    - **新增入服教程内容**
      - 编写了新手教程列表中客户端安装、入服方式、游玩教程的页面
  </div>
</div>

<div className="version-card">
  <h2 id="v0.1.5">
    ## V.0.1.5
    <span className="version-date">2025年4月27日</span>
  </h2>
  
  <div className="log-content">
    ### 游戏优化更新
    - **生物交互优化**
      - 给幼年动物喂食毒土豆有几率使其中毒数秒，因此死亡的幼崽无法成长为成年个体
      - 允许用剪刀剪鸡以获得羽毛，但这会伤害鸡
      - 当玩家/实体附近被泼洒水瓶时，会为其灭火
      - 按下跳跃键时，船会像马一样跳跃
      - 使用 `Shift + 空手右键` 可抚摸狗和猫，恢复 1-3 颗心
    - **物品机制调整**
      - 物品现在可通过熔岩桶右键点击永久销毁（潜影盒与防火物品除外），且需熔岩桶在玩家物品栏中生效
      - 关闭讲台时，讲台书页将自动重置为第 0 页
      - 指南针可在下界和末地使用：主手持有时指向进入的传送门，右键点击床可绑定其位置
      - 铁块右键损坏的铁砧可以修复它
    - **系统功能新增**
      - 新增生物血量全息显示功能
      - 资源服添加怪物等级系统，根据玩家战力动态生成对应等级怪物
      - 优化睡觉机制，更高效跳过夜晚
      - 修改了Java登录服的侧边栏文字，不再显示错误变量
    - **问题修复**
      - 修复了若干已知问题

    ### 网站优化更新
    - **自动构建优化**
      - 修复了拉取构建文档网站时CPU满载内存溢出的问题
      - 优化了网站的启动脚本
    - **安全性升级**
      - miragedge.top域名下的所有网页对接**长亭雷池**防火墙
      - 对本文档使用内容加密
  </div>
</div>

<div className="version-card">
  <h2 id="v0.1.1">
    ## V.0.1.1
    <span className="version-date">2025年4月22日</span>
  </h2>
  
  <div className="log-content">
    ### 网站质量更新
    - **界面优化**
      - 完善并美化了文档前言页面
      - 完善并美化了玩家审核页面
      - 创建了新的"管理团队"页面
      - 美化了更多食物拓展页面的布局
      - 完善并美化了世界介绍的4个世界页面
      - 重构文档侧边栏视觉样式，变完美了嘤嘤嘤
      - 删除了页脚的快捷跳转链接
  </div>
</div>

<div className="version-card">
  <h2 id="v0.1.0">
    ## V.0.1.0
    <span className="version-date">2025年4月20日</span>
  </h2>
  
  <div className="log-content">
    ### 游戏功能更新
    - **食物拓展**
      - 完成更多食物拓展贴图制作
      - 实现基岩版兼容更多食物拓展材质包

    <div className="image-center">
      <div className="image-card">
        <div className="image-container">
          <img 
            src="/img/server-log/food-ia.png" 
            alt="更多食物兼容" 
          />
        </div>
        <div className="image-caption">基岩版和Java版的IA材质界面</div>
      </div>
    </div>

    ### 网站体验更新
    - **界面优化**
      - 重构文档侧边栏视觉样式
      - 新增分类图标与动态交互效果
      - 优化了日志文档的布局
    - **路径规范**
      - 统一文档链接为英文路径格式
      - 完善多语言目录映射关系
    - **内容扩展**
      - 新增游戏食物系统文档: [**食物拓展指南**](https://miragedge.top/docs/gameplay/food/)
  </div>
</div>

<div className="version-card">
  <h2 id="v0.0.4">
    ## V.0.0.4
    <span className="version-date">2025年4月20日</span>
  </h2>
  
  <div className="log-content">
    ### 游戏功能更新
    - **核心系统优化**
      - 移除基础插件 `CMI` 及其相关依赖
      - 新增角色交互系统：
        - 物品方块帽子穿戴功能
        - 动作指令：坐下(`/sit`)、趴下(`/lay`)、骑乘交互
      - 修复聊天颜色插件 `ezcolors` 的兼容性问题
      - 重构反作弊系统：
        - 采用混合反作弊架构（客户端验证+服务端行为分析）
      - 经济系统调整：
        - 移除除主城服外所有子服的系统商店与回收功能
      - 玩家信息展示优化：
        - 实现全群组TAB列表同步
        - 修复在线人数统计异常问题
      - 社交功能修复：
        - 恢复QQ群-服务器消息互通功能

    <div className="image-center">
      <div className="image-card">
        <div className="image-container">
          <img 
            src="/img/server-log/lay-sit.png" 
            alt="角色交互演示" 
          />
        </div>
        <div className="image-caption">新增角色动作与交互功能展示</div>
      </div>
    </div>
  </div>
</div>

<div className="version-card">
  <h2 id="v0.0.3">
    ## V.0.0.3
    <span className="version-date">2025年4月19日</span>
  </h2>
  
  <div className="log-content">
    ### 游戏架构优化
    - **服务端重构**
      - 采用模块化插件架构
      - 优化群组服务器通信协议
      - 修复已知的跨服数据传输问题
  </div>
</div>

<div className="version-card">
  <h2 id="v0.0.2">
    ## V.0.0.2
    <span className="version-date">2025年4月18日</span>
  </h2>
  
  <div className="log-content">
    ### 网站体验更新
    - **界面调整**
      - 移除主页冗余视觉元素
      - 优化页脚布局：
        - 新增 [**QQ交流群**](https://qm.qq.com/) 快速入口
        - 添加 [**B站官方账号**](https://bilibili.com/) 跳转链接
      - 合规性调整：
        - 底部添加网站备案信息（苏ICP备2024133820号-1）
  </div>
</div>

<div className="version-card">
  <h2 id="v0.0.1">
    ## V.0.0.1
    <span className="version-date">2025年4月17日</span>
  </h2>
  
  <div className="log-content">
    ### 网站基础更新
    - **系统搭建**
      - 正式上线文档中心
      - 实现基础功能：
        - 多级目录导航
        - 响应式布局适配
        - 夜间模式支持
  </div>
</div>

<div className="footer-note">
  建站前更早的更新日志请加QQ频道查看<br/>
  点击链接加入腾讯频道【锐界幻境 ★互通服务器】<br/>
  <a href="https://pd.qq.com/s/9kqtx5dhw">https://pd.qq.com/s/9kqtx5dhw</a>
</div>