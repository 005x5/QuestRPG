"use strict";

/* =========================================================
   QuestRPG by 005x5
   KEINE COOKIES
   Speicherung über localStorage
========================================================= */

const USERS_KEY = "questrpg_users_final";
const SESSION_KEY = "questrpg_session_final";
const SETTINGS_KEY = "questrpg_settings_final";

let users = {};
let currentUser = null;

let settings = {
    language: "de",
    emojis: true
};

let enemy = null;

let mineState = {
    active: false,
    clicks: 0,
    required: 0,
    cooldown: false,
    cooldownEnd: 0,
    interval: null
};

let shopTab = "swords";

let stockPrice = 500;
let previousPrice = 500;
let stockTimer = null;


/* =========================================================
   SPEICHERN
========================================================= */

function loadData() {

    try {

        const savedUsers =
            localStorage.getItem(USERS_KEY);

        users =
            savedUsers
                ? JSON.parse(savedUsers)
                : {};

        const savedSettings =
            localStorage.getItem(SETTINGS_KEY);

        if (savedSettings) {

            settings = {
                ...settings,
                ...JSON.parse(savedSettings)
            };
        }

    } catch (error) {

        console.error(error);

        users = {};
    }
}


function saveUsers() {

    localStorage.setItem(
        USERS_KEY,
        JSON.stringify(users)
    );
}


function saveSettings() {

    localStorage.setItem(
        SETTINGS_KEY,
        JSON.stringify(settings)
    );
}


/* =========================================================
   EMOJIS
========================================================= */

function e(emoji) {

    return settings.emojis ? emoji : "";
}


/* =========================================================
   SPRACHE
========================================================= */

const text = {

    de: {
        welcome: "Willkommen",
        login: "Anmelden",
        register: "Registrieren",
        guest: "Als Gast spielen",
        username: "Benutzername",
        password: "Passwort",
        fight: "Kampf",
        shop: "Shop",
        mine: "Goldmine",
        missions: "Missionen",
        settings: "Einstellungen",
        stocks: "Aktien",
        logout: "Ausloggen",
        back: "← Zurück",
        attack: "Angreifen",
        flee: "Fliehen",
        heal: "Heiltrank",
        victory: "Sieg!",
        defeated: "Du wurdest besiegt!",
        language: "Sprache",
        emojis: "Emojis"
    },

    en: {
        welcome: "Welcome",
        login: "Login",
        register: "Register",
        guest: "Play as guest",
        username: "Username",
        password: "Password",
        fight: "Fight",
        shop: "Shop",
        mine: "Gold Mine",
        missions: "Missions",
        settings: "Settings",
        stocks: "Stocks",
        logout: "Logout",
        back: "← Back",
        attack: "Attack",
        flee: "Flee",
        heal: "Potion",
        victory: "Victory!",
        defeated: "You were defeated!",
        language: "Language",
        emojis: "Emojis"
    }

};


function t(key) {

    return (
        text[settings.language]?.[key]
        ||
        text.de[key]?.[key]
        ||
        key
    );
}


/* =========================================================
   USERNAME
========================================================= */

function cleanUsername(name) {

    return String(name || "")
        .trim()
        .replace(/[^\p{L}\p{N}_-]/gu, "");
}


function validUsername(name) {

    return /^[A-Za-z0-9_-]{3,20}$/.test(name);
}


/* =========================================================
   USER
========================================================= */

function createUser(username, password) {

    return {

        username,
        password,

        level: 1,
        xp: 0,

        gold: 50,

        health: 100,
        maxHealth: 100,

        attack: 10,

        weapon: "Holzschwert",
        armor: "Keine",
        pickaxe: "Steinspitzhacke",

        potion: 3,

        stocks: 0,

        banned: false,

        admin:
            username.toLowerCase() === "005x5",

        kills: 0,
        mines: 0,

        created: Date.now()
    };
}


function getUser() {

    if (!currentUser) {
        return null;
    }

    return users[currentUser] || null;
}


function updateUser(callback) {

    const user = getUser();

    if (!user) return;

    callback(user);

    users[currentUser] = user;

    saveUsers();

    updateStats();
}


/* =========================================================
   REGISTER
========================================================= */

function register(username, password) {

    username = cleanUsername(username);

    if (!validUsername(username)) {

        showAuthMessage(
            "Der Benutzername muss 3–20 Zeichen lang sein und darf keine Emojis enthalten."
        );

        return;
    }

    if (!password || password.length < 4) {

        showAuthMessage(
            "Das Passwort muss mindestens 4 Zeichen haben."
        );

        return;
    }

    const key =
        username.toLowerCase();

    if (users[key]) {

        showAuthMessage(
            "Dieser Benutzername existiert bereits."
        );

        return;
    }

    users[key] =
        createUser(
            username,
            password
        );

    saveUsers();

    login(username, password);
}


/* =========================================================
   LOGIN
========================================================= */

function login(username, password) {

    username =
        cleanUsername(username);

    const key =
        username.toLowerCase();

    const user =
        users[key];

    if (!user ||
        user.password !== password) {

        showAuthMessage(
            "Benutzername oder Passwort falsch."
        );

        return;
    }

    if (user.banned) {

        showAuthMessage(
            "Dieser Account wurde gebannt."
        );

        return;
    }

    currentUser = key;

    localStorage.setItem(
        SESSION_KEY,
        key
    );

    showGame();

    home();
}


