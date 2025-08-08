import { Controller } from "../../../../shared/presentation/controller";
import { HttpResponse } from "../../../../shared/presentation/http-response";
import { GetAllTeamsUseCase } from "../../application/use-cases/get-all-teams/get-all-teams.use-case";
import { Request } from "express";

export class TeamController implements Controller<Request, any> {
  constructor(private readonly getAllTeamsUseCase: GetAllTeamsUseCase) {}

  async handle(request: Request): Promise<HttpResponse<any>> {
    try {
      const result = await this.getAllTeamsUseCase.execute();

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
