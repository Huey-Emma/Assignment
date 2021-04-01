import { readFile } from 'fs/promises';
import path from 'path';
export const handlers = {};
handlers.notFound = (data, callback) => {
    callback(404, {
        status: 'fail',
        message: 'Not found!',
    });
};
handlers.ping = (data, callback) => {
    if (data.method !== 'get')
        return callback(406, {
            status: 'fail',
            message: 'Unacceptable method',
        });
    controllers._ping[data.method](data, callback);
};
handlers.user = (data, callback) => {
    if (data.method !== 'get') {
        return callback(406, {
            status: 'fail',
            message: 'Unacceptable method',
        });
    }
    controllers._user[data.method](data, callback);
};
handlers.home = (data, callback) => {
    if (data.method !== 'get') {
        return callback(406, {
            status: 'fail',
            message: 'Unacceptable method',
        });
    }
    controllers._home[data.method](data, callback);
};
const controllers = {};
controllers._ping = {};
controllers._ping.get = (data, callback) => {
    callback(200, 'I need money ohhh!');
};
controllers._user = {};
controllers._user.get = (data, callback) => {
    callback(200, {
        status: 'success',
        name: 'Emmanuel Uyi',
        country: 'Nigeria (sadly)',
        hobby: 'Watching cartoons',
    });
};
controllers._home = {};
controllers._home.get = (data, callback) => {
    const filePath = path.join(__dirname, '../views', 'index.html');
    readFile(filePath, 'utf-8')
        .then(callback.bind(null, 200))
        .catch(() => {
        callback(404, 'Page not found');
    });
};
