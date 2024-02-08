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

export interface Message {
  _id: string;
  message: string;
  sentBy: string;
  isViewed: boolean;
  createdAt: Date;
}

export interface Chat {
  _id: string;
  sender: {
    _id: string;
    name: string;
  };
  receiver: {
    _id: string;
    name: string;
  };
  posting: {
    _id: string;
    title: string;
    author: string;
  };
  messages: Message[];
}
