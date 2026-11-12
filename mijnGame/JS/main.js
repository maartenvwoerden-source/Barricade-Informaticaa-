//We beginnen met een prototype we maken het hele game in main.js als dat lukt breiden we langzaam uit naar meer scrips

// ==========================================
// 1. CONFIGURATIE & SPELINSTELLINGEN (INVULLEN)
// ==========================================
const CONFIG = {
    COLS: 11,               // Breedte van het bord (Blockade standaard = 11)
    ROWS: 14,               // Hoogte van het bord (Blockade standaard = 14)
    TILE_SIZE: 40,          // Grootte van één vakje in pixels
    MAX_WALLS_H: 9,         // Aantal horizontale muren per speler
    MAX_WALLS_V: 9,         // Aantal verticale muren per speler
    MAX_BOMBS: 1            // Aantal bommen per speler
};

// ==========================================
// 2. SPELSTATUS (GAME STATE)
// ==========================================
const gameState = {
    currentPlayer: 1,       // 1 = Speler 1 (Rood), 2 = Speler 2 (Blauw)
    turnPhase: 'SETUP',     // Fases: 'SETUP', 'TURN_SWITCH', 'MOVE', 'PLACE_WALL', 'GAME_OVER'
    selectedPawn: null,     // Welke pion de speler nu heeft aangeklikt
    
    // Het bord: 2D array voor vakjes (bevat pionnen of null)
    board: [],              
    
    // Muren: Sla op waar muren staan (bijv. { x, y, orientation: 'H' | 'V', owner: 1 | 2 })
    walls: [],              

    // Voorraad en pionnen per speler
    players: {
        1: {
            name: "Speler 1",
            wallsH: CONFIG.MAX_WALLS_H,
            wallsV: CONFIG.MAX_WALLS_V,
            bombs: CONFIG.MAX_BOMBS,
            pawns: [
                // Vul hier jouw Stratego-rangen en startposities in
                { id: 'p1_1', x: 3, y: 0, rank: 'LOPER', isRevealed: false },
                { id: 'p1_2', x: 7, y: 0, rank: 'MINEUR', isRevealed: false }
            ],
            targetGoals: [{ x: 3, y: 13 }, { x: 7, y: 13 }] // Doelvakken aan de overkant
        },
        2: {
            name: "Speler 2",
            wallsH: CONFIG.MAX_WALLS_H,
            wallsV: CONFIG.MAX_WALLS_V,
            bombs: CONFIG.MAX_BOMBS,
            pawns: [
                { id: 'p2_1', x: 3, y: 13, rank: 'LOPER', isRevealed: false },
                { id: 'p2_2', x: 7, y: 13, rank: 'MINEUR', isRevealed: false }
            ],
            targetGoals: [{ x: 3, y: 0 }, { x: 7, y: 0 }]
        }
    }
};

// ==========================================
// 3. INITIALISATIE (OPSTARTEN)
// ==========================================
function initGame() {
    // Maak een leeg 2D-raster aan
    gameState.board = Array.from({ length: CONFIG.ROWS }, () => Array(CONFIG.COLS).fill(null));
    
    // [JOUW CODE HIER]: Zet de startpionnen van Speler 1 en 2 op gameState.board
    
    // [JOUW CODE HIER]: Koppel muis- en toetsenbord-events (bijv. canvas.addEventListener)
    
    gameState.turnPhase = 'MOVE';
    render();
}

// ==========================================
// 4. BEURT- EN FASELOGICA (1-PC MULTIPLAYER)
// ==========================================
function switchTurn() {
    // Wissel van speler (1 -> 2, of 2 -> 1)
    gameState.currentPlayer = gameState.currentPlayer === 1 ? 2 : 1;
    gameState.selectedPawn = null;
    
    // Zet de fase op 'TURN_SWITCH' zodat de andere speler even wegkijkt (Stratego-element)
    gameState.turnPhase = 'TURN_SWITCH';
    
    // [JOUW CODE HIER]: Toon een "Geef de beurt aan Speler X" knop op het scherm
    render();
}

function startNextPlayerTurn() {
    // Wordt aangeroepen als de speler op "Ik ben klaar" klikt
    gameState.turnPhase = 'MOVE';
    render();
}

