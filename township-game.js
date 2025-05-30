// Township-Style Transmigrasi Game - 5 Level Program Indonesia
class TownshipGame {
    constructor() {
        this.level = 1;
        this.coins = 2000;
        this.experience = 0;
        this.population = 25;
        this.happiness = 70;
        this.energy = 100;
        this.landCertificates = 0; // For T² (Level 1)
        this.localPotential = 0;   // For Translok (Level 2)
        this.patriotCadres = 0;    // For Patriot (Level 3)
        this.economicCenters = 0;  // For Karya Nusa (Level 4)
        this.partnerships = 0;     // For Gotong Royong (Level 5)
        this.gridSize = 25; // Expanded from 15 to 25 for realistic transmigration area scale
        this.grid = Array(this.gridSize).fill().map(() => Array(this.gridSize).fill(null));
        this.buildings = [];
        this.crops = [];
        this.factories = [];
        this.selectedTool = null;
        this.zoomLevel = 1; // Add zoom functionality for large area management
        this.viewOffsetX = 0; // Camera offset for panning
        this.viewOffsetY = 0;
        this.inventory = {
            // T² resources - Realistic Land Certificate Process
            landSurvey: 5, // Starting survey data (increased)
            landDocuments: 8, // Basic documents (increased)
            landVerification: 2, // Verified documents (added some)
            legalCertificates: 0, // Final certificates
            
            // Translok resources
            localProducts: 10,
            infrastructure: 0,
            
            // Patriot resources
            trainedCadres: 0,
            communityUnits: 0,
            
            // Karya Nusa resources
            industrialProducts: 0,
            tourismAssets: 0,
            
            // Gotong Royong resources
            collaborationAgreements: 0,
            socialHarmony: 100
        };
        
        // Mission tracking system
        this.missionProgress = {
            level1: {
                landOfficeBuilt: 0,
                surveyPostBuilt: 0,
                documentCenterBuilt: 0, // New building tracking
                legalCertificatesIssued: 0,
                transmigrantPopulation: 25
            },
            level2: {
                villageCenterBuilt: 0,
                localMarketBuilt: 0,
                localPotentialDeveloped: 0,
                happinessLevel: 70
            },
            level3: {
                trainingCenterBuilt: 0,
                communityUnitBuilt: 0,
                patriotCadresTrained: 0,
                communityProductsProduced: 0
            },
            level4: {
                industrialParkBuilt: 0,
                tourismHubBuilt: 0,
                economicCentersCreated: 0,
                exportCropsProduced: 0
            },
            level5: {
                partnershipHallBuilt: 0,
                collaborationAgreementsFormed: 0,
                socialHarmonyLevel: 100,
                allPreviousMissionsCompleted: false
            }
        };
        
        this.dailyTasks = [];
        this.achievements = [];
        this.nextId = 1;
        this.gameTimer = null;
        this.currentProgram = this.getCurrentProgram();
    }

    getCurrentProgram() {
        const programs = [
            { 
                id: 1, 
                name: "Trans Tuntas (T²)", 
                slogan: "Tuntas Lahan, Tuntas Harapan", 
                color: "#8B4513",
                description: "Program penyelesaian masalah pertanahan melalui legalisasi aset dan revitalisasi kawasan",
                objectives: [
                    "Bangun 2 Kantor Pertanahan untuk penerbitan sertifikat final",
                    "Dirikan 3 Pos Survey untuk pengukuran dan survey lahan", 
                    "Bangun 2 Pusat Pelayanan untuk verifikasi dokumen",
                    "Terbitkan 50 Sertifikat Hak Tanah melalui proses 4 tahap",
                    "Capai populasi 100 transmigran dengan Rumah Transmigran"
                ],
                rewards: {
                    landCertificates: 25,
                    coins: 1000
                }
            },
            { 
                id: 2, 
                name: "Transmigrasi Lokal (Translok)", 
                slogan: "Dari Lokal, Maju Global", 
                color: "#4CAF50",
                description: "Penguatan ekonomi lokal dan pembangunan infrastruktur tanpa relokasi jauh",
                objectives: [
                    "Bangun 3 Balai Desa sebagai pusat kegiatan masyarakat",
                    "Dirikan 4 Pasar Lokal untuk ekonomi regional",
                    "Kembangkan 100 unit Potensi Lokal melalui produksi",
                    "Tingkatkan happiness menjadi 85% dengan infrastruktur"
                ],
                rewards: {
                    localPotential: 50,
                    infrastructure: 10
                }
            },
            { 
                id: 3, 
                name: "Transmigrasi Patriot", 
                slogan: "Patriot Berkarya, Bangsa Berjaya", 
                color: "#FF5722",
                description: "Penciptaan kader pembangunan berkualitas untuk mengatasi kesenjangan regional",
                objectives: [
                    "Bangun 2 Pusat Pelatihan untuk pembentukan kader",
                    "Dirikan 5 Unit Usaha Komunitas mandiri",
                    "Latih 25 Kader Patriot untuk kepemimpinan lokal",
                    "Produksi 50 unit produk dari Unit Komunitas"
                ],
                rewards: {
                    patriotCadres: 15,
                    communityUnits: 10
                }
            },
            { 
                id: 4, 
                name: "Trans Karya Nusa", 
                slogan: "Kawasan Berkarya, Nusantara Berdaya", 
                color: "#2196F3",
                description: "Pengembangan kawasan ekonomi lokal dan penciptaan lapangan kerja berkelanjutan",
                objectives: [
                    "Bangun 1 Kawasan Industri untuk manufaktur",
                    "Dirikan 2 Pusat Wisata untuk pariwisata berkelanjutan",
                    "Ciptakan 10 Sentra Ekonomi produktif",
                    "Ekspor 100 unit Komoditas Ekspor (kopi, kakao)"
                ],
                rewards: {
                    economicCenters: 8,
                    industrialProducts: 20
                }
            },
            { 
                id: 5, 
                name: "Trans Gotong Royong", 
                slogan: "Bangun Bersama, Sejahtera Semua", 
                color: "#9C27B0",
                description: "Pembangunan kolaboratif melibatkan pemerintah, swasta, dan masyarakat",
                objectives: [
                    "Bangun 1 Gedung Kemitraan untuk koordinasi multi-pihak",
                    "Bentuk 15 Perjanjian Kerjasama strategis",
                    "Capai Harmoni Sosial 150 melalui kolaborasi",
                    "Selesaikan semua misi program sebelumnya"
                ],
                rewards: {
                    partnerships: 25,
                    socialHarmony: 50,
                    coins: 5000
                }
            }
        ];
        return programs[Math.min(this.level, 5) - 1];
    }

    // Save and Load
    save() {
        const saveData = {
            level: this.level,
            coins: this.coins,
            experience: this.experience,
            population: this.population,
            happiness: this.happiness,
            inventory: this.inventory,
            buildings: this.buildings,
            crops: this.crops,
            factories: this.factories,
            achievements: this.achievements,
            missionProgress: this.missionProgress,
            localPotential: this.localPotential, // Ensure this is saved
            patriotCadres: this.patriotCadres,
            economicCenters: this.economicCenters,
            partnerships: this.partnerships,
            lastSaved: Date.now()
        };
        localStorage.setItem('townshipTransmigrasi', JSON.stringify(saveData));
    }

    load() {
        const saved = localStorage.getItem('townshipTransmigrasi');
        if (saved) {
            const data = JSON.parse(saved);
            Object.assign(this, data);
            this.regenerateGrid();
            this.synchronizeCounters(); // Fix any data inconsistencies
        }
    }

    // Synchronize counters with mission progress
    synchronizeCounters() {
        // Sync local potential with mission progress
        if (this.level >= 2) {
            const missionProgress = this.missionProgress.level2.localPotentialDeveloped || 0;
            if (this.localPotential !== missionProgress) {
                console.log(`Syncing localPotential: ${this.localPotential} -> ${missionProgress}`);
                this.localPotential = missionProgress;
            }
        }
        
        // Sync other counters if needed
        if (this.level >= 3) {
            const patriotProgress = this.missionProgress.level3.patriotCadresTrained || 0;
            if (this.patriotCadres !== patriotProgress) {
                console.log(`Syncing patriotCadres: ${this.patriotCadres} -> ${patriotProgress}`);
                this.patriotCadres = patriotProgress;
            }
        }
        
        if (this.level >= 4) {
            const economicProgress = this.missionProgress.level4.economicCentersCreated || 0;
            if (this.economicCenters !== economicProgress) {
                console.log(`Syncing economicCenters: ${this.economicCenters} -> ${economicProgress}`);
                this.economicCenters = economicProgress;
            }
        }
        
        if (this.level >= 5) {
            const partnershipProgress = this.missionProgress.level5.collaborationAgreementsFormed || 0;
            if (this.partnerships !== partnershipProgress) {
                console.log(`Syncing partnerships: ${this.partnerships} -> ${partnershipProgress}`);
                this.partnerships = partnershipProgress;
            }
            
            // Sync social harmony with mission progress
            const socialHarmonyFromInventory = this.inventory.socialHarmony || 100;
            const socialHarmonyFromMission = this.missionProgress.level5.socialHarmonyLevel || 100;
            if (socialHarmonyFromInventory !== socialHarmonyFromMission) {
                console.log(`Syncing socialHarmony: inventory(${socialHarmonyFromInventory}) -> mission(${socialHarmonyFromMission})`);
                // Use the higher value to prevent data loss
                const correctValue = Math.max(socialHarmonyFromInventory, socialHarmonyFromMission);
                this.inventory.socialHarmony = correctValue;
                this.missionProgress.level5.socialHarmonyLevel = correctValue;
            }
        }
    }

    regenerateGrid() {
        this.grid = Array(this.gridSize).fill().map(() => Array(this.gridSize).fill(null));
        [...this.buildings, ...this.crops, ...this.factories].forEach(item => {
            if (item.x !== undefined && item.y !== undefined) {
                this.placeOnGrid(item, item.x, item.y, item.width || 1, item.height || 1);
            }
        });
    }

    // Level and Experience
    addExperience(amount) {
        this.experience += amount;
        // Remove automatic level up based on experience
        // Level up will only happen when missions are completed
        this.updateUI();
    }

    levelUp() {
        if (this.level >= 5) return; // Max level is 5
        
        this.level++;
        this.energy = 100;
        this.coins += this.level * 100;
        this.currentProgram = this.getCurrentProgram();
        
        // Special rewards per program level
        if (this.level === 2) {
            this.localPotential += 50;
            this.missionProgress.level2.localPotentialDeveloped += 50;
            showTownshipNotification(`🎉 Level 2 Terbuka: Translok! "Dari Lokal, Maju Global"`, 'success');
        } else if (this.level === 3) {
            this.patriotCadres += 10;
            this.missionProgress.level3.patriotCadresTrained += 10;
            showTownshipNotification(`🎉 Level 3 Terbuka: Transmigrasi Patriot! "Patriot Berkarya, Bangsa Berjaya"`, 'success');
        } else if (this.level === 4) {
            this.economicCenters += 5;
            this.missionProgress.level4.economicCentersCreated += 5;
            showTownshipNotification(`🎉 Level 4 Terbuka: Trans Karya Nusa! "Kawasan Berkarya, Nusantara Berdaya"`, 'success');
        } else if (this.level === 5) {
            this.partnerships += 20;
            this.missionProgress.level5.collaborationAgreementsFormed += 20;
            showTownshipNotification(`🎉 Level 5 Terbuka: Trans Gotong Royong! "Bangun Bersama, Sejahtera Semua"`, 'success');
        }
        
        createTownshipCelebration();
        this.updateUI();
        this.save();
    }

    // Grid Management
    isAreaClear(x, y, width = 1, height = 1) {
        for (let dy = 0; dy < height; dy++) {
            for (let dx = 0; dx < width; dx++) {
                const newX = x + dx;
                const newY = y + dy;
                if (newX >= this.gridSize || newY >= this.gridSize || newX < 0 || newY < 0) {
                    return false;
                }
                if (this.grid[newY][newX] !== null) {
                    return false;
                }
            }
        }
        return true;
    }

    placeOnGrid(item, x, y, width = 1, height = 1) {
        for (let dy = 0; dy < height; dy++) {
            for (let dx = 0; dx < width; dx++) {
                this.grid[y + dy][x + dx] = item;
            }
        }
    }

    removeFromGrid(item) {
        for (let y = 0; y < this.gridSize; y++) {
            for (let x = 0; x < this.gridSize; x++) {
                if (this.grid[y][x] === item) {
                    this.grid[y][x] = null;
                }
            }
        }
    }

