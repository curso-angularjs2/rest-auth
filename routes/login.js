var express = require('express');
var jwt = require('jsonwebtoken');

var secretKey = "e>@O103o&0ix-sbkzAr8439+jE5p^C";
var router = express.Router();

var Usuario = require('../models/Usuario.js');

router.post('/', function (req, res, next) {
    Usuario.findOne({login: req.body.username, senha: req.body.password}, 'login')
            .exec(function (err, usuario) {
                if (err)
                    res.send(err);
                if (usuario !== null) {
                    var token = jwt.sign(usuario, secretKey, {
                        expiresIn: "1 day"
                    });
                    res.json({usuario: usuario, token: token});
                } else {
                    res.status(400).send('Login/Senha incorretos');
                }
            });
});

module.exports = router;