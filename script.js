// ============================================================
// QuestRPG by 005x5
// ============================================================

const OWNER = "005x5";
const STORAGE_KEY = "questrpg_users_v2";
const SESSION_KEY = "questrpg_session_v2";
const SETTINGS_KEY = "questrpg_settings_v2";


// ============================================================
// ÜBERSETZUNGEN
// ============================================================

const translations = {

    de: {
        subtitle: "QuestRPG by 005x5",
        login: "Anmelden",
        register: "Registrieren",
        guest: "Als Gast spielen",
        settings: "Einstellungen",
        admin: "Admin Panel",
        logout: "Ausloggen",
        back: "← Zurück",
        home: "Startseite",
        shop: "Shop",
        fight: "Kampf",
        mine: "Goldmine",
        missions: "Missionen",

        username: "Benutzername",
        password: "Passwort",
        usernamePlaceholder: "Benutzername",
        passwordPlaceholder: "Passwort",

        level: "Level",
        gold: "Gold",
        health: "Leben",

        attack: "Angreifen",
        potion: "Heiltrank",
        run: "Fliehen",

        noPotion: "Du hast keinen Heiltrank.",
        healed: "Du hast dich geheilt!",
        enemyDefeated: "Monster besiegt!",

        miningTitle: "⛏️ Goldmine",
        miningText: "Klicke die benötigte Anzahl!",
        miningButton: "⛏️ GOLD ABBAUEN",
        miningCooldown: "Nächster Abbau in",

        missionsTitle: "📜 Missionen",
        missionDone: "Mission abgeschlossen!",

        shopTitle: "🏪 Shop",
        swords: "⚔️ Schwerter",
        armor: "🛡️ Rüstungen",
        potions: "🧪 Heiltränke",
        pickaxes: "⛏️ Pickaxes",

        settingsTitle: "⚙️ Einstellungen",
        language: "Sprache",
        emojis: "Emojis",
        emojisOn: "😀 Emojis: AN",
        emojisOff: "Emojis: AUS",

        deleteAccount: "🗑️ Account löschen",
        confirmDelete: "Möchtest du deinen Account wirklich löschen?",

        adminTitle: "🖥️ Admin Panel",
        searchUser: "User suchen",
        selectUser: "Account auswählen",
        giveGold: "Gold geben",
        resetGold: "Gold auf 0 setzen",
        setLevel: "Level setzen",
        resetLevel: "Level zurücksetzen",
        ban: "Account bannen",
        unban: "Account entbannen",
        deleteUser: "Account löschen",
        makeAdmin: "Admin geben",
        removeAdmin: "Admin entfernen",

        active: "Aktiv",
        banned: "GEBANNT",
        noUsers: "Keine Accounts gefunden.",

        loginSuccess: "Erfolgreich angemeldet!",
        registerSuccess: "Account erstellt!",
        wrongLogin: "Benutzername oder Passwort falsch.",
        bannedLogin: "Dieser Account wurde gebannt.",
        invalidUsername: "Der Benutzername darf nur Buchstaben, Zahlen und _ enthalten.",
        usernameTaken: "Dieser Benutzername existiert bereits.",
        passwordShort: "Das Passwort muss mindestens 4 Zeichen haben.",

        insufficientGold: "Nicht genug Gold.",
        purchased: "Gekauft!",
        levelUp: "Level Up!",
        victory: "Sieg!",
        defeat: "Du wurdest besiegt!",
        escaped: "Du bist geflohen.",

        clickMore: "Noch",
        clicks: "Klicks",
        miningReward: "Du hast Gold gefunden!"
    },

    en: {
        subtitle: "QuestRPG by 005x5",
        login: "Login",
        register: "Register",
        guest: "Play as Guest",
        settings: "Settings",
        admin: "Admin Panel",
        logout: "Logout",
        back: "← Back",
        home: "Home",
        shop: "Shop",
        fight: "Fight",
        mine: "Gold Mine",
        missions: "Missions",

        username: "Username",
        password: "Password",
        usernamePlaceholder: "Username",
        passwordPlaceholder: "Password",

        level: "Level",
        gold: "Gold",
        health: "Health",

        attack: "Attack",
        potion: "Healing Potion",
        run: "Escape",

        noPotion: "You don't have a potion.",
        healed: "You healed yourself!",
        enemyDefeated: "Monster defeated!",

        miningTitle: "⛏️ Gold Mine",
        miningText: "Click the required amount!",
        miningButton: "⛏️ MINE GOLD",
        miningCooldown: "Next mining in",

        missionsTitle: "📜 Missions",
        missionDone: "Mission completed!",

        shopTitle: "🏪 Shop",
        swords: "⚔️ Swords",
        armor: "🛡️ Armor",
        potions: "🧪 Healing Potions",
        pickaxes: "⛏️ Pickaxes",

        settingsTitle: "⚙️ Settings",
        language: "Language",
        emojis: "Emojis",
        emojisOn: "😀 Emojis: ON",
        emojisOff: "Emojis: OFF",

        deleteAccount: "🗑️ Delete Account",
        confirmDelete: "Do you really want to delete your account?",

        adminTitle: "🖥️ Admin Panel",
        searchUser: "Search user",
        selectUser: "Select account",
        giveGold: "Give Gold",
        resetGold: "Set Gold to 0",
        setLevel: "Set Level",
        resetLevel: "Reset Level",
        ban: "Ban Account",
        unban: "Unban Account",
        deleteUser: "Delete Account",
        makeAdmin: "Give Admin",
        removeAdmin: "Remove Admin",

        active: "Active",
        banned: "BANNED",
        noUsers: "No accounts found.",

        loginSuccess: "Successfully logged in!",
        registerSuccess: "Account created!",
        wrongLogin: "Wrong username or password.",
        bannedLogin: "This account is banned.",
        invalidUsername: "Username may only contain letters, numbers and _.",
        usernameTaken: "This username already exists.",
        passwordShort: "Password must contain at least 4 characters.",

        insufficientGold: "Not enough gold.",
        purchased: "Purchased!",
        levelUp: "Level Up!",
        victory: "Victory!",
        defeat: "You were defeated!",
        escaped: "You escaped.",

        clickMore: "Still",
        clicks: "clicks",
        miningReward: "You found gold!"
    }
};