    // Building System
    placeBuilding(buildingType, x, y) {
        const config = TOWNSHIP_BUILDINGS[buildingType];
        if (!config) return false;

        // Check requirements
        if (this.level < config.unlockLevel) {
            showTownshipNotification(`Buka di level ${config.unlockLevel}!`, 'warning');
            return false;
        }

        if (this.coins < config.cost) {
            showTownshipNotification('Koin tidak cukup!', 'error');
            return false;
        }

        if (!this.isAreaClear(x, y, config.width, config.height)) {
            showTownshipNotification('Area tidak kosong!', 'error');
            return false;
        }

        // Create building
        const building = {
            id: this.nextId++,
            type: 'building',
            buildingType: buildingType,
            x: x,
            y: y,
            width: config.width,
            height: config.height,
            isBuilding: true,
            buildProgress: 0,
            buildStartTime: Date.now(),
            buildDuration: config.buildTime
        };

        // Deduct cost
        this.coins -= config.cost;

        // Place on grid
        this.placeOnGrid(building, x, y, config.width, config.height);
        this.buildings.push(building);

        // Start construction
        this.startConstruction(building);

        this.addExperience(10);
        this.updateUI();
        this.save();

        showTownshipNotification(`${config.name} sedang dibangun!`, 'success');
        return true;
    }

    startConstruction(building) {
        const updateConstruction = () => {
            if (!building.isBuilding) return;

            const elapsed = Date.now() - building.buildStartTime;
            building.buildProgress = Math.min(100, (elapsed / building.buildDuration) * 100);

            if (building.buildProgress >= 100) {
                building.isBuilding = false;
                building.buildProgress = 100;

                const config = TOWNSHIP_BUILDINGS[building.buildingType];
                
                // Add population for residential buildings
                if (config.population) {
                    this.population += config.population;
                }

                // Add happiness for decorative buildings
                if (config.happiness) {
                    this.happiness = Math.min(100, this.happiness + config.happiness);
                }

                // Give special resources based on building type
                if (building.buildingType === 'landOffice' || building.buildingType === 'surveyPost' || building.buildingType === 'documentCenter') {
                    showTownshipNotification(`🏗️ ${config.name} siap beroperasi! Klik untuk memulai produksi sertifikat.`, 'info', 3000);
                } else if (building.buildingType === 'villageCenter' || building.buildingType === 'localMarket') {
                    // Update both counter and mission progress for local potential
                    this.localPotential += 10;
                    this.missionProgress.level2.localPotentialDeveloped += 10;
                } else if (building.buildingType === 'trainingCenter' || building.buildingType === 'communityUnit') {
                    // Update both counter and mission progress for patriot cadres
                    this.patriotCadres += 3;
                    this.missionProgress.level3.patriotCadresTrained += 3;
                } else if (building.buildingType === 'industrialPark' || building.buildingType === 'tourismHub') {
                    // Update both counter and mission progress for economic centers
                    this.economicCenters += 2;
                    this.missionProgress.level4.economicCentersCreated += 2;
                } else if (building.buildingType === 'partnershipHall') {
                    // Update both counter and mission progress for partnerships
                    this.partnerships += 5;
                    this.missionProgress.level5.collaborationAgreementsFormed += 5;
                }

                // Update mission progress
                this.updateMissionProgress(building.buildingType);

                showTownshipNotification(`${config.name} selesai dibangun!`, 'success');
                this.addExperience(20);
                this.renderTownship();
                this.updateUI();
                return;
            }

            this.renderTownship();
            setTimeout(updateConstruction, 1000);
        };

        setTimeout(updateConstruction, 1000);
    }

    // Mission tracking system
    updateMissionProgress(buildingType = null, actionType = null, value = 1) {
        const currentLevel = `level${this.level}`;
        
        // Update based on building completion
        if (buildingType) {
            switch (buildingType) {
                case 'landOffice':
                    this.missionProgress.level1.landOfficeBuilt += 1;
                    break;
                case 'surveyPost':
                    this.missionProgress.level1.surveyPostBuilt += 1;
                    break;
                case 'documentCenter':
                    this.missionProgress.level1.documentCenterBuilt += 1;
                    break;
                case 'transmigrantHouse':
                    this.missionProgress.level1.transmigrantPopulation = this.population;
                    break;
                case 'villageCenter':
                    this.missionProgress.level2.villageCenterBuilt += 1;
                    break;
                case 'localMarket':
                    this.missionProgress.level2.localMarketBuilt += 1;
                    break;
                case 'trainingCenter':
                    this.missionProgress.level3.trainingCenterBuilt += 1;
                    break;
                case 'communityUnit':
                    this.missionProgress.level3.communityUnitBuilt += 1;
                    break;
                case 'industrialPark':
                    this.missionProgress.level4.industrialParkBuilt += 1;
                    break;
                case 'tourismHub':
                    this.missionProgress.level4.tourismHubBuilt += 1;
                    break;
                case 'partnershipHall':
                    this.missionProgress.level5.partnershipHallBuilt += 1;
                    break;
            }
        }
        
        // Update based on other actions
        if (actionType) {
            switch (actionType) {
                case 'legalCertificate':
                    this.missionProgress.level1.legalCertificatesIssued += value;
                    break;
                case 'localPotential':
                    this.missionProgress.level2.localPotentialDeveloped += value;
                    break;
                case 'patriotCadre':
                    this.missionProgress.level3.patriotCadresTrained += value;
                    break;
                case 'communityProduct':
                    this.missionProgress.level3.communityProductsProduced += value;
                    break;
                case 'economicCenter':
                    this.missionProgress.level4.economicCentersCreated += value;
                    break;
                case 'exportCrop':
                    this.missionProgress.level4.exportCropsProduced += value;
                    break;
                case 'collaboration':
                    this.missionProgress.level5.collaborationAgreementsFormed += value;
                    break;
            }
        }
        
        // Update happiness and social harmony
        this.missionProgress.level2.happinessLevel = this.happiness;
        this.missionProgress.level5.socialHarmonyLevel = this.inventory.socialHarmony || 100;
        
        // Check if level missions are completed
        this.checkMissionCompletion();
    }

    checkMissionCompletion() {
        let levelCompleted = false;
        let completionMessage = '';
        
        switch (this.level) {
            case 1:
                const l1 = this.missionProgress.level1;
                if (l1.landOfficeBuilt >= 2 &&
                    l1.surveyPostBuilt >= 3 &&
                    l1.documentCenterBuilt >= 2 &&
                    l1.legalCertificatesIssued >= 50 &&
                    l1.transmigrantPopulation >= 100) {
                    levelCompleted = true;
                    completionMessage = 'Trans Tuntas (T²) berhasil diselesaikan! Semua sengketa lahan telah tuntas.';
                }
                break;
            case 2:
                const l2 = this.missionProgress.level2;
                if (l2.villageCenterBuilt >= 3 &&
                    l2.localMarketBuilt >= 4 &&
                    l2.localPotentialDeveloped >= 100 &&
                    l2.happinessLevel >= 85) {
                    levelCompleted = true;
                    completionMessage = 'Transmigrasi Lokal berhasil! Ekonomi lokal telah berkembang pesat.';
                }
                break;
            case 3:
                const l3 = this.missionProgress.level3;
                if (l3.trainingCenterBuilt >= 2 &&
                    l3.communityUnitBuilt >= 5 &&
                    l3.patriotCadresTrained >= 25 &&
                    l3.communityProductsProduced >= 50) {
                    levelCompleted = true;
                    completionMessage = 'Transmigrasi Patriot sukses! Kader pembangunan telah terbentuk.';
                }
                break;
            case 4:
                const l4 = this.missionProgress.level4;
                if (l4.industrialParkBuilt >= 1 &&
                    l4.tourismHubBuilt >= 2 &&
                    l4.economicCentersCreated >= 10 &&
                    l4.exportCropsProduced >= 100) {
                    levelCompleted = true;
                    completionMessage = 'Trans Karya Nusa berhasil! Kawasan ekonomi telah terwujud.';
                }
                break;
            case 5:
                const l5 = this.missionProgress.level5;
                if (l5.partnershipHallBuilt >= 1 &&
                    l5.collaborationAgreementsFormed >= 15 &&
                    l5.socialHarmonyLevel >= 150) {
                    levelCompleted = true;
                    completionMessage = 'Trans Gotong Royong sempurna! Kemitraan berkelanjutan telah tercapai.';
                }
                break;
        }
        
        if (levelCompleted && this.level < 5) {
            this.completeLevelMission(completionMessage);
        }
        
        // Update mission display immediately
        this.updateMissionDisplay();
    }

    completeLevelMission(message) {
        const program = this.getCurrentProgram();
        
        // Give rewards
        if (program.rewards) {
            Object.entries(program.rewards).forEach(([resource, amount]) => {
                if (resource === 'coins') {
                    this.coins += amount;
                } else {
                    this[resource] = (this[resource] || 0) + amount;
                }
            });
        }
        
        showTownshipNotification(`🎉 ${message}`, 'success', 5000);
        createTownshipCelebration();
        
        // Auto level up after showing completion message
        setTimeout(() => {
            this.levelUp();
        }, 2000);
    }

    // Farming System
    plantCrop(cropType, x, y) {
        const cell = this.grid[y][x];
        
        // Check for any farm-type building
        const farmTypes = ['farm', 'riceFarm', 'vegetableFarm', 'fishPond'];
        const isFarmCell = cell && cell.type === 'building' && farmTypes.includes(cell.buildingType);
        
        if (!isFarmCell) {
            // Offer to auto-place farm
            const shouldAutoPlace = confirm('🚜 Tidak ada ladang di sini! Mau dibuatkan ladang otomatis?');
            if (shouldAutoPlace) {
                const success = this.autoPlaceFarmForCrop(cropType);
                if (success) {
                    showTownshipNotification('✅ Ladang sudah dibuat! Sekarang pilih tanaman lagi dan klik di ladang.', 'info', 4000);
                }
                return false;
            } else {
                showTownshipNotification('🚜 Perlu ladang dulu! Bangun: Ladang, Sawah, atau Kebun Sayur', 'error', 4000);
                return false;
            }
        }

        // Check if farm is still being built
        if (cell.isBuilding) {
            showTownshipNotification('⏳ Tunggu ladang selesai dibangun dulu!', 'warning', 2000);
            return false;
        }

        // Check if farm is occupied
        if (cell.crop) {
            const cropConfig = TOWNSHIP_CROPS[cell.crop.cropType];
            if (cell.crop.ready) {
                showTownshipNotification(`🌾 Ladang sudah ada ${cropConfig.name} yang siap dipanen! Panen dulu.`, 'error', 3000);
            } else {
                showTownshipNotification(`🌱 Ladang sudah ditanami ${cropConfig.name}! Tunggu panen atau pilih ladang kosong.`, 'error', 3000);
            }
            return false;
        }

        const config = TOWNSHIP_CROPS[cropType];
        if (!config) {
            console.error('Crop config not found:', cropType);
            return false;
        }

        if (this.level < config.unlockLevel) {
            showTownshipNotification(`🔒 ${config.name} buka di level ${config.unlockLevel}!`, 'warning');
            return false;
        }

        // Special crop restrictions for specific farms
        if (cell.buildingType === 'riceFarm' && cropType !== 'rice') {
            showTownshipNotification('🌾 Sawah hanya untuk menanam padi! Gunakan ladang biasa untuk tanaman lain.', 'error', 4000);
            return false;
        }
        
        if (cell.buildingType === 'vegetableFarm' && !['vegetables', 'spices', 'medicinalPlants'].includes(cropType)) {
            showTownshipNotification('🥬 Kebun sayur untuk sayuran, rempah, dan tanaman obat! Gunakan ladang lain untuk tanaman ini.', 'error', 4000);
            return false;
        }
        
        if (cell.buildingType === 'fishPond' && cropType !== 'freshwaterFish') {
            showTownshipNotification('🐟 Kolam ikan hanya untuk budidaya ikan!', 'error');
            return false;
        }

        // Plant crop
        const crop = {
            id: this.nextId++,
            type: 'crop',
            cropType: cropType,
            x: x,
            y: y,
            plantTime: Date.now(),
            growDuration: config.growTime,
            isGrowing: true,
            growProgress: 0,
            ready: false
        };

        cell.crop = crop;
        this.crops.push(crop);

        this.startGrowth(crop);
        this.addExperience(2);
        this.updateUI();
        this.save();

        showTownshipNotification(`🌱 ${config.name} ditanam di ${TOWNSHIP_BUILDINGS[cell.buildingType].name}! Tunggu ${Math.floor(config.growTime/1000)} detik`, 'success', 3000);
        return true;
    }

    startGrowth(crop) {
        const updateGrowth = () => {
            if (!crop.isGrowing) return;

            const elapsed = Date.now() - crop.plantTime;
            crop.growProgress = Math.min(100, (elapsed / crop.growDuration) * 100);

            if (crop.growProgress >= 100) {
                crop.isGrowing = false;
                crop.ready = true;
                crop.growProgress = 100;

                const config = TOWNSHIP_CROPS[crop.cropType];
                showTownshipNotification(`${config.name} siap dipanen! 🌾`, 'success');
                
                this.renderTownship();
                return;
            }

            this.renderTownship();
            setTimeout(updateGrowth, 1000);
        };

        setTimeout(updateGrowth, 1000);
    }

