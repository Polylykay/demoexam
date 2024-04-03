const mysql = require('mysql2/promise')

const pool = mysql.createPool({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '45152280',
    database: 'startup',
});
// role 0 - admin (added manually to db), 1 - regular user
pool.query(`CREATE TABLE IF NOT EXISTS user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    role INT, 
    full_name VARCHAR(128),
    phone VARCHAR(32),
    email VARCHAR(128),
    password VARCHAR(128),
    driver_license VARCHAR(128)
);
`);
pool.query(`CREATE TABLE IF NOT EXISTS car (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(128)
    );
`);
pool.query(`CREATE TABLE IF NOT EXISTS application (
        id INT AUTO_INCREMENT PRIMARY KEY,
        booking_date VARCHAR(128),
        status VARCHAR(128),
        id_user INT,
        id_car INT,
        FOREIGN KEY (id_user) REFERENCES user(id),
        FOREIGN KEY (id_car) REFERENCES car(id)
    );
`);

module.exports = pool;
