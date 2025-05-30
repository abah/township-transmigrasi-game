// Game State Management - Township Style
class GameState {
    constructor() {
        this.currentLevel = 1;
        this.population = 50;
        this.coins = 1000;
        this.experience = 0;
        this.level = 1;
        this.energy = 100;
        this.gameTimer = null;
        this.isPaused = false;
        this.buildings = [];
        this.farms = [];
        this.factories = [];
        this.decorations = [];
        this.roads = [];
        this.crops = [];
        this.inventory = {
            wheat: 10,
            corn: 5,
            carrot: 3,
            bread: 2,
            feed: 5,
            milk: 0,
            eggs: 0,
            cotton: 0,
            sugar: 0
        };
        this.gridSize = 20;
        this.grid = Array(this.gridSize).fill().map(() => Array(this.gridSize).fill(null));
        this.selectedTool = null;
        this.townshipData = {
            houses: 5,
            factories: 1,
            farms: 3,
            population: 50,
            happiness: 80
        };
        this.achievements = [];
        this.dailyTasks = [];
        this.nextCropId = 1;
        this.nextBuildingId = 1;
    }

    reset() {
        this.population = 50;
        this.coins = 1000;
        this.experience = 0;
        this.energy = 100;
        this.isPaused = false;
        this.buildings = [];
        this.farms = [];
        this.factories = [];
        this.crops = [];
        if (this.gameTimer) {
            clearInterval(this.gameTimer);
            this.gameTimer = null;
        }
    }

    addExperience(amount) {
        this.experience += amount;
        if (this.experience >= this.level * 100) {
            this.levelUp();
        }
    }

    levelUp() {
        this.level++;
        this.energy = 100;
        this.coins += this.level * 50;
        showNotification(`🎉 Level Up! Sekarang Level ${this.level}`, 'success');
        createCelebrationEffect();
    }

    saveProgress() {
        const saveData = {
            level: this.level,
            coins: this.coins,
            experience: this.experience,
            population: this.population,
            inventory: this.inventory,
            buildings: this.buildings,
            farms: this.farms,
            factories: this.factories,
            townshipData: this.townshipData,
            achievements: this.achievements,
            lastSaved: Date.now()
        };
        localStorage.setItem('townshipGameProgress', JSON.stringify(saveData));
    }

    loadProgress() {
        const saved = localStorage.getItem('townshipGameProgress');
        if (saved) {
            const data = JSON.parse(saved);
            this.level = data.level || 1;
            this.coins = data.coins || 1000;
            this.experience = data.experience || 0;
            this.population = data.population || 50;
            this.inventory = { ...this.inventory, ...data.inventory };
            this.buildings = data.buildings || [];
            this.farms = data.farms || [];
            this.factories = data.factories || [];
            this.townshipData = { ...this.townshipData, ...data.townshipData };
            this.achievements = data.achievements || [];
        }
    }
}

// Building and Item Definitions - Township Style
const BUILDINGS = {
    house: {
        name: 'Rumah',
        cost: 200,
        population: 4,
        happiness: 10,
        icon: '🏠',
        size: { width: 2, height: 2 },
        buildTime: 60000, // 1 minute
        unlockLevel: 1
    },
    apartment: {
        name: 'Apartemen',
        cost: 800,
        population: 12,
        happiness: 15,
        icon: '🏢',
        size: { width: 3, height: 3 },
        buildTime: 300000, // 5 minutes
        unlockLevel: 5
    },
    farm: {
        name: 'Ladang',
        cost: 100,
        icon: '🌾',
        size: { width: 2, height: 2 },
        buildTime: 30000, // 30 seconds
        unlockLevel: 1
    },
    bakery: {
        name: 'Toko Roti',
        cost: 500,
        icon: '🥖',
        size: { width: 2, height: 2 },
        buildTime: 120000, // 2 minutes
        unlockLevel: 3,
        produces: ['bread']
    },
    dairy: {
        name: 'Pabrik Susu',
        cost: 800,
        icon: '🥛',
        size: { width: 3, height: 2 },
        buildTime: 180000, // 3 minutes
        unlockLevel: 4,
        produces: ['milk', 'cheese']
    },
    market: {
        name: 'Pasar',
        cost: 1200,
        icon: '🏪',
        size: { width: 3, height: 3 },
        buildTime: 240000, // 4 minutes
        unlockLevel: 6
    },
    decoration: {
        name: 'Dekorasi',
        cost: 50,
        happiness: 5,
        icon: '🌳',
        size: { width: 1, height: 1 },
        buildTime: 10000, // 10 seconds
        unlockLevel: 1
    }
};

