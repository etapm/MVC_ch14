const router = require("express").Router();
const { User, Post, Comment } = require("../models");
const withAuth = require("../utils/auth");
const sequelize = require("../config/connection");

router.get("/", async (req, res) => {
  try {
    const posted = await Post.findAll({
      include: [{ model: User }],
    });
    const posts = posted.map((post) => post.get({ plain: true }));

    res.render("home", {
      posts,
      logged_in: req.session.logged_in,
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
          include: [
            {
              model: Comment,
              include: [
                {
                  model: User,
                  attributes: ["user_name"],
                },
              ],
            },
          ],
        },
      ],
    });

    const singlePost = post.get({ plain: true });

    res.render("post", {
      singlePost,
      logged_in: req.session.logged_in,
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
  res.render("signUp");
});

module.exports = router;
