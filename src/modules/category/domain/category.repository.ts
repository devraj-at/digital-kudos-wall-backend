import { CategoryDTO } from "../application/dto/category.dto";

export interface CategoryRepository {
  findAll(): Promise<CategoryDTO[]>;
}