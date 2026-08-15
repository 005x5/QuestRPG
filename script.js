// ============================================================
// QuestRPG by 005x5
// ============================================================

// ------------------------------------------------------------
// DATEN
// ------------------------------------------------------------

const STORAGE_KEY = "questrpg_accounts_v5";
const CURRENT_KEY = "questrpg_current_v5";
const SETTINGS_KEY = "questrpg_settings_v5";

let accounts = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");

let currentUser = localStorage.getItem(CURRENT_KEY) || null;

let settings = JSON.parse(
    localStorage.getItem(SETTINGS_KEY) ||
    JSON.stringify({
        language: "de",
        emojis: true
    })
);

let currentScreen = "home";
let shopTab = "swords";
let currentEnemy = null;
let miningTimer = null;
let miningEnd = 0;

// ------------------------------------------------------------
// HILFSFUNKTIONEN
// ------------------------------------------------------------

function saveAccounts() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(accounts));
}

function saveSettings() {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

function saveCurrent() {
    if (currentUser) {
        localStorage.setItem(CURRENT_KEY, currentUser);
    } else {
        localStorage.removeItem(CURRENT_KEY);
    }
}

function player() {
    if (!currentUser || !accounts[currentUser]) return null;
    return accounts[currentUser];
}

function emoji(symbol) {
    return settings.emojis ? symbol : "";
}

function msg(text) {
    document.getElementById("message").textContent = text;
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function savePlayer() {
    if (player()) {
        accounts[currentUser] = player();
        saveAccounts();
    }
}

// ------------------------------------------------------------
// ACCOUNT
// ------------------------------------------------------------

function createAccount(username, password) {

    username = username.trim();

    if (!username) {
        alert("Bitte einen Benutzernamen eingeben.");
        return false;
    }

    // Keine Emojis/Sonderzeichen im Namen
    if (!/^[A-Za-z0-9_]+$/.test(username)) {
        alert("Der Benutzername darf nur Buchstaben, Zahlen und _ enthalten.");
        return false;
    }

    if (accounts[username]) {
        alert("Dieser Benutzername existiert bereits.");
        return false;
    }

    accounts[username] = {
        username,
        password,

        gold: 50,

        level: 1,
        xp: 0,

        health: 100,
        maxHealth: 100,

        damage: 10,

        sword: "Holzschwert",
        armor: "Keine",
        pickaxe: "Holzspitzhacke",

        swords: [],
        armors: [],
        pickaxes: [],

        potions: 3,

        stocks: 0,

        admin: username === "005x5",
        badge: username === "005x5" ? "🖳" : "",

        banned: false
    };

    saveAccounts();

    login(username, password);

    return true;
}

function login(username, password) {

    if (!accounts[username]) {
        alert("Account nicht gefunden.");
        return false;
    }

    if (accounts[username].banned) {
        alert("Dieser Account wurde gebannt.");
        return false;
    }

    if (accounts[username].password !== password) {
        alert("Falsches Passwort.");
        return false;
    }

    currentUser = username;
    saveCurrent();

    showHome();

    return true;
}

function guest() {
    currentUser = null;
    saveCurrent();
    showHome();
}

function logout() {
    currentUser = null;
    saveCurrent();
    currentScreen = "login";
    render();
}

// ------------------------------------------------------------
// LOGIN
// ------------------------------------------------------------

function showLogin() {
    currentScreen = "login";
    render();
}

function loginScreen() {

    return `
        <div class="welcome">Willkommen</div>

        <h2>🔐 QuestRPG Login</h2>

        <input
            id="loginUser"
            class="input"
            placeholder="Benutzername"
        >

        <input
            id="loginPass"
            class="input"
            type="password"
            placeholder="Passwort"
        >

        <button onclick="
            login(
                document.getElementById('loginUser').value,
                document.getElementById('loginPass').value
            )
        ">
            🔑 Einloggen
        </button>

        <button onclick="registerScreen()">
            📝 Account erstellen
        </button>

        <button onclick="guest()">
            👤 Als Gast spielen
        </button>
    `;
}

function registerScreen() {

    currentScreen = "register";
    render();
}

function registerPage() {

    return `
        <div class="welcome">Willkommen</div>

        <h2>📝 Account erstellen</h2>

        <p class="small">
            Benutzername: Nur Buchstaben, Zahlen und _.
        </p>

        <input
            id="registerUser"
            class="input"
            placeholder="Benutzername"
        >

        <input
            id="registerPass"
            class="input"
            type="password"
            placeholder="Passwort"
        >

        <button class="success-button" onclick="
            createAccount(
                document.getElementById('registerUser').value,
                document.getElementById('registerPass').value
            )
        ">
            📝 Account erstellen
        </button>

        <button onclick="showLogin()">
            ↩️ Zurück
        </button>
    `;
}

// ------------------------------------------------------------
// HOME
// ------------------------------------------------------------

function showHome() {
    currentScreen = "home";
    render();
}

function homePage() {

    const p = player();

    return `
        <div class="welcome">Willkommen</div>

        <div class="card-grid">

            <div class="big-card">
                <div class="icon">${emoji("⚔️")}</div>
                <h3>Fight</h3>

                <button onclick="startFight()">
                    ${emoji("⚔️")} Fight
                </button>
            </div>

            <div class="big-card">
                <div class="icon">${emoji("🏪")}</div>
                <h3>Shop</h3>

                <button class="gold-button" onclick="showShop()">
                    ${emoji("🏪")} Shop
                </button>
            </div>

            <div class="big-card">
                <div class="icon">${emoji("⛏️")}</div>
                <h3>Gold Mine</h3>

                <button onclick="showMine()">
                    ${emoji("⛏️")} Gold Mine
                </button>
            </div>

        </div>

        <button onclick="showMissions()">
            ${emoji("📜")} Missions
        </button>

        <button onclick="openStocks()">
            ${emoji("📈")} Aktien
        </button>

        <button onclick="showSettings()">
            ⚙️ Einstellungen
        </button>

        ${
            p && p.admin
            ? `
                <button class="purple-button" onclick="showAdmin()">
                    🖥️ Admin Panel
                </button>
            `
            : ""
        }
    `;
}

// ------------------------------------------------------------
// SHOP
// ------------------------------------------------------------

function showShop(tab = "swords") {
    shopTab = tab;
    currentScreen = "shop";
    render();
}

function shopPage() {

    let content = "";

    if (shopTab === "swords") {

        content = `
            ${shopItem(
                "🗡️ Bronze-Schwert",
                "Schaden +10",
                100,
                "sword",
                10
            )}

            ${shopItem(
                "⚔️ Silber-Schwert",
                "Schaden +20",
                300,
                "sword",
                20
            )}

            ${shopItem(
                "🗡️ Gold-Schwert",
                "Schaden +35",
                700,
                "sword",
                35
            )}

            ${shopItem(
                "⚔️ Diamant-Schwert",
                "Schaden +55",
                1500,
                "sword",
                55
            )}

            ${shopItem(
                "🌌 Legendäres Schwert",
                "Schaden +100",
                5000,
                "sword",
                100,
                true
            )}
        `;
    }

    if (shopTab === "armor") {

        content = `
            ${armorItem("🥉 Bronze-Rüstung", 25, 150)}
            ${armorItem("🥈 Silber-Rüstung", 50, 400)}
            ${armorItem("🥇 Gold-Rüstung", 90, 900)}
            ${armorItem("💎 Diamant-Rüstung", 150, 2000)}
            ${armorItem("🌌 Legendäre Rüstung", 300, 6000, true)}
        `;
    }

    if (shopTab === "potion") {

        content = `
            <div class="item">
                <h3>❤️ Heiltrank</h3>
                <p>Heilt 50 Leben.</p>
                <p>Preis: 100 Gold</p>

                <button class="success-button"
                    onclick="buyPotion()">
                    ❤️ Kaufen
                </button>
            </div>
        `;
    }

    if (shopTab === "pickaxe") {

        content = `
            ${pickaxeItem("⛏️ Bronze-Spitzhacke", 1.2, 200)}
            ${pickaxeItem("⛏️ Silber-Spitzhacke", 1.5, 500)}
            ${pickaxeItem("⛏️ Gold-Spitzhacke", 2, 1000)}
            ${pickaxeItem("💎 Diamant-Spitzhacke", 3, 2500)}
            ${pickaxeItem("🌌 Legendäre Spitzhacke", 5, 7500, true)}
        `;
    }

    return `
        <button class="back" onclick="showHome()">
            ← Zurück
        </button>

        <h2>🏪 Shop</h2>

        <div class="shop-tabs">
            <button onclick="showShop('swords')">⚔️ Schwerter</button>
            <button onclick="showShop('armor')">🛡️ Rüstungen</button>
            <button onclick="showShop('potion')">❤️ Heiltränke</button>
            <button onclick="showShop('pickaxe')">⛏️ Pickaxes</button>
        </div>

        ${content}
    `;
}

function shopItem(name, description, price, type, damage, legendary = false) {

    return `
        <div class="item ${legendary ? "legendary" : ""}">
            <h3>${name}</h3>
            <p>${description}</p>
            <p>Preis: ${price} Gold</p>

            <button onclick="buySword(${damage}, ${price}, '${name}')">
                💰 Kaufen
            </button>
        </div>
    `;
}

function armorItem(name, hp, price, legendary = false) {

    return `
        <div class="item ${legendary ? "legendary" : ""}">
            <h3>${name}</h3>
            <p>Maximales Leben +${hp}</p>
            <p>Preis: ${price} Gold</p>

            <button onclick="buyArmor(${hp}, ${price}, '${name}')">
                💰 Kaufen
            </button>
        </div>
    `;
}

function pickaxeItem(name, multiplier, price, legendary = false) {

    return `
        <div class="item ${legendary ? "legendary" : ""}">
            <h3>${name}</h3>
            <p>Gold-Multiplikator: x${multiplier}</p>
            <p>Preis: ${price} Gold</p>

            <button onclick="buyPickaxe(${multiplier}, ${price}, '${name}')">
                💰 Kaufen
            </button>
        </div>
    `;
}

function buySword(damage, price, name) {

    const p = player();

    if (!p) return;

    if (p.gold < price) {
        msg("Nicht genug Gold.");
        return;
    }

    p.gold -= price;
    p.damage += damage;
    p.sword = name;

    savePlayer();
    render();

    msg("Schwert gekauft!");
}

function buyArmor(hp, price, name) {

    const p = player();

    if (!p) return;

    if (p.gold < price) {
        msg("Nicht genug Gold.");
        return;
    }

    p.gold -= price;
    p.maxHealth += hp;
    p.health = p.maxHealth;
    p.armor = name;

    savePlayer();
    render();

    msg("Rüstung gekauft!");
}

function buyPickaxe(multiplier, price, name) {

    const p = player();

    if (!p) return;

    if (p.gold < price) {
        msg("Nicht genug Gold.");
        return;
    }

    p.gold -= price;

    // Multiplikator speichern
    p.pickaxeMultiplier = multiplier;
    p.pickaxe = name;

    savePlayer();
    render();

    msg("Spitzhacke gekauft!");
}

function buyPotion() {

    const p = player();

    if (!p) return;

    if (p.gold < 100) {
        msg("Nicht genug Gold.");
        return;
    }

    p.gold -= 100;
    p.potions++;

    savePlayer();
    render();

    msg("Heiltrank gekauft!");
}

// ------------------------------------------------------------
// GOLD MINE
// ------------------------------------------------------------

function showMine() {
    currentScreen = "mine";
    render();
}

function minePage() {

    const p = player();

    if (!p) {
        return `
            <h2>⛏️ Gold Mine</h2>
            <p>Als Gast kannst du nicht minen.</p>
            <button onclick="showLogin()">Einloggen</button>
        `;
    }

    return `
        <button class="back" onclick="showHome()">
            ← Zurück
        </button>

        <h2>⛏️ Gold Mine</h2>

        <div class="stock-box">
            <h3>Gold abbauen</h3>

            <p>
                Spitzhacke:
                <strong>${p.pickaxe}</strong>
            </p>

            <p>
                Multiplikator:
                <strong>x${p.pickaxeMultiplier || 1}</strong>
            </p>

            <p id="mineTimer">
                Bereit!
            </p>

            <button
                id="mineButton"
                onclick="startMining()">
                ⛏️ Gold abbauen
            </button>
        </div>
    `;
}

function startMining() {

    const p = player();

    if (!p) return;

    if (miningTimer) return;

    const cooldown = 8000;

    miningEnd = Date.now() + cooldown;

    const button = document.getElementById("mineButton");

    if (button) {
        button.disabled = true;
    }

    miningTimer = setInterval(() => {

        const remaining = Math.max(
            0,
            miningEnd - Date.now()
        );

        const seconds = Math.ceil(remaining / 1000);

        const timer = document.getElementById("mineTimer");

        if (timer) {
            timer.textContent =
                seconds > 0
                ? `⏳ ${seconds} Sekunden`
                : "Bereit!";
        }

        if (remaining <= 0) {

            clearInterval(miningTimer);
            miningTimer = null;

            const amount =
                random(10, 30) *
                (p.pickaxeMultiplier || 1);

            p.gold += Math.floor(amount);

            savePlayer();

            render();

            msg(`Du hast ${Math.floor(amount)} Gold gefunden!`);
        }

    }, 200);
}

// ------------------------------------------------------------
// MISSIONEN
// ------------------------------------------------------------

const missions = [
    ["Wald erkunden", 30, 20],
    ["Goblin besiegen", 50, 30],
    ["Gold finden", 40, 25],
    ["Dunkle Höhle", 70, 45],
    ["Ork besiegen", 90, 60],
    ["Schatz suchen", 100, 75],
    ["Eisfestung", 130, 90],
    ["Drachenhöhle", 180, 120],
    ["Dämonentor", 250, 180],
    ["Das letzte Abenteuer", 350, 300]
];

function showMissions() {
    currentScreen = "missions";
    render();
}

function missionsPage() {

    let html = `
        <button class="back" onclick="showHome()">
            ← Zurück
        </button>

        <h2>📜 Missionen</h2>
    `;

    missions.forEach((mission, index) => {

        html += `
            <div class="mission">
                <h3>Mission ${index + 1}: ${mission[0]}</h3>
                <p>⭐ ${mission[1]} XP</p>
                <p>💰 ${mission[2]} Gold</p>

                <button onclick="completeMission(${index})">
                    Mission abschließen
                </button>
            </div>
        `;
    });

    return html;
}

function completeMission(index) {

    const p = player();

    if (!p) return;

    const mission = missions[index];

    p.gold += mission[2];
    gainXP(mission[1]);

    savePlayer();
    render();

    msg(
        `Mission geschafft! +${mission[2]} Gold`
    );
}

// ------------------------------------------------------------
// XP / LEVEL
// ------------------------------------------------------------

function gainXP(amount) {

    const p = player();

    if (!p) return;

    p.xp += amount;

    const needed = p.level * 100;

    if (p.xp >= needed) {

        p.xp -= needed;
        p.level++;

        p.maxHealth += 20;
        p.health = p.maxHealth;

        p.damage += 5;
    }
}

// ------------------------------------------------------------
// KAMPF
// ------------------------------------------------------------

const enemies = [
    {
        name: "Goblin",
        emoji: "👹",
        health: 80,
        damage: [5, 12],
        xp: 30,
        gold: [20, 40]
    },
    {
        name: "Ork",
        emoji: "👺",
        health: 150,
        damage: [10, 25],
        xp: 60,
        gold: [40, 70]
    },
    {
        name: "Skelett",
        emoji: "💀",
        health: 120,
        damage: [8, 20],
        xp: 50,
        gold: [30, 60]
    },
    {
        name: "Drache",
        emoji: "🐉",
        health: 400,
        damage: [20, 45],
        xp: 150,
        gold: [100, 180]
    }
];

function startFight() {

    const p = player();

    if (!p) {
        showLogin();
        return;
    }

    // 0,5% Chance auf Teufel
    if (Math.random() < 0.005) {

        currentEnemy = {
            name: "Teufel",
            emoji: "😈",
            health: 500000,
            maxHealth: 500000,
            damage: [100, 500],
            xp: 1000,
            gold: [1000, 5000],
            boss: true
        };

    } else {

        const base =
            enemies[random(0, enemies.length - 1)];

        currentEnemy = {
            ...base,
            maxHealth: base.health
        };
    }

    currentScreen = "fight";
    render();
}

function fightPage() {

    const p = player();
    const e = currentEnemy;

    if (!e || !p) {
        return `<button onclick="showHome()">← Zurück</button>`;
    }

    const enemyDamage = `${e.damage[0]}–${e.damage[1]}`;

    return `
        <button class="back" onclick="showHome()">
            ← Zurück
        </button>

        <div class="monster ${e.boss ? "legendary" : ""}">

            <div class="monster-emoji">
                ${emoji(e.emoji)}
            </div>

            <h2>${e.name}</h2>

            ${
                e.boss
                ? `<h3>👑 END BOSS</h3>`
                : ""
            }

            <div class="monster-health">
                ❤️ ${e.health} / ${e.maxHealth} Leben
            </div>

            <div class="enemy-damage">
                ${emoji("⚔️")}
                Monster-Schaden:
                ${enemyDamage}
            </div>
        </div>

        <button class="danger-button"
            onclick="attackEnemy()">
            ${emoji("⚔️")} Angreifen
        </button>

        <button class="success-button"
            onclick="usePotion()">
            ${emoji("❤️")} Heiltrank
            (${p.potions})
        </button>
    `;
}

function attackEnemy() {

    const p = player();
    const e = currentEnemy;

    if (!p || !e) return;

    const attack = p.damage;

    e.health -= attack;

    if (e.health <= 0) {

        const reward = random(
            e.gold[0],
            e.gold[1]
        );

        p.gold += reward;

        gainXP(e.xp);

        savePlayer();

        currentEnemy = null;

        render();

        msg(
            `Sieg! +${reward} Gold`
        );

        return;
    }

    const enemyDamage = random(
        e.damage[0],
        e.damage[1]
    );

    p.health -= enemyDamage;

    if (p.health <= 0) {

        // Tod = Goldverlust
        const lostGold =
            Math.floor(p.gold * 0.25);

        p.gold = Math.max(
            0,
            p.gold - lostGold
        );

        p.health = p.maxHealth;

        savePlayer();

        currentEnemy = null;

        render();

        msg(
            `Du bist gestorben! Du hast ${lostGold} Gold verloren.`
        );

        return;
    }

    savePlayer();
    render();

    msg(
        `Angriff: ${attack} | Monster macht ${enemyDamage} Schaden`
    );
}

function usePotion() {

    const p = player();

    if (!p || p.potions <= 0) {
        msg("Du hast keinen Heiltrank.");
        return;
    }

    if (p.health >= p.maxHealth) {
        msg("Dein Leben ist bereits voll.");
        return;
    }

    p.potions--;

    p.health = Math.min(
        p.maxHealth,
        p.health + 50
    );

    savePlayer();
    render();

    msg("Du hast 50 Leben geheilt.");
}

// ------------------------------------------------------------
// AKTIEN
// ------------------------------------------------------------

let stockData = JSON.parse(
    localStorage.getItem("questrpg_stocks") ||
    "null"
);

if (!stockData) {

    stockData = {
        price: 250,
        oldPrice: 250,
        available: 10,
        lastUpdate: Date.now()
    };

    localStorage.setItem(
        "questrpg_stocks",
        JSON.stringify(stockData)
    );
}

function saveStocks() {
    localStorage.setItem(
        "questrpg_stocks",
        JSON.stringify(stockData)
    );
}

function updateStockPrice() {

    const now = Date.now();

    if (
        now - stockData.lastUpdate >=
        5 * 60 * 1000
    ) {

        stockData.oldPrice = stockData.price;

        const change = random(
            -200,
            200
        );

        stockData.price = Math.max(
            50,
            stockData.price + change
        );

        stockData.lastUpdate = now;

        saveStocks();
    }
}

function openStocks() {

    updateStockPrice();

    document
        .getElementById("stockPopup")
        .classList.add("show");

    updateStockPopup();
}

function closeStocks() {

    document
        .getElementById("stockPopup")
        .classList.remove("show");
}

function updateStockPopup() {

    const p = player();

    updateStockPrice();

    document.getElementById("stockPrice").textContent =
        `${stockData.price} Gold`;

    document.getElementById("oldStockPrice").textContent =
        stockData.oldPrice;

    document.getElementById("stocksAvailable").textContent =
        stockData.available;

    document.getElementById("myStocks").textContent =
        p ? p.stocks : 0;

    const changeElement =
        document.getElementById("stockChange");

    if (stockData.price > stockData.oldPrice) {

        changeElement.className = "stock-up";
        changeElement.textContent =
            `▲ +${stockData.price - stockData.oldPrice} Gold`;

    } else if (stockData.price < stockData.oldPrice) {

        changeElement.className = "stock-down";
        changeElement.textContent =
            `▼ ${stockData.price - stockData.oldPrice} Gold`;

    } else {

        changeElement.textContent =
            "Keine Änderung";
    }
}

function buyStocks() {

    const p = player();

    if (!p) {
        alert("Du musst eingeloggt sein.");
        return;
    }

    const amount = parseInt(
        document.getElementById(
            "buyStocksInput"
        ).value
    );

    if (
        !amount ||
        amount <= 0
    ) {
        return;
    }

    if (amount > stockData.available) {
        alert("Nicht genügend Aktien verfügbar.");
        return;
    }

    const cost =
        amount * stockData.price;

    if (p.gold < cost) {
        alert("Nicht genug Gold.");
        return;
    }

    p.gold -= cost;
    p.stocks += amount;

    stockData.available -= amount;

    savePlayer();
    saveStocks();

    updateStockPopup();
    render();

    msg(
        `${amount} Aktien gekauft.`
    );
}

function sellStocks() {

    const p = player();

    if (!p) return;

    const amount = parseInt(
        document.getElementById(
            "sellStocksInput"
        ).value
    );

    if (
        !amount ||
        amount <= 0
    ) {
        return;
    }

    if (amount > p.stocks) {
        alert("Du besitzt nicht so viele Aktien.");
        return;
    }

    p.stocks -= amount;
    p.gold +=
        amount * stockData.price;

    stockData.available += amount;

    savePlayer();
    saveStocks();

    updateStockPopup();
    render();

    msg(
        `${amount} Aktien verkauft.`
    );
}

function sellAllStocks() {

    const p = player();

    if (!p || p.stocks <= 0) {
        alert("Du besitzt keine Aktien.");
        return;
    }

    const amount = p.stocks;

    p.gold +=
        amount * stockData.price;

    stockData.available += amount;

    p.stocks = 0;

    savePlayer();
    saveStocks();

    updateStockPopup();
    render();

    msg(
        `Alle ${amount} Aktien verkauft.`
    );
}

// ------------------------------------------------------------
// EINSTELLUNGEN
// ------------------------------------------------------------

function showSettings() {
    currentScreen = "settings";
    render();
}

function settingsPage() {

    return `
        <button class="back" onclick="showHome()">
            ← Zurück
        </button>

        <h2>⚙️ Einstellungen</h2>

        <h3>Sprache</h3>

        <button onclick="changeLanguage('de')">
            🇩🇪 Deutsch
        </button>

        <button onclick="changeLanguage('en')">
            🇬🇧 English
        </button>

        <h3>Emojis</h3>

        <button onclick="toggleEmojis()">
            ${
                settings.emojis
                ? "😃 Emojis ausschalten"
                : "😃 Emojis einschalten"
            }
        </button>

        <hr>

        ${
            currentUser
            ? `
                <button class="danger-button"
                    onclick="logout()">
                    🚪 Ausloggen
                </button>

                <button class="danger-button"
                    onclick="deleteOwnAccount()">
                    🗑️ Account löschen
                </button>
            `
            : ""
        }
    `;
}

function toggleEmojis() {

    settings.emojis = !settings.emojis;

    saveSettings();

    render();
}

function changeLanguage(language) {

    settings.language = language;

    saveSettings();

    render();

    msg(
        language === "de"
        ? "Sprache auf Deutsch geändert."
        : "Language changed to English."
    );
}

function deleteOwnAccount() {

    if (!currentUser) return;

    if (
        !confirm(
            "Möchtest du deinen Account wirklich löschen?"
        )
    ) {
        return;
    }

    delete accounts[currentUser];

    saveAccounts();

    currentUser = null;

    saveCurrent();

    showLogin();
}

// ------------------------------------------------------------
// ADMIN
// ------------------------------------------------------------

function showAdmin() {

    const p = player();

    if (!p || !p.admin) {
        alert("Kein Zugriff.");
        return;
    }

    currentScreen = "admin";
    render();
}

function adminPage() {

    const p = player();

    if (!p || !p.admin) {
        return `<h2>Kein Zugriff</h2>`;
    }

    const names = Object.keys(accounts);

    return `
        <button class="back" onclick="showHome()">
            ← Zurück
        </button>

        <h2>🖥️ Admin Panel</h2>

        <input
            id="adminSearch"
            class="input"
            placeholder="Account suchen..."
            oninput="renderAdminUsers()"
        >

        <div id="adminUsers">
            ${adminUsersHTML(names)}
        </div>
    `;
}

function adminUsersHTML(names) {

    return names
        .map(name => {

            const u = accounts[name];

            return `
                <div class="item">

                    <h3>
                        ${u.badge || ""}
                        ${u.username}
                    </h3>

                    <p>⭐ Level: ${u.level}</p>
                    <p>💰 Gold: ${u.gold}</p>
                    <p>
                        ${u.banned
                            ? "🔴 Gebannt"
                            : "🟢 Aktiv"}
                    </p>

                    <button onclick="selectAdminUser('${name}')">
                        Account auswählen
                    </button>

                </div>
            `;
        })
        .join("");
}

function renderAdminUsers() {

    const search =
        document
            .getElementById("adminSearch")
            .value
            .toLowerCase();

    const names =
        Object.keys(accounts)
            .filter(
                name =>
                    name.toLowerCase()
                    .includes(search)
            );

    document.getElementById(
        "adminUsers"
    ).innerHTML =
        adminUsersHTML(names);
}

function selectAdminUser(name) {

    const target = accounts[name];

    if (!target) return;

    const gold = prompt(
        `Gold für ${name} setzen.\nLeer lassen zum Überspringen:`
    );

    if (gold !== null && gold !== "") {
        target.gold = Math.max(
            0,
            parseInt(gold) || 0
        );
    }

    const level = prompt(
        `Level für ${name} setzen.\nLeer lassen zum Überspringen:`
    );

    if (level !== null && level !== "") {
        target.level = Math.max(
            1,
            parseInt(level) || 1
        );
    }

    saveAccounts();

    adminActionMenu(name);
}

function adminActionMenu(name) {

    const target = accounts[name];

    if (!target) return;

    const action = prompt(
        `Account: ${name}\n\n` +
        `1 = Gold zurücksetzen\n` +
        `2 = Level zurücksetzen\n` +
        `3 = Bannen\n` +
        `4 = Entbannen\n` +
        `5 = Account löschen\n` +
        `6 = Admin geben\n` +
        `7 = Admin entfernen\n` +
        `8 = Abbrechen`
    );

    switch (action) {

        case "1":
            target.gold = 0;
            break;

        case "2":
            target.level = 1;
            target.xp = 0;
            break;

        case "3":
            if (name !== "005x5") {
                target.banned = true;
            }
            break;

        case "4":
            target.banned = false;
            break;

        case "5":
            if (name !== "005x5") {
                delete accounts[name];
            }
            break;

        case "6":
            target.admin = true;
            target.badge = "🖳";
            break;

        case "7":
            if (name !== "005x5") {
                target.admin = false;
                target.badge = "";
            }
            break;
    }

    saveAccounts();

    render();
}

// ------------------------------------------------------------
// RENDER
// ------------------------------------------------------------

function updateStats() {

    const p = player();

    if (!p) {

        document.getElementById("name").textContent = "Gast";
        document.getElementById("level").textContent = "-";
        document.getElementById("gold").textContent = "-";
        document.getElementById("health").textContent = "-";
        document.getElementById("maxHealth").textContent = "-";
        document.getElementById("xp").textContent = "-";
        document.getElementById("xpNeeded").textContent = "-";

        document.getElementById(
            "healthBar"
        ).style.width = "100%";

        document.getElementById(
            "xpBar"
        ).style.width = "0%";

        return;
    }

    document.getElementById("name").textContent =
        `${p.badge || ""}${p.username}`;

    document.getElementById("level").textContent =
        p.level;

    document.getElementById("gold").textContent =
        p.gold;

    document.getElementById("health").textContent =
        p.health;

    document.getElementById("maxHealth").textContent =
        p.maxHealth;

    document.getElementById("xp").textContent =
        p.xp;

    document.getElementById("xpNeeded").textContent =
        p.level * 100;

    document.getElementById(
        "healthBar"
    ).style.width =
        `${Math.max(
            0,
            p.health / p.maxHealth * 100
        )}%`;

    document.getElementById(
        "xpBar"
    ).style.width =
        `${p.xp / (p.level * 100) * 100}%`;
}

function render() {

    updateStats();

    const screen =
        document.getElementById("screen");

    if (currentScreen === "login") {
        screen.innerHTML = loginScreen();
    }

    else if (currentScreen === "register") {
        screen.innerHTML = registerPage();
    }

    else if (currentScreen === "home") {
        screen.innerHTML = homePage();
    }

    else if (currentScreen === "shop") {
        screen.innerHTML = shopPage();
    }

    else if (currentScreen === "mine") {
        screen.innerHTML = minePage();
    }

    else if (currentScreen === "missions") {
        screen.innerHTML = missionsPage();
    }

    else if (currentScreen === "fight") {
        screen.innerHTML = fightPage();
    }

    else if (currentScreen === "settings") {
        screen.innerHTML = settingsPage();
    }

    else if (currentScreen === "admin") {
        screen.innerHTML = adminPage();
    }
}

// ------------------------------------------------------------
// START
// ------------------------------------------------------------

function initialisePlayers() {

    // Owner automatisch erstellen, falls noch nicht vorhanden
    if (!accounts["005x5"]) {

        accounts["005x5"] = {
            username: "005x5",
            password: "005x5",

            gold: 50,

            level: 1,
            xp: 0,

            health: 100,
            maxHealth: 100,

            damage: 10,

            sword: "Holzschwert",
            armor: "Keine",
            pickaxe: "Holzspitzhacke",
            pickaxeMultiplier: 1,

            swords: [],
            armors: [],
            pickaxes: [],

            potions: 3,
            stocks: 0,

            admin: true,
            badge: "🖳",

            banned: false
        };

        saveAccounts();
    }
}

initialisePlayers();

// Aktien alle 5 Minuten prüfen
setInterval(() => {

    updateStockPrice();

    if (
        document
            .getElementById("stockPopup")
            .classList.contains("show")
    ) {
        updateStockPopup();
    }

}, 1000);

// Beim Seitenwechsel Mining-Zustand sauber behandeln
window.addEventListener("beforeunload", () => {

    if (miningTimer) {
        clearInterval(miningTimer);
        miningTimer = null;
    }
});

// Start
if (currentUser && accounts[currentUser]) {
    showHome();
} else {
    showLogin();
}
