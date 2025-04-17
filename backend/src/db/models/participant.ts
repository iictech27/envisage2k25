import { InferSchemaType, model, Schema } from "mongoose";
import dbCollections from "../collections.js";

const participantSchema = new Schema(
  {
    teamName: { type: String, required: true, unique: true },
    problemId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: dbCollections.problemStatementsCollection,
    },

    leaderName: { type: String, required: true },
    leaderEmail: { type: String, required: true },

    member1Name: { type: String, required: true },
    member1Email: { type: String, required: true },

    member2Name: { type: String },
    member2Email: { type: String },

    member3Name: { type: String },
    member3Email: { type: String },

    member4Name: { type: String },
    member4Email: { type: String },
  },
  {
    timestamps: true,
  }
);

type Participant = InferSchemaType<typeof participantSchema>;
const ParticipantModel = model<Participant>(
  dbCollections.participantsCollection,
  participantSchema
);

export default ParticipantModel;
