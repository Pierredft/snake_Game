// L'ensemble des const vont permettre de récupérer les éléments HTML de la page
// La const canvas récupère l'élément HTML avec l'id gameCanvas
const canvas = document.getElementById('gameCanvas');
// La const ctx récupère le contexte 2D du canvas
const ctx = canvas.getContext('2d');
// La const scoreForm récupère l'élément HTML avec l'id scoreForm
const scoreForm = document.getElementById('scoreForm');
// La const playerNameInput récupère l'élément HTML avec l'id playerName
const playerNameInput = document.getElementById('playerName');
// La const saveScoreButton récupère l'élément HTML avec l'id saveScore
const saveScoreButton = document.getElementById('saveScore');
// La const viewScoresButton récupère l'élément HTML avec l'id viewScores
const viewScoresButton = document.getElementById('viewScores');
// La const restartGameButton récupère l'élément HTML avec l'id restartGame
const restartGameButton = document.getElementById('restartGame');
// La const scoreDisplay récupère l'élément HTML avec l'id scoreDisplay
const scoreDisplay = document.getElementById('scoreDisplay');
// La const highScoreDisplay récupère l'élément HTML avec l'id highScoreDisplay
const highScoreDisplay = document.getElementById('highScoreDisplay');

// Les variables snake, direction, food et score sont déclarées et seront utilisées dans le jeu
let snake, direction, food, score, gameInterval;

// La fonction initGame permet d'initialiser le jeu
function initGame() {
    snake = [{ x: 200, y: 200 }]; // Le serpent est initialisé avec une seule case
    direction = { x: 20, y: 0 }; // La direction du serpent est initialisée vers la droite
    food = { x: 100, y: 100 }; // La nourriture est initialisée à la position (100, 100)
    score = 0; // Le score est initialisé à 0
    scoreDisplay.textContent = `Score: ${score}`; // Le score est affiché dans le HTML
    scoreForm.style.display = 'none'; // Le formulaire de score est caché
    gameInterval = setInterval(gameLoop, 100); // La boucle de jeu est lancée toutes les 100ms
}

// La fonction drawSnake permet de dessiner le serpent et la nourriture
function drawSnake() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // On efface le canvas
    snake.forEach(segment => { // Pour chaque segment du serpent
        ctx.fillStyle = 'green'; // On définit la couleur verte
        ctx.fillRect(segment.x, segment.y, 20, 20); // On dessine un carré de 20x20px
    });
    ctx.fillStyle = 'red'; // On définit la couleur rouge
    ctx.fillRect(food.x, food.y, 20, 20); // On dessine la nourriture
}

// La fonction moveSnake permet de déplacer le serpent
function moveSnake() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y }; // La tête du serpent est déplacée
    snake.unshift(head); // La tête est ajoutée au serpent
    if (head.x === food.x && head.y === food.y) { // Si la tête du serpent est sur la nourriture
         score += 10; // Le score est augmenté de 10 points à chaque fois que le serpent mange
        scoreDisplay.textContent = `Score: ${score}`; // Le score est affiché dans le HTML
        food = { // La nourriture est déplacée à une nouvelle position aléatoire
            x: Math.floor(Math.random() * 20) * 20, // La position x est un multiple de 20
            y: Math.floor(Math.random() * 20) * 20 // La position y est un multiple de 20
        };
    } else {
        snake.pop(); // Si le serpent n'a pas mangé, la queue
    }
}

// La fonction checkCollision permet de vérifier s'il y a une collision
function checkCollision() {
    const head = snake[0]; // La tête du serpent est récupérée
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) { // Si la tête du serpent sort du canvas
        return true; // Il y a une collision
    }
    for (let i = 1; i < snake.length; i++) { // Pour chaque segment du serpent
        if (head.x === snake[i].x && head.y === snake[i].y) { // Si la tête du serpent est sur un segment du serpent
            return true; // Il y a une collision
        }
    }
    return false; // S'il n'y a pas de collision
}

