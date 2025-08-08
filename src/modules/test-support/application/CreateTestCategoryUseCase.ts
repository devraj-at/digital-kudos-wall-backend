import { PrismaClient } from "@prisma/client";
import { prisma } from "../../../shared/infrastructure/persistence/prisma/client";
import { CategoryDTO } from "../../category/application/dto/category.dto";

export interface CreateTestCategoryDTO {
  name: string;
}

export class CreateTestCategoryUseCase {
  private readonly prisma: PrismaClient;

  constructor(prismaClient: PrismaClient = prisma) {
    this.prisma = prismaClient;
  }

  async execute(data: CreateTestCategoryDTO): Promise<CategoryDTO> {
    try {
      // Check if category with this name already exists
      const existingCategory = await this.prisma.category.findUnique({
        where: { name: data.name },
      });

      if (existingCategory) {
        return {
          id: existingCategory.id,
          name: existingCategory.name,
        };
      }

      // Create new category
      const category = await this.prisma.category.create({
        data: {
          name: data.name,
        },
      });

      return {
        id: category.id,
        name: category.name,
      };
    } catch (error) {
      console.error("Error creating test category:", error);
      throw new Error(`Failed to create test category: ${(error as Error).message}`);
    }
  }
}
