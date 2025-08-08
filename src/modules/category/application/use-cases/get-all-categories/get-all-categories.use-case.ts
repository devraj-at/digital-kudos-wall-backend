import { Result } from "../../../../../shared/core/result";
import { CategoryRepository } from "../../../domain/category.repository";
import { CategoryDTO } from "../../dto/category.dto";
import { ValidationError } from "../../../../user/domain/errors/validation.error";

export type GetAllCategoriesResponse = Result<CategoryDTO[], string | ValidationError>;

export class GetAllCategoriesUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(): Promise<GetAllCategoriesResponse> {
    try {
      const categories = await this.categoryRepository.findAll();

      return Result.ok(categories);
    } catch (error) {
      return Result.fail<CategoryDTO[], string>("Error fetching categories");
    }
  }
}