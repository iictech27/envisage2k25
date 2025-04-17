import { RequestHandler } from "express";
import createHttpError from "http-errors";
import { httpCodes } from "../../util/httpCodes.js";
import ParticipantModel from "../../db/models/participant.js";
import ProblemStatementModel from "../../db/models/problem_statement.js";
import {
  ReqParticipantRegistrationBody,
  ResParticipantRegistrationBody,
} from "../bodies/participant.js";
import { logDebug, logInfo } from "../../util/logger.js";
import { sendMail } from "../services/email_handler.js";
import mailOptions from "../mails/team_registered.js";

export const createParticipantRegistration: RequestHandler<
  unknown,
  unknown,
  ReqParticipantRegistrationBody,
  unknown
> = async (req, res, next) => {
  const {
    teamName,
    problemCode,
    leaderName,
    leaderEmail,
    member1Name,
    member1Email,
    member2Name,
    member2Email,
    member3Name,
    member3Email,
    member4Name,
    member4Email,
  } = req.body;

  console.log(
    teamName,
    problemCode,
    leaderName,
    leaderEmail,
    member1Name,
    member1Email
  );

  try {
    // validate required fields
    if (
      !teamName?.trim() ||
      !problemCode?.trim() ||
      !leaderName?.trim() ||
      !leaderEmail?.trim() ||
      !member1Name?.trim() ||
      !member1Email?.trim()
    ) {
      throw createHttpError(
        httpCodes["400"].code,
        httpCodes["400"].message + ": Required fields missing!"
      );
    }

    // email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const allEmails = [
      leaderEmail,
      member1Email,
      member2Email,
      member3Email,
      member4Email,
    ].filter(Boolean);
    for (const email of allEmails) {
      if (!emailRegex.test(email as string)) {
        throw createHttpError(
          httpCodes["401"].code,
          httpCodes["401"].message + ": Invalid email format - " + email
        );
      }
    }

    // check if problemCode exists in ProblemStatement collection
    const problem = await ProblemStatementModel.findOne({ problemCode }).exec();
    if (!problem) {
      throw createHttpError(
        httpCodes["404"].code,
        httpCodes["404"].message + ": Problem statement not found!"
      );
    }

    // check if team with same name already exists
    const existingTeam = await ParticipantModel.findOne({ teamName }).exec();
    if (existingTeam) {
      throw createHttpError(
        httpCodes["409"].code,
        httpCodes["409"].message + ": Team name already registered!"
      );
    }

    // create new participant team
    const newTeam = await ParticipantModel.create({
      teamName,
      problemId: problem._id,
      leaderName,
      leaderEmail,
      member1Name,
      member1Email,
      member2Name,
      member2Email,
      member3Name,
      member3Email,
      member4Name,
      member4Email,
    });

    const mailRes = await sendMail(
      mailOptions(
        leaderEmail,
        newTeam.teamName,
        problem.title,
        problem.problemCode
      )
    );
    logDebug(
      "Mail Sending Response:",
      mailRes,
      "createParticipantRegistration @ controllers/participant.ts"
    );
    logInfo(
      `Mail sent to ${leaderEmail}`,
      "createParticipantRegistration @ controllers/participant.ts"
    );

    const response: ResParticipantRegistrationBody = {
      status: httpCodes["201"].code,
      message: httpCodes["201"].message,
      teamID: newTeam._id.toString(),
      teamName: newTeam.teamName,
      problemCode: problem.problemCode,
      details: "Team registered successfully!",
    };

    res.status(response.status).json(response);
  } catch (error) {
    next(error);
  }
};

export const getAllProblemStatements: RequestHandler = async (
  _req,
  res,
  next
) => {
  try {
    const problems = await ProblemStatementModel.find()
      .sort({ createdAt: -1 })
      .lean();

    if (!problems || problems.length === 0) {
      throw createHttpError(
        httpCodes["404"].code,
        httpCodes["404"].message + ": No problem statements found!"
      );
    }

    res.status(httpCodes["200"].code).json({
      status: httpCodes["200"].code,
      message: httpCodes["200"].message,
      problems,
    });
  } catch (error) {
    next(error);
  }
};
