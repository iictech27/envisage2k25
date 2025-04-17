import { Router } from "express";
import {
  createParticipantRegistration,
  getAllProblemStatements,
} from "../controllers/participant.js";
const participantRouter = Router();

participantRouter.get(
  "/participant/getProblemStatements",
  getAllProblemStatements
);
participantRouter.post("/participant/register", createParticipantRegistration);

export default participantRouter;
