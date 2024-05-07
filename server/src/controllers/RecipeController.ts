import { Request, Response } from "express";
import Recipe from "../models/Recipe";

export const RecipeController = {
  index: async (req: Request, res: Response) => {
    const recipes = await Recipe.find();
    return res.json(recipes);
  },
  show: async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const recipe = await Recipe.findById(id);
      return res.json(recipe);
    } catch (error) {
      return res.json({ message: "Recipe not found." });
    }
  },
  store: async (req: Request, res: Response) => {
    const { title, description, ingredients } = req.body;
    const recipe = await Recipe.create({
      title,
      description,
      ingredients,
    });
    return res.status(200).json(recipe);
  },
  update: async (req: Request, res: Response) => {
    const { title, description, ingredients } = req.body;
    try {
      const id = req.params.id;
      const recipe = await Recipe.findById(id);
      if (!recipe) return;
      recipe.title = title;
      recipe.description = description;
      recipe.ingredients = ingredients;
      recipe.save();
      return res.status(200).json(recipe);
    } catch (error) {
      return res.status(400).json({ message: "Recipe not found." });
    }
  },
  destroy: async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      await Recipe.findByIdAndDelete(id);
      return res.json({ message: "recipe deleted" });
    } catch (error) {
      return res.json({ message: "Recipe not found." });
    }
  },
};
