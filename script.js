const KEYS = {
    users: "questrpg_users_v1",
    current: "questrpg_current_v1",
    settings: "questrpg_settings_v1",
    prefix: "questrpg_state_v1_"
};


// ============================================================
// EINSTELLUNGEN
// ============================================================

const defaultSettings = {
    language: "de",
    emojis: true
};


// ============================================================
// STANDARD-SPIELER
// ============================================================

const defaultPlayer = {

    name: "Held",

    level: 1,

    xp: 0,

    gold: 50,

    health: 100,

    maxHealth: 100,

    weaponId: "wood",

    armorId: "cloth",

    pickaxeId: "wood_pickaxe",

    defeated: 0,

    totalMined: 0,

    totalGoldEarned: 0,

    itemsBought: 0,

    defeatedByName: {},

    missionIndex: 0

};


// ============================================================
// WAFFEN
// ============================================================

const weapons = [

    {
        id: "wood",
        nameDE: "Holzschwert",
        nameEN: "Wooden Sword",
        damage: 10,
        price: 0
    },

    {
        id: "bronze",
        nameDE: "Bronzeschwert",
        nameEN: "Bronze Sword",
        damage: 16,
        price: 50
    },

    {
        id: "silver",
        nameDE: "Silberschwert",
        nameEN: "Silver Sword",
        damage: 24,
        price: 100
    },

    {
        id: "gold",
        nameDE: "Goldschwert",
        nameEN: "Golden Sword",
        damage: 34,
        price: 180
    },

    {
        id: "iron",
        nameDE: "Eisenschwert",
        nameEN: "Iron Sword",
        damage: 45,
        price: 280
    },

    {
        id: "diamond",
        nameDE: "Diamantschwert",
        nameEN: "Diamond Sword",
        damage: 62,
        price: 450
    },

    {
        id: "dragon",
        nameDE: "Drachenschwert",
        nameEN: "Dragon Sword",
        damage: 85,
        price: 750
    },

    {
        id: "legendary",
        nameDE: "Legendäres Schwert",
        nameEN: "Legendary Sword",
        damage: 120,
        price: 1300
    }

];


// ============================================================
// RÜSTUNGEN
// ============================================================

const armors = [

    {
        id: "cloth",
        nameDE: "Alte Kleidung",
        nameEN: "Old Clothes",
        bonusHealth: 0,
        price: 0
    },

    {
        id: "bronze",
        nameDE: "Bronzerüstung",
        nameEN: "Bronze Armor",
        bonusHealth: 20,
        price: 60
    },

    {
        id: "silver",
        nameDE: "Silberrüstung",
        nameEN: "Silver Armor",
        bonusHealth: 45,
        price: 130
    },

    {
        id: "gold",
        nameDE: "Goldrüstung",
        nameEN: "Golden Armor",
        bonusHealth: 80,
        price: 220
    },

    {
        id: "iron",
        nameDE: "Eisenrüstung",
        nameEN: "Iron Armor",
        bonusHealth: 120,
        price: 330
    },

    {
        id: "diamond",
        nameDE: "Diamantrüstung",
        nameEN: "Diamond Armor",
        bonusHealth: 180,
        price: 520
    },

    {
        id: "dragon",
        nameDE: "Drachenrüstung",
        nameEN: "Dragon Armor",
        bonusHealth: 280,
        price: 850
    },

    {
        id: "legendary",
        nameDE: "Legendäre Rüstung",
        nameEN: "Legendary Armor",
        bonusHealth: 420,
        price: 1500
    }

];


// ============================================================
// SPITZHACKEN
// ============================================================

const pickaxes = [

    {
        id: "wood_pickaxe",
        nameDE: "Holzspitzhacke",
        nameEN: "Wooden Pickaxe",
        bonus: 5,
        price: 0
    },

    {
        id: "bronze_pickaxe",
        nameDE: "Bronzespitzhacke",
        nameEN: "Bronze Pickaxe",
        bonus: 12,
        price: 50
    },

    {
        id: "silver_pickaxe",
        nameDE: "Silberspitzhacke",
        nameEN: "Silver Pickaxe",
        bonus: 20,
        price: 100
    },

    {
        id: "gold_pickaxe",
        nameDE: "Goldspitzhacke",
        nameEN: "Golden Pickaxe",
        bonus: 35,
        price: 175
    },

    {
        id: "iron_pickaxe",
        nameDE: "Eisenspitzhacke",
        nameEN: "Iron Pickaxe",
        bonus: 50,
        price: 260
    },

    {
        id: "diamond_pickaxe",
        nameDE: "Diamantspitzhacke",
        nameEN: "Diamond Pickaxe",
        bonus: 75,
        price: 400
    },

    {
        id: "dragon_pickaxe",
        nameDE: "Drachenspitzhacke",
        nameEN: "Dragon Pickaxe",
        bonus: 110,
        price: 650
    },

    {
        id: "legendary_pickaxe",
        nameDE: "Legendäre Spitzhacke",
        nameEN: "Legendary Pickaxe",
        bonus: 160,
        price: 1100
    }

];


// ============================================================
// MONSTER
// ============================================================

const monsters = [

    {
        id: "slime",
        nameDE: "Schleim",
        nameEN: "Slime",
        emoji: "🟢",
        health: 35,
        damage: 8,
        xp: 25,
        gold: 20
    },

    {
        id: "wolf",
        nameDE: "Wilder Wolf",
        nameEN: "Wild Wolf",
        emoji: "🐺",
        health: 55,
        damage: 14,
        xp: 40,
        gold: 35
    },

    {
        id: "goblin",
        nameDE: "Goblin",
        nameEN: "Goblin",
        emoji: "👺",
        health: 75,
        damage: 18,
        xp: 60,
        gold: 50
    },

    {
        id: "orc",
        nameDE: "Ork",
        nameEN: "Orc",
        emoji: "👹",
        health: 120,
        damage: 25,
        xp: 90,
        gold: 80
    },

    {
        id: "knight",
        nameDE: "Dunkler Ritter",
        nameEN: "Dark Knight",
        emoji: "🛡️",
        health: 180,
        damage: 35,
        xp: 140,
        gold: 120
    },

    {
        id: "mage",
        nameDE: "Magier",
        nameEN: "Mage",
        emoji: "🧙",
        health: 220,
        damage: 42,
        xp: 180,
        gold: 160
    },

    {
        id: "dragon",
        nameDE: "Drache",
        nameEN: "Dragon",
        emoji: "🐉",
        health: 350,
        damage: 55,
        xp: 300,
        gold: 300
    },

    {
        id: "demon",
        nameDE: "Dämon",
        nameEN: "Demon",
        emoji: "😈",
        health: 500,
        damage: 70,
        xp: 500,
        gold: 500
    }

];


