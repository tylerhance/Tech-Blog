const seedComments = require('./comment-seeds');
const seedUsers = require('./user-seeds');
const seedPosts = require('./post-seeds');
const sequelize = require('../config/connection');

const seedAllData = async() => {
    await sequelize.sync({ force: true });
    await seedUsers();
    await seedComments();
    await seedPosts();
    process.exit(0);
};

seedAllData;