    harvestCrop(crop) {
        const config = TOWNSHIP_CROPS[crop.cropType];
        
        // Random bonus multiplier (1x to 3x)
        const bonusMultiplier = Math.random() < 0.3 ? (Math.random() < 0.1 ? 3 : 2) : 1;
        const baseAmount = Math.floor(Math.random() * 3) + 1;
        const finalAmount = baseAmount * bonusMultiplier;
        
        // Add to inventory
        this.inventory[crop.cropType] = (this.inventory[crop.cropType] || 0) + finalAmount;
        
        // Enhanced coin rewards
        const baseCoinReward = config.sellPrice * 2;
        const finalCoinReward = baseCoinReward * bonusMultiplier;
        
        this.coins += finalCoinReward;
        this.addExperience(config.experience * bonusMultiplier);

        // Update mission progress for export crops
        if (crop.cropType === 'exportCrops') {
            this.updateMissionProgress(null, 'exportCrop', finalAmount);
        }

        // Remove crop from farm
        const farmCell = this.grid[crop.y][crop.x];
        if (farmCell && farmCell.crop === crop) {
            farmCell.crop = null;
        }

        // Remove from crops array
        this.crops = this.crops.filter(c => c.id !== crop.id);

        let message = `Dipanen! +${finalCoinReward} koin`;
        if (bonusMultiplier > 1) {
            message += ` (Bonus ${bonusMultiplier}x! 🌟)`;
        }
        
        showTownshipNotification(message, 'success');
        
        // Haptic feedback
        if (navigator.vibrate) {
            navigator.vibrate([50, 25, 50]);
        }

        this.updateUI();
        this.renderTownship();
        this.save();
    }

    // Production System
    startProduction(factory, productType) {
        const productConfig = TOWNSHIP_PRODUCTS[productType];
        if (!productConfig) {
            console.error('Product config not found for:', productType);
            showTownshipNotification(`Produk ${productType} tidak ditemukan!`, 'error');
            return false;
        }

        console.log('Starting production:', productType, 'at factory:', factory.buildingType);
        console.log('Product config:', productConfig);
        console.log('Current inventory:', this.inventory);

        // Check ingredients
        for (const [ingredient, amount] of Object.entries(productConfig.ingredients)) {
            const available = this.inventory[ingredient] || 0;
            console.log(`Checking ingredient ${ingredient}: need ${amount}, have ${available}`);
            if (available < amount) {
                showTownshipNotification(`Tidak cukup ${this.getItemName(ingredient)}! Butuh ${amount}, punya ${available}`, 'error');
                return false;
            }
        }

        // Deduct ingredients
        for (const [ingredient, amount] of Object.entries(productConfig.ingredients)) {
            this.inventory[ingredient] -= amount;
            console.log(`Deducted ${amount} ${ingredient}, remaining:`, this.inventory[ingredient]);
        }

        // Start production
        factory.isProducing = true;
        factory.productType = productType;
        factory.productionStartTime = Date.now();
        factory.productionDuration = productConfig.productionTime;
        factory.productionProgress = 0;

        console.log('Production started for:', productType, 'duration:', productConfig.productionTime);

        this.startProductionTimer(factory);
        this.updateUI();
        this.save();

        showTownshipNotification(`Memproduksi ${productConfig.name}...`, 'info');
        return true;
    }

    startProductionTimer(factory) {
        const updateProduction = () => {
            if (!factory.isProducing) return;

            const elapsed = Date.now() - factory.productionStartTime;
            factory.productionProgress = Math.min(100, (elapsed / factory.productionDuration) * 100);

            if (factory.productionProgress >= 100) {
                // Production complete
                factory.isProducing = false;
                factory.productionProgress = 0;
                factory.currentProduct = null;

                const productConfig = TOWNSHIP_PRODUCTS[factory.productType];
                const baseAmount = Math.floor(Math.random() * 2) + 1;
                
                // Add product to inventory
                this.inventory[factory.productType] = (this.inventory[factory.productType] || 0) + baseAmount;
                
                // Special handling for different product types
                if (factory.productType === 'legalCertificates') {
                    this.updateMissionProgress(null, 'legalCertificate', baseAmount);
                } else if (factory.productType === 'localProducts') {
                    // Add local potential progress when producing local products
                    this.localPotential += baseAmount;
                    this.updateMissionProgress(null, 'localPotential', baseAmount);
                    showTownshipNotification(`💎 +${baseAmount} Potensi Lokal dikembangkan!`, 'success', 4000);
                } else if (factory.productType === 'communityUnits') {
                    this.updateMissionProgress(null, 'communityProduct', baseAmount);
                } else if (factory.productType === 'collaborationAgreements') {
                    // Increase social harmony when collaboration agreements are produced
                    this.inventory.socialHarmony = (this.inventory.socialHarmony || 100) + (baseAmount * 5);
                    this.updateMissionProgress(null, 'collaboration', baseAmount);
                    showTownshipNotification(`📋 +${baseAmount} Perjanjian Kerjasama! +${baseAmount * 5} Harmoni Sosial!`, 'success', 4000);
                }

                this.addExperience(productConfig.experience);
                this.coins += productConfig.sellPrice;

                showTownshipNotification(`✅ Produksi selesai! +${baseAmount} ${productConfig.name}`, 'success');
                
                this.updateUI();
                this.renderTownship();
                this.save();
                return;
            }

            this.renderTownship();
            setTimeout(updateProduction, 1000);
        };

        setTimeout(updateProduction, 1000);
    }

    // UI Updates
    updateUI() {
        // Update basic stats
        document.getElementById('townshipLevel').textContent = this.level;
        document.getElementById('townshipCoins').textContent = this.formatNumber(this.coins);
        document.getElementById('townshipPopulation').textContent = this.population;
        document.getElementById('townshipHappiness').textContent = this.happiness;
        document.getElementById('townshipExperience').textContent = `${this.experience}/${this.getRequiredExperience()}`;

        // Update time and season indicators
        this.updateTimeSeasonDisplay();

        // Update progress bars
        const expBar = document.getElementById('townshipExpBar');
        const happinessBar = document.getElementById('townshipHappinessBar');
        
        if (expBar) {
            const expPercent = (this.experience / this.getRequiredExperience()) * 100;
            expBar.style.width = `${Math.min(expPercent, 100)}%`;
        }
        
        if (happinessBar) {
            happinessBar.style.width = `${Math.min(this.happiness, 100)}%`;
        }

        // Update program info
        this.updateProgramInfo();
        
        // Update mission display
        this.updateMissionDisplay();
        
        // Update inventory
        this.updateInventoryDisplay();
        
        // Update special resources
        this.updateSpecialResourcesDisplay();
        
        // Update toolbar
        this.updateToolbar();
    }

    updateTimeSeasonDisplay() {
        const timeIcon = document.getElementById('timeIcon');
        const gameTimeElement = document.getElementById('gameTime');
        const seasonIcon = document.getElementById('seasonIcon');
        const gameSeasonElement = document.getElementById('gameSeason');

        if (timeIcon && gameTimeElement) {
            const hours = Math.floor(this.gameTime / 60);
            const minutes = this.gameTime % 60;
            const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
            
            gameTimeElement.textContent = timeString;
            
            // Update time icon based on time of day
            if (hours >= 5 && hours < 12) {
                timeIcon.textContent = '🌅'; // Morning
            } else if (hours >= 12 && hours < 17) {
                timeIcon.textContent = '☀️'; // Afternoon
            } else if (hours >= 17 && hours < 20) {
                timeIcon.textContent = '🌇'; // Evening
            } else {
                timeIcon.textContent = '🌙'; // Night
            }
        }

        if (seasonIcon && gameSeasonElement) {
            const seasonName = this.getSeasonName();
            gameSeasonElement.textContent = seasonName;
            
            // Update season icon
            switch (this.currentSeason) {
                case 0: seasonIcon.textContent = '🌸'; break; // Spring
                case 1: seasonIcon.textContent = '☀️'; break; // Summer
                case 2: seasonIcon.textContent = '🍂'; break; // Autumn
                case 3: seasonIcon.textContent = '❄️'; break; // Winter
            }
        }
    }

    updateMissionDisplay() {
        const sidebar = document.querySelector('.sidebar');
        if (!sidebar) return;

        let missionSection = document.getElementById('mission-section');
        if (!missionSection) {
            missionSection = document.createElement('div');
            missionSection.id = 'mission-section';
            missionSection.className = 'mission-section';
            
            // Insert after special resources section
            const specialSection = document.querySelector('.special-resources-section');
            if (specialSection) {
                sidebar.insertBefore(missionSection, specialSection.nextSibling);
            } else {
                sidebar.appendChild(missionSection);
            }
        }

        const program = this.getCurrentProgram();
        const currentProgress = this.missionProgress[`level${this.level}`];

        missionSection.innerHTML = `
            <h3 class="section-title" style="color: ${program.color};">
                🎯 Misi ${program.name}
            </h3>
            <div class="mission-description">${program.description}</div>
            
            <div class="mission-objectives">
                ${this.getMissionObjectivesHTML(this.level, currentProgress)}
            </div>
            
            <div class="mission-rewards">
                <h4>🎁 Hadiah Misi:</h4>
                <div class="reward-items">
                    ${Object.entries(program.rewards || {}).map(([resource, amount]) => 
                        `<span class="reward-item">${this.getResourceIcon(resource)} ${this.formatNumber(amount)}</span>`
                    ).join('')}
                </div>
            </div>
        `;
    }

    getMissionObjectivesHTML(level, progress) {
        let objectives = [];
        
        switch (level) {
            case 1:
                objectives = [
                    { name: 'Bangun Kantor Pertanahan', current: progress.landOfficeBuilt, target: 2, icon: '🏛️' },
                    { name: 'Bangun Pos Survey', current: progress.surveyPostBuilt, target: 3, icon: '📐' },
                    { name: 'Bangun Pusat Pelayanan', current: progress.documentCenterBuilt, target: 2, icon: '📋' },
                    { name: 'Terbitkan Sertifikat Hak Tanah', current: progress.legalCertificatesIssued, target: 50, icon: '📜' },
                    { name: 'Populasi Transmigran', current: progress.transmigrantPopulation, target: 100, icon: '👥' }
                ];
                break;
            case 2:
                objectives = [
                    { name: 'Bangun Balai Desa', current: progress.villageCenterBuilt, target: 3, icon: '🏘️' },
                    { name: 'Bangun Pasar Lokal', current: progress.localMarketBuilt, target: 4, icon: '🏪' },
                    { name: 'Kembangkan Potensi Lokal', current: progress.localPotentialDeveloped, target: 100, icon: '💎' },
                    { name: 'Tingkat Kebahagiaan', current: progress.happinessLevel, target: 85, icon: '😊' }
                ];
                break;
            case 3:
                objectives = [
                    { name: 'Bangun Pusat Pelatihan', current: progress.trainingCenterBuilt, target: 2, icon: '🎓' },
                    { name: 'Bangun Unit Usaha', current: progress.communityUnitBuilt, target: 5, icon: '🏭' },
                    { name: 'Latih Kader Patriot', current: progress.patriotCadresTrained, target: 25, icon: '🦅' },
                    { name: 'Produk Komunitas', current: progress.communityProductsProduced, target: 50, icon: '📦' }
                ];
                break;
            case 4:
                objectives = [
                    { name: 'Bangun Kawasan Industri', current: progress.industrialParkBuilt, target: 1, icon: '🏭' },
                    { name: 'Bangun Pusat Wisata', current: progress.tourismHubBuilt, target: 2, icon: '🌴' },
                    { name: 'Ciptakan Pusat Ekonomi', current: progress.economicCentersCreated, target: 10, icon: '💰' },
                    { name: 'Produksi Tanaman Ekspor', current: progress.exportCropsProduced, target: 100, icon: '🌾' }
                ];
                break;
            case 5:
                objectives = [
                    { name: 'Bangun Gedung Kemitraan', current: progress.partnershipHallBuilt, target: 1, icon: '🤝' },
                    { name: 'Bentuk Perjanjian Kolaborasi', current: progress.collaborationAgreementsFormed, target: 15, icon: '📋' },
                    { name: 'Tingkat Harmoni Sosial', current: progress.socialHarmonyLevel, target: 150, icon: '☯️' }
                ];
                break;
        }
        
        return objectives.map(obj => {
            const percentage = Math.min(100, (obj.current / obj.target) * 100);
            const isCompleted = obj.current >= obj.target;
            
            return `
                <div class="mission-objective ${isCompleted ? 'completed' : ''}">
                    <div class="objective-text">
                        ${isCompleted ? '✅' : '⏳'} ${obj.icon} ${obj.name}
                    </div>
                    <div class="objective-progress">
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${percentage}%"></div>
                        </div>
                        <span class="progress-text">${obj.current}/${obj.target}</span>
                    </div>
                </div>
            `;
        }).join('');
    }

