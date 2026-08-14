"use strict";

/*
    QuestRPG
    --------
    Speicherung:
    KEINE COOKIES.
    Alles wird mit localStorage gespeichert.

    Hinweis:
    Das ist ein Browser-Spiel. Ein echtes Online-Account-System
    mit sicheren Passwörtern/Adminrechten braucht einen Server.
    Dieses System ist für ein lokales VS-Code-Projekt gedacht.
*/

// ============================================================
// DATEN
// ============================================================

const STORAGE_KEY = "questrpg_accounts_v4";
const CURRENT_KEY = "questrpg_current_user_v4";
const SETTINGS_KEY = "questrpg_settings_v4";

let accounts = loadAccounts();
let currentUser = localStorage.getItem(CURRENT_KEY) || null;

let settings = loadSettings();

let currentScreen = "home";
let currentEnemy = null;
let battleLog = [];

let mining = {
    active: false,
    clicksNeeded: 0,
    clicks: 0,
    endTime: 0,
    timer: null
};

let adminSelectedUser = null;


// ============================================================
// HILFSFUNKTIONEN
// ============================================================

function loadAccounts() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);

        if (!saved) {
            return {};
        }

        return JSON.parse(saved);
    } catch (error) {
        console.error("Accounts konnten nicht geladen werden:", error);
        return {};
    }
}

function saveAccounts() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(accounts));
}

function loadSettings() {
    try {
        const saved = localStorage.getItem(SETTINGS_KEY);

        if (!saved) {
            return {
                language: "de",
                emojis: true
            };
        }

        return {
            language: saved.language || "de",
            emojis: saved.emojis !== false
        };
    } catch {
        return {
            language: "de",
            emojis: true
        };
    }
}

