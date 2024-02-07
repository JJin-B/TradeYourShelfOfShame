export interface BggData {
  id: string;
  name: string;
  year?: string;
}

export interface PostingBggData extends BggData {
  type: "sell" | "buy";
  postingId: string;
}

export interface UserInterest {
  interestType: "sell" | "buy";
  id: string;
  name: string;
  year?: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  interests: UserInterest[];
}
