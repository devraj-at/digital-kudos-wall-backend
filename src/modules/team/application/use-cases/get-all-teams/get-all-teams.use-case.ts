import { Result } from "../../../../../shared/core/result";
import { TeamRepository } from "../../../domain/team.repository";
import { TeamDTO } from "../../dto/team.dto";
import { ValidationError } from "../../../../user/domain/errors/validation.error";

export type GetAllTeamsResponse = Result<TeamDTO[], string | ValidationError>;

export class GetAllTeamsUseCase {
  constructor(private readonly teamRepository: TeamRepository) {}

  async execute(): Promise<GetAllTeamsResponse> {
    try {
      const teams = await this.teamRepository.findAll();

      return Result.ok(teams);
    } catch (error) {
      return Result.fail<TeamDTO[], string>("Error fetching teams");
    }
  }
}