const CROPS = {
    wheat: {
        name: 'Gandum',
        icon: '🌾',
        growTime: 120000, // 2 minutes
        sellPrice: 5,
        experience: 2,
        unlockLevel: 1
    },
    corn: {
        name: 'Jagung',
        icon: '🌽',
        growTime: 180000, // 3 minutes
        sellPrice: 8,
        experience: 3,
        unlockLevel: 2
    },
    carrot: {
        name: 'Wortel',
        icon: '🥕',
        growTime: 240000, // 4 minutes
        sellPrice: 12,
        experience: 4,
        unlockLevel: 3
    },
    cotton: {
        name: 'Kapas',
        icon: '☁️',
        growTime: 600000, // 10 minutes
        sellPrice: 20,
        experience: 8,
        unlockLevel: 4
    },
    sugar: {
        name: 'Tebu',
        icon: '🎋',
        growTime: 900000, // 15 minutes
        sellPrice: 30,
        experience: 12,
        unlockLevel: 5
    }
};

const PRODUCTS = {
    bread: {
        name: 'Roti',
        icon: '🍞',
        ingredients: { wheat: 2 },
        productionTime: 300000, // 5 minutes
        sellPrice: 15,
        experience: 5
    },
    milk: {
        name: 'Susu',
        icon: '🥛',
        ingredients: { feed: 1 },
        productionTime: 240000, // 4 minutes
        sellPrice: 12,
        experience: 4
    },
    cheese: {
        name: 'Keju',
        icon: '🧀',
        ingredients: { milk: 2 },
        productionTime: 480000, // 8 minutes
        sellPrice: 25,
        experience: 8
    },
    feed: {
        name: 'Pakan',
        icon: '🌾',
        ingredients: { wheat: 1, corn: 1 },
        productionTime: 180000, // 3 minutes
        sellPrice: 8,
        experience: 3
    }
};

// Daily Tasks
const DAILY_TASKS = [
    { id: 'harvest_crops', description: 'Panen 5 tanaman', target: 5, reward: { coins: 100, experience: 50 } },
    { id: 'build_house', description: 'Bangun 1 rumah', target: 1, reward: { coins: 200, experience: 100 } },
    { id: 'produce_bread', description: 'Produksi 3 roti', target: 3, reward: { coins: 150, experience: 75 } },
    { id: 'earn_coins', description: 'Dapatkan 500 koin', target: 500, reward: { experience: 200 } },
    { id: 'reach_population', description: 'Capai populasi 100', target: 100, reward: { coins: 500, experience: 300 } }
];

// Global game state
const gameState = new GameState();

// Screen Management Functions
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

function startGame() {
    gameState.loadProgress();
    updateGameUI();
    initializeTownshipGame();
    showScreen('gameScreen');
}

function showInstructions() {
    showScreen('instructionsScreen');
}

function showAbout() {
    showScreen('aboutScreen');
}

function backToMenu() {
    showScreen('mainMenu');
}

// Township Game Initialization
function initializeTownshipGame() {
    gameState.reset();
    generateDailyTasks();
    startGameTimer();
    setupToolbar();
    renderTownship();
    updateAllUI();
}

function generateDailyTasks() {
    gameState.dailyTasks = DAILY_TASKS.slice(0, 3).map(task => ({
        ...task,
        progress: 0,
        completed: false
    }));
}

