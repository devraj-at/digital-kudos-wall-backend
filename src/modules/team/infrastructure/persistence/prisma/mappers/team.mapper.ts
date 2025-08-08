import { Team as PrismaTeam } from "@prisma/client";
import { TeamDTO } from "../../../../application/dto/team.dto";

export class TeamMapper {
  public static toDTO(raw: PrismaTeam): TeamDTO {
    return {
      id: raw.id,
      name: raw.name,
    };
  }
}
