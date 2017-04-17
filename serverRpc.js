const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const user = require("./class/user.js");
const user_list = require("./class/user_list.js");

const PORT = 3001;
let users = new user_list();
let id = 1;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended":true}));

app.listen(PORT).on('listening', () => {
    console.log(`Start HTTP on port ${PORT}`);
});

app.post('/rpc', ({ body }, res) => {
    const method = PRC[body.method];

    if (!method) {
        return res.json({
            jsonrpc: 2.0,
            error: 'Метод не найден'
        });
    }
    if (!body.params.id)
        body.params.id = body.id;
    method(body.params, (err, result) => {
        if (err){
            res.json({
                jsonrpc: 2.0,
                error: err.message
            });
        }else
            res.json({
                jsonrpc: 2.0,
                result: result
            });
    });
});

const PRC = {
    list: (params, callback) => {
        users.findAll(callback);
    },
    create: (params, callback) => {
        if (!params.name || !params.score){
            callback(new Error('Ошибочные параметры'));
            return false;
        }
        let c_user = new user(id++, params.name, params.score);
        users.add(c_user, callback);
    },
    get: (params, callback) => {
        users.findById(params.id, callback);
    },
    update: (params, callback) => {
        users.findById(params.id, (err, user) => {
            if (err) return callback(err);

            user.name = params.name;
            user.score = params.score;
            users.update(user, callback);
        });
    },
    delete: (params, callback) => {
        users.remove(params.id, callback);
    }
};

app.use(function errorHandler(err, req, res, next) {
    res.status(500).json({
        jsonrpc: 2.0,
        error: err.message
    });
});