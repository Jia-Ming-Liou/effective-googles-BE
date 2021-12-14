const mysql = require('mysql');
const {getSecrets} = require('secrets');


/*{
  "username": "admin",
  "password": "admin123",
  "engine": "mysql",
  "host": "database-1.cnqteq2koalo.us-east-1.rds.amazonaws.com",
  "port": 3306,
  "dbname": "testdb",
  "dbInstanceIdentifier": "database-1"
}*/
exports.connectToDB = async () => {
    const {host, username, password, port, dbname} = await getSecrets();
    return new Promise((resolve, reject) => {
        resolve(mysql.createConnection({
            host: host,
            user: username,
            port: port,
            password: password,
            database: dbname,
        }));
    })
}
