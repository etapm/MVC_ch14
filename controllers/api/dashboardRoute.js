const { User, Post, Comment } = require("../../models");
const withAuth = require("../../utils/auth");
const express = require("express");
const router = express.Router();

router.get("/dashboard", withAuth, async (req, res) => {
  try {
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.get("/dashboard/posts", withAuth, async (req, res) => {
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

    const posts = postData.map((post) => post.get({ plain: true }));

    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
