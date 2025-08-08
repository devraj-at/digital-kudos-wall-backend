import { PrismaClient } from "@prisma/client";
import { GetAllCategoriesUseCase } from "./application/use-cases/get-all-categories/get-all-categories.use-case";
import { PrismaCategoryRepository } from "./infrastructure/persistence/prisma/prisma-category.repository";
import setupCategoryRoutes from "./presentation/routes/category.routes";

export const setupCategoryModule = (prisma: PrismaClient) => {
  // Infrastructure
  const categoryRepository = new PrismaCategoryRepository(prisma);

  // Application
  const getAllCategoriesUseCase = new GetAllCategoriesUseCase(categoryRepository);

  // Presentation
  const categoryRoutes = setupCategoryRoutes({
    getAllCategoriesUseCase,
  });

  return {
    routes: categoryRoutes,
    useCases: {
      getAllCategoriesUseCase,
    },
    repositories: {
      categoryRepository,
    },
  };
};