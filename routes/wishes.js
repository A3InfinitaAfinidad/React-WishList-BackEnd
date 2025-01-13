import { Router } from "express";
import { WishController } from "../controller/wish.js";
const router = Router();

let wishes = []; // Temporary in-memory storage
let idCounter = 1;

// GET all wishes
router.get("/", WishController.getAll);

// POST a new wish
router.post("/",WishController.create);

// DELETE a wish
router.delete("/:id",WishController.delete);


// PUT a wish
router.put("/:id",WishController.update);

export default router;
