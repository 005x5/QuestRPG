// ============================================================
//                       ⚔️ QuestRPG
// ============================================================
// Speicher:
// - Accounts: Cookies
// - Spielstände: Cookies
// - Einstellungen: Cookie
// - aktuelle Anmeldung: Cookie
//
// Zusätzlich gibt es localStorage als Fallback, falls der
// Browser bei einer file://-Datei keine Cookies zulässt.
//
// Hinweis:
// Diese Account-Lösung ist für ein lokales Lernprojekt.
// Passwörter liegen im Browser und sind NICHT für eine echte
// öffentliche Website geeignet.
// ============================================================


// ============================================================
// STORAGE-NAMEN
// ============================================================

const STORAGE = {

    userPrefix:
        "qr_user_",

    statePrefix:
        "qr_state_",

    current:
        "qr_current",

    settings:
        "qr_settings",

    mineCooldown:
        "qr_mine_cooldown"

};


// ============================================================
// EINSTELLUNGEN
// ============================================================

const defaultSettings = {

    language:
        "de"

};


// ============================================================
// STANDARD-SPIELER
// ============================================================

const defaultPlayer = {

    name:
        "Held",

    level:
        1,

    xp:
        0,

    gold:
        50,

    health:
        100,

    maxHealth:
        100,

    weaponId:
        "wood",

    armorId:
        "cloth",

    pickaxeId:
        "wood_pickaxe",

    defeated:
        0,

    totalMined:
        0,

    totalGoldEarned:
        0,

    itemsBought:
        0,

    defeatedByName:
        {},

    missionIndex:
        0,

    isGuest:
        false

};


// ============================================================
// WAFFEN
// ============================================================

const weapons = [

    {
        id:
            "wood",

        nameDE:
            "Holzschwert",

        nameEN:
            "Wooden Sword",

        damage:
            10,

        price:
            0
    },

    {
        id:
            "bronze",

        nameDE:
            "Bronzeschwert",

        nameEN:
            "Bronze Sword",

        damage:
            16,

        price:
            50
    },

    {
        id:
            "silver",

        nameDE:
            "Silberschwert",

        nameEN:
            "Silver Sword",

        damage:
            24,

        price:
            100
    },

    {
        id:
            "gold",

        nameDE:
            "Goldschwert",

        nameEN:
            "Golden Sword",

        damage:
            34,

        price:
            180
    },

    {
        id:
            "iron",

        nameDE:
            "Eisenschwert",

        nameEN:
            "Iron Sword",

        damage:
            45,

        price:
            280
    },

    {
        id:
            "diamond",

        nameDE:
            "Diamantschwert",

        nameEN:
            "Diamond Sword",

        damage:
            62,

        price:
            450
    },

    {
        id:
            "dragon",

        nameDE:
            "Drachenschwert",

        nameEN:
            "Dragon Sword",

        damage:
            85,

        price:
            750
    },

    {
        id:
            "legendary",

        nameDE:
            "Legendäres Schwert",

        nameEN:
            "Legendary Sword",

        damage:
            120,

        price:
            1300
    }

];


// ============================================================
// RÜSTUNGEN
// ============================================================

const armors = [

    {
        id:
            "cloth",

        nameDE:
            "Alte Kleidung",

        nameEN:
            "Old Clothes",

        bonusHealth:
            0,

        price:
            0
    },

    {
        id:
            "bronze",

        nameDE:
            "Bronzerüstung",

        nameEN:
            "Bronze Armor",

        bonusHealth:
            20,

        price:
            60
    },

    {
        id:
            "silver",

        nameDE:
            "Silberrüstung",

        nameEN:
            "Silver Armor",

        bonusHealth:
            45,

        price:
            130
    },

    {
        id:
            "gold",

        nameDE:
            "Goldrüstung",

        nameEN:
            "Golden Armor",

        bonusHealth:
            80,

        price:
            220
    },

    {
        id:
            "iron",

        nameDE:
            "Eisenrüstung",

        nameEN:
            "Iron Armor",

        bonusHealth:
            120,

        price:
            330
    },

    {
        id:
            "diamond",

        nameDE:
            "Diamantrüstung",

        nameEN:
            "Diamond Armor",

        bonusHealth:
            180,

        price:
            520
    },

    {
        id:
            "dragon",

        nameDE:
            "Drachenrüstung",

        nameEN:
            "Dragon Armor",

        bonusHealth:
            280,

        price:
            850
    },

    {
        id:
            "legendary",

        nameDE:
            "Legendäre Rüstung",

        nameEN:
            "Legendary Armor",

        bonusHealth:
            420,

        price:
            1500
    }

];


// ============================================================
// SPITZHACKEN
// ============================================================

const pickaxes = [

    {
        id:
            "wood_pickaxe",

        nameDE:
            "Holzspitzhacke",

        nameEN:
            "Wooden Pickaxe",

        bonus:
            5,

        price:
            0
    },

    {
        id:
            "bronze_pickaxe",

        nameDE:
            "Bronzespitzhacke",

        nameEN:
            "Bronze Pickaxe",

        bonus:
            12,

        price:
            50
    },

    {
        id:
            "silver_pickaxe",

        nameDE:
            "Silberspitzhacke",

        nameEN:
            "Silver Pickaxe",

        bonus:
            20,

        price:
            100
    },

    {
        id:
            "gold_pickaxe",

        nameDE:
            "Goldspitzhacke",

        nameEN:
            "Golden Pickaxe",

        bonus:
            35,

        price:
            175
    },

    {
        id:
            "iron_pickaxe",

        nameDE:
            "Eisenspitzhacke",

        nameEN:
            "Iron Pickaxe",

        bonus:
            50,

        price:
            260
    },

    {
        id:
            "diamond_pickaxe",

        nameDE:
            "Diamantspitzhacke",

        nameEN:
            "Diamond Pickaxe",

        bonus:
            75,

        price:
            400
    },

    {
        id:
            "dragon_pickaxe",

        nameDE:
            "Drachenspitzhacke",

        nameEN:
            "Dragon Pickaxe",

        bonus:
            110,

        price:
            650
    },

    {
        id:
            "legendary_pickaxe",

        nameDE:
            "Legendäre Spitzhacke",

        nameEN:
            "Legendary Pickaxe",

        bonus:
            160,

        price:
            1100
    }

];


// ============================================================
// MONSTER
// ============================================================

const monsters = [

    {
        id:
            "slime",

        nameDE:
            "Schleim",

        nameEN:
            "Slime",

        emoji:
            "🟢",

        health:
            35,

        damage:
            8,

        xp:
            25,

        gold:
            20
    },

    {
        id:
            "wolf",

        nameDE:
            "Wilder Wolf",

        nameEN:
            "Wild Wolf",

        emoji:
            "🐺",

        health:
            55,

        damage:
            14,

        xp:
            40,

        gold:
            35
    },

    {
        id:
            "goblin",

        nameDE:
            "Goblin",

        nameEN:
            "Goblin",

        emoji:
            "👺",

        health:
            75,

        damage:
            18,

        xp:
            60,

        gold:
            50
    },

    {
        id:
            "orc",

        nameDE:
            "Ork",

        nameEN:
            "Orc",

        emoji:
            "👹",

        health:
            120,

        damage:
            25,

        xp:
            90,

        gold:
            80
    },

    {
        id:
            "knight",

        nameDE:
            "Dunkler Ritter",

        nameEN:
            "Dark Knight",

        emoji:
            "🛡️",

        health:
            180,

        damage:
            35,

        xp:
            140,

        gold:
            120
    },

    {
        id:
            "mage",

        nameDE:
            "Magier",

        nameEN:
            "Mage",

        emoji:
            "🧙",

        health:
            220,

        damage:
            42,

        xp:
            180,

        gold:
            160
    },

    {
        id:
            "dragon",

        nameDE:
            "Drache",

        nameEN:
            "Dragon",

        emoji:
            "🐉",

        health:
            350,

        damage:
            55,

        xp:
            300,

        gold:
            300
    },

    {
        id:
            "demon",

        nameDE:
            "Dämon",

        nameEN:
            "Demon",

        emoji:
            "😈",

        health:
            500,

        damage:
            70,

        xp:
            500,

        gold:
            500
    }

];


// ============================================================
// MISSIONEN
// ============================================================

