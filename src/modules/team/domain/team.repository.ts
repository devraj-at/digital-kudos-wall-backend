import { TeamDTO } from "../application/dto/team.dto";

export interface TeamRepository {
  findAll(): Promise<TeamDTO[]>;
}
