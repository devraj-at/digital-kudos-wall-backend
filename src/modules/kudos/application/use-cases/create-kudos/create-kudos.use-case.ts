import { Result } from "../../../../../shared/core/result";
import { UseCase } from "../../../../../shared/core/use-case";
import { KudoCard } from "../../../../user/domain/kudo.entity";
import { KudoCardRepository } from "../../../../user/domain/kudo.repository";

export interface CreateKudoDTO {
  teamName: string;
  message: string;
  senderName: string;
  receiverName: string;
  category: string;
}

export class CreateKudoUseCase
  implements UseCase<CreateKudoDTO, Result<string, string>>
{
  constructor(private kudoCardRepository: KudoCardRepository) {}

  async execute(request: CreateKudoDTO): Promise<Result<string, string>> {
    const kudoOrError = KudoCard.create({
      message: request.message,
      category: request.category,
      sender: request.senderName,
      receiver: request.receiverName,
      team: request.teamName,
    });

    const kudo = kudoOrError.getValue();
    await this.kudoCardRepository.save(kudo);

    return Result.ok<string, string>("Kudo created successfully");
  }
}
