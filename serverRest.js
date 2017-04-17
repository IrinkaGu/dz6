const express = require("express");
const bodyParser = require("body-parser"); 
const app = express();

const user = require("./class/user.js");
const user_list = require("./class/user_list.js");

const PORT = 3000;
let users = new user_list();
let id = 1;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended":true}));
app.use(function errorHandler(err, req, res, next) {
    res.status(500).render('error', {
            error: err
	});
});

app.listen(PORT).on('listening', () => {
    console.log(`Start HTTP on port ${PORT}`);
});

function sendError(res, code, message){
    return res.status(400).json({
        error: code,
        message: message
    });
}

app.get('/users', function(req, res) {
	let query = req.query;
    users.findAll((err, users) => {
        if (err) return sendError(res, err.code, err.message);

        console.log("Найдены: ");
        console.log(users);
        res.json(users);
    }, query.offset, query.limit, query.fields);
});

app.post('/users', (req, res) => {
	let params = req.body;
    if (!params.name || !params.score){
        sendError(res, 'WRONG_PARAMS', 'Ошибочные параметры');
        return false;
    }
	let c_user = new user(id++, params.name, params.score);
	users.add(c_user, (err, user) => {
		if (!err){
			console.log("Создан новый пользователь: ");
			console.log(user);
			res.json(user);
		} else {
			console.log(err);
            return sendError(res, err.code, err.message);
		};
	});
})

app.get('/users/:id', (req, res) => {
	let id = req.params.id;
	users.findById(id, (err, user) => {
		if (!err){
			console.log("Найден: ");
			console.log(user);
		
			res.json(user);
		} else {
			console.log(err);
            return sendError(res, err.code, err.message);
		};
	});
})

app.put('/users/:id', function(req, res) {
    users.findById(req.params.id, (err, user) => {
        if (err) return sendError(res, err.code, err.message);

        user.name = req.body.name;
        user.score = req.body.score;
        users.update(user, (err, user) => {
			if (!err){
				console.log("Обновлен: ");
				console.log(user);
		
				res.json(user);
			} else {
				console.log(err);
                return sendError(res, err.code, err.message);
			};
        });
    });
});

app.delete('/users/:id', function(req, res) {
    users.remove(req.params.id, (err, user) => {
        if (!err){
            console.log("Удален: ");
            console.log(user);

            res.json(user);
        } else {
            console.log(err);
            return sendError(res, err.code, err.message);
        };
    })
});

app.delete('/users', function(req, res) {
    users.removeAll((err, users) => {
        if (!err){
            console.log("Удалены: ");
            console.log(users);

            res.json(users);
        } else {
            console.log(err);
            return sendError(res, err.code, err.message);
        };
    })
});