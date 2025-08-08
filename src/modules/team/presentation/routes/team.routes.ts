import { Router, Request, Response } from "express";
import { GetAllTeamsUseCase } from "../../application/use-cases/get-all-teams/get-all-teams.use-case";
import { TeamController } from "../controllers/team.controller";

interface TeamRoutesDependencies {
  getAllTeamsUseCase: GetAllTeamsUseCase;
}

const setupTeamRoutes = (dependencies: TeamRoutesDependencies): Router => {
  const router = Router();
  const teamController = new TeamController(dependencies.getAllTeamsUseCase);

  router.get("/", async (req: Request, res: Response) => {
    const result = await teamController.handle(req);
    res.status(result.statusCode).json(result.body);
  });

  return router;
};

export default setupTeamRoutes;