function doLogin() {

    login(
        document.getElementById("authUsername").value,
        document.getElementById("authPassword").value
    );
}


function doRegister() {

    register(
        document.getElementById("authUsername").value,
        document.getElementById("authPassword").value
    );
}


/* =========================================================
   GAST
========================================================= */

function guestLogin() {

    if (!users.guest) {

        users.guest =
            createUser(
                "Gast",
                ""
            );

        saveUsers();
    }

    currentUser = "guest";

    localStorage.setItem(
        SESSION_KEY,
        "guest"
    );

    showGame();

    home();
}


/* =========================================================
   AUTH SCREEN
========================================================= */

function showAuth() {

    document.getElementById("gameUI")
        .style.display = "none";

    document.getElementById("authScreen")
        .innerHTML = `

        <div class="auth">

            <div class="auth-box">

                <h2>
                    ${e("⚔️")}
                    ${t("welcome")} zu QuestRPG
                </h2>

                <input
                    id="authUsername"
                    placeholder="${t("username")}"
                    maxlength="20"
                >

                <input
                    id="authPassword"
                    type="password"
                    placeholder="${t("password")}"
                >

                <button
                    class="success-button"
                    onclick="doLogin()"
                >
                    ${e("🔐")} ${t("login")}
                </button>

                <button onclick="doRegister()">
                    ${e("📝")} ${t("register")}
                </button>

                <button
                    class="gold-button"
                    onclick="guestLogin()"
                >
                    ${e("👤")} ${t("guest")}
                </button>

                <div id="authMessage"></div>

            </div>

        </div>
    `;
}


function showAuthMessage(message) {

    const box =
        document.getElementById("authMessage");

    if (box) {

        box.innerHTML =
            `<p class="error">${message}</p>`;
    }
}


/* =========================================================
   SESSION
========================================================= */

function restoreSession() {

    const session =
        localStorage.getItem(SESSION_KEY);

    if (!session ||
        !users[session]) {

        showAuth();

        return;
    }

    if (users[session].banned) {

        localStorage.removeItem(
            SESSION_KEY
        );

        showAuth();

        return;
    }

    currentUser = session;

    showGame();

    home();
}


/* =========================================================
   GAME UI
========================================================= */

function showGame() {

    document.getElementById("authScreen")
        .innerHTML = "";

    document.getElementById("gameUI")
        .style.display = "block";

    updateStats();
}


function updateStats() {

    const user = getUser();

    if (!user) return;

    document.getElementById("name")
        .textContent =
        (user.admin ? "🖳 " : "") +
        user.username;

    document.getElementById("level")
        .textContent =
        user.level;

    document.getElementById("gold")
        .textContent =
        user.gold;

    document.getElementById("health")
        .textContent =
        Math.max(0, user.health);

    document.getElementById("maxHealth")
        .textContent =
        user.maxHealth;

    const hp =
        Math.max(
            0,
            Math.min(
                100,
                user.health /
                user.maxHealth *
                100
            )
        );

    document.getElementById("healthBar")
        .style.width =
        hp + "%";

    const needed =
        100 +
        (user.level - 1) * 50;

    document.getElementById("xp")
        .textContent =
        user.xp;

    document.getElementById("xpNeeded")
        .textContent =
        needed;

    document.getElementById("xpBar")
        .style.width =
        Math.min(
            100,
            user.xp / needed * 100
        ) + "%";
}


function screen(html) {

    document.getElementById("screen")
        .innerHTML = html;
}


/* =========================================================
   HOME
========================================================= */

function home() {

    const user = getUser();

    if (!user) return;

    screen(`

        <h2>
            ${e("👋")}
            ${t("welcome")} ${user.username}!
        </h2>

        <div class="menu-grid">

            <div class="menu-card">
                <div class="menu-icon">
                    ${e("⚔️")}
                </div>

                <h2>${t("fight")}</h2>

                <button onclick="fightMenu()">
                    ${t("fight")}
                </button>
            </div>


            <div class="menu-card">
                <div class="menu-icon">
                    ${e("🏪")}
                </div>

                <h2>${t("shop")}</h2>

                <button
                    class="gold-button"
                    onclick="shop()"
                >
                    ${t("shop")}
                </button>
            </div>


            <div class="menu-card">
                <div class="menu-icon">
                    ${e("⛏️")}
                </div>

                <h2>${t("mine")}</h2>

                <button onclick="goldMine()">
                    ${t("mine")}
                </button>
            </div>


            <div class="menu-card">
                <div class="menu-icon">
                    ${e("📜")}
                </div>

                <h2>${t("missions")}</h2>

                <button onclick="missions()">
                    ${t("missions")}
                </button>
            </div>


            <div class="menu-card">
                <div class="menu-icon">
                    ${e("⚙️")}
                </div>

                <h2>${t("settings")}</h2>

                <button onclick="settingsMenu()">
                    ${t("settings")}
                </button>
            </div>


            <div class="menu-card">
                <div class="menu-icon">
                    ${e("💎")}
                </div>

                <h2>${t("stocks")}</h2>

                <button
                    class="purple-button"
                    onclick="stocks()"
                >
                    ${t("stocks")}
                </button>
            </div>

        </div>

        ${
            user.admin
            ?
            `
            <div class="separator"></div>

            <button
                class="danger-button"
                onclick="adminPanel()"
            >
                🖳 Admin Panel
            </button>
            `
            :
            ""
        }

    `);
}


