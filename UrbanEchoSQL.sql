CREATE DATABASE urbanecho;
show databases;
show tables;
use urbanecho;
CREATE TABLE users (
    id INT AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    location VARCHAR(50) NOT NULL,
    PRIMARY KEY (id)
);
ALTER TABLE users ADD COLUMN mobile NUMERIC NOT NULL;
ALTER TABLE users DROP COLUMN mobile;
ALTER TABLE users ADD COLUMN mobile NUMERIC NOT NULL;
SELECT * FROM users;
SELECT * FROM users;
ALTER TABLE users ADD COLUMN password VARCHAR(255) NOT NULL;
SELECT * FROM users;
ALTER TABLE users MODIFY COLUMN password VARCHAR(255) NOT NULL UNIQUE;
DELETE FROM users WHERE id = NULL;
INSERT INTO users(username, email, password) VALUES('Kush', 'patidarkush@gmail.com', 'kush1234');
ALTER TABLE users MODIFY COLUMN location VARCHAR(255) NOT NULL DEFAULT('Indore');
ALTER TABLE users MODIFY COLUMN mobile VARCHAR(255) NOT NULL UNIQUE DEFAULT('0000000000');
TRUNCATE TABLE users;

CREATE TABLE complaints (
    complaint_id INT AUTO_INCREMENT PRIMARY KEY,
    id INT,
    title VARCHAR(255),
    state VARCHAR(100),
    city VARCHAR(100),
    department VARCHAR(100),
    description TEXT,
    status VARCHAR(50) DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id) REFERENCES users(id)
);
SELECT * FROM complaints;
ALTER TABLE complaints ADD COLUMN issue_location VARCHAR(300) NOT NULL;
ALTER TABLE complaints CHANGE id user_id INT;
SHOW CREATE TABLE complaints;
ALTER TABLE complaints DROP FOREIGN KEY id;
ALTER TABLE complaints MODIFY COLUMN created_at TIMESTAMP AFTER issue_location;
ALTER TABLE complaints MODIFY COLUMN department VARCHAR(100) AFTER city;
TRUNCATE TABLE complaints;
ALTER TABLE complaints MODIFY COLUMN status ENUM('Pending', 'Resolved', 'Rejected', 'In-Progress') DEFAULT 'Pending';
CREATE TABLE road (
    complaint_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    title VARCHAR(255),
    state VARCHAR(100),
    city VARCHAR(100),
    description TEXT,
    status ENUM('Pending', 'Resolved', 'Rejected', 'In-Progress') DEFAULT 'Pending',
    issue_location VARCHAR(300) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
CREATE TABLE street_light (
    complaint_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    title VARCHAR(255),
    state VARCHAR(100),
    city VARCHAR(100),
    description TEXT,
    status ENUM('Pending', 'Resolved', 'Rejected', 'In-Progress') DEFAULT 'Pending',
    issue_location VARCHAR(300) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
CREATE TABLE sanitation (
    complaint_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    title VARCHAR(255),
    state VARCHAR(100),
    city VARCHAR(100),
    description TEXT,
    status ENUM('Pending', 'Resolved', 'Rejected', 'In-Progress') DEFAULT 'Pending',
    issue_location VARCHAR(300) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
CREATE TABLE water_supply (
    complaint_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    title VARCHAR(255),
    state VARCHAR(100),
    city VARCHAR(100),
    description TEXT,
    status ENUM('Pending', 'Resolved', 'Rejected', 'In-Progress') DEFAULT 'Pending',
    issue_location VARCHAR(300) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
CREATE TABLE traffic (
    complaint_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    title VARCHAR(255),
    state VARCHAR(100),
    city VARCHAR(100),
    description TEXT,
    status ENUM('Pending', 'Resolved', 'Rejected', 'In-Progress') DEFAULT 'Pending',
    issue_location VARCHAR(300) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
CREATE TABLE drainage (
    complaint_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    title VARCHAR(255),
    state VARCHAR(100),
    city VARCHAR(100),
    description TEXT,
    status ENUM('Pending', 'Resolved', 'Rejected', 'In-Progress') DEFAULT 'Pending',
    issue_location VARCHAR(300) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
CREATE TABLE garbage (
    complaint_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    title VARCHAR(255),
    state VARCHAR(100),
    city VARCHAR(100),
    description TEXT,
    status ENUM('Pending', 'Resolved', 'Rejected', 'In-Progress') DEFAULT 'Pending',
    issue_location VARCHAR(300) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
CREATE TABLE electricity (
    complaint_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    title VARCHAR(255),
    state VARCHAR(100),
    city VARCHAR(100),
    description TEXT,
    status ENUM('Pending', 'Resolved', 'Rejected', 'In-Progress') DEFAULT 'Pending',
    issue_location VARCHAR(300) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

SELECT * FROM sanitation;