const db = require("../config/database");

// Geting ALL STORES (WITH USER RATING)
exports.getStores = (req, res) => {
    const userId = req.user.id;
    const {search = ""} = req.query;

    const query = `
    SELECT
      Stores.id,
      Stores.name,
      Stores.address,
      IFNULL(AVG(Ratings.rating), 0) AS avgRating,
      (
        SELECT rating
        FROM Ratings
        WHERE Ratings.store_id = Stores.id
          AND Ratings.user_id = ?
      ) AS userRating
    FROM Stores
    LEFT JOIN Ratings ON Stores.id = Ratings.store_id
    WHERE Stores.name LIKE ? OR Stores.address LIKE ?
    GROUP BY Stores.id
    `;
    
     db.all(
    query,
    [userId, `%${search}%`, `%${search}%`],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ message: "Database error" });
      }
      res.json(rows);
    }
  );
}

// Submitting OR Updating RATING
exports.submitRating = (req, res) => {
    const userId  = req.user.id;
    const { store_id, rating } = req.body;

    if (rating < 1 || rating > 5) {
    return res.status(400).json({ message: "Rating must be between 1 and 5" });
  }

    const query = `
        INSERT INTO Ratings (user_id, store_id, rating)
        VALUES (?, ?, ?)
        ON CONFLICT(user_id, store_id)
        DO UPDATE SET rating = excluded.rating
    `;
    db.run(query, [userId, store_id, rating], function (err) {
        if (err) {
        return res.status(500).json({ message: "Failed to submit rating" });
        }
        res.json({ message: "Rating submitted successfully" });
    });
}

exports.updateRating = (req, res) => {
  const userId = req.user.id;
  const storeId = req.params.storeId;
  const { rating } = req.body;

  if (rating < 1 || rating > 5) {
    return res.status(400).json({ message: "Rating must be between 1 and 5" });
  }

  db.run(
    `
    UPDATE Ratings
    SET rating = ?
    WHERE user_id = ? AND store_id = ?
    `,
    [rating, userId, storeId],
    function (err) {
      if (err) {
        return res.status(500).json({ message: "Server error" });
      }

      if (this.changes === 0) {
        return res.status(404).json({ message: "Rating not found" });
      }

      res.json({ message: "Rating updated successfully" });
    }
  );
};
