import mysql from 'mysql2/promise';

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Kush@123',
    database: 'urbanEcho',
    waitForConnections: true,
    connectionLimit: 10, 
    queueLimit: 0
});

export { db };