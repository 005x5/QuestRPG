// ============================================================
//                  ⚔️ CODE QUEST RPG ⚔️
// ============================================================


// ============================================================
// SPIELER
// ============================================================

const player = {

    name: "Held",

    level: 1,

    xp: 0,

    gold: 50,

    health: 100,

    maxHealth: 100,

    weapon: {
        name: "Holzschwert",
        damage: 10
    },

    armor: {
        name: "Alte Kleidung",
        bonusHealth: 0
    },

    pickaxe: {
        name: "Alte Spitzhacke",
        goldBonus: 0
    }
};


// ============================================================
// WAFFEN
// ============================================================

const weapons = [

    {
        name: "Steinschwert",
        damage: 20,
        price: 75
    },

    {
        name: "Eisenschwert",
        damage: 35,
        price: 150
    },

    {
        name: "Diamantschwert",
        damage: 55,
        price: 300
    },

    {
        name: "Drachenschwert",
        damage: 80,
        price: 600
    },

    {
        name: "Legendäres Schwert",
        damage: 120,
        price: 1200
    }

];


// ============================================================
// RÜSTUNGEN
// ============================================================

const armors = [

    {
        name: "Leder-Rüstung",
        bonusHealth: 30,
        price: 80
    },

    {
        name: "Eisen-Rüstung",
        bonusHealth: 70,
        price: 180
    },

    {
        name: "Diamant-Rüstung",
        bonusHealth: 130,
        price: 350
    },

    {
        name: "Drachen-Rüstung",
        bonusHealth: 220,
        price: 700
    },

    {
        name: "Legendäre Rüstung",
        bonusHealth: 350,
        price: 1500
    }

];


// ============================================================
// SPITZHACKEN
// ============================================================

const pickaxes = [

    {
        name: "Stein-Spitzhacke",
        goldBonus: 10,
        price: 60
    },

    {
        name: "Eisen-Spitzhacke",
        goldBonus: 25,
        price: 140
    },

    {
        name: "Diamant-Spitzhacke",
        goldBonus: 50,
        price: 300
    },

    {
        name: "Drachen-Spitzhacke",
        goldBonus: 100,
        price: 600
    },

    {
        name: "Legendäre Spitzhacke",
        goldBonus: 200,
        price: 1200
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
        damage: 8,
        xp: 25,
        gold: 20
    },

    {
        name: "Wilder Wolf",
        emoji: "🐺",
        health: 55,
        damage: 14,
        xp: 40,
        gold: 35
    },

    {
        name: "Goblin",
        emoji: "👺",
        health: 75,
        damage: 18,
        xp: 60,
        gold: 50
    },

    {
        name: "Ork",
        emoji: "👹",
        health: 120,
        damage: 25,
        xp: 90,
        gold: 80
    },

    {
        name: "Dunkler Ritter",
        emoji: "🛡️",
        health: 180,
        damage: 35,
        xp: 140,
        gold: 120
    },

    {
        name: "Magier",
        emoji: "🧙",
        health: 220,
        damage: 42,
        xp: 180,
        gold: 160
    },

    {
        name: "Drache",
        emoji: "🐉",
        health: 350,
        damage: 55,
        xp: 300,
        gold: 300
    },

    {
        name: "Dämon",
        emoji: "😈",
        health: 500,
        damage: 70,
        xp: 500,
        gold: 500
    }

];


// ============================================================
// KAMPFVARIABLE
// ============================================================

let currentMonster = null;
let monsterHealth = 0;


// ============================================================
// HILFSFUNKTIONEN
// ============================================================

function randomNumber(min, max) {

    return Math.floor(
        Math.random() * (max - min + 1)
    ) + min;

}


function screen(html) {

    document.getElementById("screen").innerHTML = html;

}


function message(text) {

    document.getElementById("message").textContent = text;

}


function updateUI() {

    document.getElementById("name").textContent =
        player.name;

    document.getElementById("level").textContent =
        player.level;

    document.getElementById("gold").textContent =
        player.gold;

    document.getElementById("health").textContent =
        player.health;

    document.getElementById("maxHealth").textContent =
        player.maxHealth;


    const neededXP =
        player.level * 100;

    document.getElementById("xp").textContent =
        player.xp;

    document.getElementById("xpNeeded").textContent =
        neededXP;


    const xpPercent =
        (player.xp / neededXP) * 100;

    document.getElementById("xpBar").style.width =
        Math.min(xpPercent, 100) + "%";


    const healthPercent =
        (player.health / player.maxHealth) * 100;

    document.getElementById("healthBar").style.width =
        Math.max(0, healthPercent) + "%";

}