/* =========================================================
   GOLD MINE
========================================================= */

function goldMine() {

    if (mineState.cooldown) {

        showMineCooldown();

        return;
    }

    mineState.active = true;

    mineState.clicks = 0;

    mineState.required =
        Math.floor(
            Math.random() * 16
        ) + 5;

    renderMine();
}


function renderMine() {

    screen(`

        <button
            class="back"
            onclick="home()"
        >
            ${t("back")}
        </button>

        <div class="mine-box">

            <h2>
                ${e("⛏️")}
                ${t("mine")}
            </h2>

            <p>
                Klicke so oft wie verlangt.
            </p>

            <h3>
                ${e("🎯")}
                Benötigt:
                ${mineState.required}
            </h3>

            <div class="click-counter">
                ${mineState.clicks}
                /
                ${mineState.required}
            </div>

            <button
                id="mineButton"
                onclick="mineClick()"
            >
                ${e("⛏️")}
                GOLD ABBAUEN
            </button>

            <p class="small">
                Deine Pickaxe verbessert dein Einkommen.
            </p>

        </div>
    `);
}


function mineClick() {

    if (!mineState.active ||
        mineState.cooldown) {

        return;
    }

    mineState.clicks++;

    if (
        mineState.clicks >=
        mineState.required
    ) {

        finishMining();

        return;
    }

    renderMine();
}


function finishMining() {

    const user = getUser();

    if (!user) return;

    const multiplier =
        getPickaxeBonus(
            user.pickaxe
        );

    const gold =
        Math.floor(
            (
                10 +
                Math.random() * 20 +
                mineState.required * 2
            ) *
            multiplier
        );

    updateUser(user => {

        user.gold += gold;

        user.mines++;
    });

    mineState.active = false;

    mineState.cooldown = true;

    mineState.cooldownEnd =
        Date.now() + 8000;

    screen(`

        <button
            class="back"
            onclick="home()"
        >
            ${t("back")}
        </button>

        <div class="mine-box">

            <h2>
                ${e("💰")}
                Gold gefunden!
            </h2>

            <div class="big">
                ${e("🪙")}
            </div>

            <h2>
                +${gold} Gold
            </h2>

            <p id="mineTimer">
                Cooldown: 8 Sekunden
            </p>

        </div>
    `);

    startMineTimer();
}


function startMineTimer() {

    if (mineState.interval) {

        clearInterval(
            mineState.interval
        );
    }

    mineState.interval =
        setInterval(() => {

            const remaining =
                Math.max(
                    0,
                    mineState.cooldownEnd -
                    Date.now()
                );

            const seconds =
                Math.ceil(
                    remaining / 1000
                );

            const timer =
                document.getElementById(
                    "mineTimer"
                );

            if (timer) {

                timer.textContent =
                    `Cooldown: ${seconds} Sekunden`;
            }

            if (remaining <= 0) {

                clearInterval(
                    mineState.interval
                );

                mineState.interval = null;

                mineState.cooldown = false;

                if (
                    document.getElementById("screen")
                ) {
                    goldMine();
                }

            }

        }, 200);
}


function showMineCooldown() {

    const remaining =
        Math.max(
            0,
            mineState.cooldownEnd -
            Date.now()
        );

    screen(`

        <button
            class="back"
            onclick="home()"
        >
            ${t("back")}
        </button>

        <div class="mine-box">

            <h2>
                ${e("⏳")}
                Cooldown
            </h2>

            <h1 id="mineTimer">
                ${Math.ceil(
                    remaining / 1000
                )}
                Sekunden
            </h1>

        </div>
    `);

    startMineTimer();
}


function getPickaxeBonus(name) {

    const bonuses = {

        "Steinspitzhacke": 1,

        "Bronzespitzhacke": 1.15,

        "Silberspitzhacke": 1.3,

        "Goldspitzhacke": 1.5,

        "Diamantspitzhacke": 1.8,

        "Drachen-Pickaxe": 2.1,

        "Legendäre Spitzhacke": 2.5

    };

    return bonuses[name] || 1;
}


/* =========================================================
   MONSTER
========================================================= */

const monsters = [

    {
        name: "Goblin",
        emoji: "👺",
        hp: 60,
        damage: 8,
        gold: 20,
        xp: 25
    },

    {
        name: "Wolf",
        emoji: "🐺",
        hp: 90,
        damage: 12,
        gold: 30,
        xp: 35
    },

    {
        name: "Skelett",
        emoji: "💀",
        hp: 120,
        damage: 15,
        gold: 40,
        xp: 45
    },

    {
        name: "Ork",
        emoji: "👹",
        hp: 180,
        damage: 22,
        gold: 60,
        xp: 65
    },

    {
        name: "Vampir",
        emoji: "🧛",
        hp: 250,
        damage: 30,
        gold: 90,
        xp: 90
    },

    {
        name: "Drache",
        emoji: "🐉",
        hp: 400,
        damage: 42,
        gold: 150,
        xp: 150
    },

    {
        name: "Eisgolem",
        emoji: "🗿",
        hp: 550,
        damage: 50,
        gold: 220,
        xp: 220
    },

    {
        name: "Dämon",
        emoji: "👿",
        hp: 800,
        damage: 65,
        gold: 350,
        xp: 350
    }

];


