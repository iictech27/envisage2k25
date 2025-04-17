export interface ReqParticipantRegistrationBody {
  teamName: string;
  problemCode: string;

  leaderName: string;
  leaderEmail: string;

  member1Name: string;
  member1Email: string;

  member2Name?: string;
  member2Email?: string;

  member3Name?: string;
  member3Email?: string;

  member4Name?: string;
  member4Email?: string;
}

export interface ResParticipantRegistrationBody {
  status: number;
  message: string;
  teamID: string;
  teamName: string;
  problemCode: string;
  details: string;
}
