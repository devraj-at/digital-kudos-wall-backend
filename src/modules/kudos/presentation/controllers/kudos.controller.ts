import { Controller } from "../../../../shared/presentation/controller";
import { HttpResponse } from "../../../../shared/presentation/http-response";
import { Request } from "express";
import { CreateKudoDTO, CreateKudoUseCase } from "../../application/use-cases/create-kudos/create-kudos.use-case";

export class KudosController implements Controller<Request, any> {
  constructor(private readonly createKudoUseCase: CreateKudoUseCase) {}

  async handle(request: Request): Promise<HttpResponse<any>> {
    const { categoryId, message, toUserId, fromUserId, teamId }: CreateKudoDTO = request.body;

    try {
      const result = await this.createKudoUseCase.execute({ categoryId, message, toUserId, fromUserId, teamId });

      return HttpResponse.ok(result.getValue());
    } catch (error) {
      return HttpResponse.serverError(error);
    }
  }
}
