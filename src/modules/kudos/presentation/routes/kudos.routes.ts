import { Router, Request, Response } from "express";
import { KudosController } from "../controllers/kudos.controller";
import { CreateKudoUseCase } from "../../application/use-cases/create-kudos/create-kudos.use-case";

interface CreateKudoRoutesDependencies {
  createKudoUseCase: CreateKudoUseCase;
}

const setupCreateKudoRoutes = (dependencies: CreateKudoRoutesDependencies): Router => {
  const router = Router();
  const kudoController = new KudosController(dependencies.createKudoUseCase);

  router.post("/", async (req: Request, res: Response) => {
    const result = await kudoController.handle(req);
    res.status(result.statusCode).json(result.body);
  });

  return router;
};

export default setupCreateKudoRoutes;