    getResourceIcon(resource) {
        const icons = {
            coins: '💰',
            experience: '⭐',
            happiness: '😊',
            population: '👥',
            landCertificates: '📜',
            localPotential: '💎',
            patriotCadres: '🦅',
            economicCenters: '💰',
            partnerships: '🤝'
        };
        return icons[resource] || '📦';
    }

    updateInventoryDisplay() {
        const inventoryContainer = document.getElementById('townshipInventory');
        if (!inventoryContainer) return;

        inventoryContainer.innerHTML = '';
        
        // Add area statistics and navigation for large transmigration area
        const stats = this.getAreaStatistics();
        const areaStatsDiv = document.createElement('div');
        areaStatsDiv.innerHTML = `
            <div style="background: linear-gradient(45deg, #4CAF50, #45a049); color: white; padding: 8px; border-radius: 8px; margin-bottom: 10px;">
                <h4 style="margin: 0; text-align: center;">🗺️ Kawasan Transmigrasi ${this.gridSize}x${this.gridSize}</h4>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4px; font-size: 0.7em; margin-top: 5px;">
                    <div>📊 Total: ${stats.totalCells} hektar</div>
                    <div>🏠 Terbangun: ${stats.buildingCells}</div>
                    <div>🌾 Pertanian: ${stats.farmCells}</div>
                    <div>🌿 Lahan Kosong: ${stats.emptyLand}</div>
                </div>
            </div>
        `;
        inventoryContainer.appendChild(areaStatsDiv);

        // Add navigation controls for large area
        const navigationDiv = document.createElement('div');
        navigationDiv.innerHTML = `
            <div style="background: #f0f0f0; padding: 8px; border-radius: 8px; margin-bottom: 10px;">
                <h4 style="margin: 0 0 5px 0; text-align: center;">🧭 Navigasi Kawasan</h4>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4px; margin-bottom: 5px;">
                    <button onclick="game.autoExpandSettlement()" style="
                        background: linear-gradient(45deg, #FF9800, #F57C00);
                        color: white; border: none; padding: 4px; border-radius: 4px;
                        font-size: 0.7em; cursor: pointer; font-weight: bold;
                    ">🏗️ Auto Expand</button>
                    <button onclick="game.centerViewOnBuilding('villageCenter')" style="
                        background: linear-gradient(45deg, #2196F3, #1976D2);
                        color: white; border: none; padding: 4px; border-radius: 4px;
                        font-size: 0.7em; cursor: pointer; font-weight: bold;
                    ">🏘️ Ke Balai Desa</button>
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 2px;">
                    <button onclick="game.panView(-5, 0)" style="
                        background: #607D8B; color: white; border: none; padding: 3px;
                        border-radius: 3px; font-size: 0.6em; cursor: pointer;
                    ">⬅️ Barat</button>
                    <button onclick="game.panView(0, -5)" style="
                        background: #607D8B; color: white; border: none; padding: 3px;
                        border-radius: 3px; font-size: 0.6em; cursor: pointer;
                    ">⬆️ Utara</button>
                    <button onclick="game.panView(5, 0)" style="
                        background: #607D8B; color: white; border: none; padding: 3px;
                        border-radius: 3px; font-size: 0.6em; cursor: pointer;
                    ">➡️ Timur</button>
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 2px; margin-top: 2px;">
                    <button onclick="game.panView(0, 5)" style="
                        background: #607D8B; color: white; border: none; padding: 3px;
                        border-radius: 3px; font-size: 0.6em; cursor: pointer;
                    ">⬇️ Selatan</button>
                    <button onclick="game.viewOffsetX = 0; game.viewOffsetY = 0; game.renderTownship();" style="
                        background: #795548; color: white; border: none; padding: 3px;
                        border-radius: 3px; font-size: 0.6em; cursor: pointer;
                    ">🎯 Pusat</button>
                    <button onclick="game.setZoomLevel(game.zoomLevel === 1 ? 0.7 : 1)" style="
                        background: #9C27B0; color: white; border: none; padding: 3px;
                        border-radius: 3px; font-size: 0.6em; cursor: pointer;
                    ">🔍 Zoom</button>
                </div>
            </div>
        `;
        inventoryContainer.appendChild(navigationDiv);
        
        // Add daily bonus button at top
        const dailyBonusDiv = document.createElement('div');
        dailyBonusDiv.innerHTML = `
            <button class="daily-bonus-btn" onclick="game.checkDailyBonus()" style="
                width: 100%; 
                background: linear-gradient(45deg, #FFD700, #FFA500); 
                color: white; 
                border: none; 
                padding: 8px; 
                border-radius: 8px; 
                font-weight: bold; 
                margin-bottom: 10px;
                cursor: pointer;
                box-shadow: 0 2px 5px rgba(0,0,0,0.2);
            ">🎁 Bonus Harian</button>
        `;
        inventoryContainer.appendChild(dailyBonusDiv);

        // Add quick action buttons
        const quickActionsDiv = document.createElement('div');
        quickActionsDiv.innerHTML = `
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4px; margin-bottom: 10px;">
                <button onclick="game.watchAdForCoins()" style="
                    background: linear-gradient(45deg, #9C27B0, #E91E63);
                    color: white; border: none; padding: 6px; border-radius: 6px;
                    font-size: 0.7em; cursor: pointer; font-weight: bold;
                ">📺 Tonton Iklan</button>
                <button onclick="game.quickSellAll()" style="
                    background: linear-gradient(45deg, #FF5722, #FF9800);
                    color: white; border: none; padding: 6px; border-radius: 6px;
                    font-size: 0.7em; cursor: pointer; font-weight: bold;
                ">🚀 Jual Semua</button>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4px; margin-bottom: 10px;">
                <button onclick="game.giveEmergencyCertificates()" style="
                    background: linear-gradient(45deg, #4CAF50, #45a049);
                    color: white; border: none; padding: 6px; border-radius: 6px;
                    font-size: 0.7em; cursor: pointer; font-weight: bold;
                ">📜 Emergency Sertifikat</button>
                <button onclick="game.giveStarterMaterials()" style="
                    background: linear-gradient(45deg, #2196F3, #1976D2);
                    color: white; border: none; padding: 6px; border-radius: 6px;
                    font-size: 0.7em; cursor: pointer; font-weight: bold;
                ">📋 Starter Materials</button>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4px; margin-bottom: 10px;">
                <button onclick="game.giveEmergencyCoins()" style="
                    background: linear-gradient(45deg, #F44336, #E91E63);
                    color: white; border: none; padding: 6px; border-radius: 6px;
                    font-size: 0.7em; cursor: pointer; font-weight: bold;
                ">💊 Emergency Coins</button>
                <button onclick="game.fixDataSync()" style="
                    background: linear-gradient(45deg, #607D8B, #455A64);
                    color: white; border: none; padding: 6px; border-radius: 6px;
                    font-size: 0.7em; cursor: pointer; font-weight: bold;
                ">🔧 Fix Data Sync</button>
            </div>
            <div style="display: grid; grid-template-columns: 1fr; gap: 4px; margin-bottom: 10px;">
                <button onclick="game.giveFreeFarms()" style="
                    background: linear-gradient(45deg, #8BC34A, #4CAF50);
                    color: white; border: none; padding: 8px; border-radius: 6px;
                    font-size: 0.8em; cursor: pointer; font-weight: bold;
                ">🚜 FREE FARMS - Dapat Ladang Gratis di Kawasan Luas!</button>
            </div>
        `;
        inventoryContainer.appendChild(quickActionsDiv);
        
        Object.entries(this.inventory).forEach(([item, quantity]) => {
            if (quantity > 0) {
                const itemDiv = document.createElement('div');
                itemDiv.className = 'inventory-item';
                itemDiv.style.cssText = `
                    background: white;
                    border: 2px solid #4CAF50;
                    border-radius: 8px;
                    padding: 8px;
                    margin: 4px 0;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                `;
                
                const sellPrices = {
                    // Crops
                    rice: 15,
                    vegetables: 12,
                    spices: 25,
                    medicinalPlants: 40,
                    exportCrops: 70,
                    freshwaterFish: 50,
                    
                    // T² Land Certificate Process
                    landSurvey: 30,
                    landDocuments: 25,
                    landVerification: 40,
                    legalCertificates: 100,
                    
                    // Products
                    localProducts: 60,
                    trainedCadres: 200,
                    industrialProducts: 300,
                    tourismAssets: 400,
                    collaborationAgreements: 600,
                    processedFood: 150
                };
                
                const sellPrice = sellPrices[item] || 10;
                const canSell = sellPrices[item] && item !== 'socialHarmony'; // Don't allow selling socialHarmony
                
                itemDiv.innerHTML = `
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <div class="item-icon" style="font-size: 1.2em;">${this.getItemIcon(item)}</div>
                        <div>
                            <div style="font-size: 0.8em; font-weight: bold;">${this.getItemName(item)}</div>
                            <div style="font-size: 0.7em; color: #666;">Qty: ${quantity}</div>
                        </div>
                    </div>
                    ${canSell ? `
                    <button onclick="game.sellInventoryItem('${item}', 1)" style="
                        background: #FF9800;
                        color: white;
                        border: none;
                        padding: 4px 8px;
                        border-radius: 4px;
                        font-size: 0.7em;
                        cursor: pointer;
                        font-weight: bold;
                    " title="Jual seharga ${sellPrice} koin">
                        💰 ${sellPrice}
                    </button>
                    ` : `
                    <div style="
                        background: #9C27B0;
                        color: white;
                        padding: 4px 8px;
                        border-radius: 4px;
                        font-size: 0.7em;
                        font-weight: bold;
                    ">
                        🔒 Khusus
                    </div>
                    `}
                `;
                inventoryContainer.appendChild(itemDiv);
            }
        });
        
        // If no items, show message
        if (Object.values(this.inventory).every(qty => qty === 0)) {
            const emptyDiv = document.createElement('div');
            emptyDiv.innerHTML = `
                <div style="text-align: center; color: #666; font-style: italic; padding: 20px;">
                    Inventory kosong.<br>
                    Mulai bertani di kawasan ${this.gridSize}x${this.gridSize} untuk mendapat items!
                </div>
            `;
            inventoryContainer.appendChild(emptyDiv);
        }
    }

    updateToolbar() {
        const toolbar = document.getElementById('townshipToolbar');
        if (!toolbar) return;

        const categories = [
            {
                name: '🛠️ Tools',
                items: [
                    ['bulldozer', { 
                        name: 'Bulldozer', 
                        icon: '🚜', 
                        cost: 0, 
                        category: 'tool',
                        unlockLevel: 1,
                        description: 'Hancurkan bangunan (refund 50%)'
                    }]
                ]
            },
            {
                name: '🆘 Emergency',
                items: [
                    ['giveSocialHarmony', { 
                        name: 'Harmoni Sosial', 
                        icon: '☯️', 
                        cost: 0, 
                        category: 'emergency',
                        unlockLevel: 5,
                        description: '+25 Harmoni Sosial'
                    }],
                    ['giveIndustrialIngredients', { 
                        name: 'Bahan Industri', 
                        icon: '🏭', 
                        cost: 0, 
                        category: 'emergency',
                        unlockLevel: 4,
                        description: '+10 Komoditas Ekspor & Kader'
                    }],
                    ['debugProductionMenu', { 
                        name: 'Debug Produksi', 
                        icon: '🔧', 
                        cost: 0, 
                        category: 'emergency',
                        unlockLevel: 1,
                        description: 'Debug menu produksi'
                    }]
                ]
            },
            {
                name: '🏠 Perumahan',
                items: Object.entries(TOWNSHIP_BUILDINGS).filter(([_, config]) => config && config.category === 'residential')
            },
            {
                name: '🏛️ Administrasi',
                items: Object.entries(TOWNSHIP_BUILDINGS).filter(([_, config]) => config && config.category === 'administrative')
            },
            {
                name: '🏘️ Komunitas',
                items: Object.entries(TOWNSHIP_BUILDINGS).filter(([_, config]) => config && (config.category === 'community' || config.category === 'commercial' || config.category === 'education' || config.category === 'economic'))
            },
            {
                name: '🏭 Industri & Wisata',
                items: Object.entries(TOWNSHIP_BUILDINGS).filter(([_, config]) => config && (config.category === 'industrial' || config.category === 'tourism' || config.category === 'partnership'))
            },
            {
                name: '🌾 Pertanian',
                items: Object.entries(TOWNSHIP_BUILDINGS).filter(([_, config]) => config && (config.category === 'farming' || config.category === 'aquaculture'))
            },
            {
                name: '🌱 Tanaman',
                items: Object.entries(TOWNSHIP_CROPS).filter(([_, config]) => config && config.icon)
            }
        ];

        toolbar.innerHTML = categories.map(category => `
            <div class="toolbar-section">
                <h4>${category.name}</h4>
                <div class="toolbar-items">
                    ${category.items.map(([key, config]) => {
                        // Add safety checks
                        if (!config || !config.icon || !config.name) {
                            console.error('Invalid config for item:', key, config);
                            return '';
                        }
                        
                        return `
                            <button class="tool-btn ${this.level < (config.unlockLevel || 1) ? 'locked' : ''}" 
                                    data-tool="${key}" 
                                    data-type="${config.category || 'crop'}"
                                    ${this.level < (config.unlockLevel || 1) ? 'disabled' : ''}
                                    title="${config.name} - ${config.cost ? config.cost + ' koin' : 'Gratis'}">
                                <div class="tool-icon">${config.icon}</div>
                                <div class="tool-name">${config.name}</div>
                                ${config.cost ? `<div class="tool-cost">💰${config.cost}</div>` : ''}
                                ${this.level < (config.unlockLevel || 1) ? `<div class="tool-lock">🔒${config.unlockLevel || 1}</div>` : ''}
                            </button>
                        `;
                    }).join('')}
                </div>
            </div>
        `).join('');

        // Add event listeners
        toolbar.addEventListener('click', (e) => {
            const btn = e.target.closest('.tool-btn');
            if (btn && !btn.disabled) {
                this.selectTool(btn.dataset.tool, btn.dataset.type);
            }
        });
    }