function setupToolbar() {
    const toolbar = document.getElementById('toolbar');
    if (!toolbar) return;

    toolbar.innerHTML = `
        <div class="tool-section">
            <h4>🏗️ Bangunan</h4>
            <div class="tool-buttons">
                ${Object.entries(BUILDINGS).map(([key, building]) => `
                    <button class="tool-btn ${gameState.level < building.unlockLevel ? 'locked' : ''}" 
                            data-tool="${key}" data-type="building"
                            ${gameState.level < building.unlockLevel ? 'disabled' : ''}>
                        <div class="tool-icon">${building.icon}</div>
                        <div class="tool-name">${building.name}</div>
                        <div class="tool-cost">💰${building.cost}</div>
                        ${building.unlockLevel > gameState.level ? `<div class="unlock-level">Lvl ${building.unlockLevel}</div>` : ''}
                    </button>
                `).join('')}
            </div>
        </div>
        
        <div class="tool-section">
            <h4>🌱 Tanaman</h4>
            <div class="tool-buttons">
                ${Object.entries(CROPS).map(([key, crop]) => `
                    <button class="tool-btn ${gameState.level < crop.unlockLevel ? 'locked' : ''}" 
                            data-tool="${key}" data-type="crop"
                            ${gameState.level < crop.unlockLevel ? 'disabled' : ''}>
                        <div class="tool-icon">${crop.icon}</div>
                        <div class="tool-name">${crop.name}</div>
                        <div class="tool-cost">⏱️${Math.floor(crop.growTime/60000)}m</div>
                        ${crop.unlockLevel > gameState.level ? `<div class="unlock-level">Lvl ${crop.unlockLevel}</div>` : ''}
                    </button>
                `).join('')}
            </div>
        </div>
        
        <div class="tool-section">
            <h4>🛠️ Aksi</h4>
            <div class="tool-buttons">
                <button class="tool-btn" data-tool="remove" data-type="action">
                    <div class="tool-icon">🗑️</div>
                    <div class="tool-name">Hapus</div>
                </button>
                <button class="tool-btn" data-tool="move" data-type="action">
                    <div class="tool-icon">📦</div>
                    <div class="tool-name">Pindah</div>
                </button>
            </div>
        </div>
    `;

    // Add tool selection event listeners
    toolbar.addEventListener('click', (e) => {
        const toolBtn = e.target.closest('.tool-btn');
        if (toolBtn && !toolBtn.disabled) {
            selectTool(toolBtn.dataset.tool, toolBtn.dataset.type);
        }
    });
}

function selectTool(tool, type) {
    // Remove previous selection
    document.querySelectorAll('.tool-btn').forEach(btn => btn.classList.remove('selected'));
    
    // Select new tool
    const selectedBtn = document.querySelector(`[data-tool="${tool}"]`);
    if (selectedBtn) {
        selectedBtn.classList.add('selected');
        gameState.selectedTool = { tool, type };
        
        // Update cursor
        const gameArea = document.getElementById('townshipGrid');
        gameArea.className = `township-grid cursor-${type}`;
        
        showNotification(`${type === 'building' ? 'Bangunan' : type === 'crop' ? 'Tanaman' : 'Aksi'} ${BUILDINGS[tool]?.name || CROPS[tool]?.name || tool} dipilih`, 'info', 2000);
    }
}

// Township Rendering
function renderTownship() {
    const grid = document.getElementById('townshipGrid');
    if (!grid) return;

    grid.innerHTML = '';
    grid.style.gridTemplateColumns = `repeat(${gameState.gridSize}, 40px)`;
    grid.style.gridTemplateRows = `repeat(${gameState.gridSize}, 40px)`;

    // Create grid cells
    for (let y = 0; y < gameState.gridSize; y++) {
        for (let x = 0; x < gameState.gridSize; x++) {
            const cell = document.createElement('div');
            cell.className = 'grid-cell';
            cell.dataset.x = x;
            cell.dataset.y = y;
            cell.addEventListener('click', () => handleCellClick(x, y));
            
            // Add content if exists
            const content = gameState.grid[y][x];
            if (content) {
                cell.appendChild(createGameElement(content));
            }
            
            grid.appendChild(cell);
        }
    }

    // Render existing buildings and farms
    gameState.buildings.forEach(building => {
        renderBuildingOnGrid(building);
    });

    gameState.farms.forEach(farm => {
        renderFarmOnGrid(farm);
    });

    gameState.crops.forEach(crop => {
        renderCropOnGrid(crop);
    });
}

