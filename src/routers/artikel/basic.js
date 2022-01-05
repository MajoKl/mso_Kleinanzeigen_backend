const router = new require("express").Router();

const Article = require("../models/Article");

router.post("/", auth(), async (req, res) => {});
router.get("/", auth(), async (req, res) => {});