// ============================================================
// XP
// ============================================================

function addXP(amount) {

    player.xp += amount;

    let leveledUp = false;

    while (
        player.xp >= player.level * 100
    ) {

        player.xp -= player.level * 100;

        player.level++;

        player.maxHealth += 20;

        player.health =
            player.maxHealth;

        leveledUp = true;

    }

    if (leveledUp) {

        message(
            "🎉 LEVEL UP! Du bist jetzt Level " +
            player.level + "!"
        );

    }

    updateUI();

}


// ============================================================
// SPIELSTART
// ============================================================

function startGame() {

    const name =
        prompt("👤 Wie heißt dein Held?");

    if (
        name !== null &&
        name.trim() !== ""
    ) {

        player.name =
            name.trim();

    }

    updateUI();

    mainMenu();

}


// ============================================================
// HAUPTMENÜ
// ============================================================

function mainMenu() {

    screen(`

        <h2>🏰 Hauptmenü</h2>

        <p>
            Willkommen,
            <strong>${player.name}</strong>!
        </p>

        <div class="card-grid">

            <div class="card">
                🗡️<br>
                <strong>${player.weapon.name}</strong><br>
                ⚔️ ${player.weapon.damage} Schaden
            </div>

            <div class="card">
                🛡️<br>
                <strong>${player.armor.name}</strong><br>
                ❤️ +${player.armor.bonusHealth} Leben
            </div>

            <div class="card">
                ⛏️<br>
                <strong>${player.pickaxe.name}</strong><br>
                💰 +${player.pickaxe.goldBonus} Gold
            </div>

        </div>

        <button onclick="showCharacter()">
            👤 Charakter
        </button>

        <button onclick="startFight()">
            ⚔️ Monster bekämpfen
        </button>

        <button onclick="mineGold()">
            ⛏️ Gold abbauen
        </button>

        <button onclick="openShop()">
            🏪 Waffen & Ausrüstung
        </button>

        <button
            class="danger-button"
            onclick="confirmExit()">

            🚪 Spiel beenden

        </button>

    `);

    message("");

    updateUI();

}


// ============================================================
// CHARAKTER
// ============================================================

function showCharacter() {

    screen(`

        <h2>👤 Charakter</h2>

        <div class="card-grid">

            <div class="card">
                👤<br>
                ${player.name}
            </div>

            <div class="card">
                ⭐<br>
                Level ${player.level}
            </div>

            <div class="card">
                💰<br>
                ${player.gold} Gold
            </div>

        </div>

        <div class="separator"></div>

        <h3>🗡️ Waffe</h3>

        <p>
            ${player.weapon.name}
            <br>
            ⚔️ ${player.weapon.damage} Schaden
        </p>

        <h3>🛡️ Rüstung</h3>

        <p>
            ${player.armor.name}
            <br>
            ❤️ +${player.armor.bonusHealth} Leben
        </p>

        <h3>⛏️ Spitzhacke</h3>

        <p>
            ${player.pickaxe.name}
            <br>
            💰 +${player.pickaxe.goldBonus} Gold pro Mine
        </p>

        <button onclick="mainMenu()">
            ⬅️ Zurück
        </button>

    `);

}


// ============================================================
// GOLD ABBAUEN
// ============================================================

function mineGold() {

    const baseGold =
        randomNumber(15, 35);

    const totalGold =
        baseGold +
        player.pickaxe.goldBonus;

    player.gold += totalGold;

    addXP(15);

    screen(`

        <h2>⛏️ Goldmine</h2>

        <div class="big">
            ⛏️
        </div>

        <h3>✨ Du hast Gold gefunden!</h3>

        <p>
            💰 Gefunden:
            <strong>+${baseGold} Gold</strong>
        </p>

        <p>
            ⛏️ Spitzhackenbonus:
            <strong>+${player.pickaxe.goldBonus} Gold</strong>
        </p>

        <p>
            💰 Insgesamt:
            <strong>+${totalGold} Gold</strong>
        </p>

        <p>
            ⭐ +15 XP
        </p>

        <button
            class="gold-button"
            onclick="mainMenu()">

            👉 Zurück zum Abenteuer

        </button>

    `);

    updateUI();

}


