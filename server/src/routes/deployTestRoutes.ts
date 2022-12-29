import express from "express";
const router = express();

router.get("/", (req, res) => {
  return res.json({ msg: "success" });
});

export default router;
