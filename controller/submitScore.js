const con = require('../config');

const submitScore = (req, res) => {

    const { username, game_type, score } = req.body;

    const query = 'select * from users where username = ?';


    con.getConnection((err, connection) => {
        if (err) return res.status(500).json({ error: err });

        connection.query(query, [username], (err, result) => {
            if (err) return res.status(500).json({ error: err });

            let userId;
            if (result.length > 0) {
                userId = result[0].id;

                const query = 'insert into scores (user_id, game_type, score) values (? , ? , ?)';

                connection.query(query, [userId, game_type, score], (err, result) => {
                    connection.release();
                    if (err) return res.status(500).json({ error: err });
                    res.status(200).json({ message: 'Score submitted successfully' });
                })
            } else {
                let query = 'insert into users (username) value (?)';

                connection.query(query, [username], (err, result) => {
                    if (err) return res.status(500).json({ error: err });
                    userId = result.insertId;
                    const query = 'insert into scores (user_id, game_type, score) values (? , ? , ?)';

                    connection.query(query, [userId, game_type, score], (err, result) => {
                        connection.release();
                        if (err) return res.status(500).json({ error: err });
                        res.status(200).json({ message: 'Score submitted successfully' });
                    })
                })

            }
        })
    })

}

module.exports = submitScore;