/* =========================================================
   KAMPF
========================================================= */

function createEnemy() {

    // 0,5 % Teufel
    if (Math.random() < 0.005) {

        return {

            name: "Teufel",

            emoji: "😈",

            hp: 500000,

            maxHp: 500000,

            damage: 500,

            gold: 5000,

            xp: 1000,

            boss: true
        };
    }

    const monster =
        monsters[
            Math.floor(
                Math.random() *
                monsters.length
            )
        ];

    return {

        ...monster,

        maxHp: monster.hp,

        boss: false
    };
}


function fightMenu() {

    enemy =
        createEnemy();

    renderFight();
}


function renderFight() {

    if (!enemy) {

        fightMenu();

        return;
    }

    const user =
        getUser();

    const percent =
        Math.max(
            0,
            enemy.hp /
            enemy.maxHp *
            100
        );

    screen(`

        <button
            class="back"
            onclick="home()"
        >
            ${t("back")}
        </button>

        <div class="monster ${enemy.boss ? "boss" : ""}">

            ${
                enemy.boss
                ?
                `<h2>⚠️ END BOSS ⚠️</h2>`
                :
                ""
            }

            <div class="monster-emoji">
                ${e(enemy.emoji)}
            </div>

            <h2>
                ${enemy.name}
            </h2>

            <p class="monster-hp">

                ❤️
                ${enemy.hp.toLocaleString()}
                /
                ${enemy.maxHp.toLocaleString()}

            </p>

            <div class="bar">

                <div
                    style="
                        height:100%;
                        width:${percent}%;
                        background:#e84b4b;
                    "
                ></div>

            </div>

            <p>

                ${e("⚔️")}

                Monster-Schaden:

                <strong>
                    ${enemy.damage}
                </strong>

                pro Angriff

            </p>

        </div>


        <button
            class="danger-button"
            onclick="attackEnemy()"
        >
            ${e("⚔️")}
            ${t("attack")}
        </button>


        <button
            class="success-button"
            onclick="usePotion()"
        >
            ${e("🧪")}
            ${t("heal")}
            (${user.potion})
        </button>


        <button
            class="orange-button"
            onclick="fleeFight()"
        >
            ${e("🏃")}
            ${t("flee")}
        </button>

    `);
}


/* =========================================================
   ANGREIFEN
========================================================= */

function attackEnemy() {

    if (!enemy) return;

    const user =
        getUser();

    if (!user) return;

    const damage =
        Math.max(
            1,
            user.attack +
            Math.floor(
                Math.random() * 8
            )
        );

    enemy.hp =
        Math.max(
            0,
            enemy.hp - damage
        );


    /* Sieg */

    if (enemy.hp <= 0) {

        const rewardGold =
            enemy.gold;

        const rewardXP =
            enemy.xp;

        const defeatedName =
            enemy.name;

        updateUser(user => {

            user.gold +=
                rewardGold;

            user.xp +=
                rewardXP;

            user.kills++;

            levelUp(user);
        });

        enemy = null;

        screen(`

            <button
                class="back"
                onclick="home()"
            >
                ${t("back")}
            </button>

            <div class="mine-box">

                <h2>
                    ${e("🏆")}
                    ${t("victory")}
                </h2>

                <h3>
                    ${defeatedName}
                    besiegt!
                </h3>

                <p>
                    💰 +${rewardGold} Gold
                </p>

                <p>
                    ⭐ +${rewardXP} XP
                </p>

            </div>

        `);

        return;
    }


    /* Monster greift zurück an */

    const incoming =
        Math.max(
            1,
            enemy.damage -
            getArmorDefense(
                user.armor
            )
        );

    updateUser(user => {

        user.health -=
            incoming;

    });


    const current =
        getUser();

    if (
        current &&
        current.health <= 0
    ) {

        death();

        return;
    }

    renderFight();
}


/* =========================================================
   FLIEHEN
========================================================= */

function fleeFight() {

    if (!enemy) return;

    const escapedEnemy =
        enemy.name;

    enemy = null;

    screen(`

        <button
            class="back"
            onclick="home()"
        >
            ${t("back")}
        </button>

        <div class="mine-box">

            <div class="big">
                ${e("🏃")}
            </div>

            <h2>
                ${t("flee")}!
            </h2>

            <p>
                Du bist vor
                <strong>
                    ${escapedEnemy}
                </strong>
                geflohen.
            </p>

            <button onclick="home()">
                ${e("🏠")}
                Weiter
            </button>

        </div>
    `);
}


/* =========================================================
   HEILTRÄNKE
========================================================= */

function usePotion() {

    const user =
        getUser();

    if (!user) return;

    if (user.potion <= 0) {

        return;
    }

    if (
        user.health >=
        user.maxHealth
    ) {

        return;
    }

    updateUser(user => {

        user.potion--;

        user.health =
            Math.min(
                user.maxHealth,
                user.health + 50
            );
    });

    renderFight();
}


/* =========================================================
   RÜSTUNG
========================================================= */

function getArmorDefense(name) {

    const defense = {

        "Keine": 0,

        "Bronzerüstung": 5,

        "Silberrüstung": 10,

        "Goldrüstung": 18,

        "Diamantrüstung": 30,

        "Drachen-Rüstung": 40,

        "Legendäre Rüstung": 50

    };

    return defense[name] || 0;
}