function createGameElement(item) {
    const element = document.createElement('div');
    element.className = `game-element ${item.type}`;
    element.innerHTML = `
        <div class="element-icon">${getElementIcon(item)}</div>
        ${item.progress !== undefined ? `<div class="progress-bar">
            <div class="progress-fill" style="width: ${item.progress}%"></div>
        </div>` : ''}
        ${item.status ? `<div class="element-status">${item.status}</div>` : ''}
    `;
    
    if (item.type === 'crop' && item.ready) {
        element.classList.add('ready-to-harvest');
        element.addEventListener('click', () => harvestCrop(item));
    }
    
    if (item.type === 'building' && item.produces) {
        element.addEventListener('click', () => openProductionMenu(item));
    }
    
    return element;
}

function getElementIcon(item) {
    if (item.type === 'building') {
        return BUILDINGS[item.buildingType]?.icon || '🏢';
    } else if (item.type === 'crop') {
        return CROPS[item.cropType]?.icon || '🌱';
    } else if (item.type === 'decoration') {
        return '🌳';
    }
    return '❓';
}

// Cell Click Handler
function handleCellClick(x, y) {
    if (!gameState.selectedTool) {
        // Show info about existing item
        const item = gameState.grid[y][x];
        if (item) {
            showItemInfo(item, x, y);
        }
        return;
    }

    const { tool, type } = gameState.selectedTool;

    if (type === 'building') {
        placeBuildingAt(tool, x, y);
    } else if (type === 'crop') {
        plantCropAt(tool, x, y);
    } else if (type === 'action') {
        if (tool === 'remove') {
            removeItemAt(x, y);
        } else if (tool === 'move') {
            moveItemAt(x, y);
        }
    }
}

// Building Placement
function placeBuildingAt(buildingType, x, y) {
    const building = BUILDINGS[buildingType];
    if (!building) return;

    // Check if player can afford
    if (gameState.coins < building.cost) {
        showNotification('Koin tidak cukup!', 'error');
        return;
    }

    // Check if area is clear
    if (!isAreaClear(x, y, building.size.width, building.size.height)) {
        showNotification('Area tidak kosong!', 'error');
        return;
    }

    // Deduct cost
    gameState.coins -= building.cost;

    // Create building
    const newBuilding = {
        id: gameState.nextBuildingId++,
        type: 'building',
        buildingType: buildingType,
        x: x,
        y: y,
        width: building.size.width,
        height: building.size.height,
        buildTime: building.buildTime,
        built: false,
        buildStartTime: Date.now(),
        progress: 0
    };

    // Place building on grid
    placeItemOnGrid(newBuilding, x, y, building.size.width, building.size.height);
    gameState.buildings.push(newBuilding);

    // Start construction timer
    startBuildingConstruction(newBuilding);

    gameState.addExperience(10);
    updateAllUI();
    gameState.saveProgress();

    showNotification(`${building.name} sedang dibangun!`, 'success');
}

// Crop Planting
function plantCropAt(cropType, x, y) {
    const crop = CROPS[cropType];
    if (!crop) return;

    // Check if cell is farm
    const cell = gameState.grid[y][x];
    if (!cell || cell.type !== 'building' || cell.buildingType !== 'farm') {
        showNotification('Hanya bisa menanam di ladang!', 'error');
        return;
    }

    // Check if farm is empty
    if (cell.crop) {
        showNotification('Ladang sudah ada tanaman!', 'error');
        return;
    }

    // Plant crop
    const newCrop = {
        id: gameState.nextCropId++,
        type: 'crop',
        cropType: cropType,
        x: x,
        y: y,
        plantTime: Date.now(),
        growTime: crop.growTime,
        ready: false,
        progress: 0
    };

    cell.crop = newCrop;
    gameState.crops.push(newCrop);

    // Start growing timer
    startCropGrowth(newCrop);

    gameState.addExperience(2);
    updateAllUI();
    renderTownship();
    gameState.saveProgress();

    showNotification(`${crop.name} ditanam!`, 'success');
}

