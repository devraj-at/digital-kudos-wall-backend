import { Category as PrismaCategory } from "@prisma/client";
import { CategoryDTO } from "../../../../application/dto/category.dto";

export class CategoryMapper {
  public static toDTO(raw: PrismaCategory): CategoryDTO {
    return {
      id: raw.id,
      name: raw.name,
    };
  }
}