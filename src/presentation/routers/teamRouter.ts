import { Request, Response, Router } from "express";
import { CreateTeamUseCase } from "../../domain/interfaces/useCases/teams/createTeam";
import { DeleteTeamUseCase } from "../../domain/interfaces/useCases/teams/deleteTeam";
import { GetAllTeamsUseCase } from "../../domain/interfaces/useCases/teams/getAllTeams";
import { GetTeamByIdUseCase } from "../../domain/interfaces/useCases/teams/getTeamById";
import { UpdateTeamUseCase } from "../../domain/interfaces/useCases/teams/updateTeam";

export function TeamRouter(
  getAllTeamsUseCase: GetAllTeamsUseCase,
  getTeamByIdUseCase: GetTeamByIdUseCase,
  createTeamUseCase: CreateTeamUseCase,
  deleteTeamUseCase: DeleteTeamUseCase,
  updateTeamUseCase: UpdateTeamUseCase
) {
  const teamRouter = Router();

  teamRouter.get("/", async (req: Request, res: Response) => {
    try {
      const result = await getAllTeamsUseCase.execute();
      res.status(200).send(result);
    } catch (err) {
      res.status(500).send({ message: "Error fetching teams" });
    }
  });

  teamRouter.get("/:id", async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const result = await getTeamByIdUseCase.execute(id);
      res.status(200).send(result);
    } catch (err) {
      res.status(500).send({ message: "Error fetching team" });
    }
  });

  teamRouter.post("/", async (req: Request, res: Response) => {
    try {
      await createTeamUseCase.execute(req.body);
      res.status(201).send({ message: "Team created successfully" });
    } catch (err) {
      res.status(500).send({ message: "Error creating team" });
    }
  });

  teamRouter.delete("/", async (req: Request, res: Response) => {
    try {
      const { id } = req.body;
      await deleteTeamUseCase.execute(id);
      res.status(204).end();
    } catch (err) {
      res.status(500).send({ message: "Error deleting team" });
    }
  });

  teamRouter.put("/", async (req: Request, res: Response) => {
    try {
      const { id, dataToUpdate } = req.body;
      await updateTeamUseCase.execute(id, dataToUpdate);
      res.status(200).send({ message: "Team updated successfully" });
    } catch (err) {
      res.status(500).send({ message: "Error updating team" });
    }
  });

  return teamRouter;
}
