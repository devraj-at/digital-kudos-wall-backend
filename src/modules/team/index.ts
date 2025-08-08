import { PrismaClient } from "@prisma/client";
import { GetAllTeamsUseCase } from "./application/use-cases/get-all-teams/get-all-teams.use-case";
import { PrismaTeamRepository } from "./infrastructure/persistence/prisma/prisma-team.repository";
import setupTeamRoutes from "./presentation/routes/team.routes";

export const setupTeamModule = (prisma: PrismaClient) => {
  // Infrastructure
  const teamRepository = new PrismaTeamRepository(prisma);

  // Application
  const getAllTeamsUseCase = new GetAllTeamsUseCase(teamRepository);

  // Presentation
  const teamRoutes = setupTeamRoutes({
    getAllTeamsUseCase,
  });

  return {
    routes: teamRoutes,
    useCases: {
      getAllTeamsUseCase,
    },
    repositories: {
      teamRepository,
    },
  };
};
