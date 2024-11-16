const games = []; // This object will hold your game state, keyed by room ID
const categories = [
    {
        name: "Famous People",
        words: [
            "Albert Einstein",
            "Oprah Winfrey",
            "Leonardo da Vinci",
            "Elon Musk",
            "Nelson Mandela",
            "Taylor Swift",
            "Michael Jordan",
            "Beyoncé",
            "William Shakespeare",
            "Mahatma Gandhi",
            "Walt Disney",
            "Barack Obama",
            "Steve Jobs",
            "Marilyn Monroe",
            "Muhammad Ali",
            "Princess Diana",
            "Abraham Lincoln",
            "Pablo Picasso",
            "J.K. Rowling",
            "Vincent van Gogh",
            "Audrey Hepburn",
            "David Bowie",
            "Frank Sinatra",
            "Freddie Mercury",
            "John Lennon",
            "Leonardo DiCaprio",
            "Queen Elizabeth II",
            "Coco Chanel",
            "Socrates",
            "Thomas Edison",
            "Maya Angelou",
            "Bill Gates",
            "Charlie Chaplin",
            "Michael Jackson",
            "Elvis Presley",
            "Madonna",
            "Bruce Lee",
            "Friedrich Nietzsche",
            "Isaac Newton",
            "Ariana Grande",
            "Jackie Chan",
            "Neil Armstrong",
            "Stephen Hawking",
            "Rosa Parks"
        ]
    },
    {
        name: "Animals",
        words: [
            "dog",
            "cat",
            "elephant",
            "lion",
            "tiger",
            "giraffe",
            "penguin",
            "dolphin",
            "kangaroo",
            "bear",
            "zebra",
            "horse",
            "monkey",
            "koala",
            "panda",
            "wolf",
            "shark",
            "rabbit",
            "cheetah",
            "whale",
            "crocodile",
            "rhino",
            "hippopotamus",
            "fox",
            "deer",
            "eagle",
            "owl",
            "bison",
            "alligator",
            "elephant seal"
        ]
    },
    {
        name: "Countries",
        words: [
            "USA",
            "France",
            "Brazil",
            "Japan",
            "India",
            "Germany",
            "Australia",
            "Canada",
            "Italy",
            "Mexico",
            "China",
            "Russia",
            "United Kingdom",
            "South Korea",
            "Spain",
            "South Africa",
            "Argentina",
            "Egypt",
            "Sweden",
            "Saudi Arabia",
            "Turkey",
            "Switzerland",
            "Netherlands",
            "Norway",
            "Nigeria",
            "Israel",
            "New Zealand",
            "Greece",
            "Belgium",
            "Poland",
            "Portugal",
            "Vietnam",
            "Chile",
            "Thailand",
            "Malaysia",
            "Finland",
            "Colombia",
            "Ireland",
            "Denmark",
            "Peru"
        ]
    },
    {
        name: "Brands",
        words: [
            "Nike",
            "Coca-Cola",
            "Apple",
            "Samsung",
            "McDonald's",
            "Toyota",
            "Microsoft",
            "Google",
            "Amazon",
            "Adidas",
            "Sony",
            "Pepsi",
            "BMW",
            "Facebook",
            "Louis Vuitton",
            "Intel",
            "Disney",
            "Honda",
            "Starbucks",
            "Uber",
            "L'Oreal",
            "Puma",
            "Netflix",
            "Huawei",
            "KFC",
            "H&M",
            "Unilever",
            "Rolex",
            "IKEA",
            "Ford",
            "Ralph Lauren",
            "Shell",
            "Chanel",
            "Harley-Davidson",
            "Visa",
            "Cartier",
            "Gucci",
            "Nestlé",
            "T-Mobile"
        ]
    },
    {
        name: "Questions",
        words: [
            "Who would you kiss?",
            "Something you're scared of",
            "Something you do every day",
            "A place you want to visit",
            "Something you always have in your bag",
            "A hobby you enjoy",
            "Something that makes you happy",
            "A type of food you could eat every day",
            "A person you admire",
            "A place that makes you feel at peace",
            "Something you can't live without",
            "An activity you do to relax",
            "Something you are really good at",
            "A song that always makes you smile",
            "A memory that makes you laugh",
            "Something you’d bring to a desert island",
            "A skill you want to learn",
            "Something that always cheers you up",
            "A sport you like to play or watch",
            "Something you would like to change about the world",
            "A word that describes you",
            "A habit you have that’s hard to break"
        ]
    },
    {
        name: "General",
        words: [
            "book",
            "phone",
            "car",
            "house",
            "mountain",
            "tree",
            "ocean",
            "computer",
            "pen",
            "shirt",
            "clock",
            "window",
            "road",
            "music",
            "city",
            "food",
            "light",
            "airplane",
            "water",
            "chair",
            "table",
            "shoe",
            "bicycle",
            "train",
            "television",
            "guitar",
            "pencil",
            "camera",
            "bag",
            "ball",
            "moon",
            "sun",
            "cloud",
            "star",
            "flower",
            "sand",
            "snow",
            "coffee",
            "salt",
            "key",
            "paint",
            "rain",
            "fire",
            "paper",
            "knife",
            "watch"
        ]
    },
    {
        name: "Movies",
        words: [
            "The Shawshank Redemption", "The Godfather", "The Dark Knight", "Forrest Gump", "Inception",
            "Titanic", "The Matrix", "The Lord of the Rings: The Fellowship of the Ring", "Gladiator", "Avatar",
            "Star Wars: A New Hope", "The Lion King", "Jurassic Park", "Pulp Fiction", "The Avengers",
            "The Silence of the Lambs", "Schindler's List", "Fight Club", "The Departed", "The Green Mile",
            "The Prestige", "Star Wars: The Empire Strikes Back", "Back to the Future", "Goodfellas", "Saving Private Ryan",
            "Interstellar", "The Terminator", "The Godfather: Part II", "Shutter Island", "The Exorcist",
            "The Social Network", "Jaws", "The Dark Knight Rises", "The Matrix Reloaded", "Deadpool",
            "The Revenant", "The Intouchables", "Catch Me If You Can", "Guardians of the Galaxy", "The Wolf of Wall Street",
            "The Big Lebowski", "A Clockwork Orange", "The Princess Bride", "Gone with the Wind", "12 Angry Men"
        ]
    },
    {
        name: "Music",
        words: [
            "Guitar", "Piano", "Drums", "Violin", "Trumpet",
            "Saxophone", "Flute", "Bass", "Microphone", "Amplifier",
            "Jazz", "Rock", "Pop", "Classical", "Blues",
            "Hip-Hop", "Reggae", "Electronic", "Folk", "Country",
            "Chords", "Melody", "Harmony", "Rhythm", "Tempo",
            "Scale", "Key", "Pitch", "Tuning", "Band",
            "Singer", "Songwriter", "Composer", "Album", "Track",
            "Studio", "Concert", "Performance", "Tour", "Festival",
            "Grammy", "Music Video", "Lyrics", "Soundtrack"
        ]
    },
    {
        name: "Pop Culture",
        words: [
            "Meme", "Influencer", "Hashtag", "Viral", "TikTok",
            "Selfie", "Podcast", "Binge-watching", "Reality TV", "Netflix",
            "Superhero", "Marvel", "Star Wars", "Fandom", "Cosplay",
            "Celebrity", "Fashion", "Instagram", "YouTuber", "Vlogger",
            "Streaming", "Emoji", "GIF", "TikTok Dance", "Flashback",
            "Trend", "Challenge", "Unboxing", "NFT", "Viral Video",
            "Comic-Con", "Remake", "Reboot", "Pop Star", "Icon",
            "Award Show", "Oscars", "Grammy", "Guilty Pleasure", "Throwback",
            "Clout", "Reality Star", "Super Bowl"
        ]
    }
];


