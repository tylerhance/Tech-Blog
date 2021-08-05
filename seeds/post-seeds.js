const { Post } = require('../models');

const postData = [{
    title: "Pellentesque in ipsum",
    content: "Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Quisque velit nisi, pretium ut lacinia in, elementum id enim.",
    user_id: 1
},
{
    title: "Vestibulum ac diam sit amet",
    content: "Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.",
    user_id: 2
},
{
    title: "Nulla quis lorem",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    user_id: 3
}
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;