// ============================================================
// KAMPF STARTEN
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

    showFight();

}


// ============================================================
// KAMPF
// ============================================================

function showFight() {

    screen(`

        <h2>⚔️ Monsterkampf</h2>

        <div class="monster">

            <div class="monster-emoji">
                ${currentMonster.emoji}
            </div>

            <h2>
                ${currentMonster.name}
            </h2>

            <p class="monster-health">
                ❤️ ${monsterHealth}
                /
                ${currentMonster.health}
            </p>

        </div>

        <p>
            ❤️ Deine Leben:
            <strong>
                ${player.health}/${player.maxHealth}
            </strong>
        </p>

        <p>
            🗡️ Dein Schaden:
            <strong>
                ${player.weapon.damage}
            </strong>
        </p>

        <button
            class="danger-button"
            onclick="attack()">

            ⚔️ ANGREIFEN

        </button>

        <button onclick="escapeFight()">
            🏃 Fliehen
        </button>

        <button onclick="mainMenu()">
            🚪 Kampf verlassen
        </button>

    `);

}


// ============================================================
// ANGRIFF
// ============================================================

function attack() {

    let damage =
        player.weapon.damage;

    let critical = false;


    // 15% kritischer Treffer

    if (
        randomNumber(1, 100) <= 15
    ) {

        damage *= 2;

        critical = true;

    }


    monsterHealth -= damage;


    // ========================================================
    // MONSTER BESIEGT
    // ========================================================

    if (monsterHealth <= 0) {

        monsterHealth = 0;

        const reward =
            currentMonster.gold +
            player.pickaxe.goldBonus;

        player.gold += reward;

        addXP(currentMonster.xp);


        screen(`

            <h2>🏆 GEWONNEN!</h2>

            <div class="big">
                🏆
            </div>

            <h3>
                ${currentMonster.emoji}
                ${currentMonster.name}
                wurde besiegt!
            </h3>

            ${
                critical
                ?
                "<p>💥 <strong>KRITISCHER TREFFER!</strong></p>"
                :
                ""
            }

            <p>
                ⚔️ Schaden:
                <strong>${damage}</strong>
            </p>

            <p>
                💰 Belohnung:
                <strong>+${reward} Gold</strong>
            </p>

            <p>
                ⭐ Erfahrung:
                <strong>+${currentMonster.xp} XP</strong>
            </p>

            <button
                class="success-button"
                onclick="mainMenu()">

                👉 Weiter

            </button>

        `);

        updateUI();

        return;

    }


    // ========================================================
    // MONSTER GREIFT ZURÜCK AN
    // ========================================================

    const enemyDamage =
        randomNumber(
            Math.max(
                1,
                Math.floor(
                    currentMonster.damage * 0.7
                )
            ),
            currentMonster.damage
        );


    player.health -= enemyDamage;


    // Spieler besiegt

    if (player.health <= 0) {

        player.health = 0;

        playerDefeated();

        return;

    }


    if (critical) {

        message(
            "💥 KRITISCHER TREFFER! Du machst " +
            damage +
            " Schaden!"
        );

    } else {

        message(
            "⚔️ Du machst " +
            damage +
            " Schaden!"
        );

    }


    showFight();

    updateUI();

}


// ============================================================
// FLUCHT
// ============================================================

function escapeFight() {

    const chance =
        randomNumber(1, 100);


    if (chance <= 70) {

        screen(`

            <h2>🏃 Erfolgreiche Flucht!</h2>

            <div class="big">
                💨
            </div>

            <p>
                Du bist dem
                ${currentMonster.name}
                entkommen.
            </p>

            <button onclick="mainMenu()">
                👉 Weiter
            </button>

        `);

        return;

    }


    const damage =
        currentMonster.damage;

    player.health -= damage;


    if (player.health <= 0) {

        player.health = 0;

        playerDefeated();

        return;

    }


    screen(`

        <h2>❌ Flucht fehlgeschlagen!</h2>

        <div class="big">
            😱
        </div>

        <p>
            ${currentMonster.name}
            hat dich erwischt!
        </p>

        <p>
            💔 Du verlierst
            <strong>${damage} Leben</strong>.
        </p>

        <button onclick="showFight()">
            ⚔️ Weiterkämpfen
        </button>

    `);

    updateUI();

}