const missions = [

    {
        type:
            "mine",

        target:
            1,

        reward:
            [40, 70],

        de:
            "Baue 1x Gold ab",

        en:
            "Mine gold 1 time"
    },

    {
        type:
            "defeat",

        target:
            1,

        reward:
            [50, 90],

        de:
            "Besiege 1 Monster",

        en:
            "Defeat 1 monster"
    },

    {
        type:
            "mine",

        target:
            3,

        reward:
            [70, 120],

        de:
            "Baue insgesamt 3x Gold ab",

        en:
            "Mine gold 3 times"
    },

    {
        type:
            "defeat",

        target:
            2,

        reward:
            [90, 150],

        de:
            "Besiege insgesamt 2 Monster",

        en:
            "Defeat 2 monsters"
    },

    {
        type:
            "buy",

        target:
            1,

        reward:
            [110, 180],

        de:
            "Kaufe 1 Gegenstand im Shop",

        en:
            "Buy 1 shop item"
    },

    {
        type:
            "level",

        target:
            2,

        reward:
            [140, 220],

        de:
            "Erreiche Level 2",

        en:
            "Reach level 2"
    },

    {
        type:
            "goblin",

        target:
            1,

        reward:
            [160, 260],

        de:
            "Besiege 1 Goblin",

        en:
            "Defeat 1 Goblin"
    },

    {
        type:
            "earned",

        target:
            300,

        reward:
            [180, 300],

        de:
            "Verdiene insgesamt 300 Gold",

        en:
            "Earn 300 total gold"
    },

    {
        type:
            "defeat",

        target:
            5,

        reward:
            [220, 380],

        de:
            "Besiege insgesamt 5 Monster",

        en:
            "Defeat 5 monsters"
    },

    {
        type:
            "level",

        target:
            5,

        reward:
            [400, 700],

        de:
            "Erreiche Level 5",

        en:
            "Reach level 5"
    }

];


// ============================================================
// GLOBALE VARIABLEN
// ============================================================

let settings = loadSettings();

let users = loadAllUsers();

let currentUsername =
    cookieGet(
        STORAGE.current
    ) ||
    localStorageSafeGet(
        STORAGE.current
    ) ||
    null;

let player =
    null;

let isGuest =
    false;

let currentMonster =
    null;

let monsterHealth =
    0;

let mineClicksRequired =
    0;

let mineClicksDone =
    0;

let mineTimer =
    null;

let selectedAdminUser =
    null;


// ============================================================
// COOKIE-FUNKTIONEN
// ============================================================

