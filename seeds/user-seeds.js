const { User } = require('../models');

const userData = [
{
    username: 'Tyler',
    password: 'tyler123'
},
{
    username: 'Sarah',
    password: 'sarah456'
},
{
    username: 'Tegan',
    password: 'tegan789'
},
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;