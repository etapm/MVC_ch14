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

module.exports = router;