/* =========================================================
   TOD
========================================================= */

function death() {

    const user =
        getUser();

    if (!user) return;

    const lost =
        Math.floor(
            user.gold * 0.25
        );

    updateUser(user => {

        user.gold =
            Math.max(
                0,
                user.gold - lost
            );

        user.health =
            user.maxHealth;
    });

    enemy = null;

    screen(`

        <div class="mine-box">

            <div class="big">
                ${e("💀")}
            </div>

            <h2>
                ${t("defeated")}
            </h2>

            <p>
                Du hast
                <strong>
                    ${lost} Gold
                </strong>
                verloren.
            </p>

            <button onclick="home()">
                ${e("🏠")}
                Weiter
            </button>

        </div>
    `);
}


/* =========================================================
   LEVEL
========================================================= */

function levelUp(user) {

    let needed =
        100 +
        (user.level - 1) * 50;

    while (
        user.xp >= needed
    ) {

        user.xp -= needed;

        user.level++;

        user.maxHealth += 15;

        user.health =
            user.maxHealth;

        user.attack += 3;

        needed =
            100 +
            (user.level - 1) * 50;
    }
}


/* =========================================================
   SHOP
========================================================= */

const shopItems = {

    swords: [

        {
            name: "Holzschwert",
            price: 0,
            attack: 10,
            rarity: "Gewöhnlich"
        },

        {
            name: "Bronzeschwert",
            price: 100,
            attack: 15,
            rarity: "Bronze"
        },

        {
            name: "Silberschwert",
            price: 300,
            attack: 22,
            rarity: "Silber"
        },

        {
            name: "Goldschwert",
            price: 700,
            attack: 32,
            rarity: "Gold"
        },

        {
            name: "Diamantschwert",
            price: 1500,
            attack: 45,
            rarity: "Diamant"
        },

        {
            name: "Drachenschwert",
            price: 3000,
            attack: 58,
            rarity: "Drache"
        },

        {
            name: "Legendäres Schwert",
            price: 6000,
            attack: 75,
            rarity: "Legendär"
        }

    ],

    armor: [

        {
            name: "Bronzerüstung",
            price: 150,
            defense: 5,
            rarity: "Bronze"
        },

        {
            name: "Silberrüstung",
            price: 400,
            defense: 10,
            rarity: "Silber"
        },

        {
            name: "Goldrüstung",
            price: 900,
            defense: 18,
            rarity: "Gold"
        },

        {
            name: "Diamantrüstung",
            price: 2000,
            defense: 30,
            rarity: "Diamant"
        },

        {
            name: "Drachen-Rüstung",
            price: 3500,
            defense: 40,
            rarity: "Drache"
        },

        {
            name: "Legendäre Rüstung",
            price: 6500,
            defense: 50,
            rarity: "Legendär"
        }

    ],

    potions: [

        {
            name: "Heiltrank x1",
            price: 50,
            amount: 1
        },

        {
            name: "Heiltrank x3",
            price: 130,
            amount: 3
        },

        {
            name: "Heiltrank x5",
            price: 200,
            amount: 5
        },

        {
            name: "Großer Heiltrank x10",
            price: 350,
            amount: 10
        },

        {
            name: "Mega-Heiltrank x25",
            price: 750,
            amount: 25
        }

    ],

    pickaxes: [

        {
            name: "Steinspitzhacke",
            price: 0,
            multiplier: 1,
            rarity: "Gewöhnlich"
        },

        {
            name: "Bronzespitzhacke",
            price: 150,
            multiplier: 1.15,
            rarity: "Bronze"
        },

        {
            name: "Silberspitzhacke",
            price: 400,
            multiplier: 1.3,
            rarity: "Silber"
        },

        {
            name: "Goldspitzhacke",
            price: 900,
            multiplier: 1.5,
            rarity: "Gold"
        },

        {
            name: "Diamantspitzhacke",
            price: 2000,
            multiplier: 1.8,
            rarity: "Diamant"
        },

        {
            name: "Drachen-Pickaxe",
            price: 3500,
            multiplier: 2.1,
            rarity: "Drache"
        },

        {
            name: "Legendäre Spitzhacke",
            price: 6500,
            multiplier: 2.5,
            rarity: "Legendär"
        }

    ]
};


function shop() {

    renderShop();

    renderShopContent();
}


function renderShop() {

    screen(`

        <button
            class="back"
            onclick="home()"
        >
            ${t("back")}
        </button>

        <h2>
            ${e("🏪")}
            ${t("shop")}
        </h2>

        <div class="shop-tabs">

            <button onclick="setShopTab('swords')">
                ${e("⚔️")} Schwerter
            </button>

            <button onclick="setShopTab('armor')">
                ${e("🛡️")} Rüstungen
            </button>

            <button onclick="setShopTab('potions')">
                ${e("🧪")} Heiltränke
            </button>

            <button onclick="setShopTab('pickaxes')">
                ${e("⛏️")} Pickaxes
            </button>

        </div>

        <div id="shopContent"></div>
    `);
}


function setShopTab(tab) {

    shopTab = tab;

    renderShopContent();
}