// ============================================================
// DATEN
// ============================================================

let users = loadUsers();

let settings = loadSettings();

let currentUser = null;

let currentScreen = "home";

let shopTab = "swords";

let currentMonster = null;

let miningState = {
    active: false,
    clicks: 0,
    required: 0,
    timer: null,
    cooldownUntil: 0
};

let adminSelectedUser = null;


// ============================================================
// SPEICHERN
// ============================================================

function loadUsers() {

    try {

        const data = localStorage.getItem(STORAGE_KEY);

        if (!data) {
            return {};
        }

        const parsed = JSON.parse(data);

        if (!parsed || typeof parsed !== "object") {
            return {};
        }

        return parsed;

    } catch (error) {

        console.error("User loading error:", error);

        return {};
    }
}


function saveUsers() {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(users)
    );
}


function saveUser(username) {

    if (!username) {
        return;
    }

    if (!users[username]) {
        return;
    }

    saveUsers();
}


function loadSettings() {

    try {

        const data = localStorage.getItem(SETTINGS_KEY);

        if (!data) {

            return {
                language: "de",
                emojis: true
            };
        }

        const parsed = JSON.parse(data);

        return {
            language: parsed.language === "en" ? "en" : "de",
            emojis: parsed.emojis !== false
        };

    } catch {

        return {
            language: "de",
            emojis: true
        };
    }
}


function saveSettings() {

    localStorage.setItem(
        SETTINGS_KEY,
        JSON.stringify(settings)
    );
}


function saveSession(username) {

    if (username) {
        localStorage.setItem(
            SESSION_KEY,
            username
        );
    } else {
        localStorage.removeItem(SESSION_KEY);
    }
}


function loadSession() {

    return localStorage.getItem(SESSION_KEY);
}


// ============================================================
// ÜBERSETZUNG
// ============================================================

function t(key) {

    return translations[settings.language][key] ||
           translations.de[key] ||
           key;
}


// ============================================================
// EMOJIS
// ============================================================

function emoji(text) {

    if (!settings.emojis) {
        return "";
    }

    return text;
}


function updateEmojiVisibility() {

    document.querySelectorAll(".emoji").forEach(el => {

        const value = el.dataset.emoji;

        if (value !== undefined) {

            el.textContent =
                settings.emojis ? value : "";
        }
    });
}


// ============================================================
// USERNAME SICHERHEIT
// ============================================================

function isValidUsername(username) {

    return /^[A-Za-z0-9_]+$/.test(username);
}


// ============================================================
// USER ERSTELLEN
// ============================================================

function createUser(username, password) {

    username = username.trim();

    if (!isValidUsername(username)) {

        showMessage(t("invalidUsername"));

        return false;
    }

    if (password.length < 4) {

        showMessage(t("passwordShort"));

        return false;
    }

    if (users[username]) {

        showMessage(t("usernameTaken"));

        return false;
    }

    users[username] = {

        username: username,

        password: password,

        gold: username === OWNER ? 500 : 50,

        level: 1,

        xp: 0,

        health: 100,

        maxHealth: 100,

        damage: 10,

        armor: 0,

        potions: 1,

        pickaxePower: 1,

        banned: false,

        admin: username === OWNER,

        created: Date.now(),

        inventory: {
            swords: [],
            armor: [],
            pickaxes: []
        }

    };

    saveUsers();

    currentUser = users[username];

    saveSession(username);

    showMessage(t("registerSuccess"));

    renderHome();

    return true;
}


// ============================================================
// LOGIN
// ============================================================

function login(username, password) {

    username = username.trim();

    const user = users[username];

    if (!user || user.password !== password) {

        showMessage(t("wrongLogin"));

        return false;
    }

    if (user.banned) {

        showMessage(t("bannedLogin"));

        return false;
    }

    currentUser = user;

    saveSession(username);

    showMessage(t("loginSuccess"));

    renderHome();

    return true;
}


// ============================================================
// GAST
// ============================================================

function playAsGuest() {

    currentUser = null;

    saveSession(null);

    renderHome();
}


// ============================================================
// LOGOUT
// ============================================================

function logout() {

    currentUser = null;

    saveSession(null);

    currentScreen = "home";

    renderHome();
}


// ============================================================
// ACCOUNT LÖSCHEN
// ============================================================

function deleteOwnAccount() {

    if (!currentUser) {
        return;
    }

    if (!confirm(t("confirmDelete"))) {
        return;
    }

    const username = currentUser.username;

    delete users[username];

    saveUsers();

    currentUser = null;

    saveSession(null);

    renderHome();
}


// ============================================================
// LOGIN / REGISTER
// ============================================================

