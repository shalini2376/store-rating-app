const db = require("../config/database");
const bcrypt = require("bcrypt");


// DASHBOARD STATS
exports.getDashboardStats = (req, res) => {
    const stats = {};

     db.get(`SELECT COUNT(*) as users FROM Users`, (err, row) => {
    stats.totalUsers = row.users;

    db.get(`SELECT COUNT(*) as stores FROM Stores`, (err, row) => {
      stats.totalStores = row.stores;

      db.get(`SELECT COUNT(*) as ratings FROM Ratings`, (err, row) => {
        stats.totalRatings = row.ratings;
        res.json(stats);
      });
    });
  });
}


// Adding USER
exports.addUser = async (req, res) => {
    const {name, email, password, address, role} = req.body;

    if(!["admin", "user", "owner"].includes(role)){
        return res.status(400).json({message: "Invalid role"});
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    db.run(
        `INSERT INTO Users (name, email, password, address, role)
        VALUES (?, ?, ?, ?, ?)`,
        [name, email, hashedPassword, address, role],
        function (err) {
            if (err) {
                return res.status(400).json({message: "Email already exists"});
            }
            res.status(201).json({message: "User added successfully"});
        }
    )
}

// Adding store
exports.addStore = (req, res) => {
    const {name, email, address, owner_id} = req.body;

    db.run(
        `INSERT INTO Stores (name, email, address, owner_id)
        VALUES (?, ?, ?, ?)`,
        [name, email, address, owner_id],
        function (err) {
            if (err) {
                return res.status(400).json({message: "Store email already exists"});
            }
            res.status(201).json({message: "Store added successfully"});
        }
    )
}

// Listing Users
exports.getUsers = (req, res) => {
    const {name, email, role, sort = "name", order = "ASC" } = req.query;

    let query = `SELECT id, name, email, address, role FROM Users WHERE 1=1`;
    const params = [];

    if (name) {
        query += `AND name LIKE ?`;
        params.push(`%${name}%`);
    }
    if (email) {
        query += ` AND email LIKE ?`;
        params.push(`%${email}%`);
    }
    if (role) {
        query += ` AND role = ?`;
        params.push(role);
    }
    query += ` ORDER BY ${sort} ${order}`;

    db.all(query, params, (err, rows) => {
        res.json(rows);
    });
};

// Listing stores
exports.getStores = (req, res) => {
    const query = `
    SELECT 
        Stores.id,
        Stores.name,
        Stores.email,
        Stores.address,
        IFNULL(AVG(Ratings.rating), 0) as rating
    FROM Stores
    LEFT JOIN Ratings ON Stores.id = Ratings.stores_id
    GROUP BY Stores.id
    `;
    db.all(query, (err, rows) => {
        res.json(rows);
    });
};

exports.getUserById = (req, res) => {
  const userId = req.params.id;

  db.get(
    "SELECT id, name, email, address, role FROM Users WHERE id = ?",
    [userId],
    (err, user) => {
      if (err) {
        return res.status(500).json({ message: "Server error" });
      }

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // If user is NOT a store owner, return basic details
      if (user.role !== "owner") {
        return res.json(user);
      }

      // If user IS a store owner, include store rating
      db.get(
        `
        SELECT AVG(R.rating) as averageRating
        FROM Stores S
        LEFT JOIN Ratings R ON S.id = R.store_id
        WHERE S.owner_id = ?
        `,
        [userId],
        (err, row) => {
          if (err) {
            return res.status(500).json({ message: "Server error" });
          }

          res.json({
            ...user,
            averageRating: row?.averageRating || 0,
          });
        }
      );
    }
  );
};
