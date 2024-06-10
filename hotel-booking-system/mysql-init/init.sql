-- Active: 1717246441155@@127.0.0.1@3306@hotel_booking_system
CREATE DATABASE hotel_booking_system;

USE hotel_booking_system;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE
);

CREATE TABLE hotels (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL
);

CREATE TABLE rooms (
    id INT AUTO_INCREMENT PRIMARY KEY,
    hotel_id INT,
    room_number VARCHAR(50) NOT NULL,
    capacity INT NOT NULL,
    available_from DATE NOT NULL,
    available_to DATE NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (hotel_id) REFERENCES hotels(id)
);

CREATE TABLE reservations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    room_id INT,
    user_id INT,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (room_id) REFERENCES rooms(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE notifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Admin kullanıcısı ekleyelim
INSERT INTO users (name, email, password, is_admin) VALUES ('Admin User', 'admin@example.com', 'admin_password_hash', TRUE);

-- Normal kullanıcı ekleyelim
INSERT INTO users (name, email, password, is_admin) VALUES ('Normal User', 'user@example.com', 'user_password_hash', FALSE);

-- Otelleri ekleyelim
INSERT INTO hotels (name, location) VALUES ('Hotel A', 'Location A');
INSERT INTO hotels (name, location) VALUES ('Hotel B', 'Location B');
-- Odaları ekleyelim
INSERT INTO rooms (hotel_id, room_number, capacity, available_from, available_to, price) VALUES (1, '101', 2, '2024-06-15', '2024-06-20', 150.00);
INSERT INTO rooms (hotel_id, room_number, capacity, available_from, available_to, price) VALUES (1, '102', 4, '2024-06-15', '2024-06-20', 200.00);
INSERT INTO rooms (hotel_id, room_number, capacity, available_from, available_to, price) VALUES (2, '201', 2, '2024-06-15', '2024-06-20', 180.00);
-- Rezervasyonları ekleyelim
INSERT INTO reservations (room_id, user_id, start_date, end_date, total_price) VALUES (1, 2, '2024-06-15', '2024-06-18', 450.00);
INSERT INTO reservations (room_id, user_id, start_date, end_date, total_price) VALUES (3, 2, '2024-06-15', '2024-06-18', 540.00);
-- Bildirimleri ekleyelim
INSERT INTO notifications (user_id, message) VALUES (2, 'Your reservation is confirmed.');
INSERT INTO notifications (user_id, message) VALUES (2, 'Reminder: Check-out date is approaching.');

-- 'rooms' tablosuna 'room_type' sütunu ekleyelim
ALTER TABLE rooms ADD COLUMN room_type ENUM('standard', 'family') NOT NULL;

-- Var olan verilere uygun oda tipleri ekleyelim (örnek olarak hepsini 'standard' olarak ayarlıyoruz)
UPDATE rooms SET room_type = 'standard' WHERE id IN (1, 2, 3);

-- Tablo yapısının güncellenmiş hali
DESC rooms;
