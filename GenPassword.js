const bcrypt = require('bcrypt');

let password = bcrypt.hashSync('sheep1', 9);
console.log(password);
