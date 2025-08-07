import { Controller } from "../../../../shared/presentation/controller";
import { HttpResponse } from "../../../../shared/presentation/http-response";
import { Request } from "express";
import { CreateKudoDTO, CreateKudoUseCase } from "../../application/use-cases/create-kudos/create-kudos.use-case";

export class KudosController implements Controller<Request, any> {
  constructor(private readonly createKudoUseCase: CreateKudoUseCase) {}

  async handle(request: Request): Promise<HttpResponse<any>> {
    const { category, message, receiverName, senderName, teamName }: CreateKudoDTO = request.body;

    try {
      const result = await this.createKudoUseCase.execute({ category, message, receiverName, senderName, teamName });

      return HttpResponse.ok(result.getValue());
    } catch (error) {
      return HttpResponse.serverError(error);
    }
  }
}
