const router = require("express").Router();
const { User, Post, Comment } = require("../models");
const withAuth = require("../utils/auth");
const sequelize = require("../config/connection");

router.get("/", async (req, res) => {
  try {
    const posted = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["id", "email", "username"],
        },
      ],
    });
    const posts = posted.map((post) => post.get({ plain: true }));

    const postsWithAuthorFlag = posts.map((post) => {
      return {
        ...post,
        isAuthor: req.session.logged_in && req.session.user_id === post.user_id,
      };
    });

    res.render("home", {
      posts: postsWithAuthorFlag,
      logged_in: req.session.logged_in,
      username: req.session.username,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/post/:id", async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ["username"],
            },
          ],
        },
      ],
    });

    const singlePost = post.get({ plain: true });

    res.render("post", {
      singlePost,
      logged_in: req.session.logged_in,
      username: req.session.username,
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      error: err,
      message: "Something went wrong.",
    });
  }
});

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
  } else {
    res.render("login");
  }
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

module.exports = router;