// ============================================================
// SPIELER BESIEGT
// ============================================================

function playerDefeated() {

    player.gold =
        Math.max(
            0,
            player.gold - 25
        );

    player.health =
        player.maxHealth;


    screen(`

        <h2>💀 Du wurdest besiegt!</h2>

        <div class="big">
            💀
        </div>

        <p>
            Der
            <strong>${currentMonster.name}</strong>
            war zu stark.
        </p>

        <p>
            💰 Du verlierst 25 Gold.
        </p>

        <p>
            ❤️ Du wurdest wiederbelebt.
        </p>

        <button onclick="mainMenu()">
            🏰 Zurück zum Hauptmenü
        </button>

    `);

    updateUI();

}


// ============================================================
// SHOP
// ============================================================

function openShop() {

    screen(`

        <h2>🏪 Shop</h2>

        <p>
            💰 Dein Gold:
            <strong>${player.gold}</strong>
        </p>

        <button onclick="showWeapons()">
            🗡️ Waffenshop
        </button>

        <button onclick="showArmors()">
            🛡️ Rüstungsshop
        </button>

        <button onclick="showPickaxes()">
            ⛏️ Spitzhacken-Shop
        </button>

        <button onclick="buyPotion()">
            🧪 Heiltrank – 25 Gold
        </button>

        <button onclick="mainMenu()">
            🚪 Shop verlassen
        </button>

    `);

}


// ============================================================
// WAFFENSHOP
// ============================================================

function showWeapons() {

    let html = `
        <h2>🗡️ Waffenshop</h2>

        <p>
            Kaufe ein stärkeres Schwert,
            um mehr Schaden zu machen.
        </p>
    `;


    weapons.forEach(
        (weapon, index) => {

            html += `

                <div class="shop-item">

                    <h3>
                        🗡️ ${weapon.name}
                    </h3>

                    <p>
                        ⚔️ Schaden:
                        <strong>
                            ${weapon.damage}
                        </strong>
                    </p>

                    <p>
                        💰 Preis:
                        <strong>
                            ${weapon.price}
                        </strong>
                    </p>

                    <button
                        onclick="buyWeapon(${index})">

                        💰 Kaufen

                    </button>

                </div>

            `;

        }
    );


    html += `

        <button onclick="openShop()">
            ⬅️ Zurück zum Shop
        </button>

    `;


    screen(html);

}


// ============================================================
// WAFFE KAUFEN
// ============================================================

function buyWeapon(index) {

    const weapon =
        weapons[index];


    if (
        weapon.damage <=
        player.weapon.damage
    ) {

        message(
            "❌ Deine aktuelle Waffe ist bereits stärker!"
        );

        return;

    }


    if (
        player.gold <
        weapon.price
    ) {

        message(
            "❌ Nicht genug Gold!"
        );

        return;

    }


    player.gold -=
        weapon.price;

    player.weapon =
        weapon;


    message(
        "✅ " +
        weapon.name +
        " gekauft!"
    );


    updateUI();

}


// ============================================================
// RÜSTUNGSSHOP
// ============================================================

function showArmors() {

    let html = `
        <h2>🛡️ Rüstungsshop</h2>

        <p>
            Bessere Rüstung =
            mehr maximale Leben.
        </p>
    `;


    armors.forEach(
        (armor, index) => {

            html += `

                <div class="shop-item">

                    <h3>
                        🛡️ ${armor.name}
                    </h3>

                    <p>
                        ❤️ +${armor.bonusHealth}
                        maximale Leben
                    </p>

                    <p>
                        💰 Preis:
                        <strong>
                            ${armor.price}
                        </strong>
                    </p>

                    <button
                        onclick="buyArmor(${index})">

                        💰 Kaufen

                    </button>

                </div>

            `;

        }
    );


    html += `

        <button onclick="openShop()">
            ⬅️ Zurück zum Shop
        </button>

    `;


    screen(html);

}


// ============================================================
// RÜSTUNG KAUFEN
// ============================================================

