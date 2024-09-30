const con = require('../config');

const leaderboardData = (req, res) => {
    const { game_type, limit = 10, page = 1, from, to } = req.query;

    let query = `SELECT users.username, SUM(scores.score) AS total_score FROM scores 
    JOIN users 
    ON users.id = scores.user_id`;

    let params = [];

    if (game_type) {
        query += ` WHERE scores.game_type = ? `;
        params.push(game_type);
    }

    if (from && to) {
        query += game_type ? ` AND ` : ` WHERE `;
        query += ` scores.created_at BETWEEN ? AND ? `;
        params.push(from, to);
    }

    query += ` GROUP BY users.username ORDER BY total_score DESC LIMIT ? OFFSET ?`;

    params.push(parseInt(limit), (parseInt(page) - 1) * parseInt(limit));

    con.getConnection((err, connection) => {
        if (err) {
            return res.status(500).json({ error: 'Database connection error' });
        }

        connection.query(query, params, (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Error executing query' });
            }
            res.status(200).json(results);
        });
    });
}

module.exports = leaderboardData;