    selectTool(tool, type) {
        // Handle emergency functions
        if (type === 'emergency') {
            switch (tool) {
                case 'giveSocialHarmony':
                    this.giveSocialHarmony();
                    return;
                case 'giveIndustrialIngredients':
                    this.giveIndustrialIngredients();
                    return;
                case 'debugProductionMenu':
                    this.debugProductionMenu();
                    return;
            }
        }

        // Clear previous selection
        document.querySelectorAll('.tool-btn').forEach(btn => btn.classList.remove('selected'));
        
        // Select new tool
        const btn = document.querySelector(`[data-tool="${tool}"]`);
        if (btn) {
            btn.classList.add('selected');
            this.selectedTool = { tool, type };
            
            const grid = document.getElementById('townshipGrid');
            if (grid) {
                grid.className = `township-grid cursor-${type}`;
                
                // Show available areas for building placement
                if (type !== 'crop') {
                    this.highlightAvailableAreas(tool);
                }
            }
        }
    }

    highlightAvailableAreas(buildingType) {
        const config = TOWNSHIP_BUILDINGS[buildingType];
        if (!config) return;

        const grid = document.getElementById('townshipGrid');
        if (!grid) return;

        // Remove previous highlights
        document.querySelectorAll('.available-area').forEach(el => el.classList.remove('available-area'));

        // Check each position for availability
        for (let y = 0; y <= this.gridSize - config.height; y++) {
            for (let x = 0; x <= this.gridSize - config.width; x++) {
                if (this.isAreaClear(x, y, config.width, config.height)) {
                    // Highlight available area
                    for (let dy = 0; dy < config.height; dy++) {
                        for (let dx = 0; dx < config.width; dx++) {
                            const cell = grid.querySelector(`[data-x="${x + dx}"][data-y="${y + dy}"]`);
                            if (cell) {
                                cell.classList.add('available-area');
                            }
                        }
                    }
                }
            }
        }
    }

    // Rendering
    renderTownship() {
        const grid = document.getElementById('townshipGrid');
        if (!grid) return;

        grid.innerHTML = '';
        
        // For large areas, render only visible portion (viewport system)
        const viewportSize = 15; // Show 15x15 cells at a time
        const startX = Math.max(0, Math.min(this.gridSize - viewportSize, this.viewOffsetX));
        const startY = Math.max(0, Math.min(this.gridSize - viewportSize, this.viewOffsetY));
        const endX = Math.min(this.gridSize, startX + viewportSize);
        const endY = Math.min(this.gridSize, startY + viewportSize);
        
        const visibleWidth = endX - startX;
        const visibleHeight = endY - startY;
        
        grid.style.gridTemplateColumns = `repeat(${visibleWidth}, 1fr)`;
        grid.style.gridTemplateRows = `repeat(${visibleHeight}, 1fr)`;
        
        // Add viewport indicator
        const viewportInfo = document.getElementById('viewportInfo') || document.createElement('div');
        viewportInfo.id = 'viewportInfo';
        viewportInfo.style.cssText = `
            position: absolute;
            top: 10px;
            right: 10px;
            background: rgba(0,0,0,0.7);
            color: white;
            padding: 5px 10px;
            border-radius: 5px;
            font-size: 0.8em;
            z-index: 1000;
        `;
        viewportInfo.innerHTML = `
            📍 Area: ${startX}-${endX-1}, ${startY}-${endY-1}<br>
            🗺️ Total: ${this.gridSize}x${this.gridSize} hektar
        `;
        
        if (!document.getElementById('viewportInfo')) {
            document.querySelector('.game-container').appendChild(viewportInfo);
        }

        // Create visible grid cells
        for (let y = startY; y < endY; y++) {
            for (let x = startX; x < endX; x++) {
                const cell = document.createElement('div');
                cell.className = 'township-cell';
                cell.dataset.x = x;
                cell.dataset.y = y;
                cell.addEventListener('click', () => this.handleCellClick(x, y));

                // Add coordinate display for large area navigation
                const coordDisplay = document.createElement('div');
                coordDisplay.style.cssText = `
                    position: absolute;
                    top: 2px;
                    left: 2px;
                    font-size: 0.6em;
                    color: #666;
                    pointer-events: none;
                `;
                coordDisplay.textContent = `${x},${y}`;
                cell.appendChild(coordDisplay);

                const item = this.grid[y][x];
                if (item) {
                    const element = this.createGameElement(item);
                    cell.appendChild(element);
                }

                grid.appendChild(cell);
            }
        }
        
        // Apply terrain generation after cells are created
        setTimeout(() => {
            this.generateRealisticTerrain();
        }, 50);
        
        // Add mini-map for large area navigation
        this.updateMiniMap();
    }

    updateMiniMap() {
        let miniMap = document.getElementById('miniMap');
        if (!miniMap) {
            miniMap = document.createElement('div');
            miniMap.id = 'miniMap';
            miniMap.style.cssText = `
                position: absolute;
                bottom: 10px;
                left: 10px;
                width: 120px;
                height: 120px;
                background: rgba(255,255,255,0.9);
                border: 2px solid #4CAF50;
                border-radius: 8px;
                z-index: 1000;
                cursor: pointer;
            `;
            document.querySelector('.game-container').appendChild(miniMap);
        }
        
        miniMap.innerHTML = '';
        
        // Create mini-map grid
        const miniGrid = document.createElement('div');
        miniGrid.style.cssText = `
            display: grid;
            grid-template-columns: repeat(${this.gridSize}, 1fr);
            grid-template-rows: repeat(${this.gridSize}, 1fr);
            width: 100%;
            height: 100%;
            gap: 0;
        `;
        
        for (let y = 0; y < this.gridSize; y++) {
            for (let x = 0; x < this.gridSize; x++) {
                const miniCell = document.createElement('div');
                miniCell.style.cssText = `
                    width: 100%;
                    height: 100%;
                    border: 0.5px solid #ddd;
                `;
                
                const item = this.grid[y][x];
                if (item) {
                    if (item.type === 'building') {
                        if (item.buildingType.includes('Farm') || item.buildingType === 'farm') {
                            miniCell.style.backgroundColor = '#8BC34A'; // Green for farms
                        } else {
                            miniCell.style.backgroundColor = '#2196F3'; // Blue for buildings
                        }
                    }
                } else {
                    miniCell.style.backgroundColor = '#E8F5E8'; // Light green for empty land
                }
                
                // Highlight current viewport
                if (x >= this.viewOffsetX && x < this.viewOffsetX + 15 && 
                    y >= this.viewOffsetY && y < this.viewOffsetY + 15) {
                    miniCell.style.border = '1px solid #FF5722';
                    miniCell.style.boxShadow = 'inset 0 0 2px #FF5722';
                }
                
                // Click to navigate
                miniCell.addEventListener('click', () => {
                    this.viewOffsetX = Math.max(0, Math.min(this.gridSize - 15, x - 7));
                    this.viewOffsetY = Math.max(0, Math.min(this.gridSize - 15, y - 7));
                    this.renderTownship();
                });
                
                miniGrid.appendChild(miniCell);
            }
        }
        
        miniMap.appendChild(miniGrid);
        
        // Add mini-map title
        const miniTitle = document.createElement('div');
        miniTitle.style.cssText = `
            position: absolute;
            top: -25px;
            left: 0;
            font-size: 0.7em;
            font-weight: bold;
            color: #4CAF50;
        `;
        miniTitle.textContent = '🗺️ Peta Kawasan';
        miniMap.appendChild(miniTitle);
    }

    createGameElement(item) {
        const element = document.createElement('div');
        element.className = `township-element ${item.type}`;
        
        let icon = '';
        let content = '';
        
        if (item.type === 'building') {
            const config = TOWNSHIP_BUILDINGS[item.buildingType];
            if (!config) {
                console.error('Missing building config for:', item.buildingType);
                icon = '❓'; // Default icon for missing config
            } else {
                icon = config.icon;
                
                if (item.isBuilding) {
                    content = `<div class="build-progress" style="width: ${item.buildProgress}%"></div>`;
                    element.classList.add('building');
                } else if (['farm', 'vegetableFarm', 'riceFarm', 'fishPond'].includes(item.buildingType) && item.crop) {
                    // Show crop on any farm type
                    const cropConfig = TOWNSHIP_CROPS[item.crop.cropType];
                    if (cropConfig) {
                        if (item.crop.ready) {
                            icon = cropConfig.icon;
                            element.classList.add('ready-harvest');
                            element.addEventListener('click', (e) => {
                                e.stopPropagation();
                                this.harvestCrop(item.crop);
                            });
                        } else {
                            icon = '🌱';
                            content = `<div class="grow-progress" style="width: ${item.crop.growProgress || 0}%"></div>`;
                        }
                    } else {
                        console.error('Missing crop config for:', item.crop.cropType);
                        icon = '🌱'; // Default crop icon
                    }
                } else if (config.produces && item.isProducing && item.productionProgress !== undefined) {
                    content = `<div class="production-progress" style="width: ${item.productionProgress}%"></div>`;
                }
            }
        }

        element.innerHTML = `
            <div class="element-icon">${icon}</div>
            ${content}
        `;

        return element;
    }

    getAreaStatistics() {
        const stats = {
            totalCells: this.gridSize * this.gridSize,
            occupiedCells: 0,
            farmCells: 0,
            buildingCells: 0,
            emptyLand: 0
        };

        for (let y = 0; y < this.gridSize; y++) {
            for (let x = 0; x < this.gridSize; x++) {
                const cell = this.grid[y][x];
                if (cell) {
                    stats.occupiedCells++;
                    if (cell.type === 'building') {
                        if (cell.buildingType.includes('Farm') || cell.buildingType === 'farm') {
                            stats.farmCells++;
                        } else {
                            stats.buildingCells++;
                        }
                    }
                } else {
                    stats.emptyLand++;
                }
            }
        }

        return stats;
    }

    // Game initialization and start method
    start() {
        // Load saved game if exists
        this.load();
        
        // Initialize time and season system
        this.initializeTimeAndSeason();
        
        // Initialize UI
        this.updateUI();
        this.updateToolbar();
        this.renderTownship();
        
        // Start game timer for auto-save
        this.gameTimer = setInterval(() => {
            this.save();
        }, 30000); // Auto-save every 30 seconds
        
        // Show welcome message
        const program = this.getCurrentProgram();
        showTownshipNotification(`🎮 Selamat datang di ${program.name}! "${program.slogan}"`, 'success', 4000);
        
        console.log('Township Transmigrasi Game started successfully!');
    }

    // Auto-expand functionality for realistic transmigration development
    autoExpandSettlement() {
        const centerX = Math.floor(this.gridSize / 2);
        const centerY = Math.floor(this.gridSize / 2);
        
        // Create a basic settlement layout if area is mostly empty
        const stats = this.getAreaStatistics();
        if (stats.occupiedCells < 20) {
            showTownshipNotification('🏗️ Memulai pengembangan kawasan transmigrasi...', 'info', 3000);
            
            // Place some basic infrastructure
            this.autoPlaceBasicInfrastructure(centerX, centerY);
        }
    }

    autoPlaceBasicInfrastructure(centerX, centerY) {
        const basicBuildings = [
            { type: 'transmigrantHouse', count: 3, radius: 2 },
            { type: 'farm', count: 4, radius: 4 },
            { type: 'vegetableFarm', count: 2, radius: 3 }
        ];

        basicBuildings.forEach(({ type, count, radius }) => {
            for (let i = 0; i < count; i++) {
                const angle = (i / count) * 2 * Math.PI;
                const x = Math.floor(centerX + Math.cos(angle) * radius);
                const y = Math.floor(centerY + Math.sin(angle) * radius);
                
                if (x >= 0 && x < this.gridSize - 2 && y >= 0 && y < this.gridSize - 2) {
                    if (this.isAreaClear(x, y, 2, 2)) {
                        this.placeBuilding(type, x, y);
                    }
                }
            }
        });
    }

