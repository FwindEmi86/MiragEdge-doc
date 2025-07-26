
数据库防死锁队列使用方法

// 保存玩家数据
databaseManager.savePlayerDataAsync(playerData);

// 加载玩家数据
databaseManager.loadPlayerDataAsync(player.getUniqueId(), loadedData -> {
    // 在主线程处理加载的数据
    player.getInventory().clear();
    for (String itemId : loadedData.getUnlockedItems()) {
        // 添加物品到玩家背包
    }
});

// 检查物品解锁状态
databaseManager.isItemUnlockedAsync(player.getUniqueId(), "diamond_sword", isUnlocked -> {
    if (isUnlocked) {
        player.sendMessage("钻石剑已解锁！");
    } else {
        player.sendMessage("你尚未解锁钻石剑");
    }
});