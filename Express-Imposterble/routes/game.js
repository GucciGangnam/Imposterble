var express = require('express');
var router = express.Router();
// UUID
const { v4: uuidv4 } = require('uuid');
// EXPRESS Validatror 
const { body, validationResult } = require('express-validator');
// Async andler 
const asyncHandler = require('express-async-handler');
// IMPORT GAMES ARRAY 
const { games } = require('../sockets/socket'); // Adjust the path as needed


// Function to generate a unique 6-digit lobby code
const generateUniqueLobbyCode = () => {
    let lobbyCode;
    let isUnique = false;
    // Keep generating until we find a unique code
    while (!isUnique) {
        // Generate a random 6-digit number as a string
        lobbyCode = Math.floor(100000 + Math.random() * 900000).toString();
        // Check if this lobby code already exists in the games array
        isUnique = !games.some(game => game.LOBBY_CODE === lobbyCode);
    }
    return lobbyCode;
};

router.post('/create',
    [
        body('name')
            .trim()
            .isLength({ max: 10 }).withMessage('Name must be no more than 10 characters long')
            .matches(/^[A-Za-z]+$/).withMessage('Name must contain only alphabetic characters')
            .customSanitizer(value =>
                value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
            )
    ],

    asyncHandler(async (req, res) => {
        try {
            // Validation
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const errorMessages = errors.array().map(error => error.msg).join(', ');
                throw new Error('Validation failed: ' + errorMessages);
            }
            // Create host player object
            const hostID = uuidv4();
            const host = {
                name: req.body.name,
                id: hostID,
                color: null
            };
            // Create game object
            const gameID = uuidv4();
            const lobbyCode = generateUniqueLobbyCode();
            const newGame = {
                id: gameID, // Use 'id' for consistency (optional)
                lobbyCode,
                hostId: hostID, // Use 'hostId' for consistency (optional)
                players: [host],
                settings: {
                    rounds: 5,
                    roundTimer: null,
                    eliminationMode: false
                },
                createdAt: new Date(),
                state: {
                    gameState: "Lobby",
                    currentRound: 0,
                    currentCategory: null,
                    currentSecret: null,
                    currentImposter: null,
                    roundVotes: {},
                    totalScores: {}
                }
            };
            // Add the new game to the games array (consider using a database or persistent storage)
            games.push(newGame);
            res.json({
                message: 'Game created successfully',
                playerID: hostID,
                lobbyCode: newGame.lobbyCode
            });
        } catch (error) {
            console.error(error); // Log the error for debugging
            res.status(error.statusCode || 500).json({ message: error.message });
        }
    })
);


router.post('/join',
    [
        body('name')
            .trim()
            .isLength({ max: 10 }).withMessage('Name must be no more than 10 characters long')
            .matches(/^[A-Za-z]+$/).withMessage('Name must contain only alphabetic characters')
            .customSanitizer(value =>
                value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
            ),
        body('lobbyCode')
            .isArray({ min: 6, max: 6 }).withMessage('Lobby code must be an array of 6 digits')
            .customSanitizer(lobbyCodeArray => {
                // Join the array elements into a string
                return lobbyCodeArray.join('');
            }).withMessage('Lobby code must be a valid string of digits'),
    ],
    asyncHandler(async (req, res) => {
        try {
            // Validation
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const errorMessages = errors.array().map(error => error.msg).join(', ');
                throw new Error('Validation failed: ' + errorMessages);
            }

            // Create new player object 
            const playerID = uuidv4();
            const newPlayer = {
                name: req.body.name,
                id: playerID,
                color: null
            };
            // Get teh game object with teh lobby code === req.body.lobbyCode
            const game = games.find(game => game.lobbyCode === req.body.lobbyCode);
            // Check if the game exists
            if (!game) {
                throw new Error('Game not found.');
            }
            // Add the new player to the game's players array
            game.players.push(newPlayer);
            res.json({
                message: 'Game joined successfully',
                playerID: playerID,
                lobbyCode: game.lobbyCode
            });

        } catch (error) {
            console.error(error); // Log the error for debugging
            res.status(error.statusCode || 500).json({ message: error.message });
        }
    })
)

module.exports = router;
