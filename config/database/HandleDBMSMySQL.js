const fs = require('fs');
const mysql = require('mysql');

class HandleDBMSMySQL {

  constructor( host=null, database=null, user=null, password=null ) {

      // var envFile = JSON.parse(fs.readFileSync('../server/env.json', 'utf8', 'r'));
      var envFile = JSON.parse(fs.readFileSync('./config/server/env.json', 'utf8', 'r'));

      this._host        = ( !typeof 'string' || host      == null ) ? envFile.host : host;

      this._host        = 'localhost';
      this._database    = 'projetoint1';
      this._user        = 'prjint';
      this._password    = 'prjint';
      this.connect();
    }

  connect() {
    this.connection = mysql.createConnection({
      host: this._host,
      database: this._database,
      user: this._user,
      password: this._password
    });
  }

  query(sql, args) {
    return new Promise((resolve, reject) => {
      this.connection.query(sql, args, (err, results, fields) => {
        if (err) {
          reject(err);
        } else {
          var resultsJSON = { 'metadata': {}, 'data': {} };
          resultsJSON.metadata  = fields.map((r)  => Object.assign({}, r));
          resultsJSON.data      = results.map((r) => Object.assign({}, r));
          resolve(resultsJSON);
        }
      });
    });
  }

  insert(sql) {
    return new Promise((resolve, reject) => {
      this.connection.query(sql, (err, results) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }

  close() {
    return new Promise((resolve, reject) => {
      this.connection.end(err => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

}

module.exports = HandleDBMSMySQL;