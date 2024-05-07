import express from "express";
import { RecipeController } from "../controllers/RecipeController";
import { recipeValidator } from "../middlewares/recipeValidator";

const router = express.Router();

router.get("", RecipeController.index);
router.get("/:id", RecipeController.show);
router.post("", recipeValidator, RecipeController.store);
router.patch("/:id", recipeValidator, RecipeController.update);
router.delete("/:id", RecipeController.destroy);

export default router;
