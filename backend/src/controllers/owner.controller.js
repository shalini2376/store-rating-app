const db = require("../config/database");

exports.getOwnerDashboard = (req, res) => {
    const ownerId = req.user.id;

    // step 1: Fiding store owned by this user
    db.get(
        `SELECT id, name FROM Stores WHERE owner_id = ?`,
        [ownerId],
        (err, store) => {
            if (err) {
                return res.status(500).json({message: "Database error"});
            }

            if (!store){
                return res.status(400).json({message: "Store not found for owner"});
            }

            // Step 2: Getting Avg Rating
            db.get(
                `SELECT IFNULL(AVG(rating), 0) AS avgRating
                FROM Ratings
                WHERE store_id = ?`,
                [store.id],
                (err, avgRow) => {
                    if (err) {
                        return res.status(500).json({message: "Database error"});
                    }
                     // Step 3: Getting users who rated this store
                     db.all(
                        `SELECT 
                            Users.id,
                            Users.name,
                            Users.email,
                            Ratings.rating,
                            Ratings.created_at
                        FROM Ratings
                        JOIN Users ON Ratings.user_id = Users.id
                        WHERE Ratings.store_id = ?`,
                        [store.id],
                        (err, users) => {
                            if (err) {
                                return res.status(500).json({message: "Database error"});
                            }
                            res.json({
                                storeName: store.name,
                                averageRating: avgRow.avgRating,
                                ratings: users,
                            });
                        }
                    )
                }
            )
        }
    )
}