function buyArmor(index) {

    const armor =
        armors[index];


    if (
        armor.bonusHealth <=
        player.armor.bonusHealth
    ) {

        message(
            "❌ Deine aktuelle Rüstung ist bereits besser!"
        );

        return;

    }


    if (
        player.gold <
        armor.price
    ) {

        message(
            "❌ Nicht genug Gold!"
        );

        return;

    }


    player.gold -=
        armor.price;


    player.maxHealth -=
        player.armor.bonusHealth;


    player.armor =
        armor;


    player.maxHealth +=
        armor.bonusHealth;


    player.health =
        player.maxHealth;


    message(
        "✅ " +
        armor.name +
        " gekauft! ❤️"
    );


    updateUI();

}


// ============================================================
// SPITZHACKEN-SHOP
// ============================================================

function showPickaxes() {

    let html = `
        <h2>⛏️ Spitzhacken-Shop</h2>

        <p>
            Eine bessere Spitzhacke
            bringt dir mehr Gold beim Abbauen.
        </p>
    `;


    pickaxes.forEach(
        (pickaxe, index) => {

            html += `

                <div class="shop-item">

                    <h3>
                        ⛏️ ${pickaxe.name}
                    </h3>

                    <p>
                        💰 Bonus:
                        <strong>
                            +${pickaxe.goldBonus}
                        </strong>
                        Gold
                    </p>

                    <p>
                        💰 Preis:
                        <strong>
                            ${pickaxe.price}
                        </strong>
                    </p>

                    <button
                        onclick="buyPickaxe(${index})">

                        💰 Kaufen

                    </button>

                </div>

            `;

        }
    );


    html += `

        <button onclick="openShop()">
            ⬅️ Zurück zum Shop
        </button>

    `;


    screen(html);

}


// ============================================================
// SPITZHACKE KAUFEN
// ============================================================

function buyPickaxe(index) {

    const pickaxe =
        pickaxes[index];


    if (
        pickaxe.goldBonus <=
        player.pickaxe.goldBonus
    ) {

        message(
            "❌ Deine aktuelle Spitzhacke ist bereits besser!"
        );

        return;

    }


    if (
        player.gold <
        pickaxe.price
    ) {

        message(
            "❌ Nicht genug Gold!"
        );

        return;

    }


    player.gold -=
        pickaxe.price;

    player.pickaxe =
        pickaxe;


    message(
        "✅ " +
        pickaxe.name +
        " gekauft!"
    );


    updateUI();

}


// ============================================================
// HEILTRANK
// ============================================================

function buyPotion() {

    if (
        player.gold < 25
    ) {

        message(
            "❌ Nicht genug Gold!"
        );

        return;

    }


    if (
        player.health >=
        player.maxHealth
    ) {

        message(
            "❤️ Deine Leben sind bereits voll!"
        );

        return;

    }


    player.gold -= 25;


    player.health =
        Math.min(
            player.maxHealth,
            player.health + 50
        );


    message(
        "🧪 Heiltrank benutzt! +50 Leben."
    );


    updateUI();

}


// ============================================================
// SPIEL BEENDEN
// ============================================================

function confirmExit() {

    const answer =
        confirm(
            "Möchtest du das Abenteuer wirklich beenden?"
        );


    if (answer) {

        screen(`

            <h2>👋 Abenteuer beendet</h2>

            <div class="big">
                🏆
            </div>

            <p>
                Danke fürs Spielen,
                <strong>${player.name}</strong>!
            </p>

            <p>
                ⭐ Level:
                ${player.level}
            </p>

            <p>
                💰 Gold:
                ${player.gold}
            </p>

            <button onclick="location.reload()">
                🔄 Neues Spiel
            </button>

        `);

    }

}


// ============================================================
// STARTBILDSCHIRM
// ============================================================

screen(`

    <h2>⚔️ Willkommen bei Code Quest!</h2>

    <div class="big">
        🧙‍♂️
    </div>

    <p>
        Kämpfe gegen Monster, sammle Gold
        und kaufe immer bessere Ausrüstung.
    </p>

    <div class="card-grid">

        <div class="card">
            ⚔️<br>
            Kämpfe
        </div>

        <div class="card">
            🏪<br>
            Shop
        </div>

        <div class="card">
            ⛏️<br>
            Gold abbauen
        </div>

    </div>

    <button
        class="success-button"
        onclick="startGame()">

        🚀 Abenteuer starten

    </button>

`);


// ============================================================
// UI ZUM ERSTEN MAL AKTUALISIEREN
// ============================================================

updateUI();