// Utility Functions
function isAreaClear(x, y, width, height) {
    for (let dy = 0; dy < height; dy++) {
        for (let dx = 0; dx < width; dx++) {
            if (x + dx >= gameState.gridSize || y + dy >= gameState.gridSize) {
                return false;
            }
            if (gameState.grid[y + dy][x + dx] !== null) {
                return false;
            }
        }
    }
    return true;
}

function placeItemOnGrid(item, x, y, width, height) {
    for (let dy = 0; dy < height; dy++) {
        for (let dx = 0; dx < width; dx++) {
            gameState.grid[y + dy][x + dx] = item;
        }
    }
}

function removeItemAt(x, y) {
    const item = gameState.grid[y][x];
    if (!item) {
        showNotification('Tidak ada yang bisa dihapus!', 'warning');
        return;
    }

    // Remove from grid
    if (item.width && item.height) {
        for (let dy = 0; dy < item.height; dy++) {
            for (let dx = 0; dx < item.width; dx++) {
                gameState.grid[y + dy][x + dx] = null;
            }
        }
    } else {
        gameState.grid[y][x] = null;
    }

    // Remove from arrays
    if (item.type === 'building') {
        gameState.buildings = gameState.buildings.filter(b => b.id !== item.id);
    } else if (item.type === 'crop') {
        gameState.crops = gameState.crops.filter(c => c.id !== item.id);
    }

    // Refund some coins
    const refund = Math.floor((BUILDINGS[item.buildingType]?.cost || 0) * 0.5);
    if (refund > 0) {
        gameState.coins += refund;
        showNotification(`Dihapus! Refund: ${refund} koin`, 'info');
    } else {
        showNotification('Dihapus!', 'info');
    }

    updateAllUI();
    renderTownship();
    gameState.saveProgress();
}

// Construction and Growth Timers
function startBuildingConstruction(building) {
    const updateProgress = () => {
        const elapsed = Date.now() - building.buildStartTime;
        building.progress = Math.min(100, (elapsed / building.buildTime) * 100);

        if (building.progress >= 100) {
            building.built = true;
            building.progress = 100;

            // Add to population if it's a house
            const buildingConfig = BUILDINGS[building.buildingType];
            if (buildingConfig.population) {
                gameState.population += buildingConfig.population;
                gameState.townshipData.population = gameState.population;
            }

            showNotification(`${buildingConfig.name} selesai dibangun!`, 'success');
            gameState.addExperience(20);
            updateAllUI();
            renderTownship();
            return;
        }

        renderTownship();
        setTimeout(updateProgress, 1000);
    };

    setTimeout(updateProgress, 1000);
}

function startCropGrowth(crop) {
    const updateGrowth = () => {
        const elapsed = Date.now() - crop.plantTime;
        crop.progress = Math.min(100, (elapsed / crop.growTime) * 100);

        if (crop.progress >= 100) {
            crop.ready = true;
            crop.progress = 100;

            showNotification(`${CROPS[crop.cropType].name} siap dipanen! 🌾`, 'success');
            
            // Add glow effect
            renderTownship();
            return;
        }

        renderTownship();
        setTimeout(updateGrowth, 1000);
    };

    setTimeout(updateGrowth, 1000);
}

// Harvesting
function harvestCrop(crop) {
    const cropConfig = CROPS[crop.cropType];
    
    // Add to inventory
    gameState.inventory[crop.cropType] = (gameState.inventory[crop.cropType] || 0) + 1;
    
    // Add coins and experience
    gameState.coins += cropConfig.sellPrice;
    gameState.addExperience(cropConfig.experience);

    // Remove crop from farm
    const farmCell = gameState.grid[crop.y][crop.x];
    if (farmCell) {
        farmCell.crop = null;
    }

    // Remove from crops array
    gameState.crops = gameState.crops.filter(c => c.id !== crop.id);

    // Update daily task progress
    updateDailyTaskProgress('harvest_crops', 1);

    showNotification(`Dipanen! +${cropConfig.sellPrice} koin, +${cropConfig.experience} XP`, 'success');
    
    // Haptic feedback
    if (navigator.vibrate) {
        navigator.vibrate([50, 25, 50]);
    }

    updateAllUI();
    renderTownship();
    gameState.saveProgress();
}

