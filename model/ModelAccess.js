const fs = require('fs');
const HandleDBMSMySQL = require('../config/database/HandleDBMSMySQL');

class ModelAccess {

  constructor() {
    this._HandleDBMSMySQL = new HandleDBMSMySQL();
    var envFile = JSON.stringify(fs.readFileSync('./config/sever/env.json', 'utf8', 'r'));
  }

  destroy(param=null) {
    var varToString = varObj => Object.keys(varObj)[0];
    new Error('Parâmetros incorretos para a classe: \`%s\`, parâmetro \`%s\`', this.constructor.name, varToString({param}));;
  }

  postAccess(timestamp=null, hostname=null, ip=null) {
    this._timestamp = timestamp;
    this._hostname = hostname;
    this._ip = ( typeof ip !== 'string' || ip === null ) ? this.destroy(ip) : ip;

    var table = 'access';
    var sqlInsert = `insert into ${envFile.database}.${table} values (null, ${this._timestamp}, ${this._hostname}, ${this._ip})`;
    console.log(sqlInsert);

    this._HandleDBMSMySQL.query(sqlInsert);
    //
    this._HandleDBMSMySQL.close();
  }

}

module.exports = ModelAccess;