function cookieSet(
    name,
    value,
    days = 3650
) {

    try {

        const expires =
            new Date(
                Date.now() +
                days *
                24 *
                60 *
                60 *
                1000
            ).toUTCString();


        document.cookie =
            `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;

    } catch {

        // Fallback passiert an anderer Stelle.

    }

}


function cookieGet(name) {

    try {

        const cookies =
            document.cookie
                .split("; ")
                .filter(Boolean);


        for (
            const cookie of cookies
        ) {

            const separator =
                cookie.indexOf("=");


            if (
                separator === -1
            ) {

                continue;

            }


            const key =
                cookie.substring(
                    0,
                    separator
                );


            if (
                key !== name
            ) {

                continue;

            }


            return decodeURIComponent(
                cookie.substring(
                    separator + 1
                )
            );

        }

    } catch {

        return null;

    }


    return null;

}


function cookieDelete(name) {

    try {

        document.cookie =
            `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax`;

    } catch {

        // Ignorieren.

    }

}


// ============================================================
// LOCAL STORAGE FALLBACK
// ============================================================

function localStorageSafeGet(
    key
) {

    try {

        return localStorage.getItem(
            key
        );

    } catch {

        return null;

    }

}


function localStorageSafeSet(
    key,
    value
) {

    try {

        localStorage.setItem(
            key,
            value
        );

        return true;

    } catch {

        return false;

    }

}


function localStorageSafeDelete(
    key
) {

    try {

        localStorage.removeItem(
            key
        );

    } catch {

        // Ignorieren.

    }

}


// ============================================================
// JSON STORAGE
// ============================================================

function saveJSON(
    key,
    value
) {

    const json =
        JSON.stringify(value);


    cookieSet(
        key,
        json
    );


    localStorageSafeSet(
        key,
        json
    );

}


function loadJSON(
    key,
    fallback = null
) {

    let value =
        cookieGet(key);


    if (
        value === null
    ) {

        value =
            localStorageSafeGet(
                key
            );

    }


    if (
        value === null
    ) {

        return fallback;

    }


    try {

        return JSON.parse(value);

    } catch {

        return fallback;

    }

}


// ============================================================
// USER-KEY
// ============================================================

function userKey(
    username
) {

    return username
        .trim()
        .toLowerCase();

}


function userCookieName(
    key
) {

    return (
        STORAGE.userPrefix +
        encodeURIComponent(key)
    );

}


function stateCookieName(
    key
) {

    return (
        STORAGE.statePrefix +
        encodeURIComponent(key)
    );

}


// ============================================================
// USER SPEICHERN
// ============================================================

function saveUser(
    key
) {

    if (
        !users[key]
    ) {

        return;

    }


    saveJSON(
        userCookieName(key),
        users[key]
    );

}


function deleteUser(
    key
) {

    cookieDelete(
        userCookieName(key)
    );

    localStorageSafeDelete(
        userCookieName(key)
    );


    cookieDelete(
        stateCookieName(key)
    );

    localStorageSafeDelete(
        stateCookieName(key)
    );

}


function getUser(
    key
) {

    const result =
        loadJSON(
            userCookieName(key),
            null
        );


    if (
        result
    ) {

        return result;

    }


    return null;

}


// ============================================================
// ALLE USERS AUS COOKIES LADEN
// ============================================================

function loadAllUsers() {

    const result = {};


    try {

        const cookies =
            document.cookie
                .split("; ")
                .filter(Boolean);


        for (
            const cookie of cookies
        ) {

            const separator =
                cookie.indexOf("=");


            if (
                separator === -1
            ) {

                continue;

            }


            const name =
                cookie.substring(
                    0,
                    separator
                );


            if (
                !name.startsWith(
                    STORAGE.userPrefix
                )
            ) {

                continue;

            }


            const keyEncoded =
                name.substring(
                    STORAGE.userPrefix.length
                );


            const key =
                decodeURIComponent(
                    keyEncoded
                );


            const raw =
                decodeURIComponent(
                    cookie.substring(
                        separator + 1
                    )
                );


            try {

                result[key] =
                    JSON.parse(raw);

            } catch {

                // kaputtes Cookie überspringen

            }

        }

    } catch {

        // Fallback weiter unten

    }


    // --------------------------------------------------------
    // Alte / lokale User ergänzen
    // --------------------------------------------------------

    const legacyMaps = [
        "questrpg_users_v4",
        "questrpg_users_v3",
        "questrpg_users_v2",
        "questrpg_users_v1"
    ];


    for (
        const legacyKey
        of legacyMaps
    ) {

        const old =
            loadJSON(
                legacyKey,
                null
            );


        if (
            !old ||
            typeof old !== "object"
        ) {

            continue;

        }


        for (
            const key
            of Object.keys(old)
        ) {

            if (
                result[key]
            ) {

                continue;

            }


            const oldUser =
                old[key];


            result[key] = {

                username:
                    oldUser.username ||
                    key,

                password:
                    oldUser.password ||
                    "",

                banned:
                    Boolean(
                        oldUser.banned
                    ),

                admin:
                    Boolean(
                        oldUser.admin
                    )

            };


            saveUser(key);

        }

    }


    // --------------------------------------------------------
    // Admin immer prüfen
    // --------------------------------------------------------

    if (
        result.moritzman3
    ) {

        result.moritzman3.admin =
            true;

        result.moritzman3.banned =
            false;

        saveJSON(
            userCookieName(
                "moritzman3"
            ),
            result.moritzman3
        );

    }


    return result;

}


// ============================================================
// EINSTELLUNGEN
// ============================================================

function loadSettings() {

    const saved =
        loadJSON(
            STORAGE.settings,
            null
        );


    return {

        ...defaultSettings,

        ...(saved || {})

    };

}


function saveSettings() {

    saveJSON(
        STORAGE.settings,
        settings
    );

}


// ============================================================
// PLAYER LOAD/SAVE
// ============================================================

function loadPlayer(
    username
) {

    const key =
        userKey(username);


    const saved =
        loadJSON(
            stateCookieName(key),
            null
        );


    const loaded = {

        ...defaultPlayer,

        ...(saved || {})

    };


    loaded.defeatedByName =
        loaded.defeatedByName || {};


    loaded.isGuest =
        false;


    return loaded;

}


function savePlayer() {

    if (
        !player ||
        player.isGuest ||
        !currentUsername
    ) {

        return;

    }


    saveJSON(

        stateCookieName(
            currentUsername
        ),

        player

    );

}


// ============================================================
// MIGRATION VON ALTEN VERSIONEN
// ============================================================

function migrateLegacyPlayer(
    username,
    key
) {

    const versions = [
        "v4",
        "v3",
        "v2",
        "v1"
    ];


    for (
        const version
        of versions
    ) {

        const legacyName =
            `questrpg_state_${version}_${
                encodeURIComponent(key)
            }`;


        const old =
            loadJSON(
                legacyName,
                null
            );


        if (
            old
        ) {

            const newPlayer = {

                ...defaultPlayer,

                ...old,

                name:
                    username,

                isGuest:
                    false

            };


            saveJSON(
                stateCookieName(key),
                newPlayer
            );


            return;

        }

    }

}


function migrateLegacyData() {

    Object.keys(
        users
    ).forEach(
        key => {

            if (
                !cookieGet(
                    stateCookieName(key)
                )
            ) {

                migrateLegacyPlayer(
                    users[key].username,
                    key
                );

            }

        }
    );

}


// ============================================================
// SPRACHE
// ============================================================

function t(
    de,
    en
) {

    return settings.language === "de"
        ? de
        : en;

}


function itemName(
    item
) {

    return settings.language === "de"
        ? item.nameDE
        : item.nameEN;

}


function monsterName(
    monster
) {

    return settings.language === "de"
        ? monster.nameDE
        : monster.nameEN;

}


// ============================================================
// HTML / UI
// ============================================================

function esc(
    text
) {

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


function render(
    html,
    screenName = ""
) {

    const screen =
        document.getElementById(
            "screen"
        );


    if (!screen) {

        return;

    }


    screen.dataset.screen =
        screenName;


    screen.innerHTML =
        html;

}


function message(
    text
) {

    const element =
        document.getElementById(
            "message"
        );


    if (!element) {

        return;

    }


    // HTML ist hier absichtlich erlaubt,
    // damit keine <span class="emoji">...
    // als Text erscheinen.

    element.innerHTML =
        text;

}


function randomNumber(
    min,
    max
) {

    return Math.floor(
        Math.random() *
        (
            max -
            min +
            1
        )
    ) + min;

}


// ============================================================
// USERNAME
// ============================================================

function validUsername(
    username
) {

    return /^[A-Za-z0-9_]+$/.test(
        username
    );

}


// ============================================================
// EQUIPMENT
// ============================================================

function getWeapon() {

    return weapons.find(
        item =>
            item.id ===
            player.weaponId
    ) || weapons[0];

}


function getArmor() {

    return armors.find(
        item =>
            item.id ===
            player.armorId
    ) || armors[0];

}


function getPickaxe() {

    return pickaxes.find(
        item =>
            item.id ===
            player.pickaxeId
    ) || pickaxes[0];

}


// ============================================================
// ADMIN
// ============================================================

function isAdmin() {

    if (
        !player ||
        player.isGuest ||
        !currentUsername
    ) {

        return false;

    }


    const account =
        users[
            currentUsername
        ];


    if (
        currentUsername ===
        "moritzman3"
    ) {

        return true;

    }


    return Boolean(
        account?.admin
    );

}


function adminBadge(
    username
) {

    const key =
        userKey(username);


    if (
        users[key]?.admin ||
        key === "moritzman3"
    ) {

        return `
            <span class="badge">
                🖳
            </span>
        `;

    }


    return "";

}


// ============================================================
// TOP-STATS
// ============================================================

function updateTopStats() {

    const name =
        document.getElementById(
            "name"
        );


    if (!name) {

        return;

    }


    if (!player) {

        name.textContent =
            "Gast";


        document.getElementById(
            "level"
        ).textContent =
            "-";


        document.getElementById(
            "gold"
        ).textContent =
            "-";


        document.getElementById(
            "health"
        ).textContent =
            "-";


        document.getElementById(
            "maxHealth"
        ).textContent =
            "-";


        document.getElementById(
            "xp"
        ).textContent =
            "-";


        document.getElementById(
            "xpNeeded"
        ).textContent =
            "-";


        document.getElementById(
            "healthBar"
        ).style.width =
            "0%";


        document.getElementById(
            "xpBar"
        ).style.width =
            "0%";


        return;

    }


    name.textContent =
        player.name;


    document.getElementById(
        "level"
    ).textContent =
        player.level;


    document.getElementById(
        "gold"
    ).textContent =
        player.gold;


    document.getElementById(
        "health"
    ).textContent =
        player.health;


    document.getElementById(
        "maxHealth"
    ).textContent =
        player.maxHealth;


    const neededXP =
        player.level *
        100;


    document.getElementById(
        "xp"
    ).textContent =
        player.xp;


    document.getElementById(
        "xpNeeded"
    ).textContent =
        neededXP;


    document.getElementById(
        "xpBar"
    ).style.width =
        Math.min(
            100,
            (
                player.xp /
                neededXP
            ) *
            100
        ) + "%";


    document.getElementById(
        "healthBar"
    ).style.width =
        Math.max(
            0,
            Math.min(
                100,
                (
                    player.health /
                    player.maxHealth
                ) *
                100
            )
        ) + "%";

}


// ============================================================
// XP
// ============================================================

function addXP(
    amount
) {

    player.xp +=
        amount;


    let leveled =
        false;


    while (
        player.xp >=
        player.level *
        100
    ) {

        player.xp -=
            player.level *
            100;


        player.level++;

        player.maxHealth +=
            20;

        player.health =
            player.maxHealth;


        leveled =
            true;

    }


    savePlayer();

    updateTopStats();


    if (leveled) {

        message(
            `🎉 ${t(
                "LEVEL UP! Du bist jetzt Level",
                "LEVEL UP! You are now level"
            )} ${player.level}!`
        );

    }

}


// ============================================================
// MISSIONEN
// ============================================================

function missionProgress(
    mission
) {

    switch (
        mission.type
    ) {

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
                player.defeatedByName.goblin ||
                0
            );

        case "earned":
            return player.totalGoldEarned;

        default:
            return 0;

    }

}


function missionText(
    mission
) {

    return settings.language === "de"
        ? mission.de
        : mission.en;

}


function updateMission() {

    if (!player) {

        return;

    }


    while (
        player.missionIndex <
        missions.length
    ) {

        const mission =
            missions[
                player.missionIndex
            ];


        if (
            missionProgress(
                mission
            ) <
            mission.target
        ) {

            break;

        }


        const reward =
            randomNumber(
                mission.reward[0],
                mission.reward[1]
            );


        player.gold +=
            reward;


        player.missionIndex++;


        message(
            `🎯 ${t(
                "Mission abgeschlossen! +",
                "Mission complete! +"
            )}${reward} ${t(
                "Gold!",
                "gold!"
            )}`
        );

    }


    savePlayer();

    updateTopStats();

}


// ============================================================
// LOGIN / AUTH
// ============================================================

function showAuth() {

    clearMineTimer();

    selectedAdminUser =
        null;


    currentUsername =
        null;


    player =
        null;


    isGuest =
        false;


    cookieDelete(
        STORAGE.current
    );


    localStorageSafeDelete(
        STORAGE.current
    );


    updateTopStats();

    message("");


    render(`

        <div class="top-row">

            <h2 class="compact-title">
                ⚔️ QuestRPG
            </h2>


            <button
                class="icon-button"
                onclick="openSettings(true)">

                ⚙️
                ${t(
                    "Einstellungen",
                    "Settings"
                )}

            </button>

        </div>


        <div class="big">
            🏰
        </div>


        <h2>

            ${t(
                "Willkommen bei QuestRPG",
                "Welcome to QuestRPG"
            )}

        </h2>


        <p class="small">

            ${t(
                "Logge dich ein, registriere dich oder spiele als Gast.",
                "Log in, register or play as a guest."
            )}

        </p>


        <button
            class="success-button"
            onclick="renderLogin()">

            🔐
            ${t(
                "Einloggen",
                "Log in"
            )}

        </button>


        <button
            onclick="renderRegister()">

            📝
            ${t(
                "Registrieren",
                "Register"
            )}

        </button>


        <button
            onclick="playAsGuest()">

            🎮
            ${t(
                "Als Gast spielen",
                "Play as Guest"
            )}

        </button>


        <button
            class="leader-button"
            onclick="showLeaderboard(true)">

            🏆
            ${t(
                "Leaderboard",
                "Leaderboard"
            )}

        </button>

    `);

}


// ============================================================
// LOGIN FORM
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

                ⚙️

            </button>

        </div>


        <h2>

            🔐
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

            🚀
            ${t(
                "Einloggen",
                "Log in"
            )}

        </button>


        <button
            onclick="playAsGuest()">

            🎮
            ${t(
                "Als Gast spielen",
                "Play as Guest"
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
// REGISTER FORM
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

                ⚙️

            </button>

        </div>


        <h2>

            📝
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
                "Nur Buchstaben, Zahlen und _. Keine Emojis.",
                "Only letters, numbers and _. No emojis."
            )}

        </p>


        <button
            class="success-button"
            onclick="register()">

            ✨
            ${t(
                "Account erstellen",
                "Create account"
            )}

        </button>


        <button
            onclick="playAsGuest()">

            🎮
            ${t(
                "Als Gast spielen",
                "Play as Guest"
            )}

        </button>

    `);

}


