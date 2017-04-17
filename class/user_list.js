class Users extends Array {

    add(user, callback) {
        if (user && user.name && user.score && user.id) {
            this.push(user);
            callback(null, user);
        } else {
            callback(new Error("Неверные параметры"));
        }
    }

    findAll(callback, offset = 0, limit, fields) {
        fields = fields ? fields.split(',') : null;
        let items = Object.keys(this).map(key => {
            let item = {};
            if (fields)
                fields.forEach(field => item[field] = this[key][field]);
            else
                item = this[key];
            return item;
        });
        if (limit)
            items = items.slice(offset, offset + limit);
        callback(null, items);
    }

    findById(id, callback) {
        let f_user = this.find((user) => user.id == id);
        if (f_user)
            callback(null, f_user);
        else
            callback(new Error('Пользователь не найден'));
    }

    update(user, callback) {
        if (user && user.name && user.score && user.id) {
            let u_user = this.find((item) => item.id == user.id);
            if (u_user) {
                Object.assign(u_user, user);
                callback(null, u_user);
            } else {
                callback(null, {});
            }
        } else {
            callback(new Error("Ошибка обновления"));
        }
    }

    remove(id, callback) {
        let u_user = this.find((item) => item.id == id);
        if (u_user) {
            var index = this.indexOf(u_user);
            let user = this.splice(index, 1);
            callback(null, user[0]);
        } else {
            callback(new Error('Пользователь не найден'));
        }
    }

    removeAll(callback) {
        callback(null, this.splice(0, this.length));
    }

}

module.exports = Users;