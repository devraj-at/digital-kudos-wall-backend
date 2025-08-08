import { PrismaClient } from "@prisma/client";
import { TeamDTO } from "../../../application/dto/team.dto";
import { TeamRepository } from "../../../domain/team.repository";
import { TeamMapper } from "./mappers/team.mapper";

export class PrismaTeamRepository implements TeamRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findAll(): Promise<TeamDTO[]> {
    const teams = await this.prisma.team.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return teams.map(TeamMapper.toDTO);
  }
}