// Daily Tasks
function updateDailyTaskProgress(taskId, amount) {
    const task = gameState.dailyTasks.find(t => t.id === taskId);
    if (task && !task.completed) {
        task.progress += amount;
        if (task.progress >= task.target) {
            task.completed = true;
            
            // Give rewards
            if (task.reward.coins) {
                gameState.coins += task.reward.coins;
            }
            if (task.reward.experience) {
                gameState.addExperience(task.reward.experience);
            }

            showNotification(`Tugas selesai! ${task.description}`, 'success');
            createCelebrationEffect();
        }
        updateDailyTasksUI();
    }
}

// UI Updates
function updateAllUI() {
    updateGameStats();
    updateInventoryUI();
    updateDailyTasksUI();
    updateToolbar();
}

function updateGameStats() {
    document.getElementById('playerLevel').textContent = gameState.level;
    document.getElementById('playerCoins').textContent = gameState.coins;
    document.getElementById('playerExperience').textContent = `${gameState.experience}/${gameState.level * 100}`;
    document.getElementById('playerPopulation').textContent = gameState.population;
    document.getElementById('playerEnergy').textContent = gameState.energy;
    
    // Update experience progress bar
    const expBar = document.getElementById('experienceBar');
    if (expBar) {
        const percentage = (gameState.experience / (gameState.level * 100)) * 100;
        expBar.style.width = percentage + '%';
    }
}

function updateInventoryUI() {
    const inventoryGrid = document.getElementById('inventoryGrid');
    if (!inventoryGrid) return;

    inventoryGrid.innerHTML = '';
    
    Object.entries(gameState.inventory).forEach(([item, quantity]) => {
        if (quantity > 0) {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'inventory-item';
            itemDiv.innerHTML = `
                <div class="item-icon">${getInventoryIcon(item)}</div>
                <div class="item-quantity">${quantity}</div>
                <div class="item-name">${getInventoryName(item)}</div>
            `;
            inventoryGrid.appendChild(itemDiv);
        }
    });
}

function getInventoryIcon(item) {
    const icons = {
        wheat: '🌾', corn: '🌽', carrot: '🥕', cotton: '☁️', sugar: '🎋',
        bread: '🍞', milk: '🥛', cheese: '🧀', feed: '🌾', eggs: '🥚'
    };
    return icons[item] || '📦';
}

function getInventoryName(item) {
    const names = {
        wheat: 'Gandum', corn: 'Jagung', carrot: 'Wortel', cotton: 'Kapas', sugar: 'Tebu',
        bread: 'Roti', milk: 'Susu', cheese: 'Keju', feed: 'Pakan', eggs: 'Telur'
    };
    return names[item] || item;
}

function updateDailyTasksUI() {
    const tasksList = document.getElementById('dailyTasksList');
    if (!tasksList) return;

    tasksList.innerHTML = '';
    
    gameState.dailyTasks.forEach(task => {
        const taskDiv = document.createElement('div');
        taskDiv.className = `daily-task ${task.completed ? 'completed' : ''}`;
        taskDiv.innerHTML = `
            <div class="task-description">${task.description}</div>
            <div class="task-progress">${task.progress}/${task.target}</div>
            <div class="task-reward">
                ${task.reward.coins ? `💰${task.reward.coins}` : ''} 
                ${task.reward.experience ? `⭐${task.reward.experience}` : ''}
            </div>
            ${task.completed ? '<div class="task-check">✅</div>' : ''}
        `;
        tasksList.appendChild(taskDiv);
    });
}

// Game Timer
function startGameTimer() {
    if (gameState.gameTimer) {
        clearInterval(gameState.gameTimer);
    }
    
    gameState.gameTimer = setInterval(() => {
        if (!gameState.isPaused) {
            // Auto-save every 30 seconds
            if (Date.now() % 30000 < 1000) {
                gameState.saveProgress();
            }
            
            // Update energy
            if (gameState.energy < 100) {
                gameState.energy = Math.min(100, gameState.energy + 1);
                updateGameStats();
            }
        }
    }, 60000); // Update every minute
}

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', function() {
    gameState.loadProgress();
    console.log('Township-style Transmigrasi game loaded');
});

// // ... existing code ... 