// La fonction gameLoop permet de boucler le jeu
function gameLoop() {
    moveSnake(); // On déplace le serpent
    if (checkCollision()) { // On vérifie s'il y a une collision
        clearInterval(gameInterval); // On arrête la boucle de jeu
        scoreForm.style.display = 'flex'; // On affiche le formulaire de score
        return;
    }
    drawSnake(); // On dessine le serpent
}

// La fonction fetchHighScore permet de récupérer le meilleur score
document.addEventListener('keydown', event => { // Lorsqu'une touche est pressée
    switch (event.key) { // On vérifie quelle touche a été pressée
        case 'ArrowUp': // Si c'est la touche du haut
        // On vérifie si la direction du serpent est différente de 0 et y est égal à -20
            if (direction.y === 0) direction = { x: 0, y: -20 }; // On change la direction du serpent
            break; // On sort de la condition
        case 'ArrowDown': // Si c'est la touche du bas
        // On vérifie si la direction du serpent est différente de 0 et y est égal à 20
            if (direction.y === 0) direction = { x: 0, y: 20 }; // On change la direction du serpent
            break; // On sort de la condition
        case 'ArrowLeft': // Si c'est la touche de gauche
        // On vérifie si la direction du serpent est différente de 0 et x est égal à -20
            if (direction.x === 0) direction = { x: -20, y: 0 }; // On change la direction du serpent
            break; // On sort de la condition
        case 'ArrowRight': // Si c'est la touche de droite
        // On vérifie si la direction du serpent est différente de 0 et x est égal à 20
            if (direction.x === 0) direction = { x: 20, y: 0 }; // On change la direction du serpent
            break; // On sort de la condition
    }
});










// Lorsque le bouton saveScore est cliqué
saveScoreButton.addEventListener('click', () => {
    const playerName = playerNameInput.value; // On récupère le nom du joueur
    fetch('save_score.php', { // On envoie une requête POST à save_score.php
        method: 'POST', // La méthode de la requête est POST
        headers: { 'Content-Type': 'application/json' }, // Le type de contenu est JSON
        body: JSON.stringify({ name: playerName, score: score }) // On envoie le nom du joueur et le score
    }).then(response => response.json()).then(data => { // On récupère la réponse de la requête
        // On affiche un message en fonction de la réponse
        if (data.success) { // Si la réponse est un succès
            alert('Score enregistré avec succès!'); // On affiche un message de succès
            fetchHighScore(); // On récupère le meilleur score
        } else { // Si la réponse est un échec
            alert('Échec de l\'enregistrement du score. Erreur: ' + data.error); // On affiche un message d'erreur
        }
    // On affiche un message d'erreur s'il y a une erreur
    }).catch(error => { // Si une erreur se produit
        console.error('Erreur:', error); // On affiche l'erreur dans la console
    });
});


// Lorsque le bouton viewScores est cliqué
viewScoresButton.addEventListener('click', () => { 
    fetch('view_scores.php') // On envoie une requête GET à view_scores.php
        .then(response => response.json()) // On récupère la réponse de la requête
        .then(data => { // On récupère les données de la réponse
            let scores = '<h1>Meilleurs scores</h1><ul>'; // On initialise la liste des scores
            data.forEach(score => { // Pour chaque score
                scores += `<li>${score.name}: ${score.score}</li>`; // On ajoute le score à la liste
            });
            scores += '</ul>'; // On ferme la liste
            const newWindow = window.open('', 'Scores', 'width=400,height=400'); // On ouvre une nouvelle fenêtre
            newWindow.document.write(scores); // On affiche les scores dans la nouvelle fenêtre
        });
});

// Lorsque le bouton restartGame est cliqué
restartGameButton.addEventListener('click', () => {
    initGame(); // On réinitialise le jeu
});

// Lorsque le formulaire de score est soumis
function fetchHighScore() { // On récupère le meilleur score
    fetch('get_high_score.php') // On envoie une requête GET à get_high_score.php
        .then(response => response.json()) // On récupère la réponse de la requête
        .then(data => { // On récupère les données de la réponse
            highScoreDisplay.textContent = `Meilleur score: ${data.highScore} par ${data.highScoreName}`; // On affiche le meilleur score
        });
}

fetchHighScore(); // On récupère le meilleur score
initGame(); // On initialise le jeu