    // Enhanced free farms for larger area
    giveFreeFarms() {
        let farmsPlaced = 0;
        const farmTypes = ['farm', 'vegetableFarm', 'riceFarm'];
        const targetFarms = 8; // More farms for larger area
        
        // Try to place farms in different sectors of the large area
        const sectors = [
            { startX: 2, startY: 2, endX: 10, endY: 10 },           // Northwest
            { startX: 15, startY: 2, endX: 23, endY: 10 },          // Northeast  
            { startX: 2, startY: 15, endX: 10, endY: 23 },          // Southwest
            { startX: 15, startY: 15, endX: 23, endY: 23 },         // Southeast
            { startX: 10, startY: 10, endX: 15, endY: 15 }          // Center
        ];
        
        for (let sectorIndex = 0; sectorIndex < sectors.length && farmsPlaced < targetFarms; sectorIndex++) {
            const sector = sectors[sectorIndex];
            const farmType = farmTypes[sectorIndex % farmTypes.length];
            
            for (let y = sector.startY; y < sector.endY - 2 && farmsPlaced < targetFarms; y += 3) {
                for (let x = sector.startX; x < sector.endX - 2 && farmsPlaced < targetFarms; x += 3) {
                    if (this.isAreaClear(x, y, 2, 2)) {
                        const config = TOWNSHIP_BUILDINGS[farmType];
                        
                        const farm = {
                            id: this.nextId++,
                            type: 'building',
                            buildingType: farmType,
                            x: x,
                            y: y,
                            width: 2,
                            height: 2,
                            isBuilding: false,
                            buildProgress: 100
                        };
                        
                        this.placeOnGrid(farm, x, y, 2, 2);
                        this.buildings.push(farm);
                        farmsPlaced++;
                    }
                }
            }
        }
        
        if (farmsPlaced > 0) {
            showTownshipNotification(`🚜 KAWASAN TRANSMIGRASI: ${farmsPlaced} ladang tersebar di area ${this.gridSize}x${this.gridSize}! Sekarang bisa bertani di kawasan luas!`, 'success', 5000);
            this.renderTownship();
            this.updateUI();
            this.save();
        } else {
            showTownshipNotification(`❌ Area ${this.gridSize}x${this.gridSize} penuh! Gunakan bulldozer untuk membersihkan lahan.`, 'warning', 4000);
        }
    }