// ============================================================
// 10 MISSIONEN
// ============================================================

const missions = [

    {
        type: "mine",
        target: 1,
        reward: [40, 70],
        de: "Baue 1x Gold ab",
        en: "Mine gold 1 time"
    },

    {
        type: "defeat",
        target: 1,
        reward: [50, 90],
        de: "Besiege 1 Monster",
        en: "Defeat 1 monster"
    },

    {
        type: "mine",
        target: 3,
        reward: [70, 120],
        de: "Baue insgesamt 3x Gold ab",
        en: "Mine gold 3 times"
    },

    {
        type: "defeat",
        target: 2,
        reward: [90, 150],
        de: "Besiege insgesamt 2 Monster",
        en: "Defeat 2 monsters"
    },

    {
        type: "buy",
        target: 1,
        reward: [110, 180],
        de: "Kaufe 1 Gegenstand im Shop",
        en: "Buy 1 shop item"
    },

    {
        type: "level",
        target: 2,
        reward: [140, 220],
        de: "Erreiche Level 2",
        en: "Reach level 2"
    },

    {
        type: "goblin",
        target: 1,
        reward: [160, 260],
        de: "Besiege 1 Goblin",
        en: "Defeat 1 Goblin"
    },

    {
        type: "earned",
        target: 300,
        reward: [180, 300],
        de: "Verdiene insgesamt 300 Gold",
        en: "Earn 300 total gold"
    },

    {
        type: "defeat",
        target: 5,
        reward: [220, 380],
        de: "Besiege insgesamt 5 Monster",
        en: "Defeat 5 monsters"
    },

    {
        type: "level",
        target: 5,
        reward: [400, 700],
        de: "Erreiche Level 5",
        en: "Reach level 5"
    }

];


// ============================================================
// VARIABLEN
// ============================================================

let settings = loadSettings();

let users = loadUsers();

let currentUsername =
    localStorage.getItem(KEYS.current) || null;

let player = null;

let currentMonster = null;

let monsterHealth = 0;

let mineClicksRequired = 0;

let mineClicksDone = 0;

let mineCooldownUntil = 0;

let mineTimer = null;


// ============================================================
// LOCALSTORAGE
// ============================================================

function loadSettings() {

    try {

        return {
            ...defaultSettings,
            ...(JSON.parse(
                localStorage.getItem(KEYS.settings)
            ) || {})
        };

    } catch {

        return {
            ...defaultSettings
        };

    }

}


function saveSettings() {

    localStorage.setItem(
        KEYS.settings,
        JSON.stringify(settings)
    );

}


function loadUsers() {

    try {

        return JSON.parse(
            localStorage.getItem(KEYS.users)
        ) || {};

    } catch {

        return {};

    }

}


function saveUsers() {

    localStorage.setItem(
        KEYS.users,
        JSON.stringify(users)
    );

}


function userKey(username) {

    return username
        .trim()
        .toLowerCase();

}


function stateKey(username) {

    return (
        KEYS.prefix +
        encodeURIComponent(
            userKey(username)
        )
    );

}


function loadPlayer(username) {

    try {

        const saved =
            JSON.parse(
                localStorage.getItem(
                    stateKey(username)
                )
            );

        const p = {
            ...defaultPlayer,
            ...(saved || {})
        };

        p.defeatedByName =
            p.defeatedByName || {};

        return p;

    } catch {

        return {
            ...defaultPlayer,
            defeatedByName: {}
        };

    }

}


function savePlayer() {

    if (!currentUsername || !player) {
        return;
    }

    localStorage.setItem(
        stateKey(currentUsername),
        JSON.stringify(player)
    );

}


// ============================================================
// SPRACHEN
// ============================================================

function t(de, en) {

    return settings.language === "de"
        ? de
        : en;

}


function E(emoji) {

    return settings.emojis
        ? `<span class="emoji">${emoji}</span>`
        : "";

}


// ============================================================
// SICHERER TEXT
// ============================================================

