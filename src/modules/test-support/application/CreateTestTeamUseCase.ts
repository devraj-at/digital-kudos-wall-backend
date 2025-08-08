import { PrismaClient } from "@prisma/client";
import { prisma } from "../../../shared/infrastructure/persistence/prisma/client";
import { TeamDTO } from "../../team/application/dto/team.dto";

export interface CreateTestTeamDTO {
  name: string;
}

export class CreateTestTeamUseCase {
  private readonly prisma: PrismaClient;

  constructor(prismaClient: PrismaClient = prisma) {
    this.prisma = prismaClient;
  }

  async execute(data: CreateTestTeamDTO): Promise<TeamDTO> {
    try {
      // Check if team with this name already exists
      const existingTeam = await this.prisma.team.findUnique({
        where: { name: data.name },
      });

      if (existingTeam) {
        return {
          id: existingTeam.id,
          name: existingTeam.name,
        };
      }

      // Create new team
      const team = await this.prisma.team.create({
        data: {
          name: data.name,
        },
      });

      return {
        id: team.id,
        name: team.name,
      };
    } catch (error) {
      console.error("Error creating test team:", error);
      throw new Error(`Failed to create test team: ${(error as Error).message}`);
    }
  }
}
