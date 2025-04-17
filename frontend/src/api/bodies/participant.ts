export interface Problem {
  _id: number;
  title: string;
  problemCode: string;
  description: string;
  category: string;
  overview: string;
}

export interface ResProblemStatements {
  problems: Problem[];
  status: number;
  message: string;
}

export interface ReqParticipantRegistration {
  teamName: string;
  problemCode: string;
  leaderName: string;
  leaderEmail: string;
  member1Name: string;
  member1Email: string;
  member2Name: string;
  member2Email: string;
  member3Name: string;
  member3Email: string;
  member4Name: string;
  member4Email: string;
}