    // Helper methods for game functionality
    formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    }

    getItemIcon(item) {
        const icons = {
            // Crops
            rice: '🌾',
            vegetables: '🥬',
            spices: '🌶️',
            medicinalPlants: '🌿',
            exportCrops: '☕',
            freshwaterFish: '🐟',
            
            // T² Land Certificate Process
            landSurvey: '📐',
            landDocuments: '📄',
            landVerification: '🔍',
            legalCertificates: '📜',
            
            // Products
            localProducts: '🏺',
            trainedCadres: '👨‍🎓',
            industrialProducts: '⚙️',
            tourismAssets: '🎭',
            collaborationAgreements: '📋',
            processedFood: '🍱',
            
            // Resources
            infrastructure: '🏗️',
            communityUnits: '🏢',
            socialHarmony: '☯️'
        };
        return icons[item] || '📦';
    }

    getItemName(item) {
        const names = {
            // Crops
            rice: 'Padi',
            vegetables: 'Sayuran',
            spices: 'Rempah-rempah',
            medicinalPlants: 'Tanaman Obat',
            exportCrops: 'Komoditas Ekspor',
            freshwaterFish: 'Ikan Air Tawar',
            
            // T² Land Certificate Process
            landSurvey: 'Survey Lahan',
            landDocuments: 'Berkas Kelengkapan',
            landVerification: 'Verifikasi Data',
            legalCertificates: 'Sertifikat Hak Tanah',
            
            // Products
            localProducts: 'Produk Lokal',
            trainedCadres: 'Kader Terlatih',
            industrialProducts: 'Produk Industri',
            tourismAssets: 'Aset Wisata',
            collaborationAgreements: 'Perjanjian Kerjasama',
            processedFood: 'Makanan Olahan',
            
            // Resources
            infrastructure: 'Infrastruktur',
            communityUnits: 'Unit Komunitas',
            socialHarmony: 'Harmoni Sosial'
        };
        return names[item] || item;
    }

    // Emergency and helper functions
    checkDailyBonus() {
        const lastBonus = localStorage.getItem('lastDailyBonus');
        const today = new Date().toDateString();
        
        if (lastBonus !== today) {
            this.coins += 500;
            this.inventory.landSurvey = (this.inventory.landSurvey || 0) + 3;
            this.inventory.landDocuments = (this.inventory.landDocuments || 0) + 2;
            
            localStorage.setItem('lastDailyBonus', today);
            showTownshipNotification('🎁 Bonus harian: +500 koin, +3 survey, +2 dokumen!', 'success', 4000);
            this.updateUI();
            this.save();
        } else {
            showTownshipNotification('🎁 Bonus harian sudah diambil hari ini!', 'info', 2000);
        }
    }

    watchAdForCoins() {
        // Simulate watching ad
        const bonus = Math.floor(Math.random() * 300) + 200;
        this.coins += bonus;
        showTownshipNotification(`📺 Terima kasih! +${bonus} koin dari iklan!`, 'success', 3000);
        this.updateUI();
        this.save();
    }

    quickSellAll() {
        let totalEarnings = 0;
        const sellPrices = {
            rice: 15, vegetables: 12, spices: 25, medicinalPlants: 40,
            exportCrops: 70, freshwaterFish: 50, localProducts: 60,
            trainedCadres: 200, industrialProducts: 300, tourismAssets: 400,
            collaborationAgreements: 600, processedFood: 150
        };
        
        Object.entries(this.inventory).forEach(([item, quantity]) => {
            if (quantity > 0 && sellPrices[item]) {
                const earnings = quantity * sellPrices[item];
                totalEarnings += earnings;
                this.inventory[item] = 0;
            }
        });
        
        if (totalEarnings > 0) {
            this.coins += totalEarnings;
            showTownshipNotification(`🚀 Jual semua: +${totalEarnings} koin!`, 'success', 3000);
            this.updateUI();
            this.save();
        } else {
            showTownshipNotification('❌ Tidak ada yang bisa dijual!', 'warning', 2000);
        }
    }

    giveEmergencyCertificates() {
        this.inventory.legalCertificates = (this.inventory.legalCertificates || 0) + 10;
        this.missionProgress.level1.legalCertificatesIssued += 10;
        showTownshipNotification('📜 Emergency: +10 Sertifikat Hak Tanah!', 'success', 3000);
        this.updateUI();
        this.save();
    }

    giveStarterMaterials() {
        this.inventory.landSurvey = (this.inventory.landSurvey || 0) + 10;
        this.inventory.landDocuments = (this.inventory.landDocuments || 0) + 8;
        this.inventory.landVerification = (this.inventory.landVerification || 0) + 5;
        showTownshipNotification('📋 Starter pack: Survey, dokumen, dan verifikasi!', 'success', 3000);
        this.updateUI();
        this.save();
    }

    giveEmergencyCoins() {
        this.coins += 2000;
        showTownshipNotification('💊 Emergency: +2000 koin!', 'success', 3000);
        this.updateUI();
        this.save();
    }

    fixDataSync() {
        this.synchronizeCounters();
        showTownshipNotification('🔧 Data disinkronisasi!', 'success', 2000);
        this.updateUI();
        this.save();
    }

    sellInventoryItem(item, quantity) {
        const available = this.inventory[item] || 0;
        if (available < quantity) {
            showTownshipNotification('❌ Tidak cukup item!', 'error', 2000);
            return;
        }
        
        const sellPrices = {
            rice: 15, vegetables: 12, spices: 25, medicinalPlants: 40,
            exportCrops: 70, freshwaterFish: 50, landSurvey: 30,
            landDocuments: 25, landVerification: 40, legalCertificates: 100,
            localProducts: 60, trainedCadres: 200, industrialProducts: 300,
            tourismAssets: 400, collaborationAgreements: 600, processedFood: 150
        };
        
        const price = sellPrices[item] || 10;
        const earnings = price * quantity;
        
        this.inventory[item] -= quantity;
        this.coins += earnings;
        
        showTownshipNotification(`💰 Terjual: +${earnings} koin!`, 'success', 2000);
        this.updateUI();
        this.save();
    }

    // Navigation methods for large area
    panView(deltaX, deltaY) {
        this.viewOffsetX = Math.max(0, Math.min(this.gridSize - 15, this.viewOffsetX + deltaX));
        this.viewOffsetY = Math.max(0, Math.min(this.gridSize - 15, this.viewOffsetY + deltaY));
        this.renderTownship();
    }

    centerViewOnBuilding(buildingType) {
        const building = this.buildings.find(b => b.buildingType === buildingType);
        if (building) {
            this.viewOffsetX = Math.max(0, Math.min(this.gridSize - 15, building.x - 7));
            this.viewOffsetY = Math.max(0, Math.min(this.gridSize - 15, building.y - 7));
            this.renderTownship();
            showTownshipNotification(`📍 Menuju ${TOWNSHIP_BUILDINGS[buildingType].name}`, 'info', 2000);
        } else {
            showTownshipNotification(`❌ ${TOWNSHIP_BUILDINGS[buildingType].name} belum dibangun!`, 'warning', 2000);
        }
    }

    setZoomLevel(level) {
        this.zoomLevel = level;
        const grid = document.getElementById('townshipGrid');
        if (grid) {
            grid.style.transform = `scale(${level})`;
        }
        showTownshipNotification(`🔍 Zoom: ${Math.round(level * 100)}%`, 'info', 1500);
    }

    // Cell click handling
    handleCellClick(x, y) {
        if (!this.selectedTool) {
            // No tool selected - show item info or production menu
            const item = this.grid[y][x];
            if (item) {
                this.showItemInfo(item);
            }
            return;
        }

        const { tool, type } = this.selectedTool;

        // Handle bulldozer
        if (tool === 'bulldozer') {
            this.demolishBuilding(x, y);
            return;
        }

        // Handle crop planting - prioritize this when crop tool is selected
        if (type === 'crop') {
            this.plantCrop(tool, x, y);
            return;
        }

        // Handle building placement
        if (type !== 'crop' && type !== 'tool') {
            const item = this.grid[y][x];
            if (item && !item.isBuilding) {
                // Existing completed building - show info instead of error
                this.showItemInfo(item);
                return;
            }
            
            this.placeBuilding(tool, x, y);
        }
    }

    showItemInfo(item) {
        if (!item) return;

        if (item.type === 'building') {
            const config = TOWNSHIP_BUILDINGS[item.buildingType];
            if (!config) return;

            if (item.isBuilding) {
                showTownshipNotification(`🏗️ ${config.name} sedang dibangun... ${Math.floor(item.buildProgress)}%`, 'info', 2000);
            } else if (config.produces && config.produces.length > 0) {
                showTownshipNotification(`🏭 ${config.name} siap produksi!`, 'info', 1000);
                setTimeout(() => {
                    this.showProductionMenu(item);
                }, 1200);
            } else {
                showTownshipNotification(`🏠 ${config.name} - ${config.description}`, 'info', 2000);
            }
        }
    }

    showProductionMenu(factory) {
        const config = TOWNSHIP_BUILDINGS[factory.buildingType];
        if (!config || !config.produces) return;

        if (factory.isProducing) {
            showTownshipNotification(`⏳ Sedang memproduksi... ${Math.floor(factory.productionProgress)}%`, 'info', 2000);
            return;
        }

        // Create production menu
        const menu = document.createElement('div');
        menu.className = 'production-menu';
        menu.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            border: 3px solid #4CAF50;
            border-radius: 15px;
            padding: 20px;
            z-index: 10000;
            max-width: 400px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        `;

        let menuHTML = `
            <h3 style="margin: 0 0 15px 0; color: #4CAF50; text-align: center;">
                ${config.icon} ${config.name}
            </h3>
            <div style="margin-bottom: 15px; text-align: center; color: #666;">
                Pilih produk yang ingin dibuat:
            </div>
        `;

        config.produces.forEach(productType => {
            const productConfig = TOWNSHIP_PRODUCTS[productType];
            if (!productConfig) return;

            const canProduce = this.canProduceProduct(productType);
            const ingredientsList = Object.entries(productConfig.ingredients || {})
                .map(([ingredient, amount]) => {
                    const available = this.inventory[ingredient] || 0;
                    const hasEnough = available >= amount;
                    return `<span style="color: ${hasEnough ? '#4CAF50' : '#F44336'}">${this.getItemIcon(ingredient)} ${amount}</span>`;
                }).join(' + ');

            menuHTML += `
                <div style="
                    border: 2px solid ${canProduce ? '#4CAF50' : '#ccc'};
                    border-radius: 10px;
                    padding: 10px;
                    margin: 10px 0;
                    ${canProduce ? 'cursor: pointer;' : 'opacity: 0.6;'}
                " ${canProduce ? `onclick="game.startProduction(game.buildings.find(b => b.id === ${factory.id}), '${productType}'); document.querySelector('.production-menu').remove();"` : ''}>
                    <div style="font-weight: bold; margin-bottom: 5px;">
                        ${productConfig.icon} ${productConfig.name}
                    </div>
                    <div style="font-size: 0.8em; color: #666; margin-bottom: 5px;">
                        ${productConfig.description}
                    </div>
                    <div style="font-size: 0.8em;">
                        Bahan: ${ingredientsList || 'Tidak perlu bahan'}
                    </div>
                    <div style="font-size: 0.8em; color: #666;">
                        Waktu: ${Math.floor(productConfig.productionTime / 1000)} detik
                    </div>
                </div>
            `;
        });

        menuHTML += `
            <div style="text-align: center; margin-top: 15px;">
                <button onclick="document.querySelector('.production-menu').remove();" style="
                    background: #f44336;
                    color: white;
                    border: none;
                    padding: 8px 16px;
                    border-radius: 5px;
                    cursor: pointer;
                    font-weight: bold;
                ">Tutup</button>
            </div>
        `;

        menu.innerHTML = menuHTML;
        document.body.appendChild(menu);
    }

    canProduceProduct(productType) {
        const productConfig = TOWNSHIP_PRODUCTS[productType];
        if (!productConfig) return false;

        for (const [ingredient, amount] of Object.entries(productConfig.ingredients || {})) {
            const available = this.inventory[ingredient] || 0;
            if (available < amount) {
                return false;
            }
        }
        return true;
    }

    demolishBuilding(x, y) {
        const item = this.grid[y][x];
        if (!item || item.type !== 'building') {
            showTownshipNotification('❌ Tidak ada bangunan di sini!', 'error', 2000);
            return;
        }

        const config = TOWNSHIP_BUILDINGS[item.buildingType];
        if (!config) return;

        // Refund 50% of cost
        const refund = Math.floor(config.cost * 0.5);
        this.coins += refund;

        // Remove from grid and buildings array
        this.removeFromGrid(item);
        this.buildings = this.buildings.filter(b => b.id !== item.id);

        showTownshipNotification(`🚜 ${config.name} dihancurkan! +${refund} koin refund`, 'info', 3000);
        
        this.renderTownship();
        this.updateUI();
        this.save();
    }

    autoPlaceFarmForCrop(cropType) {
        // Determine best farm type for the crop
        let farmType = 'farm'; // default
        
        if (cropType === 'rice') {
            farmType = 'riceFarm';
        } else if (['vegetables', 'spices', 'medicinalPlants'].includes(cropType)) {
            farmType = 'vegetableFarm';
        } else if (cropType === 'freshwaterFish') {
            farmType = 'fishPond';
        }

        // Find empty space near center of current view
        const centerX = this.viewOffsetX + 7;
        const centerY = this.viewOffsetY + 7;
        
        // Search in expanding circles from center
        for (let radius = 1; radius <= 10; radius++) {
            for (let angle = 0; angle < 360; angle += 45) {
                const x = Math.floor(centerX + Math.cos(angle * Math.PI / 180) * radius);
                const y = Math.floor(centerY + Math.sin(angle * Math.PI / 180) * radius);
                
                if (x >= 0 && y >= 0 && x < this.gridSize - 2 && y < this.gridSize - 2) {
                    if (this.isAreaClear(x, y, 2, 2)) {
                        const success = this.placeBuilding(farmType, x, y);
                        if (success) {
                            // Center view on new farm
                            this.viewOffsetX = Math.max(0, Math.min(this.gridSize - 15, x - 7));
                            this.viewOffsetY = Math.max(0, Math.min(this.gridSize - 15, y - 7));
                            this.renderTownship();
                            return true;
                        }
                    }
                }
            }
        }
        
        showTownshipNotification(`❌ Tidak ada ruang untuk ${TOWNSHIP_BUILDINGS[farmType].name}! Bersihkan area dulu.`, 'error', 4000);
        return false;
    }

    // Debug function to check production issues
    debugProduction(buildingType = 'industrialPark') {
        console.log('=== DEBUG PRODUCTION ===');
        console.log('Current inventory:', this.inventory);
        
        const building = this.buildings.find(b => b.buildingType === buildingType);
        if (!building) {
            console.log(`❌ Building ${buildingType} not found!`);
            showTownshipNotification(`❌ ${buildingType} belum dibangun!`, 'error', 3000);
            return;
        }
        
        console.log('Building status:', {
            id: building.id,
            isProducing: building.isProducing,
            productionProgress: building.productionProgress,
            productType: building.productType
        });
        
        const config = TOWNSHIP_BUILDINGS[buildingType];
        console.log('Building config:', config);
        
        if (config.produces) {
            config.produces.forEach(productType => {
                const productConfig = TOWNSHIP_PRODUCTS[productType];
                console.log(`\n--- Product: ${productType} ---`);
                console.log('Product config:', productConfig);
                
                if (productConfig.ingredients) {
                    Object.entries(productConfig.ingredients).forEach(([ingredient, needed]) => {
                        const available = this.inventory[ingredient] || 0;
                        console.log(`${ingredient}: need ${needed}, have ${available} ${available >= needed ? '✅' : '❌'}`);
                    });
                }
                
                const canProduce = this.canProduceProduct(productType);
                console.log(`Can produce: ${canProduce ? '✅' : '❌'}`);
            });
        }
        
        showTownshipNotification('🔍 Debug info di console browser (F12)', 'info', 3000);
    }

    debugProductionMenu() {
        this.debugProduction('industrialPark');
    }

    giveIndustrialIngredients() {
        this.inventory.exportCrops = (this.inventory.exportCrops || 0) + 10;
        this.inventory.trainedCadres = (this.inventory.trainedCadres || 0) + 10;
        showTownshipNotification('🎁 Bahan industri diberikan! Cek inventory.', 'success');
        this.updateUI();
        this.save();
    }

    giveSocialHarmony() {
        this.inventory.socialHarmony = (this.inventory.socialHarmony || 100) + 25;
        // Update mission progress to sync socialHarmonyLevel
        this.updateMissionProgress();
        showTownshipNotification('☯️ +25 Harmoni Sosial diberikan!', 'success');
        this.updateUI();
        this.save();
    }

    // Enhanced terrain generation for realistic backgrounds
    generateRealisticTerrain() {
        const grid = document.getElementById('townshipGrid');
        if (!grid) return;

        const cells = grid.querySelectorAll('.township-cell');
        
        cells.forEach((cell) => {
            const x = parseInt(cell.dataset.x);
            const y = parseInt(cell.dataset.y);
            
            // Remove existing terrain classes
            cell.classList.remove('water-area', 'fertile-soil', 'mountain-area', 'forest-area');
            
            // Generate terrain based on position and randomness
            const terrainSeed = (y * 7 + x * 11) % 100;
            const distanceFromCenter = Math.sqrt(Math.pow(x - this.gridSize/2, 2) + Math.pow(y - this.gridSize/2, 2));
            
            // Create natural terrain patterns
            if (terrainSeed < 12) {
                // Water areas near edges or in natural clusters
                if (x === 0 || x === this.gridSize - 1 || 
                    y === 0 || y === this.gridSize - 1 || 
                    (terrainSeed < 5 && Math.random() < 0.4)) {
                    cell.classList.add('water-area');
                }
            } else if (terrainSeed < 20 && distanceFromCenter > this.gridSize * 0.3) {
                // Mountain areas in outer regions
                if (Math.random() < 0.3) {
                    cell.classList.add('mountain-area');
                }
            } else if (terrainSeed < 35) {
                // Forest areas scattered naturally
                if (Math.random() < 0.25) {
                    cell.classList.add('forest-area');
                }
            } else if (terrainSeed < 65 && distanceFromCenter < this.gridSize * 0.4) {
                // Fertile soil in central farming areas
                if (Math.random() < 0.6) {
                    cell.classList.add('fertile-soil');
                }
            }
            
            // Add subtle random brightness variations
            if (Math.random() < 0.15) {
                const brightness = 0.85 + Math.random() * 0.3;
                cell.style.filter = `brightness(${brightness}) saturate(${0.9 + Math.random() * 0.2})`;
            }
        });
    }

    // Dynamic time and season system
    initializeTimeAndSeason() {
        this.gameTime = {
            hour: 8, // Start at 8 AM
            day: 1,
            season: 'spring' // spring, summer, autumn, winter
        };
        
        // Update time every 30 seconds (1 game hour)
        setInterval(() => {
            this.updateGameTime();
        }, 30000);
        
        // Apply initial time effects
        this.applyTimeEffects();
    }

    updateGameTime() {
        this.gameTime.hour++;
        
        if (this.gameTime.hour >= 24) {
            this.gameTime.hour = 0;
            this.gameTime.day++;
            
            // Change season every 30 days
            if (this.gameTime.day % 30 === 0) {
                this.changeSeason();
            }
        }
        
        this.applyTimeEffects();
    }

    changeSeason() {
        const seasons = ['spring', 'summer', 'autumn', 'winter'];
        const currentIndex = seasons.indexOf(this.gameTime.season);
        this.gameTime.season = seasons[(currentIndex + 1) % seasons.length];
        
        // Apply seasonal effects to all cells
        this.applySeasonalEffects();
        
        // Show season change notification
        showTownshipNotification(`🌸 Musim ${this.getSeasonName()} telah tiba!`, 'info', 5000);
    }

    getSeasonName() {
        const seasonNames = {
            spring: 'Semi',
            summer: 'Panas', 
            autumn: 'Gugur',
            winter: 'Hujan'
        };
        return seasonNames[this.gameTime.season] || 'Semi';
    }

    applyTimeEffects() {
        const grid = document.getElementById('townshipGrid');
        if (!grid) return;
        
        // Remove previous time classes
        grid.classList.remove('morning', 'afternoon', 'evening', 'night');
        
        // Apply time-based class
        if (this.gameTime.hour >= 6 && this.gameTime.hour < 12) {
            grid.classList.add('morning');
        } else if (this.gameTime.hour >= 12 && this.gameTime.hour < 18) {
            grid.classList.add('afternoon');
        } else if (this.gameTime.hour >= 18 && this.gameTime.hour < 22) {
            grid.classList.add('evening');
        } else {
            grid.classList.add('night');
        }
    }

    applySeasonalEffects() {
        const cells = document.querySelectorAll('.township-cell');
        
        cells.forEach(cell => {
            // Remove previous season classes
            cell.classList.remove('spring-season', 'summer-season', 'autumn-season', 'winter-season');
            
            // Apply current season class
            cell.classList.add(`${this.gameTime.season}-season`);
        });
    }

    getRequiredExperience() {
        return this.level * 100;
    }

    updateProgramInfo() {
        const program = this.getCurrentProgram();
        const programInfoElement = document.getElementById('programInfo');
        if (programInfoElement) {
            programInfoElement.innerHTML = `
                <div class="program-badge" style="background: ${program.color};">
                    <div class="program-level">Level ${this.level}</div>
                    <div class="program-name">${program.name}</div>
                    <div class="program-slogan">"${program.slogan}"</div>
                </div>
            `;
        }
    }

    updateSpecialResourcesDisplay() {
        const specialResources = document.getElementById('specialResources');
        if (specialResources) {
            let resourceHTML = '';
            
            if (this.level >= 1) {
                resourceHTML += `<div class="resource-item">📜 Sertifikat Lahan: ${this.missionProgress.level1.legalCertificatesIssued}</div>`;
            }
            if (this.level >= 2) {
                // Use mission progress as source of truth for local potential
                resourceHTML += `<div class="resource-item">💎 Potensi Lokal: ${this.missionProgress.level2.localPotentialDeveloped}</div>`;
            }
            if (this.level >= 3) {
                resourceHTML += `<div class="resource-item">🦅 Kader Patriot: ${this.missionProgress.level3.patriotCadresTrained}</div>`;
            }
            if (this.level >= 4) {
                resourceHTML += `<div class="resource-item">💰 Sentra Ekonomi: ${this.missionProgress.level4.economicCentersCreated}</div>`;
            }
            if (this.level >= 5) {
                resourceHTML += `<div class="resource-item">🤝 Kemitraan: ${this.missionProgress.level5.collaborationAgreementsFormed}</div>`;
            }
            
            specialResources.innerHTML = resourceHTML;
        }
    }
}

// Game Configuration - Transmigrasi Indonesia Programs
const TOWNSHIP_BUILDINGS = {
    // Level 1: Trans Tuntas (T²) - Land Resolution
    landOffice: {
        name: 'Kantor Pertanahan',
        icon: '🏛️',
        cost: 500,
        width: 3,
        height: 2,
        category: 'administrative',
        produces: ['legalCertificates', 'landVerification'], // Final processing
        buildTime: 10000, // 10 seconds (was 1 minute)
        unlockLevel: 1,
        description: 'Kantor BPN untuk penerbitan sertifikat tanah resmi'
    },
    
    surveyPost: {
        name: 'Pos Survey',
        icon: '📐',
        cost: 200,
        width: 2,
        height: 1,
        category: 'administrative',
        produces: ['landSurvey', 'landDocuments'], // Initial steps
        buildTime: 5000, // 5 seconds (was 30 seconds)
        unlockLevel: 1,
        description: 'Melakukan survey, pengukuran, dan pengumpulan dokumen'
    },

    // New: Document Processing Center
    documentCenter: {
        name: 'Pusat Pelayanan',
        icon: '📋',
        cost: 300,
        width: 2,
        height: 2,
        category: 'administrative',
        produces: ['landDocuments', 'landVerification'],
        buildTime: 7000, // 7 seconds (was 45 seconds)
        unlockLevel: 1,
        description: 'Pusat pengumpulan dan verifikasi dokumen tanah'
    },

    transmigrantHouse: {
        name: 'Rumah Transmigran',
        icon: '🏠',
        cost: 200,
        width: 2,
        height: 2,
        category: 'residential',
        population: 4,
        happiness: 10,
        buildTime: 5000, // 5 seconds (was 30 seconds)
        unlockLevel: 1,
        description: 'Tempat tinggal untuk keluarga transmigran'
    },

    // Level 2: Translok - Local Development
    villageCenter: {
        name: 'Balai Desa',
        icon: '🏘️',
        cost: 500,
        width: 3,
        height: 2,
        category: 'community',
        happiness: 20,
        produces: ['localProducts'],
        buildTime: 10000, // 10 seconds (was 1 minute)
        unlockLevel: 2,
        description: 'Pusat kegiatan masyarakat lokal'
    },

    localMarket: {
        name: 'Pasar Lokal',
        icon: '🏪',
        cost: 400,
        width: 2,
        height: 3,
        category: 'commercial',
        happiness: 15,
        buildTime: 8000, // 8 seconds (was 50 seconds)
        unlockLevel: 2,
        description: 'Memasarkan produk lokal'
    },

    // Level 3: Patriot - Cadre Development
    trainingCenter: {
        name: 'Pusat Pelatihan',
        icon: '🎓',
        cost: 800,
        width: 3,
        height: 3,
        category: 'education',
        produces: ['trainedCadres'],
        buildTime: 12000, // 12 seconds (was 1 minute 20 seconds)
        unlockLevel: 3,
        description: 'Melatih kader pembangunan'
    },

    communityUnit: {
        name: 'Unit Usaha Komunitas',
        icon: '🏢',
        cost: 600,
        width: 2,
        height: 2,
        category: 'economic',
        produces: ['communityUnits', 'processedFood', 'localProducts'],
        buildTime: 10000, // 10 seconds (was 1 minute 10 seconds)
        unlockLevel: 3,
        description: 'Unit usaha berbasis komunitas'
    },

    // Level 4: Karya Nusa - Economic Centers
    industrialPark: {
        name: 'Kawasan Industri',
        icon: '🏭',
        cost: 1500,
        width: 4,
        height: 3,
        category: 'industrial',
        produces: ['industrialProducts'],
        buildTime: 20000, // 20 seconds (was 2 minutes)
        unlockLevel: 4,
        description: 'Zona pengembangan industri'
    },

    tourismHub: {
        name: 'Pusat Wisata',
        icon: '🏖️',
        cost: 1000,
        width: 3,
        height: 4,
        category: 'tourism',
        produces: ['tourismAssets'],
        happiness: 30,
        buildTime: 15000, // 15 seconds (was 1 minute 40 seconds)
        unlockLevel: 4,
        description: 'Destinasi wisata unggulan'
    },

    // Level 5: Gotong Royong - Collaboration
    partnershipHall: {
        name: 'Gedung Kemitraan',
        icon: '🤝',
        cost: 2000,
        width: 4,
        height: 4,
        category: 'partnership',
        produces: ['collaborationAgreements'],
        happiness: 40,
        buildTime: 25000, // 25 seconds (was 2.5 minutes)
        unlockLevel: 5,
        description: 'Pusat kemitraan multi-pihak'
    },

    // Farming buildings for all levels
    riceFarm: {
        name: 'Sawah',
        icon: '🌾',
        cost: 150,
        width: 2,
        height: 2,
        category: 'farming',
        buildTime: 3000, // 3 seconds (was 20 seconds)
        unlockLevel: 1,
        description: 'Lahan untuk menanam padi'
    },

    vegetableFarm: {
        name: 'Kebun Sayur',
        icon: '🥬',
        cost: 100,
        width: 2,
        height: 2,
        category: 'farming',
        buildTime: 2000, // 2 seconds (was 15 seconds)
        unlockLevel: 1,
        description: 'Lahan untuk sayuran'
    },

    fishPond: {
        name: 'Kolam Ikan',
        icon: '🐟',
        cost: 250,
        width: 3,
        height: 2,
        category: 'aquaculture',
        buildTime: 5000, // 5 seconds (was 40 seconds)
        unlockLevel: 2,
        description: 'Budidaya ikan air tawar'
    },

    // Generic farm alias
    farm: {
        name: 'Ladang',
        icon: '🌾',
        cost: 100,
        width: 2,
        height: 2,
        category: 'farming',
        buildTime: 2000, // 2 seconds (was 15 seconds)
        unlockLevel: 1,
        description: 'Lahan pertanian serbaguna'
    }
};

const TOWNSHIP_CROPS = {
    // Traditional crops for all levels
    rice: {
        name: 'Padi',
        icon: '🌾',
        growTime: 8000, // 8 seconds (was 45 seconds)
        sellPrice: 8,
        experience: 3,
        unlockLevel: 1,
        description: 'Tanaman pokok Indonesia'
    },

    vegetables: {
        name: 'Sayuran',
        icon: '🥬',
        growTime: 5000, // 5 seconds (was 30 seconds)
        sellPrice: 5,
        experience: 2,
        unlockLevel: 1,
        description: 'Berbagai jenis sayuran lokal'
    },

    // Level 2+ crops
    spices: {
        name: 'Rempah-rempah',
        icon: '🌶️',
        growTime: 7000, // 7 seconds (was 40 seconds)
        sellPrice: 12,
        experience: 4,
        unlockLevel: 2,
        description: 'Rempah khas Indonesia'
    },

    // Level 3+ crops
    medicinalPlants: {
        name: 'Tanaman Obat',
        icon: '🌿',
        growTime: 10000, // 10 seconds (was 1 minute)
        sellPrice: 20,
        experience: 6,
        unlockLevel: 3,
        description: 'Tanaman untuk jamu tradisional'
    },

    // Level 4+ crops
    exportCrops: {
        name: 'Komoditas Ekspor',
        icon: '☕',
        growTime: 15000, // 15 seconds (was 1.5 minutes)
        sellPrice: 35,
        experience: 10,
        unlockLevel: 4,
        description: 'Kopi, kakao, dan komoditas ekspor'
    },

    // Aquaculture
    freshwaterFish: {
        name: 'Ikan Air Tawar',
        icon: '🐟',
        growTime: 12000, // 12 seconds (was 1 minute 15 seconds)
        sellPrice: 25,
        experience: 8,
        unlockLevel: 2,
        description: 'Lele, nila, dan ikan lokal'
    }
};

const TOWNSHIP_PRODUCTS = {
    // T² Products - Realistic Land Certificate Process
    
    // Step 1: Survey dan Pengukuran
    landSurvey: {
        name: 'Survey Lahan',
        icon: '📐',
        ingredients: {}, // Basic service, no ingredients
        productionTime: 3000, // 3 seconds (was 15 seconds)
        sellPrice: 30,
        experience: 8,
        description: 'Pengukuran dan pemetaan bidang tanah'
    },
    
    // Step 2: Dokumen Legal
    landDocuments: {
        name: 'Berkas Kelengkapan',
        icon: '📄',
        ingredients: { landSurvey: 1 }, // Need survey first
        productionTime: 4000, // 4 seconds (was 20 seconds)
        sellPrice: 25,
        experience: 5,
        description: 'Pengumpulan dokumen identitas, pajak, dan riwayat tanah'
    },
    
    // Step 3: Verifikasi dan Validasi
    landVerification: {
        name: 'Verifikasi Data',
        icon: '🔍',
        ingredients: { landDocuments: 2 }, // Need multiple documents
        productionTime: 6000, // 6 seconds (was 30 seconds)
        sellPrice: 40,
        experience: 10,
        description: 'Pemeriksaan keabsahan data dan dokumen tanah'
    },
    
    // Step 4: Final Certificate
    legalCertificates: {
        name: 'Sertifikat Hak Tanah',
        icon: '📜',
        ingredients: { 
            landVerification: 1,
            landDocuments: 1 // Additional supporting docs
        },
        productionTime: 8000, // 8 seconds (was 45 seconds)
        sellPrice: 100,
        experience: 20,
        description: 'Sertifikat Hak Milik resmi dari BPN'
    },

    // Translok Products  
    localProducts: {
        name: 'Produk Lokal',
        icon: '🏺',
        ingredients: { vegetables: 2, spices: 1 },
        productionTime: 10000, // 10 seconds (was 1 minute)
        sellPrice: 30,
        experience: 8,
        description: 'Produk unggulan daerah'
    },

    // Patriot Products
    trainedCadres: {
        name: 'Kader Terlatih',
        icon: '👨‍🎓',
        ingredients: { localProducts: 2 },
        productionTime: 15000, // 15 seconds (was 1.5 minutes)
        sellPrice: 100,
        experience: 25,
        description: 'SDM berkualitas untuk pembangunan'
    },

    communityUnits: {
        name: 'Unit Komunitas',
        icon: '🏘️',
        ingredients: { vegetables: 3, spices: 1 },
        productionTime: 12000, // 12 seconds
        sellPrice: 80,
        experience: 20,
        description: 'Unit usaha mandiri berbasis komunitas'
    },

    // Karya Nusa Products
    industrialProducts: {
        name: 'Produk Industri',
        icon: '⚙️',
        ingredients: { exportCrops: 1, trainedCadres: 1 },
        productionTime: 20000, // 20 seconds (was 2 minutes)
        sellPrice: 150,
        experience: 30,
        description: 'Hasil industri pengolahan'
    },

    tourismAssets: {
        name: 'Aset Wisata',
        icon: '🎭',
        ingredients: { localProducts: 3, medicinalPlants: 1 },
        productionTime: 25000, // 25 seconds (was 2.5 minutes)
        sellPrice: 200,
        experience: 40,
        description: 'Paket wisata budaya dan alam'
    },

    // Gotong Royong Products
    collaborationAgreements: {
        name: 'Perjanjian Kerjasama',
        icon: '📋',
        ingredients: { industrialProducts: 1, tourismAssets: 1 },
        productionTime: 30000, // 30 seconds (was 3 minutes)
        sellPrice: 300,
        experience: 50,
        description: 'Kemitraan strategis multi-pihak'
    },

    // Food products
    processedFood: {
        name: 'Makanan Olahan',
        icon: '🍱',
        ingredients: { rice: 2, vegetables: 1, freshwaterFish: 1 },
        productionTime: 12000, // 12 seconds (was 1 minute 15 seconds)
        sellPrice: 75,
        experience: 20,
        description: 'Produk makanan siap saji'
    }
};

// Global game instance
let game;

// Screen management
function showTownshipScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

function startTownshipGame() {
    game = new TownshipGame();
    game.start();
    showTownshipScreen('gameScreen');
}

function backToMainMenu() {
    if (game) {
        game.save();
        clearInterval(game.gameTimer);
    }
    showTownshipScreen('mainMenu');
}

// Notification system
function showTownshipNotification(message, type = 'info', duration = 3000) {
    const notification = document.createElement('div');
    notification.className = `township-notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => notification.classList.add('show'), 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, duration);
}

// Celebration effect
function createTownshipCelebration() {
    const celebration = document.createElement('div');
    celebration.className = 'township-celebration';
    
    for (let i = 0; i < 30; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.animationDelay = Math.random() * 3 + 's';
        confetti.style.backgroundColor = ['#ffd700', '#ff6b6b', '#4ecdc4', '#45b7d1'][Math.floor(Math.random() * 4)];
        celebration.appendChild(confetti);
    }
    
    document.body.appendChild(celebration);
    
    setTimeout(() => celebration.remove(), 3000);
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    console.log('Township-style Transmigrasi Game loaded');
}); 