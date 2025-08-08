import { Router, Request, Response } from "express";
import { GetAllCategoriesUseCase } from "../../application/use-cases/get-all-categories/get-all-categories.use-case";
import { CategoryController } from "../controllers/category.controller";

interface CategoryRoutesDependencies {
  getAllCategoriesUseCase: GetAllCategoriesUseCase;
}

const setupCategoryRoutes = (dependencies: CategoryRoutesDependencies): Router => {
  const router = Router();
  const categoryController = new CategoryController(dependencies.getAllCategoriesUseCase);

  router.get("/", async (req: Request, res: Response) => {
    const result = await categoryController.handle(req);
    res.status(result.statusCode).json(result.body);
  });

  return router;
};

export default setupCategoryRoutes;