// ============================================================
// REGISTER
// ============================================================

function register() {

    const rawUser =
        document.getElementById(
            "regUser"
        )?.value || "";


    const password =
        document.getElementById(
            "regPass"
        )?.value || "";


    const trimmed =
        rawUser.trim();


    const key =
        userKey(
            trimmed
        );


    if (
        key.length < 3 ||
        key.length > 16
    ) {

        return message(
            t(
                "Der Benutzername muss 3–16 Zeichen haben.",
                "The username must be 3–16 characters."
            )
        );

    }


    if (
        !validUsername(
            trimmed
        )
    ) {

        return message(
            t(
                "Der Benutzername darf nur Buchstaben, Zahlen und _ enthalten. Emojis sind nicht erlaubt.",
                "The username may only contain letters, numbers and _. Emojis are not allowed."
            )
        );

    }


    if (
        password.length < 4
    ) {

        return message(
            t(
                "Das Passwort muss mindestens 4 Zeichen haben.",
                "The password must contain at least 4 characters."
            )
        );

    }


    if (
        users[key]
    ) {

        return message(
            t(
                "Dieser Benutzername existiert bereits.",
                "This username already exists."
            )
        );

    }


    users[key] = {

        username:
            trimmed,

        password:
            password,

        banned:
            false,

        admin:
            key ===
            "moritzman3"

    };


    saveUser(key);


    const newPlayer = {

        ...JSON.parse(
            JSON.stringify(
                defaultPlayer
            )
        ),

        name:
            trimmed,

        isGuest:
            false,

        defeatedByName:
            {}

    };


    saveJSON(
        stateCookieName(key),
        newPlayer
    );


    loginWithCredentials(
        trimmed,
        password
    );

}


// ============================================================
// LOGIN
// ============================================================

function login() {

    const username =
        document.getElementById(
            "loginUser"
        )?.value || "";


    const password =
        document.getElementById(
            "loginPass"
        )?.value || "";


    loginWithCredentials(
        username,
        password
    );

}


function loginWithCredentials(
    rawUser,
    password
) {

    const key =
        userKey(
            rawUser
        );


    const account =
        users[key];


    if (
        !account ||
        account.password !==
        password
    ) {

        return message(
            t(
                "Benutzername oder Passwort ist falsch.",
                "Username or password is incorrect."
            )
        );

    }


    if (
        account.banned
    ) {

        return message(
            `🚫 ${t(
                "Dieser Account ist gesperrt.",
                "This account is banned."
            )}`
        );

    }


    currentUsername =
        key;


    isGuest =
        false;


    player =
        loadPlayer(
            key
        );


    player.name =
        account.username;


    player.isGuest =
        false;


    cookieSet(
        STORAGE.current,
        key
    );


    localStorageSafeSet(
        STORAGE.current,
        key
    );


    savePlayer();

    updateTopStats();

    mainMenu();

}


// ============================================================
// GAST
// ============================================================

function playAsGuest() {

    clearMineTimer();


    currentUsername =
        null;


    isGuest =
        true;


    player = {

        ...JSON.parse(
            JSON.stringify(
                defaultPlayer
            )
        ),

        name:
            t(
                "Gast",
                "Guest"
            ),

        isGuest:
            true,

        defeatedByName:
            {}

    };


    updateTopStats();

    mainMenu();


    message(
        `🎮 ${t(
            "Du spielst als Gast. Der Gast-Spielstand wird nicht dauerhaft gespeichert.",
            "You are playing as a guest. Guest progress is not permanently saved."
        )}`
    );

}


// ============================================================
// LOGOUT
// ============================================================

function logout() {

    savePlayer();

    clearMineTimer();


    cookieDelete(
        STORAGE.current
    );


    localStorageSafeDelete(
        STORAGE.current
    );


    currentUsername =
        null;


    player =
        null;


    isGuest =
        false;


    showAuth();

}


// ============================================================
// ACCOUNT LÖSCHEN
// ============================================================

function deleteAccount() {

    if (
        !player ||
        !currentUsername ||
        player.isGuest
    ) {

        return;

    }


    const first =
        confirm(
            t(
                "Möchtest du deinen Account wirklich löschen?",
                "Do you really want to delete your account?"
            )
        );


    if (!first) {

        return;

    }


    const second =
        confirm(
            t(
                "ACHTUNG: Dein Account und dein kompletter Spielstand werden dauerhaft gelöscht.",
                "WARNING: Your account and all save data will be permanently deleted."
            )
        );


    if (!second) {

        return;

    }


    const key =
        currentUsername;


    delete users[key];


    deleteUser(
        key
    );


    cookieDelete(
        STORAGE.current
    );


    localStorageSafeDelete(
        STORAGE.current
    );


    currentUsername =
        null;


    player =
        null;


    isGuest =
        false;


    render(`

        <div class="big">
            🗑️
        </div>


        <h2>
            ${t(
                "Account gelöscht",
                "Account deleted"
            )}
        </h2>


        <p>

            ${t(
                "Dein Account und dein Spielstand wurden gelöscht.",
                "Your account and save data have been deleted."
            )}

        </p>


        <button
            class="success-button"
            onclick="showAuth()">

            🔐
            ${t(
                "Zum Login",
                "Back to login"
            )}

        </button>

    `);


    updateTopStats();

}


// ============================================================
// EINSTELLUNGEN
// ============================================================

function openSettings(
    fromAuth = false
) {

    const back =
        fromAuth
            ? "showAuth()"
            : "mainMenu()";


    render(`

        <div class="top-row">

            <button
                class="back-button"
                onclick="${back}">

                ←
                ${t(
                    "Zurück",
                    "Back"
                )}

            </button>


            <h2 class="compact-title">
                ⚙️
            </h2>

        </div>


        <h2>
            ⚙️
            ${t(
                "Einstellungen",
                "Settings"
            )}
        </h2>


        <div class="setting-row">

            <div>

                <strong>
                    🌐
                    ${t(
                        "Sprache",
                        "Language"
                    )}
                </strong>

                <div class="small">

                    ${t(
                        "Deutsch oder Englisch",
                        "German or English"
                    )}

                </div>

            </div>


            <button
                onclick="toggleLanguage()">

                ${
                    settings.language ===
                    "de"
                        ? "Deutsch"
                        : "English"
                }

            </button>

        </div>


        ${
            player &&
            !player.isGuest

                ? `

                    <div class="separator"></div>


                    <button
                        class="danger-button"
                        onclick="logout()">

                        🚪
                        ${t(
                            "Ausloggen",
                            "Log out"
                        )}

                    </button>


                    <button
                        class="danger-button"
                        onclick="deleteAccount()">

                        🗑️
                        ${t(
                            "Account löschen",
                            "Delete account"
                        )}

                    </button>

                `

                : ""

        }


        ${
            isAdmin()

                ? `

                    <div class="separator"></div>


                    <button
                        class="admin-button"
                        onclick="openAdminPanel()">

                        🛠️
                        Admin Panel

                    </button>

                `

                : ""

        }


        ${
            !player

                ? `

                    <div class="separator"></div>


                    <button
                        class="success-button"
                        onclick="renderLogin()">

                        🔐
                        ${t(
                            "Einloggen",
                            "Log in"
                        )}

                    </button>


                    <button
                        onclick="renderRegister()">

                        📝
                        ${t(
                            "Registrieren",
                            "Register"
                        )}

                    </button>


                    <button
                        onclick="playAsGuest()">

                        🎮
                        ${t(
                            "Als Gast spielen",
                            "Play as Guest"
                        )}

                    </button>

                `

                : ""

        }

    `);

}