// ==========================================
// 5. ACTIES VAN DE SPELER (INVULLEN)
// ==========================================

// Stap A: Pion verplaatsen
function movePawn(pawn, targetX, targetY) {
    if (gameState.turnPhase !== 'MOVE') return;

    if (isValidMove(pawn, targetX, targetY)) {
        // [JOUW CODE HIER]: Controleer of er een vijandelijke pion staat (Stratego gevecht!)
        
        // [JOUW CODE HIER]: Update de x en y van de pion op het bord
        
        // Check of deze speler nu gewonnen heeft
        if (checkWinCondition(gameState.currentPlayer)) {
            gameState.turnPhase = 'GAME_OVER';
            render();
            return;
        }

        // Ga door naar de volgende fase: een muur plaatsen
        gameState.turnPhase = 'PLACE_WALL';
        render();
    }
}

// Stap B: Muur plaatsen
function placeWall(x, y, orientation) {
    if (gameState.turnPhase !== 'PLACE_WALL') return;

    const player = gameState.players[gameState.currentPlayer];
    
    // Controleer of de speler nog muren over heeft
    if (orientation === 'H' && player.wallsH <= 0) return;
    if (orientation === 'V' && player.wallsV <= 0) return;

    // Controleer of de muur hier mag staan én niemand opsluit
    if (isValidWallPlacement(x, y, orientation)) {
        // [JOUW CODE HIER]: Voeg de muur toe aan gameState.walls
        
        // [JOUW CODE HIER]: Trek 1 muur af van player.wallsH of player.wallsV
        
        // Beurt is voorbij, wissel naar de andere speler
        switchTurn();
    }
}

// Optionele Actie: Bom gebruiken
function useBomb(wallIndex) {
    const player = gameState.players[gameState.currentPlayer];
    if (player.bombs <= 0) return;

    // [JOUW CODE HIER]: Verwijder de muur uit gameState.walls en zet player.bombs op 0
    render();
}

// ==========================================
// 6. SPELREGELS & CONTROLES (DE KERNLOGICA)
// ==========================================

function isValidMove(pawn, targetX, targetY) {
    // [JOUW CODE HIER]: 
    // 1. Ligt targetX/targetY binnen het bord?
    // 2. Is de afstand geldig (bijv. 1 of 2 vakjes)?
    // 3. Staat er geen muur in de weg in gameState.walls?
    return true; // Tijdelijk
}

function isValidWallPlacement(x, y, orientation) {
    // [JOUW CODE HIER]:
    // 1. Overlapt deze muur niet met een bestaande muur?
    // 2. CRUCIAL (Blockade regel): Roep hasPathToGoal() aan voor ALLE pionnen.
    //    Als één pion zijn doel niet meer kan bereiken, return false!
    return true; // Tijdelijk
}

function hasPathToGoal(pawn, targetGoals) {
    // [JOUW CODE HIER]: 
    // Bouw hier een Breadth-First Search (BFS) of A* algoritme.
    // Deze functie geeft 'true' terug als de pion nog naar de overkant kan lopen.
    return true; // Tijdelijk
}

function resolveCombat(attacker, defender) {
    // [JOUW CODE HIER - STRATEGO ELEMENT]:
    // Vergelijk attacker.rank met defender.rank.
    // Zet beide op isRevealed = true en verwijder de verliezer van het bord.
}

function checkWinCondition(playerNumber) {
    // [JOUW CODE HIER]: 
    // Check of alle pionnen van playerNumber op de targetGoals staan.
    return false;
}

// ==========================================
// 7. VISUALISATIE (TEKENEN OP HET SCHERM)
// ==========================================
function render() {
    // [JOUW CODE HIER]: 
    // Maak het canvas/HTML-scherm leeg en teken alles opnieuw op basis van gameState:
    // 1. Als gameState.turnPhase === 'TURN_SWITCH', teken dan een afdekscherm!
    // 2. Teken het raster (11x14).
    // 3. Teken alle muren uit gameState.walls.
    // 4. Teken de pionnen (toon de rang ALLEEN als pawn.owner === gameState.currentPlayer OF pawn.isRevealed === true).
    // 5. Update de UI (wiens beurt het is, hoeveel muren over zijn).
}

// Start het spel
initGame();
