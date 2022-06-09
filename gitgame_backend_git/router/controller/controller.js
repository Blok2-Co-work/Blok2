const mysql = require('mysql');

exports.getScores = (req, res) => {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'gitgame_user',
        password: 'ZevenPoepScheetjes5698',
        database: 'gitgameDB'
    });

    connection.connect();

    connection.query(`SELECT scores.user, scores.score, scores.date FROM scores WHERE scores.game = "GitGame"`, (err, rows) => {
        if (err) {
            console.error("ERROR: " + err);
        }
        res.status(200).json(rows);
    });

    connection.end();
};

exports.setScore = (req, res) => {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'gitgame_user',
        password: 'ZevenPoepScheetjes5698',
        database: 'gitgameDB'
    });

    connection.connect();

    connection.query(`
    INSERT INTO scores ('GitGame', '${req.body.username}', '${req.body.score}', 2, NOW());
    `, (err, rows) => {
        if (err){
            res.status(500).json({status: err});
        } else res.status(200).json({status: "succes"});
    });

    connection.end();
};


exports.getScoresSorted = (req, res) => {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'gitgame_user',
        password: 'ZevenPoepScheetjes5698',
        database: 'gitgameDB'
    });

    connection.connect();

    connection.query(`SELECT user, score FROM scores WHERE scores.game = 'GitGame' ORDER BY scores.score DESC`, (err, rows) => {
        if (err) {
            console.error("ERROR: " + err);
        } res.status(200).json(rows);
    });
};