function toggleLanguage() {

    settings.language =
        settings.language ===
        "de"
            ? "en"
            : "de";


    saveSettings();

    updateTopStats();


    openSettings(
        !player
    );

}


// ============================================================
// HAUPTMENÜ
// ============================================================

function mainMenu() {

    if (!player) {

        showAuth();

        return;

    }


    clearMineTimer();


    updateMission();


    const mission =
        missions[
            player.missionIndex
        ];


    let missionHTML =
        "";


    if (mission) {

        missionHTML = `

            <div class="mission-card">

                <strong>

                    🎯
                    ${t(
                        "Mission",
                        "Mission"
                    )}

                    ${
                        player.missionIndex + 1
                    }/10

                </strong>


                <div class="mission-text">

                    ${esc(
                        missionText(
                            mission
                        )
                    )}

                </div>


                <div class="small">

                    ${Math.min(
                        missionProgress(
                            mission
                        ),
                        mission.target
                    )}

                    /

                    ${mission.target}

                </div>

            </div>

        `;

    } else {

        missionHTML = `

            <div class="mission-card completed">

                🏆

                ${t(
                    "Alle 10 Missionen abgeschlossen!",
                    "All 10 missions completed!"
                )}

            </div>

        `;

    }


    render(`

        <div class="top-row">

            <h2 class="compact-title">

                ⚔️ QuestRPG

            </h2>


            <button
                class="icon-button"
                onclick="openSettings(false)">

                ⚙️

            </button>

        </div>


        <div class="card-grid">

            <div class="card">

                🗡️

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

                🛡️

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

                ⛏️

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

            👤
            ${t(
                "Charakter",
                "Character"
            )}

        </button>


        <button
            onclick="startFight()">

            ⚔️
            ${t(
                "Kämpfen",
                "Fight"
            )}

        </button>


        <button
            onclick="openMine()">

            ⛏️
            ${t(
                "Gold abbauen",
                "Mine gold"
            )}

        </button>


        <button
            onclick="openShop()">

            🏪
            ${t(
                "Shop",
                "Shop"
            )}

        </button>


        <button
            class="leader-button"
            onclick="showLeaderboard(false)">

            🏆
            ${t(
                "Leaderboard",
                "Leaderboard"
            )}

        </button>


        ${
            isAdmin()

                ? `

                    <button
                        class="admin-button"
                        onclick="openAdminPanel()">

                        🛠️
                        Admin Panel

                    </button>

                `

                : ""
        }

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

                👤
                ${t(
                    "Charakter",
                    "Character"
                )}

            </h2>

        </div>


        <div class="card-grid">

            <div class="card">

                👤

                <br>

                ${esc(
                    player.name
                )}

                ${
                    adminBadge(
                        player.name
                    )
                }

            </div>


            <div class="card">

                ⭐

                <br>

                Level
                ${player.level}

            </div>


            <div class="card">

                💰

                <br>

                ${player.gold}

            </div>

        </div>


        <h3>
            🗡️
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

        </p>


        <h3>

            🛡️
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

            ⛏️
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
// LEADERBOARD
// ============================================================

function showLeaderboard(
    fromAuth = false
) {

    clearMineTimer();


    const entries = [];


    Object.keys(users)
        .forEach(
            key => {

                const account =
                    users[key];


                if (
                    account.banned
                ) {

                    return;

                }


                const saved =
                    loadPlayer(
                        key
                    );


                entries.push({

                    key:

                        key,

                    username:
                        account.username,

                    level:
                        Number(
                            saved.level
                        ) || 1,

                    xp:
                        Number(
                            saved.xp
                        ) || 0,

                    gold:
                        Number(
                            saved.gold
                        ) || 0,

                    defeated:
                        Number(
                            saved.defeated
                        ) || 0

                });

            }
        );


    entries.sort(
        (
            a,
            b
        ) => {

            if (
                b.level !==
                a.level
            ) {

                return (
                    b.level -
                    a.level
                );

            }


            if (
                b.xp !==
                a.xp
            ) {

                return (
                    b.xp -
                    a.xp
                );

            }


            return (
                b.gold -
                a.gold
            );

        }
    );


    let rows =
        "";


    entries.forEach(
        (
            entry,
            index
        ) => {

            const me =
                currentUsername ===
                entry.key;


            let rank =
                String(
                    index + 1
                );


            if (
                index === 0
            ) {
                rank = "🥇";
            }


            if (
                index === 1
            ) {
                rank = "🥈";
            }


            if (
                index === 2
            ) {
                rank = "🥉";
            }


            rows += `

                <tr
                    class="${
                        me
                            ? "me"
                            : ""
                    }">

                    <td class="rank">

                        ${rank}

                    </td>


                    <td>

                        ${esc(
                            entry.username
                        )}

                        ${adminBadge(
                            entry.username
                        )}

                        ${
                            me
                                ? " ⭐"
                                : ""
                        }

                    </td>


                    <td>
                        ${entry.level}
                    </td>


                    <td>
                        ${entry.xp}
                    </td>


                    <td>
                        ${entry.gold}
                    </td>


                    <td>
                        ${entry.defeated}
                    </td>

                </tr>

            `;

        }
    );


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

                🏆
                ${t(
                    "Leaderboard",
                    "Leaderboard"
                )}

            </h2>

        </div>


        <p class="small">

            ${t(
                "Sortiert nach Level → XP → Gold",
                "Sorted by Level → XP → Gold"
            )}

        </p>


        ${
            entries.length > 0

                ? `

                    <table
                        class="leaderboard">

                        <thead>

                            <tr>

                                <th>
                                    #
                                </th>

                                <th>
                                    ${t(
                                        "Spieler",
                                        "Player"
                                    )}
                                </th>

                                <th>
                                    Level
                                </th>

                                <th>
                                    XP
                                </th>

                                <th>
                                    Gold
                                </th>

                                <th>
                                    ${t(
                                        "Besiegt",
                                        "Defeated"
                                    )}
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            ${rows}

                        </tbody>

                    </table>

                `

                : `

                    <div
                        class="leaderboard-empty">

                        🏆

                        <p>

                            ${t(
                                "Noch keine Spieler vorhanden.",
                                "No players yet."
                            )}

                        </p>

                    </div>

                `
        }

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

                🏪
                ${t(
                    "Shop",
                    "Shop"
                )}

            </h2>

        </div>


        <p>

            💰
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

            🗡️
            ${t(
                "Schwerter",
                "Swords"
            )}

        </button>


        <button
            onclick="showArmors()">

            🛡️
            ${t(
                "Rüstungen",
                "Armor"
            )}

        </button>


        <button
            onclick="showPickaxes()">

            ⛏️
            ${t(
                "Spitzhacken",
                "Pickaxes"
            )}

        </button>


        <button
            class="success-button"
            onclick="buyPotion()">

            🧪
            ${t(
                "Heiltrank – 25 Gold",
                "Health Potion – 25 gold"
            )}

        </button>

    `);

}


// ============================================================
// SHOP-KARTE
// ============================================================

function shopCard(
    title,
    description,
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
                ${description}
            </p>


            <p>

                💰

                <strong>
                    ${price}
                </strong>

            </p>


            <button
                ${
                    current
                        ? "disabled"
                        : ""
                }

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
// WAFFENSHOP
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

                🗡️
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
        .forEach(
            item => {

                html +=
                    shopCard(

                        `🗡️
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

                        current.id ===
                        item.id,

                        `buyWeapon(
                            '${item.id}'
                        )`

                    );

            }
        );


    render(html);

}


function buyWeapon(
    id
) {

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
        `✅ ${t(
            "Gekauft",
            "Bought"
        )}: ${esc(
            itemName(item)
        )}`
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

                🛡️
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
        .forEach(
            item => {

                html +=
                    shopCard(

                        `🛡️
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

                        current.id ===
                        item.id,

                        `buyArmor(
                            '${item.id}'
                        )`

                    );

            }
        );


    render(html);

}