function saveSettings() {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

function getUser() {
    if (!currentUser) {
        return null;
    }

    return accounts[currentUser] || null;
}

function saveCurrentUser() {
    if (currentUser && accounts[currentUser]) {
        saveAccounts();
    }
}

function escapeHTML(text) {
    const div = document.createElement("div");
    div.textContent = String(text);
    return div.innerHTML;
}

/*
    Ganz wichtig:
    Emojis werden NICHT mehr als HTML eingefügt.
    Dadurch kann nicht mehr versehentlich
    <span class="emoji">...</span>
    im Spiel angezeigt werden.
*/
function safeText(text) {
    return escapeHTML(text);
}

function icon(emoji) {
    return settings.emojis ? emoji : "";
}

function showMessage(text) {
    document.getElementById("message").textContent = text;

    clearTimeout(showMessage.timeout);

    showMessage.timeout = setTimeout(() => {
        document.getElementById("message").textContent = "";
    }, 3000);
}

function generateId() {
    return Date.now() + "_" + Math.random().toString(36).slice(2);
}


// ============================================================
// SPIELERDATEN
// ============================================================

function createPlayer(username, password) {
    return {
        username: username,
        password: password,

        level: 1,
        xp: 0,

        gold: 50,

        maxHealth: 100,
        health: 100,

        weapon: {
            name: "Holzschwert",
            damage: 10
        },

        armor: {
            name: "Keine Rüstung",
            health: 0
        },

        pickaxe: {
            name: "Alte Spitzhacke",
            miningBonus: 0
        },

        inventory: [],

        completedMissions: [],

        banned: false,
        admin: username.toUpperCase() === "MORITZMAN3",

        created: Date.now()
    };
}

function normalizeUsername(username) {
    return username.trim().toUpperCase();
}

function usernameIsValid(username) {
    /*
        Nur Buchstaben, Zahlen und _
        Dadurch sind Emojis im Namen verboten.
    */
    return /^[A-Z0-9_]{3,20}$/i.test(username);
}


// ============================================================
// INITIALER ADMIN
// ============================================================

function ensureMainAdmin() {
    const key = "MORITZMAN3";

    if (!accounts[key]) {
        accounts[key] = createPlayer("MORITZMAN3", "MORITZMAN3");
        accounts[key].admin = true;
        saveAccounts();
    } else {
        accounts[key].admin = true;
    }
}

ensureMainAdmin();


// ============================================================
// SHOP
// ============================================================

const weapons = [
    {
        id: "bronze_sword",
        name: "Bronzeschwert",
        icon: "🗡️",
        price: 100,
        damage: 18
    },
    {
        id: "silver_sword",
        name: "Silberschwert",
        icon: "⚔️",
        price: 250,
        damage: 30
    },
    {
        id: "gold_sword",
        name: "Goldschwert",
        icon: "⚔️",
        price: 500,
        damage: 48
    },
    {
        id: "diamond_sword",
        name: "Diamantschwert",
        icon: "💎",
        price: 1000,
        damage: 75
    },
    {
        id: "obsidian_sword",
        name: "Obsidianschwert",
        icon: "🔥",
        price: 2000,
        damage: 110
    },
    {
        id: "legendary_sword",
        name: "Legendenschwert",
        icon: "🌟",
        price: 5000,
        damage: 180
    }
];

const armors = [
    {
        id: "bronze_armor",
        name: "Bronzerüstung",
        icon: "🛡️",
        price: 120,
        health: 30
    },
    {
        id: "silver_armor",
        name: "Silberrüstung",
        icon: "🛡️",
        price: 300,
        health: 60
    },
    {
        id: "gold_armor",
        name: "Goldrüstung",
        icon: "👑",
        price: 650,
        health: 100
    },
    {
        id: "diamond_armor",
        name: "Diamantrüstung",
        icon: "💎",
        price: 1300,
        health: 160
    },
    {
        id: "obsidian_armor",
        name: "Obsidianrüstung",
        icon: "🔥",
        price: 2500,
        health: 230
    },
    {
        id: "legendary_armor",
        name: "Legendäre Rüstung",
        icon: "🌟",
        price: 6000,
        health: 350
    }
];

const pickaxes = [
    {
        id: "stone_pickaxe",
        name: "Steinspitzhacke",
        icon: "⛏️",
        price: 80,
        bonus: 2
    },
    {
        id: "bronze_pickaxe",
        name: "Bronzespitzhacke",
        icon: "⛏️",
        price: 180,
        bonus: 5
    },
    {
        id: "silver_pickaxe",
        name: "Silberspitzhacke",
        icon: "⛏️",
        price: 400,
        bonus: 9
    },
    {
        id: "gold_pickaxe",
        name: "Goldspitzhacke",
        icon: "⛏️",
        price: 800,
        bonus: 15
    },
    {
        id: "diamond_pickaxe",
        name: "Diamantspitzhacke",
        icon: "💎",
        price: 1600,
        bonus: 25
    },
    {
        id: "obsidian_pickaxe",
        name: "Obsidian-Spitzhacke",
        icon: "🔥",
        price: 3000,
        bonus: 40
    },
    {
        id: "legendary_pickaxe",
        name: "Legendäre Spitzhacke",
        icon: "🌟",
        price: 7000,
        bonus: 65
    }
];


// ============================================================
// MONSTER
// ============================================================

const monsters = [
    {
        name: "Schleim",
        emoji: "🟢",
        health: 35,
        damage: 7,
        xp: 20,
        goldMin: 10,
        goldMax: 25
    },
    {
        name: "Goblin",
        emoji: "👺",
        health: 55,
        damage: 11,
        xp: 30,
        goldMin: 15,
        goldMax: 35
    },
    {
        name: "Wolf",
        emoji: "🐺",
        health: 70,
        damage: 14,
        xp: 40,
        goldMin: 20,
        goldMax: 45
    },
    {
        name: "Skelett",
        emoji: "💀",
        health: 90,
        damage: 18,
        xp: 55,
        goldMin: 30,
        goldMax: 60
    },
    {
        name: "Ork",
        emoji: "👹",
        health: 120,
        damage: 23,
        xp: 70,
        goldMin: 40,
        goldMax: 80
    },
    {
        name: "Vampir",
        emoji: "🧛",
        health: 150,
        damage: 27,
        xp: 90,
        goldMin: 50,
        goldMax: 100
    },
    {
        name: "Drache",
        emoji: "🐉",
        health: 230,
        damage: 35,
        xp: 140,
        goldMin: 80,
        goldMax: 160
    },
    {
        name: "Dämon",
        emoji: "😈",
        health: 300,
        damage: 43,
        xp: 200,
        goldMin: 120,
        goldMax: 240
    }
];


// ============================================================
// MISSIONEN
// ============================================================

const missions = [
    {
        id: 1,
        title: "Der erste Kampf",
        description: "Besiege dein erstes Monster.",
        rewardMin: 40,
        rewardMax: 80
    },
    {
        id: 2,
        title: "Monsterjäger",
        description: "Besiege 3 Monster.",
        rewardMin: 60,
        rewardMax: 120
    },
    {
        id: 3,
        title: "Goldsucher",
        description: "Sammle 200 Gold.",
        rewardMin: 80,
        rewardMax: 160
    },
    {
        id: 4,
        title: "Stärker werden",
        description: "Erreiche Level 3.",
        rewardMin: 100,
        rewardMax: 200
    },
    {
        id: 5,
        title: "Diamantenjäger",
        description: "Kaufe ein Diamant-Item.",
        rewardMin: 150,
        rewardMax: 300
    },
    {
        id: 6,
        title: "Kampfmeister",
        description: "Besiege einen Drachen.",
        rewardMin: 200,
        rewardMax: 400
    },
    {
        id: 7,
        title: "Großer Reichtum",
        description: "Besitze 1000 Gold.",
        rewardMin: 250,
        rewardMax: 500
    },
    {
        id: 8,
        title: "Legendär",
        description: "Kaufe ein legendäres Item.",
        rewardMin: 400,
        rewardMax: 800
    },
    {
        id: 9,
        title: "Dämonenschlächter",
        description: "Besiege einen Dämon.",
        rewardMin: 500,
        rewardMax: 1000
    },
    {
        id: 10,
        title: "Quest-Champion",
        description: "Schließe alle anderen Missionen ab.",
        rewardMin: 1000,
        rewardMax: 2500
    }
];


// ============================================================
// UI
// ============================================================

function updateStats() {
    const user = getUser();

    if (!user) {
        document.getElementById("name").textContent = "Gast";
        document.getElementById("level").textContent = "-";
        document.getElementById("gold").textContent = "-";
        document.getElementById("health").textContent = "-";
        document.getElementById("maxHealth").textContent = "-";
        document.getElementById("xp").textContent = "-";
        document.getElementById("xpNeeded").textContent = "-";

        document.getElementById("healthBar").style.width = "100%";
        document.getElementById("xpBar").style.width = "0%";
        return;
    }

    document.getElementById("name").textContent =
        user.username + (user.admin ? " 🖳" : "");

    document.getElementById("level").textContent = user.level;
    document.getElementById("gold").textContent = user.gold;
    document.getElementById("health").textContent = user.health;
    document.getElementById("maxHealth").textContent = user.maxHealth;

    const needed = getXPNeeded(user.level);

    document.getElementById("xp").textContent = user.xp;
    document.getElementById("xpNeeded").textContent = needed;

    const healthPercent =
        Math.max(0, Math.min(100, (user.health / user.maxHealth) * 100));

    const xpPercent =
        Math.max(0, Math.min(100, (user.xp / needed) * 100));

    document.getElementById("healthBar").style.width =
        healthPercent + "%";

    document.getElementById("xpBar").style.width =
        xpPercent + "%";
}

function render(content) {
    document.getElementById("screen").innerHTML = content;
    updateStats();
}

function getXPNeeded(level) {
    return 100 + ((level - 1) * 75);
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}


// ============================================================
// STARTSEITE
// ============================================================

function showHome() {
    currentScreen = "home";

    const user = getUser();

    if (!user) {
        render(`
            <div class="center">
                <div class="big">⚔️</div>

                <h2>Willkommen bei QuestRPG!</h2>

                <p class="small">
                    Kämpfe gegen Monster, erfülle Missionen,
                    baue Gold ab und werde immer stärker.
                </p>

                <button class="success-button" onclick="showLogin()">
                    🔐 Einloggen
                </button>

                <button onclick="showRegister()">
                    📝 Account erstellen
                </button>

                <button class="gold-button" onclick="playAsGuest()">
                    👤 Als Gast spielen
                </button>
            </div>
        `);

        return;
    }

    render(`
        <div class="top-actions">
            <button onclick="showBattle()">⚔️ Kampf</button>
            <button onclick="showShop()">🛒 Shop</button>
            <button onclick="showMissions()">📜 Missionen</button>
            <button onclick="showMining()">⛏️ Gold abbauen</button>
            <button onclick="showLeaderboard()">🏆 Leaderboard</button>
            <button onclick="showSettings()">⚙️ Einstellungen</button>
        </div>

        ${user.admin ? `
            <button class="purple-button" onclick="showAdminPanel()">
                🖥️ Admin Panel
            </button>
        ` : ""}

        <div class="separator"></div>

        <div class="center">
            <div class="big">⚔️</div>

            <h2>Willkommen zurück, ${safeText(user.username)}!</h2>

            <p>
                Du bist Level <strong>${user.level}</strong>
                und besitzt <strong>${user.gold} Gold</strong>.
            </p>
        </div>

        <div class="card-grid">

            <div class="card">
                <div class="icon">⚔️</div>
                <h3>Kampf</h3>
                <p class="small">Besiege Monster.</p>
            </div>

            <div class="card">
                <div class="icon">⛏️</div>
                <h3>Minen</h3>
                <p class="small">Sammle Gold.</p>
            </div>

            <div class="card">
                <div class="icon">📜</div>
                <h3>Missionen</h3>
                <p class="small">Verdiene Belohnungen.</p>
            </div>

        </div>
    `);
}


// ============================================================
// LOGIN
// ============================================================

function showLogin() {
    render(`
        <button class="back-button" onclick="showHome()">
            ← Zurück
        </button>

        <h2>🔐 Einloggen</h2>

        <label>Username</label>
        <input id="loginUsername" autocomplete="username">

        <label>Passwort</label>
        <input id="loginPassword" type="password" autocomplete="current-password">

        <button class="success-button" onclick="login()">
            🔐 Einloggen
        </button>

        <button onclick="showRegister()">
            📝 Noch keinen Account? Registrieren
        </button>

        <button class="gold-button" onclick="playAsGuest()">
            👤 Als Gast spielen
        </button>

        <div id="loginError" class="error"></div>
    `);
}

function login() {
    const username = normalizeUsername(
        document.getElementById("loginUsername").value
    );

    const password =
        document.getElementById("loginPassword").value;

    const error = document.getElementById("loginError");

    const user = accounts[username];

    if (!user) {
        error.textContent = "Account nicht gefunden.";
        return;
    }

    if (user.password !== password) {
        error.textContent = "Falsches Passwort.";
        return;
    }

    if (user.banned) {
        error.textContent = "Dieser Account wurde gebannt.";
        return;
    }

    currentUser = username;

    localStorage.setItem(CURRENT_KEY, currentUser);

    showMessage("Erfolgreich eingeloggt!");
    showHome();
}


// ============================================================
// REGISTRIERUNG
// ============================================================

function showRegister() {
    render(`
        <button class="back-button" onclick="showHome()">
            ← Zurück
        </button>

        <h2>📝 Account erstellen</h2>

        <p class="small">
            Dein Username darf nur Buchstaben, Zahlen und _ enthalten.
            Emojis sind nicht erlaubt.
        </p>

        <label>Username</label>
        <input id="registerUsername" maxlength="20" autocomplete="username">

        <label>Passwort</label>
        <input id="registerPassword" type="password" autocomplete="new-password">

        <label>Passwort wiederholen</label>
        <input id="registerPassword2" type="password">

        <button class="success-button" onclick="register()">
            📝 Account erstellen
        </button>

        <div id="registerError" class="error"></div>
    `);
}

function register() {
    const input =
        document.getElementById("registerUsername");

    const username =
        normalizeUsername(input.value);

    const password =
        document.getElementById("registerPassword").value;

    const password2 =
        document.getElementById("registerPassword2").value;

    const error =
        document.getElementById("registerError");

    if (!usernameIsValid(username)) {
        error.textContent =
            "Username: 3–20 Zeichen, nur Buchstaben, Zahlen und _.";
        return;
    }

    if (accounts[username]) {
        error.textContent =
            "Dieser Username ist bereits vergeben.";
        return;
    }

    if (password.length < 4) {
        error.textContent =
            "Das Passwort muss mindestens 4 Zeichen haben.";
        return;
    }

    if (password !== password2) {
        error.textContent =
            "Die Passwörter stimmen nicht überein.";
        return;
    }

    accounts[username] = createPlayer(username, password);

    saveAccounts();

    currentUser = username;
    localStorage.setItem(CURRENT_KEY, currentUser);

    showMessage("Account erstellt!");
    showHome();
}


// ============================================================
// GAST
// ============================================================

function playAsGuest() {
    currentUser = null;
    localStorage.removeItem(CURRENT_KEY);

    showHome();

    showMessage("Du spielst jetzt als Gast.");
}


// ============================================================
// KAMPF
// ============================================================

function createEnemy() {
    const base = randomItem(monsters);

    const user = getUser();

    const levelBonus = user
        ? Math.max(0, user.level - 1)
        : 0;

    return {
        ...base,
        health: base.health + levelBonus * 12,
        maxHealth: base.health + levelBonus * 12
    };
}

function showBattle() {
    const user = getUser();

    if (!user) {
        showLogin();
        return;
    }

    currentScreen = "battle";

    if (!currentEnemy || currentEnemy.health <= 0) {
        currentEnemy = createEnemy();
        battleLog = [];
    }

    renderBattle();
}

function renderBattle() {
    const user = getUser();

    if (!user || !currentEnemy) {
        showHome();
        return;
    }

    const enemy = currentEnemy;

    const enemyPercent =
        Math.max(0, (enemy.health / enemy.maxHealth) * 100);

    render(`
        <button class="back-button" onclick="showHome()">
            ← Zurück
        </button>

        <h2>⚔️ Kampf</h2>

        <div class="monster">

            <div class="monster-emoji">
                ${settings.emojis ? enemy.emoji : ""}
            </div>

            <h2>${safeText(enemy.name)}</h2>

            <p class="monster-health">
                ❤️ ${enemy.health} / ${enemy.maxHealth}
            </p>

            <div class="bar">
                <div
                    style="
                        width:${enemyPercent}%;
                        height:100%;
                        background:#e84b4b;
                    "
                ></div>
            </div>

        </div>

        <button
            class="danger-button"
            onclick="attackEnemy()"
        >
            ⚔️ Angreifen
        </button>

        <button
            onclick="healBeforeBattle()"
        >
            ❤️ Heilen
        </button>

        <div class="battle-log">
            ${
                battleLog.length
                    ? battleLog.map(
                        line => `<div class="log-line">${safeText(line)}</div>`
                      ).join("")
                    : `<div class="log-line">Der Kampf beginnt!</div>`
            }
        </div>
    `);
}

function attackEnemy() {
    const user = getUser();

    if (!user || !currentEnemy) {
        return;
    }

    const damage = user.weapon.damage;

    currentEnemy.health =
        Math.max(0, currentEnemy.health - damage);

    battleLog.unshift(
        `⚔️ Angriff: ${damage} Schaden.`
    );

    if (currentEnemy.health <= 0) {
        winBattle();
        return;
    }

    const enemyDamage = Math.max(
        1,
        currentEnemy.damage - Math.floor(user.armor.health / 30)
    );

    user.health =
        Math.max(0, user.health - enemyDamage);

    battleLog.unshift(
        `👹 ${currentEnemy.name} verursacht ${enemyDamage} Schaden.`
    );

    saveCurrentUser();

    if (user.health <= 0) {
        user.health = Math.floor(user.maxHealth * .5);

        saveCurrentUser();

        battleLog.unshift(
            "💀 Du wurdest besiegt und verlierst etwas Leben."
        );
    }

    updateStats();
    renderBattle();
}

function winBattle() {
    const user = getUser();

    if (!user || !currentEnemy) {
        return;
    }

    const enemy = currentEnemy;

    const gold =
        randomNumber(enemy.goldMin, enemy.goldMax);

    user.gold += gold;

    addXP(enemy.xp);

    battleLog.unshift(
        `🏆 Sieg! +${gold} Gold und +${enemy.xp} XP.`
    );

    if (enemy.name === "Drache") {
        checkMission(6);
    }

    if (enemy.name === "Dämon") {
        checkMission(9);
    }

    checkMission(1);

    currentEnemy = null;

    saveCurrentUser();

    setTimeout(() => {
        showBattle();
    }, 500);
}

function healBeforeBattle() {
    const user = getUser();

    if (!user) {
        return;
    }

    const cost = 20;

    if (user.gold < cost) {
        showMessage("Du brauchst 20 Gold.");
        return;
    }

    user.gold -= cost;
    user.health = user.maxHealth;

    saveCurrentUser();

    showMessage("Du bist vollständig geheilt.");
    renderBattle();
}


// ============================================================
// XP / LEVEL
// ============================================================

function addXP(amount) {
    const user = getUser();

    if (!user) {
        return;
    }

    user.xp += amount;

    while (user.xp >= getXPNeeded(user.level)) {
        user.xp -= getXPNeeded(user.level);
        user.level++;

        user.maxHealth += 15;
        user.health = user.maxHealth;

        showMessage(
            `🎉 Level ${user.level} erreicht!`
        );

        if (user.level >= 3) {
            checkMission(4);
        }
    }

    saveCurrentUser();
}


// ============================================================
// SHOP
// ============================================================

function showShop() {
    const user = getUser();

    if (!user) {
        showLogin();
        return;
    }

    render(`
        <button class="back-button" onclick="showHome()">
            ← Zurück
        </button>

        <h2>🛒 Shop</h2>

        <p>
            💰 Dein Gold:
            <strong>${user.gold}</strong>
        </p>

        <h3>⚔️ Schwerter</h3>

        ${weapons.map(item => `
            <div class="shop-item">

                <h3>
                    ${settings.emojis ? item.icon : ""}
                    ${item.name}
                </h3>

                <p>
                    Schaden:
                    <strong>${item.damage}</strong>
                </p>

                <small>
                    💰 ${item.price} Gold
                </small>

                <button
                    class="gold-button"
                    onclick="buyWeapon('${item.id}')"
                >
                    Kaufen
                </button>

            </div>
        `).join("")}

        <h3>🛡️ Rüstungen</h3>

        ${armors.map(item => `
            <div class="shop-item">

                <h3>
                    ${settings.emojis ? item.icon : ""}
                    ${item.name}
                </h3>

                <p>
                    Extra Leben:
                    <strong>+${item.health}</strong>
                </p>

                <small>
                    💰 ${item.price} Gold
                </small>

                <button
                    class="gold-button"
                    onclick="buyArmor('${item.id}')"
                >
                    Kaufen
                </button>

            </div>
        `).join("")}

        <h3>⛏️ Spitzhacken</h3>

        ${pickaxes.map(item => `
            <div class="shop-item">

                <h3>
                    ${settings.emojis ? item.icon : ""}
                    ${item.name}
                </h3>

                <p>
                    Mining-Bonus:
                    <strong>+${item.bonus}</strong>
                </p>

                <small>
                    💰 ${item.price} Gold
                </small>

                <button
                    class="gold-button"
                    onclick="buyPickaxe('${item.id}')"
                >
                    Kaufen
                </button>

            </div>
        `).join("")}
    `);
}

function buyWeapon(id) {
    const user = getUser();
    const item = weapons.find(x => x.id === id);

    if (!user || !item) {
        return;
    }

    if (user.gold < item.price) {
        showMessage("Nicht genug Gold!");
        return;
    }

    user.gold -= item.price;

    user.weapon = {
        name: item.name,
        damage: item.damage
    };

    saveCurrentUser();

    showMessage(`${item.name} gekauft!`);
    showShop();
}

function buyArmor(id) {
    const user = getUser();
    const item = armors.find(x => x.id === id);

    if (!user || !item) {
        return;
    }

    if (user.gold < item.price) {
        showMessage("Nicht genug Gold!");
        return;
    }

    user.gold -= item.price;

    const oldBonus = user.armor.health;

    user.maxHealth -= oldBonus;

    user.armor = {
        name: item.name,
        health: item.health
    };

    user.maxHealth += item.health;
    user.health = user.maxHealth;

    saveCurrentUser();

    checkMission(5);

    if (item.name.includes("Legend")) {
        checkMission(8);
    }

    showMessage(`${item.name} ausgerüstet!`);
    showShop();
}

function buyPickaxe(id) {
    const user = getUser();
    const item = pickaxes.find(x => x.id === id);

    if (!user || !item) {
        return;
    }

    if (user.gold < item.price) {
        showMessage("Nicht genug Gold!");
        return;
    }

    user.gold -= item.price;

    user.pickaxe = {
        name: item.name,
        miningBonus: item.bonus
    };

    saveCurrentUser();

    if (item.name.includes("Legend")) {
        checkMission(8);
    }

    showMessage(`${item.name} gekauft!`);
    showShop();
}


// ============================================================
// MINING
// ============================================================

function showMining() {
    const user = getUser();

    if (!user) {
        showLogin();
        return;
    }

    render(`
        <button class="back-button" onclick="stopMiningAndHome()">
            ← Zurück
        </button>

        <h2>⛏️ Gold abbauen</h2>

        <p class="center">
            Deine Spitzhacke:
            <strong>${safeText(user.pickaxe.name)}</strong>
        </p>

        <div class="mine-box">

            <div class="mine-number">
                ${mining.active ? mining.clicks : "?"}
            </div>

            <p>
                ${mining.active
                    ? `Klicke ${mining.clicksNeeded}× auf den Button!`
                    : "Starte eine neue Mining-Runde."
                }
            </p>

            <button
                id="mineButton"
                onclick="mineClick()"
                ${mining.active ? "" : ""}
            >
                ⛏️ ${mining.active ? "ABBAUEN" : "GOLD ABBauen"}
            </button>

            <div class="cooldown" id="mineCooldown">
                ${mining.active
                    ? "Mining läuft..."
                    : "Cooldown: 8 Sekunden"
                }
            </div>

        </div>

        <div class="equipment">
            💰 Je mehr Klicks du schaffst,
            desto mehr Gold bekommst du.
        </div>
    `);

    if (mining.active) {
        updateMiningTimer();
    }
}

function startMining() {
    if (mining.active) {
        return;
    }

    const user = getUser();

    if (!user) {
        showLogin();
        return;
    }

    mining.active = true;

    mining.clicksNeeded = randomNumber(5, 15);
    mining.clicks = 0;

    mining.endTime = Date.now() + 8000;

    renderMiningState();

    clearInterval(mining.timer);

    mining.timer = setInterval(() => {
        updateMiningTimer();
    }, 100);
}

function renderMiningState() {
    const user = getUser();

    if (!user) {
        return;
    }

    render(`
        <button class="back-button" onclick="stopMiningAndHome()">
            ← Zurück
        </button>

        <h2>⛏️ Gold abbauen</h2>

        <p class="center">
            ${safeText(user.pickaxe.name)}
            · Bonus +${user.pickaxe.miningBonus}
        </p>

        <div class="mine-box">

            <div class="mine-number">
                ${mining.clicks} / ${mining.clicksNeeded}
            </div>

            <p>
                Klicke so oft wie möglich!
            </p>

            <button
                id="mineButton"
                onclick="mineClick()"
            >
                ⛏️ GOLD ABBAUEN
            </button>

            <div class="cooldown" id="mineCooldown">
                8.0 Sekunden
            </div>

        </div>
    `);

    updateMiningTimer();
}

function mineClick() {
    if (!mining.active) {
        startMining();
        return;
    }

    mining.clicks++;

    const number =
        document.querySelector(".mine-number");

    if (number) {
        number.textContent =
            `${mining.clicks} / ${mining.clicksNeeded}`;
    }

    if (mining.clicks >= mining.clicksNeeded) {
        finishMining();
    }
}

function updateMiningTimer() {
    if (!mining.active) {
        return;
    }

    const remaining =
        Math.max(0, mining.endTime - Date.now());

    const seconds =
        (remaining / 1000).toFixed(1);

    const cooldown =
        document.getElementById("mineCooldown");

    if (cooldown) {
        cooldown.textContent =
            `${seconds} Sekunden`;
    }

    if (remaining <= 0) {
        finishMining();
    }
}

function finishMining() {
    if (!mining.active) {
        return;
    }

    const user = getUser();

    clearInterval(mining.timer);
    mining.timer = null;

    if (!user) {
        mining.active = false;
        return;
    }

    const earned =
        mining.clicks * 3 +
        user.pickaxe.miningBonus;

    user.gold += earned;

    checkMission(3);

    mining.active = false;

    saveCurrentUser();

    showMessage(`⛏️ Du hast ${earned} Gold gefunden!`);

    showMining();
}

function stopMiningAndHome() {
    /*
        Wichtig:
        Wenn man während des Cooldowns rausgeht,
        wird der Timer sauber beendet.
        Dadurch kann beim erneuten Öffnen
        kein eingefrorener Timer entstehen.
    */

    clearInterval(mining.timer);

    mining.timer = null;
    mining.active = false;
    mining.clicks = 0;
    mining.clicksNeeded = 0;
    mining.endTime = 0;

    showHome();
}


// ============================================================
// MISSIONEN
// ============================================================

function showMissions() {
    const user = getUser();

    if (!user) {
        showLogin();
        return;
    }

    render(`
        <button class="back-button" onclick="showHome()">
            ← Zurück
        </button>

        <h2>📜 Missionen</h2>

        <p class="small">
            Erfülle Missionen und erhalte zufällige Goldbelohnungen.
        </p>

        ${missions.map(mission => {

            const done =
                user.completedMissions.includes(mission.id);

            return `
                <div class="mission ${done ? "completed" : ""}">

                    <h3>
                        ${done ? "✅" : "📜"}
                        ${mission.id}. ${mission.title}
                    </h3>

                    <p>
                        ${mission.description}
                    </p>

                    <p class="small">
                        Belohnung:
                        ${mission.rewardMin}–${mission.rewardMax} Gold
                    </p>

                    ${
                        done
                            ? `<strong>✅ Abgeschlossen</strong>`
                            : `<button onclick="tryCompleteMission(${mission.id})">
                                Mission prüfen
                               </button>`
                    }

                </div>
            `;
        }).join("")}
    `);
}

function checkMission(id) {
    const user = getUser();

    if (!user) {
        return;
    }

    if (user.completedMissions.includes(id)) {
        return;
    }

    tryCompleteMission(id, true);
}

function tryCompleteMission(id, silent = false) {
    const user = getUser();

    if (!user) {
        return;
    }

    const mission = missions.find(x => x.id === id);

    if (!mission) {
        return;
    }

    let completed = false;

    switch (id) {

        case 1:
            completed = true;
            break;

        case 3:
            completed = user.gold >= 200;
            break;

        case 4:
            completed = user.level >= 3;
            break;

        case 5:
            completed =
                user.armor.name.includes("Diamant") ||
                user.weapon.name.includes("Diamant") ||
                user.pickaxe.name.includes("Diamant");
            break;

        case 6:
            completed = false;
            break;

        case 8:
            completed =
                user.weapon.name.includes("Legend") ||
                user.armor.name.includes("Legend") ||
                user.pickaxe.name.includes("Legend");
            break;

        case 9:
            completed = false;
            break;

        case 10:
            completed =
                user.completedMissions.length >= 9;
            break;

        default:
            completed = false;
    }

    if (!completed) {
        if (!silent) {
            showMessage("Mission noch nicht erfüllt.");
        }
        return;
    }

    const reward =
        randomNumber(
            mission.rewardMin,
            mission.rewardMax
        );

    user.gold += reward;

    user.completedMissions.push(id);

    saveCurrentUser();

    if (!silent) {
        showMessage(
            `🎉 Mission abgeschlossen! +${reward} Gold`
        );
    }
}


// ============================================================
// LEADERBOARD
// ============================================================

function showLeaderboard() {
    const list = Object.values(accounts)
        .filter(user => !user.banned)
        .sort((a, b) => {

            if (b.level !== a.level) {
                return b.level - a.level;
            }

            return b.gold - a.gold;
        });

    render(`
        <button class="back-button" onclick="showHome()">
            ← Zurück
        </button>

        <h2>🏆 Leaderboard</h2>

        <p class="small">
            Sortiert nach Level und anschließend Gold.
        </p>

        ${
            list.length === 0
                ? `<p>Keine Spieler vorhanden.</p>`
                : list.map((user, index) => `
                    <div class="leader-row">

                        <div class="rank">
                            ${
                                index === 0 ? "🥇" :
                                index === 1 ? "🥈" :
                                index === 2 ? "🥉" :
                                "#" + (index + 1)
                            }
                        </div>

                        <div class="leader-info">
                            <strong>
                                ${safeText(user.username)}
                                ${user.admin ? " 🖳" : ""}
                            </strong>

                            <div class="small">
                                ⭐ Level ${user.level}
                                · 💰 ${user.gold} Gold
                            </div>
                        </div>

                    </div>
                `).join("")
        }
    `);
}


// ============================================================
// EINSTELLUNGEN
// ============================================================

function showSettings() {
    const user = getUser();

    if (!user) {
        showLogin();
        return;
    }

    render(`
        <button class="back-button" onclick="showHome()">
            ← Zurück
        </button>

        <h2>⚙️ Einstellungen</h2>

        <div class="equipment">

            <h3>👤 Account</h3>

            <p>
                Eingeloggt als:
                <strong>${safeText(user.username)}</strong>

                ${user.admin
                    ? `<span class="badge admin-badge">🖳 Admin</span>`
                    : ""
                }
            </p>

        </div>

        <h3>🌍 Sprache</h3>

        <select id="languageSelect" onchange="changeLanguage()">
            <option value="de" ${settings.language === "de" ? "selected" : ""}>
                🇩🇪 Deutsch
            </option>

            <option value="en" ${settings.language === "en" ? "selected" : ""}>
                🇬🇧 English
            </option>
        </select>

        <h3>😀 Emojis</h3>

        <select id="emojiSelect" onchange="changeEmojiSetting()">
            <option value="on" ${settings.emojis ? "selected" : ""}>
                😀 Emojis an
            </option>

            <option value="off" ${!settings.emojis ? "selected" : ""}>
                Emojis aus
            </option>
        </select>

        <div class="separator"></div>

        <button onclick="logout()">
            🚪 Ausloggen
        </button>

        <button
            class="danger-button"
            onclick="deleteOwnAccount()"
        >
            🗑️ Meinen Account löschen
        </button>
    `);
}

function changeLanguage() {
    const value =
        document.getElementById("languageSelect").value;

    settings.language = value;

    saveSettings();

    showMessage(
        value === "de"
            ? "Sprache auf Deutsch gestellt."
            : "Language changed to English."
    );
}

function changeEmojiSetting() {
    const value =
        document.getElementById("emojiSelect").value;

    settings.emojis = value === "on";

    saveSettings();

    /*
        Das Emoji in MORITZMAN3's Admin-Abzeichen
        wird absichtlich IMMER angezeigt.
    */

    showSettings();
}

function logout() {
    stopMiningAndHome();

    currentUser = null;

    localStorage.removeItem(CURRENT_KEY);

    currentEnemy = null;
    battleLog = [];

    showHome();

    showMessage("Du wurdest ausgeloggt.");
}

function deleteOwnAccount() {
    const user = getUser();

    if (!user) {
        return;
    }

    if (
        user.username === "MORITZMAN3"
    ) {
        showMessage(
            "Der Haupt-Admin kann sich hier nicht löschen."
        );
        return;
    }

    const confirmed = confirm(
        "Möchtest du deinen Account wirklich löschen?"
    );

    if (!confirmed) {
        return;
    }

    delete accounts[user.username];

    saveAccounts();

    currentUser = null;

    localStorage.removeItem(CURRENT_KEY);

    showHome();

    showMessage("Account gelöscht.");
}


// ============================================================
// ADMIN PANEL
// ============================================================

function isMainAdmin() {
    const user = getUser();

    return user &&
        user.username === "MORITZMAN3";
}

function showAdminPanel() {
    if (!isMainAdmin()) {
        showHome();
        return;
    }

    adminSelectedUser = null;

    render(`
        <button class="back-button" onclick="showHome()">
            ← Zurück
        </button>

        <h2>🖥️ Admin Panel</h2>

        <div class="admin-panel">

            <h3 class="admin-title">
                🖥️ Benutzerverwaltung
            </h3>

            <label>Benutzer suchen</label>

            <input
                id="adminSearch"
                placeholder="Username eingeben..."
                oninput="searchAdminUsers()"
            >

            <div id="adminSearchResults">
                ${renderAdminUserList()}
            </div>

            <div id="selectedAdminUser"></div>

        </div>
    `);
}

function renderAdminUserList() {
    const users = Object.values(accounts);

    if (!users.length) {
        return `<p class="small">Keine Accounts vorhanden.</p>`;
    }

    return users.map(user => `
        <div
            class="admin-user"
            onclick="selectAdminUser('${encodeURIComponent(user.username)}')"
        >
            <strong>
                ${safeText(user.username)}
                ${user.admin ? " 🖳" : ""}
            </strong>

            <div class="small">
                ⭐ Level ${user.level}
                · 💰 ${user.gold}
                · ${user.banned ? "🚫 Gebannt" : "✅ Aktiv"}
            </div>
        </div>
    `).join("");
}

function searchAdminUsers() {
    const input =
        document.getElementById("adminSearch");

    if (!input) {
        return;
    }

    const query =
        normalizeUsername(input.value);

    const results =
        document.getElementById("adminSearchResults");

    const users =
        Object.values(accounts)
            .filter(user =>
                user.username.includes(query)
            );

    results.innerHTML =
        users.length
            ? users.map(user => `
                <div
                    class="admin-user"
                    onclick="selectAdminUser('${encodeURIComponent(user.username)}')"
                >
                    <strong>
                        ${safeText(user.username)}
                        ${user.admin ? " 🖳" : ""}
                    </strong>

                    <div class="small">
                        ⭐ Level ${user.level}
                        · 💰 ${user.gold}
                        · ${user.banned ? "🚫 Gebannt" : "✅ Aktiv"}
                    </div>
                </div>
            `).join("")
            : `<p class="small">Kein Benutzer gefunden.</p>`;
}

function selectAdminUser(encodedUsername) {
    if (!isMainAdmin()) {
        return;
    }

    const username =
        decodeURIComponent(encodedUsername);

    if (!accounts[username]) {
        return;
    }

    adminSelectedUser = username;

    const target =
        document.getElementById("selectedAdminUser");

    if (!target) {
        return;
    }

    const user = accounts[username];

    target.innerHTML = `
        <div class="admin-panel">

            <h3>
                👤 ${safeText(user.username)}
                ${user.admin ? " 🖳" : ""}
            </h3>

            <p>
                ⭐ Level:
                <strong>${user.level}</strong>
            </p>

            <p>
                💰 Gold:
                <strong>${user.gold}</strong>
            </p>

            <p>
                ${user.banned
                    ? "🚫 Gebannt"
                    : "✅ Aktiv"
                }
            </p>

            <div class="separator"></div>

            <label>Gold hinzufügen</label>

            <input
                id="adminGoldAmount"
                type="number"
                min="0"
                placeholder="z.B. 500"
            >

            <button
                class="gold-button"
                onclick="adminGiveGold()"
            >
                💰 Gold geben
            </button>

            <button onclick="adminResetGold()">
                🔄 Gold auf 0 setzen
            </button>

            <label>Level setzen</label>

            <input
                id="adminLevelAmount"
                type="number"
                min="1"
                placeholder="z.B. 10"
            >

            <button onclick="adminSetLevel()">
                ⭐ Level setzen
            </button>

            <button onclick="adminResetLevel()">
                🔄 Level zurücksetzen
            </button>

            <button
                class="danger-button"
                onclick="adminToggleBan()"
            >
                ${user.banned
                    ? "✅ Account entbannen"
                    : "🚫 Account bannen"
                }
            </button>

            <button
                class="danger-button"
                onclick="adminDeleteAccount()"
            >
                🗑️ Account löschen
            </button>

            <button
                class="purple-button"
                onclick="adminToggleAdmin()"
            >
                🖥️
                ${user.admin
                    ? "Admin entfernen"
                    : "Zum Admin machen"
                }
            </button>

        </div>
    `;
}

function getAdminTarget() {
    if (!isMainAdmin()) {
        return null;
    }

    if (!adminSelectedUser) {
        showMessage("Wähle zuerst einen Benutzer.");
        return null;
    }

    return accounts[adminSelectedUser] || null;
}

function adminGiveGold() {
    const target = getAdminTarget();

    if (!target) {
        return;
    }

    const input =
        document.getElementById("adminGoldAmount");

    const amount =
        Number(input.value);

    if (!Number.isFinite(amount) || amount < 0) {
        showMessage("Ungültige Goldmenge.");
        return;
    }

    target.gold += Math.floor(amount);

    saveAccounts();

    showMessage(
        `${amount} Gold gegeben.`
    );

    showAdminPanel();
}

function adminResetGold() {
    const target = getAdminTarget();

    if (!target) {
        return;
    }

    target.gold = 0;

    saveAccounts();

    showMessage("Gold zurückgesetzt.");

    showAdminPanel();
}

function adminSetLevel() {
    const target = getAdminTarget();

    if (!target) {
        return;
    }

    const input =
        document.getElementById("adminLevelAmount");

    const level =
        Number(input.value);

    if (
        !Number.isFinite(level) ||
        level < 1 ||
        level > 999
    ) {
        showMessage("Ungültiges Level.");
        return;
    }

    target.level = Math.floor(level);
    target.xp = 0;

    target.maxHealth =
        100 +
        ((target.level - 1) * 15) +
        target.armor.health;

    target.health = target.maxHealth;

    saveAccounts();

    showMessage("Level gesetzt.");

    showAdminPanel();
}

function adminResetLevel() {
    const target = getAdminTarget();

    if (!target) {
        return;
    }

    target.level = 1;
    target.xp = 0;

    target.maxHealth =
        100 + target.armor.health;

    target.health = target.maxHealth;

    saveAccounts();

    showMessage("Level zurückgesetzt.");

    showAdminPanel();
}

function adminToggleBan() {
    const target = getAdminTarget();

    if (!target) {
        return;
    }

    if (target.username === "MORITZMAN3") {
        showMessage("MORITZMAN3 kann nicht gebannt werden.");
        return;
    }

    target.banned = !target.banned;

    saveAccounts();

    showMessage(
        target.banned
            ? "Account gebannt."
            : "Account entbannt."
    );

    showAdminPanel();
}

function adminDeleteAccount() {
    const target = getAdminTarget();

    if (!target) {
        return;
    }

    if (target.username === "MORITZMAN3") {
        showMessage("Der Haupt-Admin kann nicht gelöscht werden.");
        return;
    }

    const confirmed = confirm(
        `Account ${target.username} wirklich löschen?`
    );

    if (!confirmed) {
        return;
    }

    delete accounts[target.username];

    saveAccounts();

    adminSelectedUser = null;

    showMessage("Account gelöscht.");

    showAdminPanel();
}

function adminToggleAdmin() {
    const target = getAdminTarget();

    if (!target) {
        return;
    }

    if (target.username === "MORITZMAN3") {
        showMessage(
            "MORITZMAN3 bleibt Haupt-Admin."
        );
        return;
    }

    target.admin = !target.admin;

    saveAccounts();

    showMessage(
        target.admin
            ? "Admin-Rechte vergeben."
            : "Admin-Rechte entfernt."
    );

    showAdminPanel();
}


// ============================================================
// AUTOMATISCHE SPEICHERUNG
// ============================================================

window.addEventListener("beforeunload", () => {
    clearInterval(mining.timer);
    saveAccounts();
});


// ============================================================
// START
// ============================================================

updateStats();
showHome();
