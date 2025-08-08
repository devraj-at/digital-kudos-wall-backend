import { PrismaClient } from "@prisma/client";
import { CategoryDTO } from "../../../application/dto/category.dto";
import { CategoryRepository } from "../../../domain/category.repository";
import { CategoryMapper } from "./mappers/category.mapper";

export class PrismaCategoryRepository implements CategoryRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findAll(): Promise<CategoryDTO[]> {
    const categories = await this.prisma.category.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return categories.map(CategoryMapper.toDTO);
  }
}