function renderShopContent() {

    const box =
        document.getElementById(
            "shopContent"
        );

    if (!box) return;

    box.innerHTML =
        shopItems[shopTab]
            .map((item, index) => {

                let stats = "";

                if (
                    shopTab === "swords"
                ) {

                    stats =
                        `⚔️ Angriff: +${item.attack}`;
                }

                if (
                    shopTab === "armor"
                ) {

                    stats =
                        `🛡️ Verteidigung: +${item.defense}`;
                }

                if (
                    shopTab === "pickaxes"
                ) {

                    stats =
                        `⛏️ Gold-Multiplikator: x${item.multiplier}`;
                }

                if (
                    shopTab === "potions"
                ) {

                    stats =
                        `❤️ Anzahl: ${item.amount}`;
                }

                return `

                    <div class="shop-item">

                        <h3>
                            ${item.name}
                        </h3>

                        <p class="rarity">
                            ${item.rarity || ""}
                        </p>

                        <p>
                            ${stats}
                        </p>

                        <p>
                            💰
                            ${item.price}
                            Gold
                        </p>

                        <button
                            class="gold-button"
                            onclick="buyItem(${index})"
                        >
                            Kaufen
                        </button>

                    </div>
                `;

            })
            .join("");
}


function buyItem(index) {

    const user =
        getUser();

    const item =
        shopItems[shopTab][index];

    if (!user || !item) return;

    if (
        user.gold <
        item.price
    ) {

        alert(
            "Du hast nicht genug Gold!"
        );

        return;
    }

    updateUser(user => {

        user.gold -=
            item.price;

        if (
            shopTab === "swords"
        ) {

            user.weapon =
                item.name;

            user.attack =
                item.attack;
        }

        if (
            shopTab === "armor"
        ) {

            user.armor =
                item.name;

            user.maxHealth =
                100 +
                item.defense * 2;

            user.health =
                Math.min(
                    user.health,
                    user.maxHealth
                );
        }

        if (
            shopTab === "pickaxes"
        ) {

            user.pickaxe =
                item.name;
        }

        if (
            shopTab === "potions"
        ) {

            user.potion +=
                item.amount;
        }

    });

    renderShopContent();
}


/* =========================================================
   MISSIONEN
========================================================= */

const missionsList = [

    ["Erster Kampf", "Besiege 1 Monster", 50],

    ["Goldsucher", "Verdiene 100 Gold", 100],

    ["Kämpfer", "Besiege 5 Monster", 150],

    ["Jäger", "Besiege 10 Monster", 250],

    ["Bergarbeiter", "Baue Gold ab", 200],

    ["Elite", "Erreiche Level 5", 500],

    ["Ritter", "Erreiche Level 10", 1000],

    ["Diamantjäger", "Kaufe ein Diamant-Item", 1500],

    ["Legende", "Erreiche Level 20", 3000],

    ["Teufelsjäger", "Besiege den Teufel", 10000]

];


function missions() {

    screen(`

        <button
            class="back"
            onclick="home()"
        >
            ${t("back")}
        </button>

        <h2>
            ${e("📜")}
            ${t("missions")}
        </h2>

        ${missionsList.map(
            (mission, index) => `

            <div class="shop-item">

                <h3>
                    Mission ${index + 1}:
                    ${mission[0]}
                </h3>

                <p>
                    ${mission[1]}
                </p>

                <strong>
                    💰
                    ${mission[2]}
                    Gold
                </strong>

            </div>
        `).join("")}

    `);
}


/* =========================================================
   AKTIEN
========================================================= */

function stocks() {

    screen(`

        <button
            class="back"
            onclick="home()"
        >
            ${t("back")}
        </button>

        <h2>
            ${e("💎")}
            ${t("stocks")}
        </h2>

        <div class="card-grid">

            <div class="card">

                <h3>
                    💎 Diamanten
                </h3>

                <p>
                    0,5% =
                    ${stockPrice}
                    Gold
                </p>

            </div>

            <div class="card">

                <h3>
                    Vorheriger Preis
                </h3>

                <p>
                    ${previousPrice}
                    Gold
                </p>

            </div>

            <div class="card">

                <h3>
                    Dein Besitz
                </h3>

                <p>
                    ${getUser().stocks || 0}
                    Aktien
                </p>

            </div>

        </div>

        <div class="shop-item">

            <h3>
                💎 Aktien kaufen
            </h3>

            <input
                id="stockBuyAmount"
                type="number"
                min="1"
                placeholder="Anzahl Aktien"
            >

            <button
                class="gold-button"
                onclick="buyStocks()"
            >
                Kaufen
            </button>

        </div>

        <div class="shop-item">

            <h3>
                💰 Aktien verkaufen
            </h3>

            <button onclick="sellStocks()">
                Eine Aktie verkaufen
            </button>

            <button
                class="danger-button"
                onclick="sellAllStocks()"
            >
                Alles verkaufen
            </button>

        </div>

        <p class="small">
            Der Preis verändert sich alle 5 Minuten zufällig.
        </p>
    `);
}


function buyStocks() {

    const user =
        getUser();

    const input =
        document.getElementById(
            "stockBuyAmount"
        );

    const amount =
        Math.floor(
            Number(input.value)
        );

    if (
        !amount ||
        amount <= 0
    ) return;

    const cost =
        amount *
        stockPrice;

    if (
        user.gold <
        cost
    ) {

        alert(
            "Nicht genug Gold!"
        );

        return;
    }

    updateUser(user => {

        user.gold -=
            cost;

        user.stocks =
            (user.stocks || 0) +
            amount;
    });

    stocks();
}