const oneHourAgo = Date.now() - 60 * 60 * 1000; // 1 hour in milliseconds

// Filter out games that were created more than 1 hour ago
games.filter(game => game.createdAt > oneHourAgo);
console.log(games)


const socketIo = require('socket.io');

let io;

const initSocket = (server) => {
    // DEFINE CORS OPTIONS ///////////////////////////////////////////////////////////////////
    const corsOptions = {
        origin: [process.env.FRONTEND_URL],
        methods: ['GET', 'POST'],
        credentials: true
    };

    // INITIALISE SOCKET WITH CORS ///////////////////////////////////////////////////////////////////
    io = socketIo(server, {
        cors: corsOptions
    });

    // CONNECT TO SOCKET ///////////////////////////////////////////////////////////////////
    io.on('connection', (socket) => {
        console.log('A user connected');


        // ON ENTER LOBBY  ///////////////////////////////////////////////////////////////////
        socket.on('enterLobby', ({ lobbycode, storedPlayerID }) => {
            // find game where game.lobbyCode === lobbycode
            const game = games.find(game => game.lobbyCode === lobbycode);
            // Check if the game exists and if the playerID is valid
            if (game) {
                if (game.state.gameState !== "Lobby") {
                    // Emit an error message to the client
                    socket.emit('error', { message: "Game already in progress" });
                    return;
                }
                if (game.players.some(player => player.id === storedPlayerID)) {
                    // Player is valid; join the room
                    socket.join(lobbycode);
                    console.log(`Player ${storedPlayerID} joined room ${lobbycode}`);
                    // Notify all players in the room (including the new player) of the updated player list
                    // Desiged a color to that player 
                    const colors = ['#b8c6ff', '#eccaad', '#dadada', '#f8e59b', '#cce0b5', '#d49ca2', '#d9b5e4', '#bae1e6']
                    // Find that player ID 
                    // Collect colors that are already assigned to players
                    const assignedColors = game.players.map(player => player.color).filter(color => color);
                    // Find an available color that hasn't been assigned yet
                    const availableColor = colors.find(color => !assignedColors.includes(color));
                    // Assign the color to the player with the matching storedPlayerID, if they don't already have one
                    game.players.forEach(player => {
                        if (player.id === storedPlayerID && !player.color) {
                            player.color = availableColor || null; // Default to black if no colors are left
                        }
                    });
                    // Find the player in the game.players array
                    const player = game.players.find(player => player.id === storedPlayerID);
                    if (player) {
                        // Assign the socket.id to the player's socketID property
                        player.socketID = socket.id;
                    }
                    io.to(lobbycode).emit('updatedGame', game);
                } else {
                    // Player ID is not in the list of players
                    console.log(`Player with ID ${storedPlayerID} is not part of the game with lobbyCode ${lobbycode}`);
                    // Emit an error message to the client
                    socket.emit('error', { message: 'You do not have permission to join this game.' });
                    // Optionally disconnect the socket to prevent further actions
                    socket.disconnect();
                }
            } else {
                // Game not found for the given lobbyCode
                console.log(`Game not found for lobbyCode ${lobbycode}`);
                // Emit an error message to the client
                socket.emit('error', { message: 'Game not found.' });
                // Optionally disconnect the socket
                socket.disconnect();
            }
        });
        // ON DISCONNECT ///////////////////////////////////////////////////////////////////
        // Handle player disconnect event
        socket.on('playerDisconnected', ({ playerID, lobbyCode }) => {
            console.log(`Player ${playerID} disconnected from lobby ${lobbyCode}`);
            const game = games.find(game => game.lobbyCode === lobbyCode);
            if (game) {
                // If the disconnecting player is the host, delete the game and disconnect all players
                if (game.hostId === playerID) {
                    console.log(`Host player ${playerID} is disconnecting. Deleting the game.`);
                    // Remove the game from the games array
                    const gameIndex = games.findIndex(game => game.lobbyCode === lobbyCode);
                    if (gameIndex !== -1) {
                        games.splice(gameIndex, 1);  // Remove the game from array
                    }
                    // Emit to all players that the game is deleted
                    io.to(lobbyCode).emit('gameDeleted', { message: 'The game has been deleted because the host disconnected.' });
                    // Disconnect all players in this lobby
                    io.in(lobbyCode).disconnectSockets(true);  // Disconnect all sockets in the room
                } else {
                    // Remove the player from the game.players array
                    game.players = game.players.filter(player => player.id !== playerID);
                    // Emit the updated game object to all players in the room
                    io.to(lobbyCode).emit('updatedGame', game);
                }
            }
        });
        // Handle unexpected disconnects (if the player doesn't manually emit playerDisconnected)
        socket.on('disconnect', () => {
            console.log('A user disconnected:', socket.id);
            // Check if the disconnected socket belongs to a player in a game
            for (const game of games) {
                const player = game.players.find(player => player.socketID === socket.id);
                if (player) {
                    // If the disconnecting player is the host, delete the game and disconnect all players
                    if (game.hostId === player.id) {
                        console.log(`Host player ${socket.id} is disconnecting. Deleting the game.`);
                        const gameIndex = games.findIndex(game => game.lobbyCode === game.lobbyCode);
                        if (gameIndex !== -1) {
                            games.splice(gameIndex, 1);  // Remove game from array
                        }
                        // Notify all players that the game has been deleted
                        io.to(game.lobbyCode).emit('gameDeleted', { message: 'The game has been deleted because the host disconnected.' });
                        // Disconnect all players in this lobby
                        io.in(game.lobbyCode).disconnectSockets(true);  // Disconnect all sockets in the room
                    } else {

                        if (game.state.gameState !== "Lobby") {
                            console.log(`A vital player ${socket.id} is disconnecting. Deleting the game.`);
                            const gameIndex = games.findIndex(game => game.lobbyCode === game.lobbyCode);
                            if (gameIndex !== -1) {
                                games.splice(gameIndex, 1);  // Remove game from array
                            }
                            // Notify all players that the game has been deleted
                            io.to(game.lobbyCode).emit('gameDeleted', { message: 'The game has been deleted because a vital player disconnected.' });
                            // Disconnect all players in this lobby
                            io.in(game.lobbyCode).disconnectSockets(true);  // Disconnect all sockets in the room
                        } else {
                            // Remove the player from the game.players array
                            game.players = game.players.filter(player => player.socketID !== socket.id);
                            // Emit the updated game object to all players in the room
                            io.to(game.lobbyCode).emit('updatedGame', game);
                        }
                    }
                    break; // Once the player is found, no need to continue
                }
            }
        });

        // UPDATE SETTINGS ///////////////////////////////////////////
        // Upadte number of rounds
        socket.on('roundsUpdated', ({ playerID, lobbyCode, newRounds }) => {
            // Find the game where lobbyCode matches
            const game = games.find(game => game.lobbyCode === lobbyCode);
            if (!game) {
                socket.emit('error', { message: "Game not found" });
                return;
            }
            // Check if the player is the host
            if (game.hostId !== playerID) {
                socket.emit('error', { message: "You don't have permission to change settings" });
                return;
            }
            // Ensure newRounds is a number
            game.settings.rounds = Number(newRounds); // Converts newRounds to a number
            // Emit the updated game to all clients in the room
            io.to(game.lobbyCode).emit('updatedGame', game);
        });
        // update round timer 
        socket.on('timerUpdated', ({ playerID, lobbyCode, newTimer }) => {
            // Find the game where lobbyCode matches
            const game = games.find(game => game.lobbyCode === lobbyCode);
            if (!game) {
                socket.emit('error', { message: "Game not found" });
                return;
            }
            // Check if the player is the host
            if (game.hostId !== playerID) {
                socket.emit('error', { message: "You don't have permission to change settings" });
                return;
            }
            // Update the game settings if the player is the host
            game.settings.timer = newTimer; // Fixed typo: "rouns" to "rounds"
            // Emit the updated game to all clients in the room
            io.to(game.lobbyCode).emit('updatedGame', game); // Fixed typo: missing closing quote
        });
        // update elimination mode
        socket.on('toggleEliminationMode', ({ playerID, lobbyCode }) => {
            // Find the game where lobbyCode matches
            const game = games.find(game => game.lobbyCode === lobbyCode);
            if (!game) {
                socket.emit('error', { message: "Game not found" });
                return;
            }
            // Check if the player is the host
            if (game.hostId !== playerID) {
                socket.emit('error', { message: "You don't have permission to change settings" });
                return;
            }
            // Update the game settings if the player is the host
            game.settings.eliminationMode = !game.settings.eliminationMode
            io.to(game.lobbyCode).emit('updatedGame', game);
        })

        // START GAME //////////////////////////////////////////////
        socket.on('startGame', ({ playerID, lobbyCode }) => {
            // Find the game where lobbyCode matches
            const game = games.find(game => game.lobbyCode === lobbyCode);
            if (!game) {
                socket.emit('error', { message: "Game not found" });
                return;
            }
            // Check if the player is the host
            if (game.hostId !== playerID) {
                socket.emit('error', { message: "You don't have permission to change settings" });
                return;
            }
            // set game.state.gameState to Game
            game.state.gameState = "Game";
            // SEt game.state.currentRound to 1
            game.state.currentRound = 1;
            // Randomly pick a category and assign it to game.state.currentCategory
            const randomCategory = categories[Math.floor(Math.random() * categories.length)];
            game.state.currentCategory = randomCategory;
            // Randomly pick a word from category  and assign it to game.state.currentSecret
            const randomWord = randomCategory.words[Math.floor(Math.random() * randomCategory.words.length)];
            game.state.currentSecret = randomWord;
            // Randomly select a player in players array and set heir object as currentImposter
            const randomPlayerObject = game.players[Math.floor(Math.random() * game.players.length)];
            game.state.currentImposter = randomPlayerObject;
            // Add all players to votes 
            game.players.forEach(player => {
                game.state.roundVotes[player.id] = null;
            });
            // Add playes to scores
            game.players.forEach(player => {
                game.state.totalScores[player.id] = 0;
            });
            // set round votes objects to a key of each player with a value of null
            io.to(game.lobbyCode).emit('updatedGame', game);
        })
        socket.on('voteForPlayer', ({ lobbyCode, playerID, votedID }) => {
            // Find the game where lobbyCode matches
            const game = games.find(game => game.lobbyCode === lobbyCode);
            if (!game) {
                socket.emit('error', { message: "Game not found" });
                return;
            }
            game.state.roundVotes[playerID] = votedID;
            io.to(game.lobbyCode).emit('updatedGame', game);
            // Iff all votes have come in
            if (Object.values(game.state.roundVotes).every(value => value !== null)) {

                // Add scores up 
                // find person with most votes .id
                const roundVotes = game.state.roundVotes;
                const totalScores = game.state.totalScores;
                const currentImposterId = game.state.currentImposter.id;

                // Count the votes for each player
                const voteCount = {};
                for (const voterId in roundVotes) {
                    const votedId = roundVotes[voterId];
                    if (!voteCount[votedId]) {
                        voteCount[votedId] = 0;
                    }
                    voteCount[votedId]++;
                }

                // Find the player with the most votes and check for ties
                let mostVotedPlayer = null;
                let maxVotes = 0;
                let tiedPlayers = [];

                for (const playerId in voteCount) {
                    if (voteCount[playerId] > maxVotes) {
                        mostVotedPlayer = playerId;
                        maxVotes = voteCount[playerId];
                        tiedPlayers = [playerId];  // reset tied players array with the new top player
                    } else if (voteCount[playerId] === maxVotes) {
                        tiedPlayers.push(playerId);  // add this player to the tied players list
                    }
                }

                // Handle tie situation
                if (tiedPlayers.length > 1) {
                    console.log(`There is a tie between players: ${tiedPlayers.join(", ")}`);

                    // Update scores: minus 1 for each tied player, plus 1 for the current imposter
                    tiedPlayers.forEach(playerId => {
                        totalScores[playerId] -= 1;
                    });
                    totalScores[currentImposterId] += 1;

                } else {
                    console.log("Not a tie");

                    if (mostVotedPlayer === currentImposterId) {
                        // If the most voted player is the imposter, award everyone else a point
                        for (const playerId in totalScores) {
                            if (playerId !== currentImposterId) {
                                totalScores[playerId] += 1;
                            }
                        }
                    } else {
                        // If the most voted player is not the imposter
                        totalScores[currentImposterId] += 2;   // Imposter gets 2 points
                        totalScores[mostVotedPlayer] -= 2;      // Most voted player loses 2 points
                    }
                }

                // set game state to roundEnd 
                game.state.gameState = "RoundEnd"
                // update and emit the new game obj
                io.to(game.lobbyCode).emit('updatedGame', game);
            }
        })

        // NEXT ROUND //////////////////////////////////////////////////
        socket.on('nextRound', ({ playerID, lobbyCode }) => {
            // Find the game where lobbyCode matches
            const game = games.find(game => game.lobbyCode === lobbyCode);
            if (!game) {
                socket.emit('error', { message: "Game not found" });
                return;
            }
            // Check if the player is the host
            if (game.hostId !== playerID) {
                socket.emit('error', { message: "You don't have permission to change settings" });
                return;
            }
            // SEt game.state.currentRound to 1
            game.state.currentRound++;
            // Randomly pick a category and assign it to game.state.currentCategory
            const randomCategory = categories[Math.floor(Math.random() * categories.length)];
            game.state.currentCategory = randomCategory;
            // Randomly pick a word from category  and assign it to game.state.currentSecret
            const randomWord = randomCategory.words[Math.floor(Math.random() * randomCategory.words.length)];
            game.state.currentSecret = randomWord;
            // Randomly select a player in players array and set heir object as currentImposter
            const randomPlayerObject = game.players[Math.floor(Math.random() * game.players.length)];
            game.state.currentImposter = randomPlayerObject;
            // Reset all votes to null
            game.players.forEach(player => {
                game.state.roundVotes[player.id] = null;
            });
            // set game.state.gameState to Game
            game.state.gameState = "Game";
            // Update game
            io.to(game.lobbyCode).emit('updatedGame', game);
        })







    });
};

const getIo = () => {
    if (!io) {
        throw new Error('Socket.io not initialized!');
    }
    return io;
};

module.exports = { initSocket, getIo, games };