function renderAuth() {

    const screen = document.getElementById("screen");

    screen.innerHTML = `

        <div class="login-box">

            <h2>⚔️ QuestRPG</h2>

            <div class="card">

                <h3>${t("login")}</h3>

                <input
                    id="loginUsername"
                    placeholder="${t("usernamePlaceholder")}"
                    autocomplete="username"
                >

                <input
                    id="loginPassword"
                    type="password"
                    placeholder="${t("passwordPlaceholder")}"
                    autocomplete="current-password"
                >

                <button
                    class="action success"
                    onclick="handleLogin()"
                >
                    🔐 ${t("login")}
                </button>

            </div>

            <div class="card">

                <h3>${t("register")}</h3>

                <input
                    id="registerUsername"
                    placeholder="${t("usernamePlaceholder")}"
                    autocomplete="username"
                >

                <input
                    id="registerPassword"
                    type="password"
                    placeholder="${t("passwordPlaceholder")}"
                    autocomplete="new-password"
                >

                <button
                    class="action purple"
                    onclick="handleRegister()"
                >
                    ✨ ${t("register")}
                </button>

            </div>

            <button
                class="action"
                onclick="playAsGuest()"
            >
                👤 ${t("guest")}
            </button>

        </div>
    `;

    updateEmojiVisibility();
}


function handleLogin() {

    const username =
        document.getElementById("loginUsername").value;

    const password =
        document.getElementById("loginPassword").value;

    login(username, password);
}


function handleRegister() {

    const username =
        document.getElementById("registerUsername").value;

    const password =
        document.getElementById("registerPassword").value;

    createUser(username, password);
}


// ============================================================
// HOME
// ============================================================

function renderHome() {

    currentScreen = "home";

    updateStats();

    const screen = document.getElementById("screen");

    if (!currentUser) {

        screen.innerHTML = `

            <div class="big">⚔️</div>

            <h2>QuestRPG</h2>

            <p class="small">
                ${t("subtitle")}
            </p>

            <button
                class="action success"
                onclick="renderAuth()"
            >
                🔐 ${t("login")} / ${t("register")}
            </button>

            <button
                class="action"
                onclick="playAsGuest()"
            >
                👤 ${t("guest")}
            </button>
        `;

        updateTopButtons();

        updateEmojiVisibility();

        return;
    }

    screen.innerHTML = `

        <h2>⚔️ QuestRPG</h2>

        <p>
            Willkommen,
            <strong>${escapeHtml(currentUser.username)}</strong>
            ${currentUser.admin
                ? `<span class="admin-badge">🖳</span>`
                : ""}
        </p>

        <div class="card-grid">

            <div class="card">
                <div class="big">⚔️</div>
                <h3>${t("fight")}</h3>
                <button
                    class="action"
                    onclick="renderFight()"
                >
                    ${t("fight")}
                </button>
            </div>

            <div class="card">
                <div class="big">🏪</div>
                <h3>${t("shop")}</h3>
                <button
                    class="action gold"
                    onclick="renderShop()"
                >
                    ${t("shop")}
                </button>
            </div>

            <div class="card">
                <div class="big">⛏️</div>
                <h3>${t("mine")}</h3>
                <button
                    class="action"
                    onclick="renderMine()"
                >
                    ${t("mine")}
                </button>
            </div>

        </div>

        <button
            class="action"
            onclick="renderMissions()"
        >
            📜 ${t("missions")}
        </button>

    `;

    updateTopButtons();

    updateEmojiVisibility();
}


// ============================================================
// TOP BUTTONS
// ============================================================

function updateTopButtons() {

    const box = document.getElementById("topButtons");

    if (!currentUser) {

        box.innerHTML = `
            <button class="top-button" onclick="renderAuth()">
                🔐 ${t("login")}
            </button>

            <button class="top-button" onclick="renderSettings()">
                ⚙️ ${t("settings")}
            </button>
        `;

        return;
    }

    let html = `
        <button class="top-button" onclick="renderHome()">
            🏠 ${t("home")}
        </button>

        <button class="top-button" onclick="renderShop()">
            🏪 ${t("shop")}
        </button>

        <button class="top-button" onclick="renderSettings()">
            ⚙️ ${t("settings")}
        </button>
    `;

    if (currentUser.admin) {

        html += `
            <button
                class="top-button"
                onclick="renderAdmin()"
            >
                🖳 ${t("admin")}
            </button>
        `;
    }

    box.innerHTML = html;

    updateEmojiVisibility();
}


// ============================================================
// STATS
// ============================================================