function sellStocks() {

    const user =
        getUser();

    if (
        !user.stocks ||
        user.stocks <= 0
    ) {

        return;
    }

    updateUser(user => {

        user.stocks--;

        user.gold +=
            stockPrice;
    });

    stocks();
}


function sellAllStocks() {

    const user =
        getUser();

    if (!user.stocks) return;

    updateUser(user => {

        user.gold +=
            user.stocks *
            stockPrice;

        user.stocks = 0;
    });

    stocks();
}


function startStockTimer() {

    if (stockTimer) return;

    stockTimer =
        setInterval(() => {

            previousPrice =
                stockPrice;

            const change =
                Math.floor(
                    Math.random() * 401
                ) - 200;

            stockPrice =
                Math.max(
                    50,
                    stockPrice + change
                );

        }, 300000);
}


/* =========================================================
   EINSTELLUNGEN
========================================================= */

function settingsMenu() {

    screen(`

        <button
            class="back"
            onclick="home()"
        >
            ${t("back")}
        </button>

        <h2>
            ${e("⚙️")}
            ${t("settings")}
        </h2>

        <div class="shop-item">

            <h3>
                🌐 ${t("language")}
            </h3>

            <select
                id="languageSelect"
                onchange="changeLanguage(this.value)"
            >

                <option
                    value="de"
                    ${settings.language === "de"
                    ? "selected"
                    : ""}
                >
                    Deutsch
                </option>

                <option
                    value="en"
                    ${settings.language === "en"
                    ? "selected"
                    : ""}
                >
                    English
                </option>

            </select>

        </div>


        <div class="shop-item">

            <h3>
                😀 ${t("emojis")}
            </h3>

            <button
                onclick="toggleEmojis()"
            >
                ${
                    settings.emojis
                    ? "Emojis: AN"
                    : "Emojis: AUS"
                }
            </button>

            <p class="small">
                ${
                    settings.emojis
                    ? "Emojis sind eingeschaltet."
                    : "Emojis sind ausgeschaltet."
                }
            </p>

        </div>


        <div class="shop-item">

            <h3>
                👤 Account
            </h3>

            <p>
                Benutzer:
                <strong>
                    ${getUser().username}
                </strong>
            </p>

            <button
                class="danger-button"
                onclick="logout()"
            >
                🚪 ${t("logout")}
            </button>

        </div>


        <div class="shop-item">

            <h3>
                ⚠️ Account löschen
            </h3>

            <button
                class="danger-button"
                onclick="deleteAccount()"
            >
                Account löschen
            </button>

        </div>

    `);
}


function changeLanguage(language) {

    if (
        language !== "de" &&
        language !== "en"
    ) return;

    settings.language =
        language;

    saveSettings();

    settingsMenu();
}


function toggleEmojis() {

    settings.emojis =
        !settings.emojis;

    saveSettings();

    settingsMenu();
}


function logout() {

    localStorage.removeItem(
        SESSION_KEY
    );

    currentUser = null;

    enemy = null;

    showAuth();
}


function deleteAccount() {

    const user =
        getUser();

    if (!user) return;

    if (
        user.username.toLowerCase()
        === "005x5"
    ) {

        alert(
            "Der Owner kann nicht gelöscht werden."
        );

        return;
    }

    if (
        !confirm(
            `Account "${user.username}" wirklich löschen?`
        )
    ) return;

    delete users[currentUser];

    saveUsers();

    localStorage.removeItem(
        SESSION_KEY
    );

    currentUser = null;

    showAuth();
}


/* =========================================================
   ADMIN PANEL
========================================================= */

function adminPanel() {

    const user =
        getUser();

    if (
        !user ||
        !user.admin
    ) return;

    screen(`

        <button
            class="back"
            onclick="home()"
        >
            ← Zurück
        </button>

        <h2>
            🖳 Admin Panel
        </h2>

        <input
            id="adminSearch"
            placeholder="Username suchen..."
            oninput="searchAdminUsers()"
        >

        <div id="adminUsers"></div>
    `);

    searchAdminUsers();
}


function searchAdminUsers() {

    const input =
        document.getElementById(
            "adminSearch"
        );

    const box =
        document.getElementById(
            "adminUsers"
        );

    if (!input || !box) return;

    const query =
        input.value
            .trim()
            .toLowerCase();

    const matches =
        Object.values(users)
            .filter(user =>
                user.username
                    .toLowerCase()
                    .includes(query)
            );

    box.innerHTML =
        matches.map(user => `

            <div class="shop-item">

                <h3>
                    ${
                        user.admin
                        ? "🖳 "
                        : ""
                    }

                    ${user.username}
                </h3>

                <p>
                    ⭐ Level:
                    ${user.level}
                </p>

                <p>
                    💰 Gold:
                    ${user.gold}
                </p>

                <p>
                    ${
                        user.banned
                        ? "🚫 Gebannt"
                        : "✅ Aktiv"
                    }
                </p>

                <button
                    onclick="adminSelectUser('${escapeAttr(user.username)}')"
                >
                    Account auswählen
                </button>

            </div>

        `).join("");

    if (!matches.length) {

        box.innerHTML =
            `<p class="small">
                Kein Account gefunden.
            </p>`;
    }
}


