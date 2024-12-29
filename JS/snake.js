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