function updateStats() {

    if (!currentUser) {

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
        currentUser.username;

    document.getElementById("level").textContent =
        currentUser.level;

    document.getElementById("gold").textContent =
        currentUser.gold;

    document.getElementById("health").textContent =
        currentUser.health;

    document.getElementById("maxHealth").textContent =
        currentUser.maxHealth;

    const xpNeeded = currentUser.level * 100;

    document.getElementById("xp").textContent =
        currentUser.xp;

    document.getElementById("xpNeeded").textContent =
        xpNeeded;

    const healthPercent =
        Math.max(
            0,
            Math.min(
                100,
                currentUser.health / currentUser.maxHealth * 100
            )
        );

    const xpPercent =
        Math.max(
            0,
            Math.min(
                100,
                currentUser.xp / xpNeeded * 100
            )
        );

    document.getElementById("healthBar").style.width =
        healthPercent + "%";

    document.getElementById("xpBar").style.width =
        xpPercent + "%";

    updateEmojiVisibility();
}


// ============================================================
// XP / LEVEL
// ============================================================

function addXP(amount) {

    if (!currentUser) {
        return;
    }

    currentUser.xp += amount;

    while (
        currentUser.xp >= currentUser.level * 100
    ) {

        currentUser.xp -= currentUser.level * 100;

        currentUser.level++;

        currentUser.maxHealth += 10;

        currentUser.health = currentUser.maxHealth;

        currentUser.damage += 2;

        showMessage(t("levelUp"));
    }

    saveUser(currentUser.username);

    updateStats();
}


// ============================================================
// SHOP
// ============================================================

const shopItems = {

    swords: [

        {
            name: "Holzschwert",
            icon: "🗡️",
            price: 30,
            damage: 3
        },

        {
            name: "Bronzeschwert",
            icon: "⚔️",
            price: 80,
            damage: 7
        },

        {
            name: "Silberschwert",
            icon: "⚔️",
            price: 180,
            damage: 13
        },

        {
            name: "Goldschwert",
            icon: "⚔️",
            price: 350,
            damage: 22
        },

        {
            name: "Diamantschwert",
            icon: "💎",
            price: 700,
            damage: 35
        },

        {
            name: "Drachenschwert",
            icon: "🔥",
            price: 1400,
            damage: 55
        }

    ],

    armor: [

        {
            name: "Lederüstung",
            icon: "🥋",
            price: 50,
            health: 15
        },

        {
            name: "Bronzerüstung",
            icon: "🛡️",
            price: 120,
            health: 30
        },

        {
            name: "Silberrüstung",
            icon: "🛡️",
            price: 250,
            health: 50
        },

        {
            name: "Goldrüstung",
            icon: "👑",
            price: 500,
            health: 80
        },

        {
            name: "Diamantrüstung",
            icon: "💎",
            price: 1000,
            health: 130
        },

        {
            name: "Drachenrüstung",
            icon: "🐉",
            price: 2000,
            health: 200
        }

    ],

    potions: [

        {
            name: "Heiltrank",
            icon: "🧪",
            price: 35,
            heal: 40
        },

        {
            name: "Großer Heiltrank",
            icon: "❤️",
            price: 100,
            heal: 100
        },

        {
            name: "Mega-Heiltrank",
            icon: "💖",
            price: 250,
            heal: 250
        }

    ],

    pickaxes: [

        {
            name: "Holz-Pickaxe",
            icon: "⛏️",
            price: 40,
            power: 1
        },

        {
            name: "Bronze-Pickaxe",
            icon: "⛏️",
            price: 100,
            power: 2
        },

        {
            name: "Silber-Pickaxe",
            icon: "⛏️",
            price: 250,
            power: 3
        },

        {
            name: "Gold-Pickaxe",
            icon: "⛏️",
            price: 500,
            power: 5
        },

        {
            name: "Diamant-Pickaxe",
            icon: "💎",
            price: 1000,
            power: 8
        },

        {
            name: "Drachen-Pickaxe",
            icon: "🔥",
            price: 2000,
            power: 12
        }

    ]
};


function renderShop() {

    currentScreen = "shop";

    const screen = document.getElementById("screen");

    screen.innerHTML = `

        <button
            class="action back-button"
            onclick="renderHome()"
        >
            ${t("back")}
        </button>

        <h2>${t("shopTitle")}</h2>

        <div class="shop-tabs">

            <button
                class="shop-tab ${shopTab === "swords" ? "active" : ""}"
                onclick="setShopTab('swords')"
            >
                ${t("swords")}
            </button>

            <button
                class="shop-tab ${shopTab === "armor" ? "active" : ""}"
                onclick="setShopTab('armor')"
            >
                ${t("armor")}
            </button>

            <button
                class="shop-tab ${shopTab === "potions" ? "active" : ""}"
                onclick="setShopTab('potions')"
            >
                ${t("potions")}
            </button>

            <button
                class="shop-tab ${shopTab === "pickaxes" ? "active" : ""}"
                onclick="setShopTab('pickaxes')"
            >
                ${t("pickaxes")}
            </button>

        </div>

        <div id="shopItems"></div>
    `;

    renderShopItems();

    updateTopButtons();

    updateEmojiVisibility();
}


function setShopTab(tab) {

    shopTab = tab;

    renderShop();
}


function renderShopItems() {

    const box =
        document.getElementById("shopItems");

    if (!box) {
        return;
    }

    const items = shopItems[shopTab];

    box.innerHTML = items.map((item, index) => {

        let description = "";

        if (item.damage) {
            description =
                `⚔️ +${item.damage} Schaden`;
        }

        if (item.health) {
            description =
                `❤️ +${item.health} Max-Leben`;
        }

        if (item.heal) {
            description =
                `❤️ Heilt ${item.heal} Leben`;
        }

        if (item.power) {
            description =
                `⛏️ Mining-Power ${item.power}`;
        }

        return `

            <div class="shop-item">

                <h3>
                    ${item.icon} ${item.name}
                </h3>

                <p>${description}</p>

                <p class="price">
                    💰 ${item.price} Gold
                </p>

                <button
                    class="action gold"
                    onclick="buyItem('${shopTab}', ${index})"
                >
                    🛒 Kaufen
                </button>

            </div>
        `;

    }).join("");

    updateEmojiVisibility();
}


// ============================================================
// SHOP KAUFEN
// ============================================================

function buyItem(category, index) {

    if (!currentUser) {
        return;
    }

    const item = shopItems[category][index];

    if (currentUser.gold < item.price) {

        showMessage(t("insufficientGold"));

        return;
    }

    currentUser.gold -= item.price;

    if (category === "swords") {

        currentUser.damage += item.damage;

        currentUser.inventory.swords.push(
            item.name
        );
    }

    if (category === "armor") {

        currentUser.maxHealth += item.health;

        currentUser.health += item.health;

        currentUser.armor += item.health;

        currentUser.inventory.armor.push(
            item.name
        );
    }

    if (category === "potions") {

        currentUser.potions++;

    }

    if (category === "pickaxes") {

        if (item.power > currentUser.pickaxePower) {

            currentUser.pickaxePower =
                item.power;
        }

        currentUser.inventory.pickaxes.push(
            item.name
        );
    }

    saveUser(currentUser.username);

    updateStats();

    renderShop();

    showMessage(
        `${t("purchased")} ${item.name}`
    );
}


// ============================================================
// MONSTER
// ============================================================

const monsters = [

    {
        name: "Slime",
        emoji: "🟢",
        health: 40,
        damage: 6,
        xp: 25,
        gold: 20
    },

    {
        name: "Goblin",
        emoji: "👺",
        health: 70,
        damage: 10,
        xp: 40,
        gold: 35
    },

    {
        name: "Wolf",
        emoji: "🐺",
        health: 90,
        damage: 13,
        xp: 50,
        gold: 45
    },

    {
        name: "Skeleton",
        emoji: "💀",
        health: 120,
        damage: 17,
        xp: 70,
        gold: 60
    },

    {
        name: "Ork",
        emoji: "👹",
        health: 180,
        damage: 22,
        xp: 100,
        gold: 90
    },

    {
        name: "Troll",
        emoji: "👾",
        health: 260,
        damage: 28,
        xp: 140,
        gold: 130
    },

    {
        name: "Dämon",
        emoji: "😈",
        health: 380,
        damage: 35,
        xp: 190,
        gold: 180
    },

    {
        name: "Drache",
        emoji: "🐉",
        health: 600,
        damage: 48,
        xp: 300,
        gold: 300
    }

];


function createMonster() {

    const base =
        monsters[
            Math.floor(
                Math.random() * monsters.length
            )
        ];

    const multiplier =
        1 + ((currentUser.level - 1) * .12);

    return {

        name: base.name,

        emoji: base.emoji,

        maxHealth:
            Math.floor(base.health * multiplier),

        health:
            Math.floor(base.health * multiplier),

        damage:
            Math.floor(base.damage * multiplier),

        xp:
            Math.floor(base.xp * multiplier),

        gold:
            Math.floor(base.gold * multiplier)

    };
}


// ============================================================
// KAMPF
// ============================================================

function renderFight() {

    currentScreen = "fight";

    if (!currentMonster) {

        currentMonster = createMonster();
    }

    const screen = document.getElementById("screen");

    screen.innerHTML = `

        <button
            class="action back-button"
            onclick="renderHome()"
        >
            ${t("back")}
        </button>

        <h2>⚔️ ${t("fight")}</h2>

        <div class="monster">

            <div class="monster-emoji">
                ${currentMonster.emoji}
            </div>

            <h2>
                ${escapeHtml(currentMonster.name)}
            </h2>

            <p class="monster-health">
                ❤️ ${currentMonster.health}
                /
                ${currentMonster.maxHealth}
            </p>

        </div>

        <button
            class="action danger"
            onclick="attackMonster()"
        >
            ⚔️ ${t("attack")}
        </button>

        <button
            class="action success"
            onclick="usePotion()"
        >
            🧪 ${t("potion")}
            (${currentUser.potions})
        </button>

        <button
            class="action"
            onclick="escapeFight()"
        >
            🏃 ${t("run")}
        </button>

    `;

    updateEmojiVisibility();
}


function attackMonster() {

    if (!currentUser || !currentMonster) {
        return;
    }

    const damage =
        Math.max(
            1,
            currentUser.damage +
            randomNumber(0, 5)
        );

    currentMonster.health -= damage;

    if (currentMonster.health <= 0) {

        const gold =
            currentMonster.gold +
            randomNumber(0, 20);

        currentUser.gold += gold;

        addXP(currentMonster.xp);

        saveUser(currentUser.username);

        showMessage(
            `${t("enemyDefeated")} +${gold} Gold`
        );

        currentMonster = null;

        updateStats();

        setTimeout(() => {

            renderFight();

        }, 500);

        return;
    }

    const enemyDamage =
        Math.max(
            1,
            currentMonster.damage -
            Math.floor(currentUser.armor / 20)
        );

    currentUser.health -= enemyDamage;

    if (currentUser.health <= 0) {

        currentUser.health = 0;

        saveUser(currentUser.username);

        updateStats();

        showMessage(t("defeat"));

        setTimeout(() => {

            currentUser.health =
                currentUser.maxHealth;

            saveUser(currentUser.username);

            renderHome();

        }, 1000);

        return;
    }

    saveUser(currentUser.username);

    updateStats();

    renderFight();
}


function usePotion() {

    if (!currentUser) {
        return;
    }

    if (currentUser.potions <= 0) {

        showMessage(t("noPotion"));

        return;
    }

    if (
        currentUser.health >=
        currentUser.maxHealth
    ) {

        showMessage("❤️ Leben ist bereits voll.");

        return;
    }

    const potion =
        shopItems.potions[0];

    currentUser.potions--;

    currentUser.health =
        Math.min(
            currentUser.maxHealth,
            currentUser.health + potion.heal
        );

    saveUser(currentUser.username);

    updateStats();

    renderFight();

    showMessage(t("healed"));
}


function escapeFight() {

    currentMonster = null;

    showMessage(t("escaped"));

    renderHome();
}


// ============================================================
// GOLDMINE
// ============================================================

function renderMine() {

    currentScreen = "mine";

    stopMiningTimer();

    const screen =
        document.getElementById("screen");

    const now = Date.now();

    if (
        miningState.cooldownUntil > now
    ) {

        const seconds =
            Math.ceil(
                (miningState.cooldownUntil - now) / 1000
            );

        screen.innerHTML = `

            <button
                class="action back-button"
                onclick="leaveMine()"
            >
                ${t("back")}
            </button>

            <div class="mining-box">

                <div class="big">⛏️</div>

                <h2>${t("miningTitle")}</h2>

                <p>${t("miningCooldown")}</p>

                <div
                    id="mineCooldown"
                    class="click-counter"
                >
                    ${seconds}s
                </div>

            </div>
        `;

        startCooldownDisplay();

        return;
    }

    if (!miningState.active) {

        miningState.required =
            randomNumber(
                5,
                10 + currentUser.pickaxePower * 2
            );

        miningState.clicks = 0;
    }

    screen.innerHTML = `

        <button
            class="action back-button"
            onclick="leaveMine()"
        >
            ${t("back")}
        </button>

        <div class="mining-box">

            <div class="big">⛏️</div>

            <h2>${t("miningTitle")}</h2>

            <p>${t("miningText")}</p>

            <div class="click-counter">
                <span id="mineClicks">
                    ${miningState.clicks}
                </span>
                /
                <span id="mineRequired">
                    ${miningState.required}
                </span>
            </div>

            <button
                id="mineButton"
                class="action gold"
                onclick="mineClick()"
            >
                ${t("miningButton")}
            </button>

        </div>
    `;

    updateEmojiVisibility();
}


function mineClick() {

    if (!currentUser) {
        return;
    }

    if (
        miningState.cooldownUntil >
        Date.now()
    ) {

        return;
    }

    miningState.active = true;

    miningState.clicks++;

    const clicks =
        document.getElementById("mineClicks");

    if (clicks) {

        clicks.textContent =
            miningState.clicks;
    }

    if (
        miningState.clicks >=
        miningState.required
    ) {

        const baseGold =
            randomNumber(10, 25);

        const gold =
            baseGold *
            Math.max(
                1,
                currentUser.pickaxePower
            );

        currentUser.gold += gold;

        saveUser(currentUser.username);

        updateStats();

        showMessage(
            `${t("miningReward")} +${gold} 💰`
        );

        miningState.active = false;

        miningState.clicks = 0;

        miningState.required =
            randomNumber(
                5,
                10 + currentUser.pickaxePower * 2
            );

        miningState.cooldownUntil =
            Date.now() + 8000;

        renderMine();
    }
}


function leaveMine() {

    stopMiningTimer();

    currentScreen = "home";

    renderHome();
}


function stopMiningTimer() {

    if (miningState.timer) {

        clearInterval(
            miningState.timer
        );

        miningState.timer = null;
    }
}


function startCooldownDisplay() {

    stopMiningTimer();

    miningState.timer =
        setInterval(() => {

            const element =
                document.getElementById(
                    "mineCooldown"
                );

            if (!element) {

                stopMiningTimer();

                return;
            }

            const remaining =
                Math.max(
                    0,
                    miningState.cooldownUntil -
                    Date.now()
                );

            if (remaining <= 0) {

                stopMiningTimer();

                miningState.cooldownUntil = 0;

                miningState.active = false;

                renderMine();

                return;
            }

            element.textContent =
                Math.ceil(
                    remaining / 1000
                ) + "s";

        }, 200);
}


// ============================================================
// MISSIONEN
// ============================================================

const missions = [

    {
        title: "Besiege dein erstes Monster",
        reward: 75
    },

    {
        title: "Finde Gold in der Mine",
        reward: 90
    },

    {
        title: "Kaufe ein Schwert",
        reward: 120
    },

    {
        title: "Kaufe eine Rüstung",
        reward: 150
    },

    {
        title: "Kaufe einen Heiltrank",
        reward: 100
    },

    {
        title: "Erreiche Level 2",
        reward: 200
    },

    {
        title: "Erreiche Level 3",
        reward: 300
    },

    {
        title: "Besiege einen Drachen",
        reward: 500
    },

    {
        title: "Verbessere deine Pickaxe",
        reward: 350
    },

    {
        title: "Werde ein echter QuestRPG-Held",
        reward: 750
    }

];


function renderMissions() {

    currentScreen = "missions";

    const screen =
        document.getElementById("screen");

    screen.innerHTML = `

        <button
            class="action back-button"
            onclick="renderHome()"
        >
            ${t("back")}
        </button>

        <h2>${t("missionsTitle")}</h2>

        ${missions.map((mission, index) => `

            <div class="quest">

                <strong>
                    Mission ${index + 1}
                </strong>

                <p>
                    ${mission.title}
                </p>

                <p class="price">
                    💰 ${mission.reward} Gold
                </p>

                <button
                    class="action"
                    onclick="claimMission(${index})"
                >
                    🎁 ${t("missionDone")}
                </button>

            </div>

        `).join("")}
    `;

    updateEmojiVisibility();
}


function claimMission(index) {

    if (!currentUser) {
        return;
    }

    if (!currentUser.completedMissions) {

        currentUser.completedMissions = {};
    }

    if (
        currentUser.completedMissions[index]
    ) {

        showMessage("Diese Mission wurde bereits abgeholt.");

        return;
    }

    const mission = missions[index];

    currentUser.completedMissions[index] =
        true;

    currentUser.gold +=
        mission.reward;

    saveUser(currentUser.username);

    updateStats();

    renderMissions();

    showMessage(
        `${t("missionDone")} +${mission.reward} Gold`
    );
}


// ============================================================
// EINSTELLUNGEN
// ============================================================

function renderSettings() {

    currentScreen = "settings";

    const screen =
        document.getElementById("screen");

    screen.innerHTML = `

        <button
            class="action back-button"
            onclick="renderHome()"
        >
            ${t("back")}
        </button>

        <h2>${t("settingsTitle")}</h2>

        <div class="card">

            <h3>🌍 ${t("language")}</h3>

            <select
                id="languageSelect"
                onchange="changeLanguage(this.value)"
            >

                <option
                    value="de"
                    ${settings.language === "de" ? "selected" : ""}
                >
                    Deutsch
                </option>

                <option
                    value="en"
                    ${settings.language === "en" ? "selected" : ""}
                >
                    English
                </option>

            </select>

        </div>

        <div class="card">

            <h3>😀 ${t("emojis")}</h3>

            <button
                class="action"
                onclick="toggleEmojis()"
            >
                ${settings.emojis
                    ? t("emojisOn")
                    : t("emojisOff")}
            </button>

        </div>

        ${
            currentUser
            ? `
                <div class="separator"></div>

                <button
                    class="action danger"
                    onclick="deleteOwnAccount()"
                >
                    ${t("deleteAccount")}
                </button>

                <button
                    class="action"
                    onclick="logout()"
                >
                    🔐 ${t("logout")}
                </button>
            `
            : ""
        }
    `;

    updateTopButtons();

    updateEmojiVisibility();
}


function changeLanguage(language) {

    settings.language =
        language === "en" ? "en" : "de";

    saveSettings();

    renderSettings();

    updateStats();

    updateTopButtons();
}


function toggleEmojis() {

    settings.emojis =
        !settings.emojis;

    saveSettings();

    renderSettings();

    updateEmojiVisibility();
}


// ============================================================
// ADMIN
// ============================================================

function renderAdmin() {

    if (
        !currentUser ||
        !currentUser.admin
    ) {

        renderHome();

        return;
    }

    currentScreen = "admin";

    const screen =
        document.getElementById("screen");

    screen.innerHTML = `

        <button
            class="action back-button"
            onclick="renderHome()"
        >
            ${t("back")}
        </button>

        <h2>${t("adminTitle")}</h2>

        <input
            id="adminSearch"
            placeholder="${t("searchUser")}"
            oninput="renderAdminUsers()"
        >

        <div id="adminUsers"></div>

        <div
            id="adminSelected"
            class="admin-actions"
        ></div>
    `;

    renderAdminUsers();

    updateTopButtons();

    updateEmojiVisibility();
}


function renderAdminUsers() {

    const box =
        document.getElementById("adminUsers");

    if (!box) {
        return;
    }

    const search =
        (
            document.getElementById(
                "adminSearch"
            )?.value || ""
        ).toLowerCase();

    const found =
        Object.values(users).filter(user =>
            user.username
                .toLowerCase()
                .includes(search)
        );

    if (found.length === 0) {

        box.innerHTML =
            `<p class="small">${t("noUsers")}</p>`;

        return;
    }

    box.innerHTML =
        found.map(user => `

            <div
                class="admin-user ${
                    adminSelectedUser === user.username
                    ? "selected"
                    : ""
                }"
                onclick="selectAdminUser('${escapeAttribute(user.username)}')"
            >

                <strong>
                    ${escapeHtml(user.username)}

                    ${
                        user.username === OWNER
                        ? `<span class="admin-badge">🖳</span>`
                        : ""
                    }
                </strong>

                <p>
                    ⭐ ${user.level}
                    &nbsp;&nbsp;
                    💰 ${user.gold}
                </p>

                <p class="${
                    user.banned
                    ? "status-banned"
                    : "status-online"
                }">

                    ${
                        user.banned
                        ? "🚫 " + t("banned")
                        : "✅ " + t("active")
                    }

                </p>

            </div>

        `).join("");

    renderAdminSelected();
}


function selectAdminUser(username) {

    if (!users[username]) {
        return;
    }

    adminSelectedUser =
        username;

    renderAdminUsers();
}


function renderAdminSelected() {

    const box =
        document.getElementById(
            "adminSelected"
        );

    if (!box) {
        return;
    }

    if (!adminSelectedUser) {

        box.innerHTML =
            `<p class="small">${t("selectUser")}</p>`;

        return;
    }

    const user =
        users[adminSelectedUser];

    if (!user) {

        adminSelectedUser = null;

        box.innerHTML = "";

        return;
    }

    box.innerHTML = `

        <div class="card">

            <h3>
                👤 ${escapeHtml(user.username)}

                ${
                    user.username === OWNER
                    ? `<span class="admin-badge">🖳</span>`
                    : ""
                }
            </h3>

            <p>
                💰 ${user.gold} Gold
            </p>

            <p>
                ⭐ Level ${user.level}
            </p>

            <input
                id="adminGoldAmount"
                type="number"
                min="0"
                placeholder="Gold amount"
            >

            <button
                class="action gold"
                onclick="adminGiveGold()"
            >
                💰 ${t("giveGold")}
            </button>

            <button
                class="action"
                onclick="adminResetGold()"
            >
                🔄 ${t("resetGold")}
            </button>

            <input
                id="adminLevelAmount"
                type="number"
                min="1"
                placeholder="Level"
            >

            <button
                class="action"
                onclick="adminSetLevel()"
            >
                ⭐ ${t("setLevel")}
            </button>

            <button
                class="action"
                onclick="adminResetLevel()"
            >
                🔄 ${t("resetLevel")}
            </button>

            ${
                user.banned
                ? `
                    <button
                        class="action success"
                        onclick="adminToggleBan()"
                    >
                        ✅ ${t("unban")}
                    </button>
                `
                : `
                    <button
                        class="action danger"
                        onclick="adminToggleBan()"
                    >
                        🚫 ${t("ban")}
                    </button>
                `
            }

            <button
                class="action danger"
                onclick="adminDeleteUser()"
            >
                🗑️ ${t("deleteUser")}
            </button>

            ${
                user.admin
                ? `
                    <button
                        class="action purple"
                        onclick="adminToggleAdmin()"
                    >
                        🖥️ ${t("removeAdmin")}
                    </button>
                `
                : `
                    <button
                        class="action purple"
                        onclick="adminToggleAdmin()"
                    >
                        🖥️ ${t("makeAdmin")}
                    </button>
                `
            }

        </div>
    `;

    updateEmojiVisibility();
}


// ============================================================
// ADMIN AKTIONEN
// ============================================================

function getSelectedAdminUser() {

    if (!adminSelectedUser) {
        return null;
    }

    return users[adminSelectedUser] || null;
}


function adminGiveGold() {

    const user =
        getSelectedAdminUser();

    if (!user) {
        return;
    }

    const input =
        document.getElementById(
            "adminGoldAmount"
        );

    const amount =
        Number(input?.value);

    if (!Number.isFinite(amount) || amount < 0) {
        return;
    }

    user.gold += Math.floor(amount);

    saveUsers();

    renderAdmin();

    showMessage(
        `💰 +${Math.floor(amount)} Gold`
    );
}


function adminResetGold() {

    const user =
        getSelectedAdminUser();

    if (!user) {
        return;
    }

    user.gold = 0;

    saveUsers();

    renderAdmin();
}


function adminSetLevel() {

    const user =
        getSelectedAdminUser();

    if (!user) {
        return;
    }

    const input =
        document.getElementById(
            "adminLevelAmount"
        );

    const level =
        Number(input?.value);

    if (
        !Number.isFinite(level) ||
        level < 1
    ) {
        return;
    }

    user.level =
        Math.floor(level);

    user.maxHealth =
        100 + ((user.level - 1) * 10);

    user.health =
        user.maxHealth;

    saveUsers();

    renderAdmin();
}


function adminResetLevel() {

    const user =
        getSelectedAdminUser();

    if (!user) {
        return;
    }

    user.level = 1;

    user.xp = 0;

    user.maxHealth = 100;

    user.health = 100;

    saveUsers();

    renderAdmin();
}


function adminToggleBan() {

    const user =
        getSelectedAdminUser();

    if (!user) {
        return;
    }

    if (user.username === OWNER) {

        showMessage(
            "Der Owner kann nicht gebannt werden."
        );

        return;
    }

    user.banned =
        !user.banned;

    saveUsers();

    renderAdmin();
}


function adminDeleteUser() {

    const user =
        getSelectedAdminUser();

    if (!user) {
        return;
    }

    if (user.username === OWNER) {

        showMessage(
            "Der Owner kann nicht gelöscht werden."
        );

        return;
    }

    if (
        !confirm(
            `Account ${user.username} wirklich löschen?`
        )
    ) {
        return;
    }

    delete users[user.username];

    adminSelectedUser = null;

    saveUsers();

    renderAdmin();
}


function adminToggleAdmin() {

    const user =
        getSelectedAdminUser();

    if (!user) {
        return;
    }

    if (user.username === OWNER) {

        showMessage(
            "005x5 bleibt immer Admin."
        );

        return;
    }

    user.admin =
        !user.admin;

    saveUsers();

    renderAdmin();
}


// ============================================================
// HILFSFUNKTIONEN
// ============================================================

function randomNumber(min, max) {

    return Math.floor(
        Math.random() * (max - min + 1)
    ) + min;
}


function escapeHtml(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}


function escapeAttribute(value) {

    return String(value)
        .replaceAll("\\", "\\\\")
        .replaceAll("'", "\\'");
}


// ============================================================
// NACHRICHT
// ============================================================

let messageTimer = null;

function showMessage(text) {

    const message =
        document.getElementById("message");

    if (!message) {
        return;
    }

    message.textContent = text;

    clearTimeout(messageTimer);

    messageTimer =
        setTimeout(() => {

            message.textContent = "";

        }, 3000);
}


// ============================================================
// SESSION STARTEN
// ============================================================

function initializeGame() {

    const session =
        loadSession();

    if (
        session &&
        users[session] &&
        !users[session].banned
    ) {

        currentUser =
            users[session];

    } else {

        currentUser = null;

        if (
            session &&
            users[session]?.banned
        ) {

            saveSession(null);
        }
    }

    updateStats();

    renderHome();

    updateEmojiVisibility();
}


// ============================================================
// START
// ============================================================

document.addEventListener(
    "DOMContentLoaded",
    initializeGame
);
