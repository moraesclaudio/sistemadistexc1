var express = require('express');
var os = require('os');
var ip = require('ip');

var router = express.Router();

var _HandleDBMSMySQL = require('../config/database/HandleDBMSMySQL');
var conn = new _HandleDBMSMySQL();

/* GET home page. */
router.get('/', function(req, res, next) {
  var acesso_tm = new Date().toISOString().slice(0, 19).replace('T', ' ');
  var acesso_pc = os.hostname();
  var acesso_ip = ip.address();

  console.log(acesso_tm);
  console.log(acesso_pc);
  console.log(acesso_ip);
  //                                (idlog, acesso_tm string, acesso_pc, acesso_ip)
  var sql = `insert into log values (${null}, '${acesso_tm}', '${acesso_pc}', '${acesso_ip}')`;
  console.log(sql);
  conn.insert(sql);
  // 
  res.render('index', { title: 'Monitorando o acesso' });
});

module.exports = router;