function buyArmor(
    id
) {

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
        `✅ ${t(
            "Gekauft",
            "Bought"
        )}: ${esc(
            itemName(item)
        )}`
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

                ⛏️
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
        .forEach(
            item => {

                html +=
                    shopCard(

                        `⛏️
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

                        current.id ===
                        item.id,

                        `buyPickaxe(
                            '${item.id}'
                        )`

                    );

            }
        );


    render(html);

}


function buyPickaxe(
    id
) {

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
        `✅ ${t(
            "Gekauft",
            "Bought"
        )}: ${esc(
            itemName(item)
        )}`
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


    message(
        `🧪 ${t(
            "+50 Leben",
            "+50 health"
        )}`
    );

}


// ============================================================
// GOLDMINE
// ============================================================

function openMine() {

    const remaining =
        getMineRemainingSeconds();


    if (
        remaining > 0
    ) {

        renderMineCooldown();

        startMineTimer();

        return;

    }


    mineClicksRequired =
        randomNumber(
            5,
            12
        );


    mineClicksDone =
        0;


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

                ⛏️
                ${t(
                    "Goldmine",
                    "Gold Mine"
                )}

            </h2>

        </div>


        <p>

            ${t(
                "Drücke den Button so oft, wie der zufällige Zähler verlangt.",
                "Press the button as many times as the random counter requires."
            )}

        </p>


        <div class="mine-box">

            <div class="big">
                ⛏️
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
                            ) *
                            100
                        }%;
                    ">
                </div>

            </div>


            <button
                class="gold-button mine-button"
                onclick="mineClick()">

                ⛏️
                ${t(
                    "GOLD ABBAUEN",
                    "MINE GOLD"
                )}

            </button>

        </div>

    `);


    clearMineTimer();

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
        randomNumber(
            20,
            40
        ) +
        getPickaxe().bonus;


    player.gold +=
        reward;


    player.totalMined++;

    player.totalGoldEarned +=
        reward;


    addXP(
        15
    );


    updateMission();

    savePlayer();

    updateTopStats();


    setMineCooldown(
        8
    );


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

                💰
                ${t(
                    "Gold erhalten",
                    "Gold collected"
                )}

            </h2>

        </div>


        <div class="big">
            💰
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

            ⏳

            ${t(
                "Die Mine hat jetzt 8 Sekunden Cooldown.",
                "The mine now has an 8 second cooldown."
            )}

        </p>


        <button
            onclick="
                renderMineCooldown();
                startMineTimer();
            ">

            ${t(
                "Cooldown ansehen",
                "View cooldown"
            )}

        </button>

    `);

}


function getMineCooldownEnd() {

    return Number(
        cookieGet(
            STORAGE.mineCooldown
        ) ||
        localStorageSafeGet(
            STORAGE.mineCooldown
        ) ||
        0
    );

}


function setMineCooldown(
    seconds
) {

    const end =
        Date.now() +
        seconds *
        1000;


    cookieSet(
        STORAGE.mineCooldown,
        String(end)
    );


    localStorageSafeSet(
        STORAGE.mineCooldown,
        String(end)
    );

}


function getMineRemainingSeconds() {

    const end =
        getMineCooldownEnd();


    return Math.max(
        0,
        Math.ceil(
            (
                end -
                Date.now()
            ) /
            1000
        )
    );

}


function clearMineCooldown() {

    cookieDelete(
        STORAGE.mineCooldown
    );


    localStorageSafeDelete(
        STORAGE.mineCooldown
    );

}


function renderMineCooldown() {

    const remaining =
        getMineRemainingSeconds();


    if (
        remaining <= 0
    ) {

        clearMineCooldown();

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

                ⏳
                ${t(
                    "Goldmine",
                    "Gold Mine"
                )}

            </h2>

        </div>


        <div class="big">
            ⏳
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

            <strong
                id="mineCountdown">

                ${remaining}s

            </strong>

        </p>


        <button disabled>

            ${t(
                "Warte...",
                "Wait..."
            )}

        </button>

    `);


    startMineTimer();

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

                ⛏️
                ${t(
                    "Goldmine bereit",
                    "Mine ready"
                )}

            </h2>

        </div>


        <div class="big">
            ✅
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

            ⛏️
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
        setInterval(
            () => {

                if (
                    !player
                ) {

                    clearMineTimer();

                    return;

                }


                const remaining =
                    getMineRemainingSeconds();


                if (
                    remaining <= 0
                ) {

                    clearMineCooldown();

                    clearMineTimer();

                    renderMineReady();

                    return;

                }


                const countdown =
                    document.getElementById(
                        "mineCountdown"
                    );


                if (
                    countdown
                ) {

                    countdown.textContent =
                        `${remaining}s`;

                }

            },
            250
        );

}


function clearMineTimer() {

    if (
        mineTimer
    ) {

        clearInterval(
            mineTimer
        );


        mineTimer =
            null;

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

                ⚔️
                ${t(
                    "Kampf",
                    "Battle"
                )}

            </h2>

        </div>


        <div class="monster">

            <div class="monster-emoji">

                ${currentMonster.emoji}

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

            ⚔️
            ${t(
                "Angreifen",
                "Attack"
            )}

        </button>


        <button
            onclick="useCombatPotion()">

            🧪
            ${t(
                "Heiltrank",
                "Potion"
            )}
            (25)

        </button>


        <button
            onclick="escapeFight()">

            🏃
            ${t(
                "Fliehen",
                "Flee"
            )}

        </button>

    `);

}


function attack() {

    let damage =
        getWeapon().damage;


    const critical =
        randomNumber(
            1,
            100
        ) <= 15;


    if (
        critical
    ) {

        damage *= 2;

    }


    monsterHealth -=
        damage;


    // --------------------------------------------------------
    // MONSTER BESIEGT
    // --------------------------------------------------------

    if (
        monsterHealth <=
        0
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
                ] ||
                0
            ) + 1;


        addXP(
            currentMonster.xp
        );


        updateMission();


        savePlayer();


        render(`

            <div class="big">
                🏆
            </div>


            <h2>

                ${t(
                    "Sieg!",
                    "Victory!"
                )}

            </h2>


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


            ${
                critical
                    ? `
                        <p>
                            💥

                            <strong>

                                ${t(
                                    "KRITISCHER TREFFER!",
                                    "CRITICAL HIT!"
                                )}

                            </strong>

                        </p>
                    `
                    : ""
            }


            <p>

                ⚔️
                ${t(
                    "Schaden",
                    "Damage"
                )}:

                <strong>
                    ${damage}
                </strong>

            </p>


            <p>

                💰
                ${t(
                    "Gold",
                    "Gold"
                )}:

                <strong>
                    +${reward}
                </strong>

            </p>


            <p>

                ⭐
                ${t(
                    "XP",
                    "XP"
                )}:

                <strong>
                    +${currentMonster.xp}
                </strong>

            </p>


            <button
                class="success-button"
                onclick="mainMenu()">

                👉
                ${t(
                    "Weiter",
                    "Continue"
                )}

            </button>

        `);


        updateTopStats();

        return;

    }


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


    // --------------------------------------------------------
    // SPIELER BESIEGT
    // --------------------------------------------------------

    if (
        player.health <=
        0
    ) {

        player.health =
            0;


        player.gold =
            Math.max(
                0,
                player.gold - 25
            );


        player.health =
            player.maxHealth;


        savePlayer();


        render(`

            <div class="big">
                💀
            </div>


            <h2>

                ${t(
                    "Du wurdest besiegt!",
                    "You were defeated!"
                )}

            </h2>


            <p>

                ${t(
                    "Du verlierst 25 Gold und wirst wiederbelebt.",
                    "You lose 25 gold and are revived."
                )}

            </p>


            <button
                onclick="mainMenu()">

                👉
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


    // WICHTIG:
    // Kein span-HTML für Emojis.
    // Dadurch entstehen keine
    // <span class="emoji">...</span>
    // Fehler.

    message(

        `⚔️

         ${t(
             "Angriff",
             "Attack"
         )}:

         <strong>
             ${damage}
         </strong>.

         ${t(
             "Gegnerschaden",
             "Enemy damage"
         )}:

         <strong>
             ${enemyDamage}
         </strong>.`

    );


    updateTopStats();

}


// ============================================================
// HEILTRANK IM KAMPF
// ============================================================

function useCombatPotion() {

    if (
        player.gold <
        25
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

    renderFight();

    updateTopStats();


    message(
        `🧪

         ${t(
             "+50 Leben",
             "+50 health"
         )}`
    );

}


// ============================================================
// FLUCHTEN
// ============================================================

function escapeFight() {

    const chance =
        randomNumber(
            1,
            100
        );


    if (
        chance <=
        70
    ) {

        render(`

            <div class="big">
                💨
            </div>


            <h2>

                ${t(
                    "Flucht erfolgreich!",
                    "Escape successful!"
                )}

            </h2>


            <p>

                ${t(
                    "Du bist entkommen.",
                    "You escaped."
                )}

            </p>


            <button
                onclick="mainMenu()">

                👉
                ${t(
                    "Weiter",
                    "Continue"
                )}

            </button>

        `);


        return;

    }


    const damage =
        currentMonster.damage;


    player.health -=
        damage;


    if (
        player.health <=
        0
    ) {

        player.health =
            0;


        player.gold =
            Math.max(
                0,
                player.gold - 25
            );


        player.health =
            player.maxHealth;


        savePlayer();


        render(`

            <div class="big">
                💀
            </div>


            <h2>

                ${t(
                    "Besiegt",
                    "Defeated"
                )}

            </h2>


            <p>

                ${t(
                    "Die Flucht ist fehlgeschlagen. Du verlierst 25 Gold.",
                    "The escape failed. You lose 25 gold."
                )}

            </p>


            <button
                onclick="mainMenu()">

                👉
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

            `❌

             ${t(
                 "Flucht fehlgeschlagen.",
                 "Escape failed."
             )}

             ${t(
                 "Du verlierst",
                 "You lose"
             )}

             <strong>
                 ${damage}
             </strong>

             ${t(
                 "Leben.",
                 "health."
             )}`

        );

    }


    updateTopStats();

}


// ============================================================
// ADMIN PANEL
// ============================================================

function openAdminPanel() {

    if (
        !isAdmin()
    ) {

        return message(
            "🚫 Keine Berechtigung."
        );

    }


    selectedAdminUser =
        null;


    renderAdminPanel();

}


function renderAdminPanel() {

    if (
        !isAdmin()
    ) {

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

                🛠️
                Admin Panel

            </h2>

        </div>


        <div class="warning-box">

            🛠️

            <strong>
                QuestRPG Admin Panel
            </strong>


            <p class="small">

                ${t(
                    "Suche einen Account und klicke ihn an.",
                    "Search for an account and click it."
                )}

            </p>

        </div>


        <div class="form-group">

            <label>

                🔎
                ${t(
                    "Account suchen",
                    "Search account"
                )}

            </label>


            <input
                id="adminSearch"
                type="text"
                autocomplete="off"
                placeholder="${t(
                    "Username eingeben...",
                    "Enter username..."
                )}"
                oninput="filterAdminUsers()">

        </div>


        <div id="adminUserList"></div>


        <div id="adminSelected"></div>

    `);


    filterAdminUsers();

}


// ============================================================
// ADMIN USER SEARCH
// ============================================================

function filterAdminUsers() {

    const input =
        document.getElementById(
            "adminSearch"
        );


    const list =
        document.getElementById(
            "adminUserList"
        );


    if (
        !input ||
        !list
    ) {

        return;

    }


    const search =
        input.value
            .trim()
            .toLowerCase();


    const matching =
        Object.keys(
            users
        )
        .filter(
            key =>
                users[key]
                    .username
                    .toLowerCase()
                    .includes(
                        search
                    )
        )
        .sort();


    if (
        matching.length ===
        0
    ) {

        list.innerHTML = `

            <div
                class="admin-player">

                🔎

                ${t(
                    "Kein Account gefunden.",
                    "No account found."
                )}

            </div>

        `;

        return;

    }


    list.innerHTML =
        matching
        .map(
            key => {

                const account =
                    users[key];


                const target =
                    loadPlayer(key);


                return `

                    <button
                        class="admin-user-button ${
                            account.banned
                                ? "admin-player banned"
                                : ""
                        }"
                        onclick="
                            selectAdminUser(
                                '${key}'
                            )
                        ">

                        👤

                        <strong>

                            ${esc(
                                account.username
                            )}

                            ${adminBadge(
                                account.username
                            )}

                        </strong>


                        <br>


                        <span class="small">

                            ⭐ Level:
                            ${target.level}

                            &nbsp;&nbsp;

                            💰 Gold:
                            ${target.gold}

                        </span>

                    </button>

                `;

            }
        )
        .join("");

}


// ============================================================
// ADMIN ACCOUNT AUSWÄHLEN
// ============================================================

function selectAdminUser(
    key
) {

    if (
        !isAdmin() ||
        !users[key]
    ) {

        return;

    }


    selectedAdminUser =
        key;


    const account =
        users[key];


    const target =
        loadPlayer(key);


    const container =
        document.getElementById(
            "adminSelected"
        );


    if (!container) {

        return;

    }


    container.innerHTML = `

        <div class="separator"></div>


        <div
            class="
                admin-player
                admin-selected
                ${
                    account.banned
                        ? "banned"
                        : ""
                }
            ">


            <h2>

                👤

                ${esc(
                    account.username
                )}

                ${adminBadge(
                    account.username
                )}

            </h2>


            <p>

                ⭐ Level:
                <strong>
                    ${target.level}
                </strong>

                <br>


                ⭐ XP:
                <strong>
                    ${target.xp}
                </strong>

                <br>


                💰 Gold:
                <strong>
                    ${target.gold}
                </strong>

                <br>


                ⚔️
                ${t(
                    "Besiegt",
                    "Defeated"
                )}:

                <strong>
                    ${target.defeated}
                </strong>

                <br>


                ${
                    account.banned
                        ? "🚫 GEBANNT"
                        : "✅ AKTIV"
                }

            </p>


            <h3>
                💰
                ${t(
                    "Gold",
                    "Gold"
                )}
            </h3>


            <div class="form-group">

                <input
                    id="adminGoldAmount"
                    type="number"
                    min="0"
                    placeholder="500">

            </div>


            <button
                class="gold-button"
                onclick="
                    adminGiveSelectedGold()
                ">

                💰
                ${t(
                    "Gold geben",
                    "Give gold"
                )}

            </button>


            <button
                onclick="
                    adminResetSelectedGold()
                ">

                🔄
                ${t(
                    "Gold auf 0 setzen",
                    "Reset gold to 0"
                )}

            </button>


            <h3>

                ⭐
                ${t(
                    "Level",
                    "Level"
                )}

            </h3>


            <div class="form-group">

                <input
                    id="adminLevelAmount"
                    type="number"
                    min="1"
                    max="1000"
                    placeholder="10">

            </div>


            <button
                onclick="
                    adminSetSelectedLevel()
                ">

                ⭐
                ${t(
                    "Level setzen",
                    "Set level"
                )}

            </button>


            <button
                onclick="
                    adminResetSelectedLevel()
                ">

                🔄
                ${t(
                    "Level zurücksetzen",
                    "Reset level"
                )}

            </button>


            <h3>

                🛡️
                ${t(
                    "Account",
                    "Account"
                )}

            </h3>


            ${
                account.banned

                    ? `

                        <button
                            class="success-button"
                            onclick="
                                adminToggleSelectedBan()
                            ">

                            ✅
                            ${t(
                                "Account entbannen",
                                "Unban account"
                            )}

                        </button>

                    `

                    : `

                        <button
                            class="danger-button"
                            onclick="
                                adminToggleSelectedBan()
                            ">

                            🚫
                            ${t(
                                "Account bannen",
                                "Ban account"
                            )}

                        </button>

                    `
            }


            <button
                class="danger-button"
                onclick="
                    adminDeleteSelectedUser()
                ">

                🗑️
                ${t(
                    "Account löschen",
                    "Delete account"
                )}

            </button>


            ${
                account.admin

                    ? `

                        <button disabled>

                            🖳
                            ${t(
                                "Account ist bereits Admin",
                                "Account is already admin"
                            )}

                        </button>

                    `

                    : `

                        <button
                            class="admin-button"
                            onclick="
                                adminGiveSelectedAdmin()
                            ">

                            🖳
                            ${t(
                                "Admin geben",
                                "Give admin"
                            )}

                        </button>

                    `
            }

        </div>

    `;

}


// ============================================================
// ADMIN: GOLD GEBEN
// ============================================================

function adminGiveSelectedGold() {

    if (
        !isAdmin() ||
        !selectedAdminUser
    ) {

        return;

    }


    const input =
        document.getElementById(
            "adminGoldAmount"
        );


    const amount =
        Number(
            input?.value
        );


    if (
        !Number.isFinite(amount) ||
        amount < 0
    ) {

        return message(
            t(
                "Ungültige Goldmenge.",
                "Invalid gold amount."
            )
        );

    }


    const target =
        loadPlayer(
            selectedAdminUser
        );


    target.gold +=
        Math.floor(
            amount
        );


    saveJSON(
        stateCookieName(
            selectedAdminUser
        ),
        target
    );


    if (
        selectedAdminUser ===
        currentUsername
    ) {

        player =
            target;


        updateTopStats();

    }


    selectAdminUser(
        selectedAdminUser
    );


    message(
        `💰 ${amount} ${t(
            "Gold hinzugefügt.",
            "gold added."
        )}`
    );

}


// ============================================================
// ADMIN: GOLD RESET
// ============================================================

function adminResetSelectedGold() {

    if (
        !isAdmin() ||
        !selectedAdminUser
    ) {

        return;

    }


    const target =
        loadPlayer(
            selectedAdminUser
        );


    target.gold =
        0;


    saveJSON(
        stateCookieName(
            selectedAdminUser
        ),
        target
    );


    if (
        selectedAdminUser ===
        currentUsername
    ) {

        player =
            target;


        updateTopStats();

    }


    selectAdminUser(
        selectedAdminUser
    );


    message(
        `🔄 ${t(
            "Gold zurückgesetzt.",
            "Gold reset."
        )}`
    );

}


// ============================================================
// ADMIN: LEVEL SETZEN
// ============================================================

function adminSetSelectedLevel() {

    if (
        !isAdmin() ||
        !selectedAdminUser
    ) {

        return;

    }


    const input =
        document.getElementById(
            "adminLevelAmount"
        );


    const level =
        Number(
            input?.value
        );


    if (
        !Number.isInteger(level) ||
        level < 1 ||
        level > 1000
    ) {

        return message(
            t(
                "Level muss zwischen 1 und 1000 liegen.",
                "Level must be between 1 and 1000."
            )
        );

    }


    const target =
        loadPlayer(
            selectedAdminUser
        );


    target.level =
        level;


    target.xp =
        0;


    target.maxHealth =
        100 +
        (
            level -
            1
        ) *
        20;


    target.health =
        target.maxHealth;


    saveJSON(
        stateCookieName(
            selectedAdminUser
        ),
        target
    );


    if (
        selectedAdminUser ===
        currentUsername
    ) {

        player =
            target;


        updateTopStats();

    }


    selectAdminUser(
        selectedAdminUser
    );


    message(
        `⭐ ${t(
            "Level gesetzt auf",
            "Level set to"
        )} ${level}.`
    );

}


// ============================================================
// ADMIN: LEVEL RESET
// ============================================================

function adminResetSelectedLevel() {

    if (
        !isAdmin() ||
        !selectedAdminUser
    ) {

        return;

    }


    const target =
        loadPlayer(
            selectedAdminUser
        );


    target.level =
        1;


    target.xp =
        0;


    target.maxHealth =
        100;


    target.health =
        100;


    saveJSON(
        stateCookieName(
            selectedAdminUser
        ),
        target
    );


    if (
        selectedAdminUser ===
        currentUsername
    ) {

        player =
            target;


        updateTopStats();

    }


    selectAdminUser(
        selectedAdminUser
    );


    message(
        `🔄 ${t(
            "Level zurückgesetzt.",
            "Level reset."
        )}`
    );

}


// ============================================================
// ADMIN: BAN / UNBAN
// ============================================================

function adminToggleSelectedBan() {

    if (
        !isAdmin() ||
        !selectedAdminUser
    ) {

        return;

    }


    if (
        selectedAdminUser ===
        currentUsername
    ) {

        return message(
            t(
                "Du kannst dich nicht selbst bannen.",
                "You cannot ban yourself."
            )
        );

    }


    users[
        selectedAdminUser
    ].banned =
        !users[
            selectedAdminUser
        ].banned;


    saveUser(
        selectedAdminUser
    );


    selectAdminUser(
        selectedAdminUser
    );


    filterAdminUsers();


    message(

        users[
            selectedAdminUser
        ].banned

            ? `🚫 ${t(
                "Account gebannt.",
                "Account banned."
              )}`

            : `✅ ${t(
                "Account entbannt.",
                "Account unbanned."
              )}`

    );

}


// ============================================================
// ADMIN: ACCOUNT LÖSCHEN
// ============================================================

function adminDeleteSelectedUser() {

    if (
        !isAdmin() ||
        !selectedAdminUser
    ) {

        return;

    }


    if (
        selectedAdminUser ===
        currentUsername
    ) {

        return message(
            t(
                "Du kannst dich hier nicht selbst löschen.",
                "You cannot delete yourself here."
            )
        );

    }


    const username =
        users[
            selectedAdminUser
        ]?.username ||
        selectedAdminUser;


    const confirmed =
        confirm(
            t(
                `Soll ${username} wirklich dauerhaft gelöscht werden?`,
                `Should ${username} really be permanently deleted?`
            )
        );


    if (
        !confirmed
    ) {

        return;

    }


    const key =
        selectedAdminUser;


    delete users[key];


    deleteUser(
        key
    );


    saveUsersObject();


    selectedAdminUser =
        null;


    renderAdminPanel();


    message(
        `🗑️ ${t(
            "Account gelöscht.",
            "Account deleted."
        )}`
    );

}


// ============================================================
// USERS GANZ SPEICHERN
// ============================================================
// Die eigentlichen Accounts liegen einzeln in Cookies.
// Diese Funktion sorgt zusätzlich für die Fallback-Datei.
// ============================================================

function saveUsersObject() {

    try {

        localStorageSafeSet(
            "questrpg_users_backup",
            JSON.stringify(users)
        );

    } catch {

        // Ignorieren

    }

}


// ============================================================
// ADMIN: ADMIN GEBEN
// ============================================================

function adminGiveSelectedAdmin() {

    if (
        !isAdmin() ||
        !selectedAdminUser
    ) {

        return;

    }


    if (
        users[
            selectedAdminUser
        ].admin
    ) {

        return message(
            `🖳 ${t(
                "Dieser Account ist bereits Admin.",
                "This account is already an admin."
            )}`
        );

    }


    const username =
        users[
            selectedAdminUser
        ].username;


    const confirmed =
        confirm(
            t(
                `Soll ${username} wirklich Admin werden?`,
                `Should ${username} really become an admin?`
            )
        );


    if (
        !confirmed
    ) {

        return;

    }


    users[
        selectedAdminUser
    ].admin =
        true;


    saveUser(
        selectedAdminUser
    );


    selectAdminUser(
        selectedAdminUser
    );


    filterAdminUsers();


    message(
        `🖳 ${esc(
            username
        )} ${t(
            "ist jetzt Admin.",
            "is now an admin."
        )}`
    );

}


// ============================================================
// START / AUTOLOGIN
// ============================================================

function init() {

    // Alte Accounts zuerst übernehmen.
    migrateLegacyData();


    // Users neu aus Cookies lesen,
    // damit neu hinzugekommene Accounts
    // sofort enthalten sind.
    users =
        loadAllUsers();


    // MORITZMAN3 immer Admin.
    if (
        users.moritzman3
    ) {

        users.moritzman3.admin =
            true;

        users.moritzman3.banned =
            false;

        saveUser(
            "moritzman3"
        );

    }


    if (
        currentUsername &&
        users[currentUsername] &&
        !users[currentUsername].banned
    ) {

        isGuest =
            false;


        player =
            loadPlayer(
                currentUsername
            );


        player.name =
            users[
                currentUsername
            ].username;


        player.isGuest =
            false;


        updateTopStats();

        mainMenu();

        return;

    }


    cookieDelete(
        STORAGE.current
    );


    localStorageSafeDelete(
        STORAGE.current
    );


    currentUsername =
        null;


    showAuth();

}


// ============================================================
// STARTEN
// ============================================================

document.addEventListener(
    "DOMContentLoaded",
    init
);
