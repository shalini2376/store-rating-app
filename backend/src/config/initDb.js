const db = require("./database");

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS Users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          email TEXT UNIQUE NOT NULL,
          password TEXT NOT NULL,
          address TEXT,
          role TEXT NOT NULL
        )
    `);

    db.run(`
            CREATE TABLE IF NOT EXISTS Stores (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            address TEXT,
            owner_id INTEGER,
            FOREIGN KEY (owner_id) REFERENCES Users(id) ON DELETE CASCADE
            )
        `);

    db.run(`
        CREATE TABLE IF NOT EXISTS Ratings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        store_id INTEGER,
        rating INTEGER CHECK(rating BETWEEN 1 AND 5),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(user_id, store_id),
        FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
        FOREIGN KEY (store_id) REFERENCES Stores(id) ON DELETE CASCADE
        )
    `);
    console.log("Database  tables created");
})