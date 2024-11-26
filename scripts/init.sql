-- Connect to MySQL as root or a user with sufficient privileges

-- Create databases if they do not exist
CREATE DATABASE IF NOT EXISTS league_development;
CREATE DATABASE IF NOT EXISTS league_test;
CREATE DATABASE IF NOT EXISTS league_production;

-- Create user 'antonio' with password 'pepsicola' if it does not exist
CREATE USER IF NOT EXISTS 'antonio'@'localhost' IDENTIFIED BY 'pepsicola';

-- Grant permissions on all three databases
GRANT ALL PRIVILEGES ON league_development.* TO 'antonio'@'localhost';
GRANT ALL PRIVILEGES ON league_test.* TO 'antonio'@'localhost';
GRANT ALL PRIVILEGES ON league_production.* TO 'antonio'@'localhost';

-- Flush privileges to ensure that the changes take effect
FLUSH PRIVILEGES;

