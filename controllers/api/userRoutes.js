const router = require('express').Router();
const { Post, User, Comment } = require('../../models');

// GET route for fetching all the users
router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password']}
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

// GET users by id
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password']},
        where: {
            id: req.params.id
        },
        include: [{
            model: Post,
            attributes: [
                'id',
                'title',
                'content',
                'created_at'
            ]
        },
        {
            model: Comment,
            attributes: [ 'id', 'comment_text', 'created_at'],
            include: {
                model: Post,
                attributes: ['title']
            }
        },
        {
            model: Post,
            attributes: ['title']
        }
        ]
    })
    .then(dbUserData => {
        if(!dbUserData) {
            res.status(404).json({ message: "No user found with this id!" });
            return;
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

// POST - create user
router.post('/', (req, res) => {
    console.log("Test", req)
    User.create(
        req.body
    )
    .then(dbUserData => {
        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;
            res.json(dbUserData);
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

// POST - find if user loggedIn by id
router.post('/login', (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    })
    .then(dbUserData => {
        if(!dbUserData) {
            res.status(404).json({ message: "No user found with this id!" });
            return;
        }
        const validPassword = dbUserData.checkPassword(req.body.password);

        if(!validPassword){
            res.status(400).json({ message: 'Invalid password!' });
            return;
        }
        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;
            res.json({ message: "You have successfully logged in!" });
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

// POST - user logged out
router.post('/logout', (req, res) => {
    if(req.session.loggedIn){
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
}); 

// PUT - update user by id
router.put('/:id', (req, res) => {
    User.update(req.body, {
    individualHooks: true,
    where: {
        id: req.params.id
        }
    })
    .then(dbUserData => {
    if(!dbUserData) {
        res.status(404).json({ message: "No user found with this id!" });
        return;
    }
    res.json(dbUserData);
    })
    .catch(err => {
    console.log(err);
    res.status(500).json(err);
    });
});

// DELETE user by id
router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    then(dbUserData => {
        if(!dbUserData) {
            res.status(404).json({ message: "No user found with this id!" });
            return;
        }
        res.json(dbUserData);
        })
        .catch(err => {
        console.log(err);
        res.status(500).json(err);
        });
});

module.exports = router;