function esc(text) {

    return String(text).replace(
        /[&<>'"]/g,

        character => ({

            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            "'": "&#39;",
            '"': "&quot;"

        }[character])

    );

}


function itemName(item) {

    return settings.language === "de"
        ? item.nameDE
        : item.nameEN;

}


function monsterName(monster) {

    return settings.language === "de"
        ? monster.nameDE
        : monster.nameEN;

}


// ============================================================
// UI
// ============================================================

function render(html) {

    document
        .getElementById("screen")
        .innerHTML = html;

}


function message(text) {

    document
        .getElementById("message")
        .textContent = text;

}


function updateBodyEmojiClass() {

    document.body.classList.toggle(
        "no-emoji",
        !settings.emojis
    );

}


function updateTopStats() {

    if (!document.getElementById("name")) {
        return;
    }

    if (!player) {

        document.getElementById("name")
            .textContent = t(
                "Gast",
                "Guest"
            );

        document.getElementById("level")
            .textContent = "-";

        document.getElementById("gold")
            .textContent = "-";

        document.getElementById("health")
            .textContent = "-";

        document.getElementById("maxHealth")
            .textContent = "-";

        document.getElementById("xp")
            .textContent = "-";

        document.getElementById("xpNeeded")
            .textContent = "-";

        document.getElementById("healthBar")
            .style.width = "0%";

        document.getElementById("xpBar")
            .style.width = "0%";

        return;

    }


    document.getElementById("name")
        .textContent =
        player.name;

    document.getElementById("level")
        .textContent =
        player.level;

    document.getElementById("gold")
        .textContent =
        player.gold;

    document.getElementById("health")
        .textContent =
        player.health;

    document.getElementById("maxHealth")
        .textContent =
        player.maxHealth;


    const needed =
        player.level * 100;


    document.getElementById("xp")
        .textContent =
        player.xp;

    document.getElementById("xpNeeded")
        .textContent =
        needed;


    document.getElementById("xpBar")
        .style.width =
        Math.min(
            100,
            (player.xp / needed) * 100
        ) + "%";


    document.getElementById("healthBar")
        .style.width =
        Math.max(
            0,
            Math.min(
                100,
                (player.health /
                    player.maxHealth) *
                    100
            )
        ) + "%";

}


function randomNumber(min, max) {

    return Math.floor(
        Math.random() *
        (max - min + 1)
    ) + min;

}


// ============================================================
// AUSGÜSTUNG
// ============================================================

function getWeapon() {

    return weapons.find(
        weapon =>
            weapon.id === player.weaponId
    ) || weapons[0];

}


function getArmor() {

    return armors.find(
        armor =>
            armor.id === player.armorId
    ) || armors[0];

}


function getPickaxe() {

    return pickaxes.find(
        pickaxe =>
            pickaxe.id === player.pickaxeId
    ) || pickaxes[0];

}


// ============================================================
// XP
// ============================================================

function addXP(amount) {

    player.xp += amount;

    let leveledUp = false;


    while (
        player.xp >=
        player.level * 100
    ) {

        player.xp -=
            player.level * 100;

        player.level++;

        player.maxHealth += 20;

        player.health =
            player.maxHealth;

        leveledUp = true;

    }


    savePlayer();

    updateTopStats();


    if (leveledUp) {

        message(
            `${E("🎉")}
             ${t(
                 "Level Up! Du bist jetzt Level",
                 "Level Up! You are now level"
             )}
             ${player.level}!`
        );

    }

}


// ============================================================
// MISSIONEN
// ============================================================

function missionProgress(mission) {

    switch (mission.type) {

        case "mine":
            return player.totalMined;

        case "defeat":
            return player.defeated;

        case "buy":
            return player.itemsBought;

        case "level":
            return player.level;

        case "goblin":
            return (
                player.defeatedByName.goblin || 0
            );

        case "earned":
            return player.totalGoldEarned;

        default:
            return 0;

    }

}


function updateMission() {

    if (!player) {
        return;
    }


    const mission =
        missions[player.missionIndex];


    if (!mission) {
        return;
    }


    if (
        missionProgress(mission) <
        mission.target
    ) {

        return;

    }


    const reward =
        randomNumber(
            mission.reward[0],
            mission.reward[1]
        );


    player.gold += reward;

    player.missionIndex++;


    savePlayer();

    updateTopStats();


    message(
        `${E("🎯")}
         ${t(
             "Mission abgeschlossen! +",
             "Mission complete! +"
         )}
         ${reward}
         ${t("Gold.", "gold.")}`
    );

}


function missionText(mission) {

    return settings.language === "de"
        ? mission.de
        : mission.en;

}


// ============================================================
// LOGIN
// ============================================================

function showAuth() {

    clearMineTimer();

    currentUsername = null;

    player = null;

    localStorage.removeItem(
        KEYS.current
    );

    updateTopStats();

    message("");


    render(`

        <div class="auth-top">

            <button
                class="icon-button"
                onclick="openSettings(true)">

                ${E("⚙️")}
                ${t(
                    "Einstellungen",
                    "Settings"
                )}

            </button>

        </div>


        <div class="big">

            ${E("🏰")}

        </div>


        <h2>

            ${t(
                "Willkommen bei QuestRPG",
                "Welcome to QuestRPG"
            )}

        </h2>


        <p class="small">

            ${t(
                "Logge dich ein oder erstelle einen Account. Dein Spielstand wird in diesem Browser gespeichert.",
                "Log in or create an account. Your game is saved in this browser."
            )}

        </p>


        <button
            class="success-button"
            onclick="renderLogin()">

            ${E("🔐")}
            ${t(
                "Einloggen",
                "Log in"
            )}

        </button>


        <button
            onclick="renderRegister()">

            ${E("📝")}
            ${t(
                "Registrieren",
                "Register"
            )}

        </button>

    `);

}


// ============================================================
// LOGIN-SEITE
// ============================================================

function renderLogin() {

    render(`

        <div class="top-row">

            <button
                class="back-button"
                onclick="showAuth()">

                ←
                ${t(
                    "Zurück",
                    "Back"
                )}

            </button>


            <button
                class="icon-button"
                onclick="openSettings(true)">

                ${E("⚙️")}

            </button>

        </div>


        <h2>

            ${E("🔐")}

            ${t(
                "Einloggen",
                "Log in"
            )}

        </h2>


        <div class="form-group">

            <label>
                ${t(
                    "Benutzername",
                    "Username"
                )}
            </label>

            <input
                id="loginUser"
                autocomplete="username"
                maxlength="16">

        </div>


        <div class="form-group">

            <label>
                ${t(
                    "Passwort",
                    "Password"
                )}
            </label>

            <input
                id="loginPass"
                type="password"
                autocomplete="current-password">

        </div>


        <button
            class="success-button"
            onclick="login()">

            ${E("🚀")}
            ${t(
                "Einloggen",
                "Log in"
            )}

        </button>


        <button
            onclick="renderRegister()">

            ${t(
                "Noch keinen Account? Registrieren",
                "No account yet? Register"
            )}

        </button>

    `);

}


// ============================================================
// REGISTRIERUNG
// ============================================================

function renderRegister() {

    render(`

        <div class="top-row">

            <button
                class="back-button"
                onclick="showAuth()">

                ←
                ${t(
                    "Zurück",
                    "Back"
                )}

            </button>


            <button
                class="icon-button"
                onclick="openSettings(true)">

                ${E("⚙️")}

            </button>

        </div>


        <h2>

            ${E("📝")}

            ${t(
                "Account erstellen",
                "Create account"
            )}

        </h2>


        <div class="form-group">

            <label>
                ${t(
                    "Benutzername",
                    "Username"
                )}
            </label>

            <input
                id="regUser"
                autocomplete="username"
                maxlength="16">

        </div>


        <div class="form-group">

            <label>
                ${t(
                    "Passwort",
                    "Password"
                )}
            </label>

            <input
                id="regPass"
                type="password"
                autocomplete="new-password">

        </div>


        <p class="small">

            ${t(
                "Benutzername: 3–16 Zeichen. Passwort: mindestens 4 Zeichen.",
                "Username: 3–16 characters. Password: at least 4 characters."
            )}

        </p>


        <button
            class="success-button"
            onclick="register()">

            ${E("✨")}
            ${t(
                "Account erstellen",
                "Create account"
            )}

        </button>

    `);

}


function register() {

    const rawUser =
        document.getElementById(
            "regUser"
        )?.value || "";


    const password =
        document.getElementById(
            "regPass"
        )?.value || "";


    const key =
        userKey(rawUser);


    if (
        key.length < 3 ||
        key.length > 16
    ) {

        return message(
            t(
                "Benutzername muss 3–16 Zeichen haben.",
                "Username must be 3–16 characters."
            )
        );

    }


    if (password.length < 4) {

        return message(
            t(
                "Passwort muss mindestens 4 Zeichen haben.",
                "Password must be at least 4 characters."
            )
        );

    }


    if (users[key]) {

        return message(
            t(
                "Dieser Benutzername existiert bereits.",
                "That username already exists."
            )
        );

    }


    users[key] = {

        username:
            rawUser.trim(),

        password:
            password

    };


    saveUsers();


    localStorage.setItem(

        stateKey(key),

        JSON.stringify({

            ...defaultPlayer,

            name:
                rawUser.trim(),

            defeatedByName: {}

        })

    );


    loginWithCredentials(
        rawUser.trim(),
        password
    );

}


// ============================================================
// EINLOGGEN
// ============================================================

function login() {

    loginWithCredentials(

        document.getElementById(
            "loginUser"
        )?.value || "",

        document.getElementById(
            "loginPass"
        )?.value || ""

    );

}


function loginWithCredentials(
    rawUser,
    password
) {

    const key =
        userKey(rawUser);


    const account =
        users[key];


    if (
        !account ||
        account.password !== password
    ) {

        return message(
            t(
                "Benutzername oder Passwort falsch.",
                "Username or password is incorrect."
            )
        );

    }


    currentUsername = key;


    player =
        loadPlayer(key);


    player.name =
        account.username;


    localStorage.setItem(
        KEYS.current,
        key
    );


    savePlayer();

    updateTopStats();

    mainMenu();

}


// ============================================================
// AUSLOGGEN
// ============================================================

function logout() {

    savePlayer();

    clearMineTimer();


    currentUsername = null;

    player = null;


    localStorage.removeItem(
        KEYS.current
    );


    showAuth();

}


// ============================================================
// EINSTELLUNGEN
// ============================================================

function openSettings(
    fromAuth = false
) {

    render(`

        <div class="top-row">

            <button
                class="back-button"
                onclick="${
                    fromAuth
                        ? "showAuth()"
                        : "mainMenu()"
                }">

                ←
                ${t(
                    "Zurück",
                    "Back"
                )}

            </button>


            <h2 class="compact-title">

                ${E("⚙️")}

                ${t(
                    "Einstellungen",
                    "Settings"
                )}

            </h2>

        </div>


        <div class="setting-row">

            <div>

                <strong>

                    ${E("🌐")}

                    ${t(
                        "Sprache",
                        "Language"
                    )}

                </strong>


                <div class="small">

                    Deutsch / English

                </div>

            </div>


            <button
                onclick="toggleLanguage()">

                ${
                    settings.language === "de"
                        ? "Deutsch"
                        : "English"
                }

            </button>

        </div>


        <div class="setting-row">

            <div>

                <strong>

                    ${E("😀")}

                    ${t(
                        "Emojis",
                        "Emojis"
                    )}

                </strong>


                <div class="small">

                    ${t(
                        "Emojis ein- oder ausschalten",
                        "Show or hide emojis"
                    )}

                </div>

            </div>


            <button
                onclick="toggleEmojis()">

                ${
                    settings.emojis
                        ? t("An", "On")
                        : t("Aus", "Off")
                }

            </button>

        </div>


        ${
            player
                ? `

                    <div class="separator"></div>

                    <button
                        class="danger-button"
                        onclick="logout()">

                        ${E("🚪")}

                        ${t(
                            "Ausloggen",
                            "Log out"
                        )}

                    </button>

                `
                : `

                    <div class="separator"></div>

                    <button
                        class="success-button"
                        onclick="renderLogin()">

                        ${E("🔐")}

                        ${t(
                            "Einloggen",
                            "Log in"
                        )}

                    </button>


                    <button
                        onclick="renderRegister()">

                        ${E("📝")}

                        ${t(
                            "Registrieren",
                            "Register"
                        )}

                    </button>

                `
        }

    `);

}


function toggleLanguage() {

    settings.language =
        settings.language === "de"
            ? "en"
            : "de";


    saveSettings();

    updateBodyEmojiClass();

    updateTopStats();


    openSettings(!player);

}


function toggleEmojis() {

    settings.emojis =
        !settings.emojis;


    saveSettings();

    updateBodyEmojiClass();


    openSettings(!player);

}


// ============================================================
// HAUPTMENÜ
// ============================================================

function mainMenu() {

    if (!player) {

        return showAuth();

    }


    clearMineTimer();


    updateMission();


    const mission =
        missions[player.missionIndex];


    const missionHTML =
        mission

            ? `

                <div class="mission-card">

                    <strong>

                        ${E("🎯")}

                        ${t(
                            "Mission",
                            "Mission"
                        )}

                        ${player.missionIndex + 1}/10

                    </strong>


                    <div class="mission-text">

                        ${esc(
                            missionText(mission)
                        )}

                    </div>


                    <div class="small">

                        ${Math.min(
                            missionProgress(mission),
                            mission.target
                        )}

                        /

                        ${mission.target}

                    </div>

                </div>

            `

            : `

                <div class="mission-card completed">

                    ${E("🏆")}

                    ${t(
                        "Alle 10 Missionen abgeschlossen!",
                        "All 10 missions completed!"
                    )}

                </div>

            `;


    render(`

        <div class="top-row">

            <h2 class="compact-title">

                ${E("🏰")}
                QuestRPG

            </h2>


            <button
                class="icon-button"
                onclick="openSettings(false)">

                ${E("⚙️")}

            </button>

        </div>


        <div class="card-grid">

            <div class="card">

                ${E("🗡️")}

                <br>

                <strong>

                    ${esc(
                        itemName(
                            getWeapon()
                        )
                    )}

                </strong>

                <br>

                ⚔️
                ${getWeapon().damage}

            </div>


            <div class="card">

                ${E("🛡️")}

                <br>

                <strong>

                    ${esc(
                        itemName(
                            getArmor()
                        )
                    )}

                </strong>

                <br>

                ❤️
                +${getArmor().bonusHealth}

            </div>


            <div class="card">

                ${E("⛏️")}

                <br>

                <strong>

                    ${esc(
                        itemName(
                            getPickaxe()
                        )
                    )}

                </strong>

                <br>

                💰
                +${getPickaxe().bonus}

            </div>

        </div>


        ${missionHTML}


        <button
            onclick="showCharacter()">

            ${E("👤")}

            ${t(
                "Charakter",
                "Character"
            )}

        </button>


        <button
            onclick="startFight()">

            ${E("⚔️")}

            ${t(
                "Kämpfen",
                "Fight"
            )}

        </button>


        <button
            onclick="openMine()">

            ${E("⛏️")}

            ${t(
                "Gold abbauen",
                "Mine gold"
            )}

        </button>


        <button
            onclick="openShop()">

            ${E("🏪")}

            ${t(
                "Shop",
                "Shop"
            )}

        </button>

    `);


    message("");

    updateTopStats();

}


// ============================================================
// CHARAKTER
// ============================================================

function showCharacter() {

    render(`

        <div class="top-row">

            <button
                class="back-button"
                onclick="mainMenu()">

                ←
                ${t(
                    "Zurück",
                    "Back"
                )}

            </button>


            <h2 class="compact-title">

                ${E("👤")}

                ${t(
                    "Charakter",
                    "Character"
                )}

            </h2>

        </div>


        <div class="card-grid">

            <div class="card">

                ${E("👤")}

                <br>

                ${esc(
                    player.name
                )}

            </div>


            <div class="card">

                ${E("⭐")}

                <br>

                ${t(
                    "Level",
                    "Level"
                )}

                ${player.level}

            </div>


            <div class="card">

                ${E("💰")}

                <br>

                ${player.gold}

            </div>

        </div>


        <h3>

            ${E("🗡️")}

            ${t(
                "Waffe",
                "Weapon"
            )}

        </h3>


        <p>

            ${esc(
                itemName(
                    getWeapon()
                )
            )}

            —

            ⚔️
            ${getWeapon().damage}

            ${t(
                "Schaden",
                "damage"
            )}

        </p>


        <h3>

            ${E("🛡️")}

            ${t(
                "Rüstung",
                "Armor"
            )}

        </h3>


        <p>

            ${esc(
                itemName(
                    getArmor()
                )
            )}

            —

            ❤️
            +${getArmor().bonusHealth}

        </p>


        <h3>

            ${E("⛏️")}

            ${t(
                "Spitzhacke",
                "Pickaxe"
            )}

        </h3>


        <p>

            ${esc(
                itemName(
                    getPickaxe()
                )
            )}

            —

            💰
            +${getPickaxe().bonus}

        </p>

    `);

}


// ============================================================
// SHOP
// ============================================================

function openShop() {

    render(`

        <div class="top-row">

            <button
                class="back-button"
                onclick="mainMenu()">

                ←
                ${t(
                    "Zurück",
                    "Back"
                )}

            </button>


            <h2 class="compact-title">

                ${E("🏪")}

                ${t(
                    "Shop",
                    "Shop"
                )}

            </h2>

        </div>


        <p>

            ${E("💰")}

            ${t(
                "Dein Gold",
                "Your gold"
            )}:

            <strong>

                ${player.gold}

            </strong>

        </p>


        <button
            onclick="showWeapons()">

            ${E("🗡️")}

            ${t(
                "Schwerter",
                "Swords"
            )}

        </button>


        <button
            onclick="showArmors()">

            ${E("🛡️")}

            ${t(
                "Rüstungen",
                "Armor"
            )}

        </button>


        <button
            onclick="showPickaxes()">

            ${E("⛏️")}

            ${t(
                "Spitzhacken",
                "Pickaxes"
            )}

        </button>


        <button
            class="success-button"
            onclick="buyPotion()">

            ${E("🧪")}

            ${t(
                "Heiltrank – 25 Gold",
                "Health Potion – 25 gold"
            )}

        </button>

    `);

}


// ============================================================
// SHOP-KARTEN
// ============================================================

function shopCard(
    title,
    desc,
    price,
    current,
    action
) {

    return `

        <div class="shop-item">

            <h3>
                ${title}
            </h3>


            <p>
                ${desc}
            </p>


            <p>

                💰

                <strong>
                    ${price}
                </strong>

            </p>


            <button
                ${current
                    ? "disabled"
                    : ""}

                onclick="${action}">

                ${
                    current

                        ? t(
                            "Ausgerüstet",
                            "Equipped"
                        )

                        : t(
                            "Kaufen",
                            "Buy"
                        )
                }

            </button>

        </div>

    `;

}


// ============================================================
// WAFFEN
// ============================================================

function showWeapons() {

    let html = `

        <div class="top-row">

            <button
                class="back-button"
                onclick="openShop()">

                ←
                ${t(
                    "Zurück",
                    "Back"
                )}

            </button>


            <h2 class="compact-title">

                ${E("🗡️")}

                ${t(
                    "Schwerter",
                    "Swords"
                )}

            </h2>

        </div>

    `;


    const current =
        getWeapon();


    weapons
        .slice(1)
        .forEach(item => {

            html += shopCard(

                `${E("🗡️")}
                 ${esc(
                     itemName(item)
                 )}`,

                `⚔️
                 ${item.damage}
                 ${t(
                     "Schaden",
                     "damage"
                 )}`,

                item.price,

                current.id === item.id,

                `buyWeapon(
                    '${item.id}'
                )`

            );

        });


    render(html);

}


function buyWeapon(id) {

    const item =
        weapons.find(
            weapon =>
                weapon.id === id
        );


    if (!item) {
        return;
    }


    if (
        item.damage <=
        getWeapon().damage
    ) {

        return message(
            t(
                "Deine aktuelle Waffe ist bereits stärker.",
                "Your current weapon is already stronger."
            )
        );

    }


    if (
        player.gold <
        item.price
    ) {

        return message(
            t(
                "Nicht genug Gold.",
                "Not enough gold."
            )
        );

    }


    player.gold -=
        item.price;

    player.weaponId =
        item.id;

    player.itemsBought++;


    savePlayer();

    updateMission();

    updateTopStats();

    showWeapons();


    message(
        `${E("✅")}
         ${t(
             "Gekauft",
             "Bought"
         )}:
         ${itemName(item)}`
    );

}


// ============================================================
// RÜSTUNGEN
// ============================================================

function showArmors() {

    let html = `

        <div class="top-row">

            <button
                class="back-button"
                onclick="openShop()">

                ←
                ${t(
                    "Zurück",
                    "Back"
                )}

            </button>


            <h2 class="compact-title">

                ${E("🛡️")}

                ${t(
                    "Rüstungen",
                    "Armor"
                )}

            </h2>

        </div>

    `;


    const current =
        getArmor();


    armors
        .slice(1)
        .forEach(item => {

            html += shopCard(

                `${E("🛡️")}
                 ${esc(
                     itemName(item)
                 )}`,

                `❤️
                 +${item.bonusHealth}
                 ${t(
                     "maximale Leben",
                     "max health"
                 )}`,

                item.price,

                current.id === item.id,

                `buyArmor(
                    '${item.id}'
                )`

            );

        });


    render(html);

}


function buyArmor(id) {

    const item =
        armors.find(
            armor =>
                armor.id === id
        );


    if (!item) {
        return;
    }


    if (
        item.bonusHealth <=
        getArmor().bonusHealth
    ) {

        return message(
            t(
                "Deine aktuelle Rüstung ist bereits besser.",
                "Your current armor is already better."
            )
        );

    }


    if (
        player.gold <
        item.price
    ) {

        return message(
            t(
                "Nicht genug Gold.",
                "Not enough gold."
            )
        );

    }


    player.gold -=
        item.price;


    player.maxHealth -=
        getArmor().bonusHealth;


    player.armorId =
        item.id;


    player.maxHealth +=
        item.bonusHealth;


    player.health =
        player.maxHealth;


    player.itemsBought++;


    savePlayer();

    updateMission();

    updateTopStats();

    showArmors();


    message(
        `${E("✅")}
         ${t(
             "Gekauft",
             "Bought"
         )}:
         ${itemName(item)}`
    );

}


// ============================================================
// SPITZHACKEN
// ============================================================

function showPickaxes() {

    let html = `

        <div class="top-row">

            <button
                class="back-button"
                onclick="openShop()">

                ←
                ${t(
                    "Zurück",
                    "Back"
                )}

            </button>


            <h2 class="compact-title">

                ${E("⛏️")}

                ${t(
                    "Spitzhacken",
                    "Pickaxes"
                )}

            </h2>

        </div>

    `;


    const current =
        getPickaxe();


    pickaxes
        .slice(1)
        .forEach(item => {

            html += shopCard(

                `${E("⛏️")}
                 ${esc(
                     itemName(item)
                 )}`,

                `💰
                 +${item.bonus}
                 ${t(
                     "Bonusgold",
                     "bonus gold"
                 )}`,

                item.price,

                current.id === item.id,

                `buyPickaxe(
                    '${item.id}'
                )`

            );

        });


    render(html);

}


function buyPickaxe(id) {

    const item =
        pickaxes.find(
            pickaxe =>
                pickaxe.id === id
        );


    if (!item) {
        return;
    }


    if (
        item.bonus <=
        getPickaxe().bonus
    ) {

        return message(
            t(
                "Deine aktuelle Spitzhacke ist bereits besser.",
                "Your current pickaxe is already better."
            )
        );

    }


    if (
        player.gold <
        item.price
    ) {

        return message(
            t(
                "Nicht genug Gold.",
                "Not enough gold."
            )
        );

    }


    player.gold -=
        item.price;


    player.pickaxeId =
        item.id;


    player.itemsBought++;


    savePlayer();

    updateMission();

    updateTopStats();

    showPickaxes();


    message(
        `${E("✅")}
         ${t(
             "Gekauft",
             "Bought"
         )}:
         ${itemName(item)}`
    );

}


// ============================================================
// HEILTRANK
// ============================================================

function buyPotion() {

    if (
        player.gold < 25
    ) {

        return message(
            t(
                "Nicht genug Gold.",
                "Not enough gold."
            )
        );

    }


    if (
        player.health >=
        player.maxHealth
    ) {

        return message(
            t(
                "Du hast volle Leben.",
                "Your health is already full."
            )
        );

    }


    player.gold -= 25;


    player.health =
        Math.min(
            player.maxHealth,
            player.health + 50
        );


    player.itemsBought++;


    savePlayer();

    updateMission();

    updateTopStats();


    message(
        `${E("🧪")}
         ${t(
             "+50 Leben",
             "+50 health"
         )}`
    );

}


// ============================================================
// GOLDMINE
// ============================================================

function openMine() {

    if (
        mineCooldownUntil >
        Date.now()
    ) {

        renderMineCooldown();

        return;

    }


    mineClicksRequired =
        randomNumber(5, 12);


    mineClicksDone = 0;


    renderMine();

}


function renderMine() {

    render(`

        <div class="top-row">

            <button
                class="back-button"
                onclick="mainMenu()">

                ←
                ${t(
                    "Zurück",
                    "Back"
                )}

            </button>


            <h2 class="compact-title">

                ${E("⛏️")}

                ${t(
                    "Goldmine",
                    "Gold Mine"
                )}

            </h2>

        </div>


        <p>

            ${t(
                "Klicke die Taste so oft, wie der zufällige Zähler es verlangt.",
                "Click the button as many times as the random counter requires."
            )}

        </p>


        <div class="mine-box">

            <div class="big">

                ${E("🪨")}

            </div>


            <p>

                <strong>
                    ${mineClicksDone}
                </strong>

                /

                <strong>
                    ${mineClicksRequired}
                </strong>

                ${t(
                    "Klicks",
                    "clicks"
                )}

            </p>


            <div class="bar">

                <div
                    id="mineBar"
                    style="
                        width:
                        ${
                            (
                                mineClicksDone /
                                mineClicksRequired
                            ) * 100
                        }%;
                    ">

                </div>

            </div>


            <button
                class="gold-button mine-button"
                onclick="mineClick()">

                ${E("⛏️")}

                ${t(
                    "GOLD ABBAUEN",
                    "MINE GOLD"
                )}

            </button>

        </div>

    `);

}


function mineClick() {

    if (
        mineClicksDone >=
        mineClicksRequired
    ) {

        return;

    }


    mineClicksDone++;


    if (
        mineClicksDone <
        mineClicksRequired
    ) {

        renderMine();

        return;

    }


    const reward =
        randomNumber(20, 40) +
        getPickaxe().bonus;


    player.gold +=
        reward;


    player.totalMined++;


    player.totalGoldEarned +=
        reward;


    addXP(15);


    updateMission();


    savePlayer();


    updateTopStats();


    mineCooldownUntil =
        Date.now() + 8000;


    render(`

        <div class="top-row">

            <button
                class="back-button"
                onclick="mainMenu()">

                ←
                ${t(
                    "Zurück",
                    "Back"
                )}

            </button>


            <h2 class="compact-title">

                ${E("💰")}

                ${t(
                    "Gold erhalten",
                    "Gold collected"
                )}

            </h2>

        </div>


        <div class="big">

            ${E("💰")}

        </div>


        <h3>

            ${t(
                "Geschafft!",
                "Done!"
            )}

        </h3>


        <p>

            <strong>
                +${reward}
            </strong>

            ${t(
                "Gold",
                "gold"
            )}

        </p>


        <p>

            ${E("⏳")}

            ${t(
                "Die Mine hat 8 Sekunden Cooldown.",
                "The mine has an 8 second cooldown."
            )}

        </p>


        <button
            onclick="renderMineCooldown()">

            ${t(
                "Cooldown ansehen",
                "View cooldown"
            )}

        </button>

    `);


    startMineTimer();

}


function renderMineCooldown() {

    const seconds =
        Math.ceil(
            Math.max(
                0,
                mineCooldownUntil -
                Date.now()
            ) / 1000
        );


    if (seconds <= 0) {

        clearMineTimer();

        renderMineReady();

        return;

    }


    render(`

        <div class="top-row">

            <button
                class="back-button"
                onclick="mainMenu()">

                ←
                ${t(
                    "Zurück",
                    "Back"
                )}

            </button>


            <h2 class="compact-title">

                ${E("⏳")}

                ${t(
                    "Goldmine",
                    "Gold Mine"
                )}

            </h2>

        </div>


        <div class="big">

            ${E("⏳")}

        </div>


        <h3>

            ${t(
                "Mine auf Cooldown",
                "Mine on cooldown"
            )}

        </h3>


        <p>

            ${t(
                "Noch",
                "Remaining"
            )}:

            <strong>
                ${seconds}s
            </strong>

        </p>


        <button disabled>

            ${t(
                "Warte...",
                "Wait..."
            )}

        </button>

    `);

}


function renderMineReady() {

    clearMineTimer();


    render(`

        <div class="top-row">

            <button
                class="back-button"
                onclick="mainMenu()">

                ←
                ${t(
                    "Zurück",
                    "Back"
                )}

            </button>


            <h2 class="compact-title">

                ${E("⛏️")}

                ${t(
                    "Goldmine bereit",
                    "Mine ready"
                )}

            </h2>

        </div>


        <div class="big">

            ${E("✅")}

        </div>


        <p>

            ${t(
                "Du kannst wieder Gold abbauen.",
                "You can mine gold again."
            )}

        </p>


        <button
            class="gold-button"
            onclick="openMine()">

            ${E("⛏️")}

            ${t(
                "Mine starten",
                "Start mining"
            )}

        </button>

    `);

}


function startMineTimer() {

    clearMineTimer();


    mineTimer =
        setInterval(() => {

            if (!player) {

                clearMineTimer();

                return;

            }


            if (
                mineCooldownUntil <=
                Date.now()
            ) {

                renderMineReady();

                return;

            }


            if (
                !document.querySelector(
                    ".mine-button"
                )
            ) {

                renderMineCooldown();

            }

        }, 500);

}


function clearMineTimer() {

    if (mineTimer) {

        clearInterval(
            mineTimer
        );

        mineTimer = null;

    }

}


// ============================================================
// KAMPF
// ============================================================

function startFight() {

    currentMonster =
        monsters[
            randomNumber(
                0,
                monsters.length - 1
            )
        ];


    monsterHealth =
        currentMonster.health;


    renderFight();

}


function renderFight() {

    render(`

        <div class="top-row">

            <h2 class="compact-title">

                ${E("⚔️")}

                ${t(
                    "Kampf",
                    "Battle"
                )}

            </h2>

        </div>


        <div class="monster">

            <div class="monster-emoji">

                ${E(
                    currentMonster.emoji
                )}

            </div>


            <h2>

                ${esc(
                    monsterName(
                        currentMonster
                    )
                )}

            </h2>


            <p class="monster-health">

                ❤️

                ${monsterHealth}

                /

                ${currentMonster.health}

            </p>

        </div>


        <p>

            ❤️

            ${t(
                "Deine Leben",
                "Your health"
            )}:

            <strong>

                ${player.health}
                /
                ${player.maxHealth}

            </strong>

        </p>


        <p>

            ⚔️

            ${t(
                "Dein Schaden",
                "Your damage"
            )}:

            <strong>

                ${getWeapon().damage}

            </strong>

        </p>


        <button
            class="danger-button"
            onclick="attack()">

            ${E("⚔️")}

            ${t(
                "Angreifen",
                "Attack"
            )}

        </button>


        <button
            onclick="useCombatPotion()">

            ${E("🧪")}

            ${t(
                "Heiltrank",
                "Potion"
            )}

            (25)

        </button>


        <button
            onclick="escapeFight()">

            ${E("🏃")}

            ${t(
                "Fliehen",
                "Flee"
            )}

        </button>

    `);

}


// ============================================================
// ANGRIFF
// ============================================================

function attack() {

    let damage =
        getWeapon().damage;


    const critical =
        randomNumber(1, 100) <= 15;


    if (critical) {

        damage *= 2;

    }


    monsterHealth -=
        damage;


    // MONSTER TOT
    if (
        monsterHealth <= 0
    ) {

        const reward =
            currentMonster.gold +
            getPickaxe().bonus;


        player.gold +=
            reward;


        player.totalGoldEarned +=
            reward;


        player.defeated++;


        player.defeatedByName[
            currentMonster.id
        ] =
            (
                player.defeatedByName[
                    currentMonster.id
                ] || 0
            ) + 1;


        addXP(
            currentMonster.xp
        );


        updateMission();


        savePlayer();


        render(`

            <div class="top-row">

                <h2 class="compact-title">

                    ${E("🏆")}

                    ${t(
                        "Sieg",
                        "Victory"
                    )}

                </h2>

            </div>


            <div class="big">

                ${E("🏆")}

            </div>


            <h3>

                ${esc(
                    monsterName(
                        currentMonster
                    )
                )}

                ${t(
                    "besiegt!",
                    "defeated!"
                )}

            </h3>


            <p>

                ${
                    critical
                        ? `
                            ${E("💥")}
                            <strong>
                                ${t(
                                    "Kritischer Treffer!",
                                    "Critical hit!"
                                )}
                            </strong>
                            <br>
                          `
                        : ""
                }

                ⚔️

                ${damage}

                ${t(
                    "Schaden",
                    "damage"
                )}

            </p>


            <p>

                💰

                +${reward}

                ${t(
                    "Gold",
                    "gold"
                )}

            </p>


            <p>

                ⭐

                +${currentMonster.xp}

                XP

            </p>


            <button
                class="success-button"
                onclick="mainMenu()">

                ${t(
                    "Weiter",
                    "Continue"
                )}

            </button>

        `);


        updateTopStats();

        return;

    }


    // MONSTER GREIFT AN
    const enemyDamage =
        randomNumber(

            Math.max(
                1,
                Math.floor(
                    currentMonster.damage *
                    0.7
                )
            ),

            currentMonster.damage

        );


    player.health -=
        enemyDamage;


    // SPIELER TOT
    if (
        player.health <= 0
    ) {

        player.gold =
            Math.max(
                0,
                player.gold - 25
            );


        player.health =
            player.maxHealth;


        savePlayer();


        render(`

            <div class="top-row">

                <h2 class="compact-title">

                    ${E("💀")}

                    ${t(
                        "Besiegt",
                        "Defeated"
                    )}

                </h2>

            </div>


            <div class="big">

                ${E("💀")}

            </div>


            <p>

                ${t(
                    "Du wurdest besiegt. Du verlierst 25 Gold und wirst wiederbelebt.",
                    "You were defeated. You lose 25 gold and are revived."
                )}

            </p>


            <button
                onclick="mainMenu()">

                ${t(
                    "Weiter",
                    "Continue"
                )}

            </button>

        `);


        updateTopStats();

        return;

    }


    savePlayer();


    renderFight();


    message(

        `${E(
            critical
                ? "💥"
                : "⚔️"
        )}

        ${
            critical
                ? t(
                    "Kritischer Treffer!",
                    "Critical hit!"
                )
                : t(
                    "Angriff",
                    "Attack"
                )
        }:

        ${damage}.

        ${t(
            "Gegnerischer Schaden",
            "Enemy damage"
        )}:

        ${enemyDamage}.`

    );


    updateTopStats();

}


// ============================================================
// HEILTRANK IM KAMPF
// ============================================================

function useCombatPotion() {

    if (
        player.gold < 25
    ) {

        return message(
            t(
                "Nicht genug Gold.",
                "Not enough gold."
            )
        );

    }


    if (
        player.health >=
        player.maxHealth
    ) {

        return message(
            t(
                "Volle Leben.",
                "Full health."
            )
        );

    }


    player.gold -=
        25;


    player.health =
        Math.min(
            player.maxHealth,
            player.health + 50
        );


    player.itemsBought++;


    savePlayer();

    updateMission();

    updateTopStats();

    renderFight();


    message(
        `${E("🧪")}
         +50
         ${t(
             "Leben",
             "health"
         )}`
    );

}


// ============================================================
// FLIEHEN
// ============================================================

function escapeFight() {

    if (
        randomNumber(1, 100) <= 70
    ) {

        render(`

            <div class="top-row">

                <h2 class="compact-title">

                    ${E("🏃")}

                    ${t(
                        "Flucht",
                        "Escape"
                    )}

                </h2>

            </div>


            <div class="big">

                ${E("💨")}

            </div>


            <p>

                ${t(
                    "Du bist entkommen.",
                    "You escaped."
                )}

            </p>


            <button
                onclick="mainMenu()">

                ${t(
                    "Weiter",
                    "Continue"
                )}

            </button>

        `);


        return;

    }


    player.health -=
        currentMonster.damage;


    if (
        player.health <= 0
    ) {

        player.gold =
            Math.max(
                0,
                player.gold - 25
            );


        player.health =
            player.maxHealth;


        savePlayer();


        render(`

            <div class="top-row">

                <h2 class="compact-title">

                    ${E("💀")}

                    ${t(
                        "Besiegt",
                        "Defeated"
                    )}

                </h2>

            </div>


            <p>

                ${t(
                    "Die Flucht ist fehlgeschlagen. Du verlierst 25 Gold und wirst wiederbelebt.",
                    "The escape failed. You lose 25 gold and are revived."
                )}

            </p>


            <button
                onclick="mainMenu()">

                ${t(
                    "Weiter",
                    "Continue"
                )}

            </button>

        `);

    } else {

        savePlayer();

        renderFight();


        message(

            `${E("❌")}

            ${t(
                "Flucht fehlgeschlagen.",
                "Escape failed."
            )}`

        );

    }


    updateTopStats();

}


// ============================================================
// START
// ============================================================

function init() {

    updateBodyEmojiClass();


    if (
        currentUsername &&
        users[currentUsername]
    ) {

        player =
            loadPlayer(
                currentUsername
            );


        player.name =
            users[
                currentUsername
            ].username;


        updateTopStats();

        mainMenu();

    } else {

        showAuth();

    }

}


document.addEventListener(
    "DOMContentLoaded",
    init
);