function escapeAttr(value) {

    return String(value)
        .replace(/'/g, "\\'");
}


function adminSelectUser(username) {

    const key =
        username.toLowerCase();

    const target =
        users[key];

    if (!target) return;

    screen(`

        <button
            class="back"
            onclick="adminPanel()"
        >
            ← Zurück
        </button>

        <h2>
            🖳
            ${
                target.admin
                ? "🖳 "
                : ""
            }
            ${target.username}
        </h2>


        <div class="shop-item">

            <p>
                ⭐ Level:
                ${target.level}
            </p>

            <p>
                💰 Gold:
                ${target.gold}
            </p>

            <p>
                ❤️ Leben:
                ${target.health}
                /
                ${target.maxHealth}
            </p>

        </div>


        <div class="shop-item">

            <h3>
                💰 Gold geben
            </h3>

            <input
                id="adminGold"
                type="number"
                min="0"
                placeholder="Goldmenge"
            >

            <button
                class="gold-button"
                onclick="adminGiveGold('${escapeAttr(target.username)}')"
            >
                Gold geben
            </button>

            <button
                onclick="adminResetGold('${escapeAttr(target.username)}')"
            >
                Gold auf 0 setzen
            </button>

        </div>


        <div class="shop-item">

            <h3>
                ⭐ Level
            </h3>

            <input
                id="adminLevel"
                type="number"
                min="1"
                placeholder="Level"
            >

            <button
                onclick="adminSetLevel('${escapeAttr(target.username)}')"
            >
                Level setzen
            </button>

            <button
                onclick="adminResetLevel('${escapeAttr(target.username)}')"
            >
                Level zurücksetzen
            </button>

        </div>


        <button
            class="${
                target.banned
                ? "success-button"
                : "danger-button"
            }"
            onclick="adminToggleBan('${escapeAttr(target.username)}')"
        >
            ${
                target.banned
                ? "✅ Entbannen"
                : "🚫 Account bannen"
            }
        </button>


        <button
            class="danger-button"
            onclick="adminDeleteUser('${escapeAttr(target.username)}')"
        >
            🗑️ Account löschen
        </button>


        <button
            class="purple-button"
            onclick="adminToggleAdmin('${escapeAttr(target.username)}')"
        >
            🖳
            ${
                target.admin
                ? "Admin entfernen"
                : "Admin geben"
            }
        </button>

    `);
}


function adminGiveGold(username) {

    const target =
        users[
            username.toLowerCase()
        ];

    const input =
        document.getElementById(
            "adminGold"
        );

    const amount =
        Number(input.value);

    if (
        !target ||
        !Number.isFinite(amount) ||
        amount < 0
    ) return;

    target.gold +=
        Math.floor(amount);

    saveUsers();

    adminSelectUser(username);
}


function adminResetGold(username) {

    const target =
        users[
            username.toLowerCase()
        ];

    if (!target) return;

    target.gold = 0;

    saveUsers();

    adminSelectUser(username);
}


function adminSetLevel(username) {

    const target =
        users[
            username.toLowerCase()
        ];

    const level =
        Number(
            document.getElementById(
                "adminLevel"
            ).value
        );

    if (
        !target ||
        !Number.isFinite(level) ||
        level < 1
    ) return;

    target.level =
        Math.floor(level);

    target.xp = 0;

    target.maxHealth =
        100 +
        (target.level - 1) *
        15;

    target.health =
        target.maxHealth;

    saveUsers();

    adminSelectUser(username);
}


function adminResetLevel(username) {

    const target =
        users[
            username.toLowerCase()
        ];

    if (!target) return;

    target.level = 1;
    target.xp = 0;
    target.maxHealth = 100;
    target.health = 100;

    saveUsers();

    adminSelectUser(username);
}


function adminToggleBan(username) {

    const key =
        username.toLowerCase();

    const target =
        users[key];

    if (!target) return;

    if (key === "005x5") {

        alert(
            "005x5 kann nicht gebannt werden."
        );

        return;
    }

    target.banned =
        !target.banned;

    saveUsers();

    adminSelectUser(username);
}


function adminDeleteUser(username) {

    const key =
        username.toLowerCase();

    if (key === "005x5") {

        alert(
            "Der Owner kann nicht gelöscht werden."
        );

        return;
    }

    if (!users[key]) return;

    if (
        !confirm(
            `Account "${username}" wirklich löschen?`
        )
    ) return;

    delete users[key];

    saveUsers();

    adminPanel();
}


function adminToggleAdmin(username) {

    const key =
        username.toLowerCase();

    const target =
        users[key];

    if (!target) return;

    if (key === "005x5") {

        alert(
            "005x5 ist bereits Owner/Admin."
        );

        return;
    }

    target.admin =
        !target.admin;

    saveUsers();

    adminSelectUser(username);
}


/* =========================================================
   START
========================================================= */

loadData();


/*


if (!users["005x5"]) {

    users["005x5"] =
        createUser(
            "005x5",
            "005x5"
        );

    users["005x5"].admin =
        true;

    saveUsers();
}

else {

    users["005x5"].admin =
        true;

    saveUsers();
}


startStockTimer();

restoreSession();
