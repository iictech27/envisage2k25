import { InferSchemaType, model, Schema } from "mongoose";
import dbCollections from "../collections.js";

const problemStatementSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    overview: { type: String, required: true },
    category: { type: String, required: true },
    problemCode: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

type ProblemStatement = InferSchemaType<typeof problemStatementSchema>;
const ProblemStatementModel = model<ProblemStatement>(
  dbCollections.problemStatementsCollection,
  problemStatementSchema
);

export default ProblemStatementModel;
