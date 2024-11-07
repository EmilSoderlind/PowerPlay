import express from "express";
import database from "../services/eventService";

const router = express.Router();

router.get("/", async (req, res) => {
  const page = parseInt(req.query.page as string) || undefined;
  const limit = parseInt(req.query.limit as string) || undefined;

  try {
    const events = await database.find(page, limit);
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: JSON.stringify(error) });
  }
});

export default router;
