const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/auth");
const sequelize = require("../config/connection");

router.use((req, res, next) => {
  console.log("Session: ", req.session);
  next();
});

router.get("/", withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    const posts = postData.map((post) => {
      const plainPost = post.get({ plain: true });
      plainPost.isAuthor = true;
      return plainPost;
    });

    res.render("dashboard", {
      posts,
      loggedIn: req.session.logged_in,
      username: req.session.username,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/edit/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.findOne({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (postData) {
      const post = postData.get({ plain: true });
      post.isAuthor = true;
      res.render("editDeletePost", {
        post,
        loggedIn: req.session.logged_in,
        username: req.session.username,
      });
    } else {
      res.render("errorPage", { message: "No post found with this id" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
