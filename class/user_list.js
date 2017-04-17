class Users extends Array{

    constructor() {
        super();
        this.nextId = 1;
    }

    add(user, callback){
        if (user && user.name && user.score){
            user.id = this.nextId;
			this.nextId++
            this.push(user);
            callback(null, user);
        }else{
            callback(new Error("Неверные параметры"));
        }
    }

    /*

    findAll(callback, offset = 0, limit, fields){
        let filter = (limit) ? this.slice(offset, parseInt(offset) + parseInt(limit))
            : this.slice(offset)
        if (fields){
            let result = new Users();
            filter.forEach((user) => {
                let usr = Object.assign({}, user);
                Object.keys(usr).forEach((key) => {
                    if (!fields.includes(key)) delete usr[key];
                });
                result.push(usr);
            });
            return callback(null, result);
        }
        callback(null, filter);
    }*/

    findById(id, callback){
        let f_user = this.find((user) => user.id == id);
        if (f_user)
            callback(null, f_user);
        else
            callback(new Error('Пользователь не найден'));
    }
	
	update(id, callback){
        if (user && user.name && user.score){
            let u_user = this.find((user) => user.id == id);
            if (u_user){
                Object.assign(u_user, user);
                callback(null, u_user);
            }else{
                add(user, callback);
            }
        }else{
            callback(new Error("Ошибка обновления"));
        }
    }

 /* remove(id, callback){
        let usr = this._findByIdSync(id);
        if (usr){
            var index = this.indexOf(usr);
            let user = this.splice(index, 1);
            callback(null, user[0]);
        }else{
            callback(new Error('User not found'));
        }
    }

    removeAll(callback){
        callback(null, this.splice(0, this.length));
    }*/

}

module.exports = Users;