const express = require("express");
const bodyParser = require("body-parser"); 
const app = express();

const user = require("./class/user.js");
const user_list = require("./class/user_list.js");

const PORT = 1337;
let users = new user_list();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended":true}));

app.post('/user', (req, res) => {
	let param = req.body;
	let c_user = new user(param.name, param.scope);
	users.add(c_user, (err, user) => {
		if (!err){
			console.log("Создан новый пользователь: ");
			console.log(user);
		
			res.json(user);
		} else {
			console.log(err);
			res.json(res, err);
		};
	});
})

app.get('/user/:id', (req, res) => {
	let id = req.params.id;
	users.findById(id, (err, user) => {
		if (!err){
			console.log("Найден: ");
			console.log(user);
		
			res.json(user);
		} else {
			console.log(err);
			res.json(res, err);
		};
	});
})

app.put('/:id', function(req, res) {
    users.findById(req.params.id, (err, user) => {
        if (err){return res.json(res, err);}
		
        user.name = req.body.name;
        user.score = req.body.score;
        users.update(user, (err, user) => {
			if (!err){
				console.log("Обновлен: ");
				console.log(user);
		
				res.json(user);
			} else {
				console.log(err);
				res.json(res, err);
			};
        });
    });
});

app.listen(PORT, () => {
    console.log('Start HTTP on port %d', PORT);
});

app.on('error', err => console.error(err));