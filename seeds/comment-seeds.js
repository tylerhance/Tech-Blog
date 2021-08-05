const { Comment } = require('../models');

const commentData = [{
    comment_text: "Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Cras ultricies ligula sed magna dictum porta. Donec sollicitudin molestie malesuada.",
    user_id: 1,
    post_id: 1
},
{
    comment_text: "Quisque velit nisi, pretium ut lacinia in, elementum id enim. Donec sollicitudin molestie malesuada.",
    user_id: 2,
    post_id: 2
},
{
    comment_text: "Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus.",
    user_id: 3,
    post_id: 3
}
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;