<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/snake.css">
    <title>Jeu du Snake</title>
</head>
<body>
    <div id="highScoreDisplay">Meilleur score: 0 par </div>
    <div id="scoreDisplay">Score: 0</div>
    <!-- Canvas permet  de dessiner des graphiques, des animations, des jeux, etc. sur la page Web à l'aide de JavaScript. -->
    <canvas id="gameCanvas" class="canvasSize" width="1000" height="400"></canvas>
    <div id="scoreForm">
        <input type="text" id="playerName" placeholder="Entrez votre nom">
        <button id="saveScore">Enregistrer le score</button>
        <button id="viewScores">Voir les scores</button>
        <button id="restartGame">Recommencer</button>
    </div>
    <script src="js/snake.js"></script>
</body>
</html>