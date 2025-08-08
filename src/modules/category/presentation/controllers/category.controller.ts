import { Controller } from "../../../../shared/presentation/controller";
import { HttpResponse } from "../../../../shared/presentation/http-response";
import { GetAllCategoriesUseCase } from "../../application/use-cases/get-all-categories/get-all-categories.use-case";
import { Request } from "express";

export class CategoryController implements Controller<Request, any> {
  constructor(private readonly getAllCategoriesUseCase: GetAllCategoriesUseCase) {}

  async handle(request: Request): Promise<HttpResponse<any>> {
    try {
      const result = await this.getAllCategoriesUseCase.execute();

      if (result.isSuccess) {
        return HttpResponse.ok(result.getValue());
      }

      return HttpResponse.serverError({
        message: result.error(),
      });
    } catch (error) {
      return HttpResponse.serverError({
        message: "An unexpected error occurred",
      });
    }
  }
}
