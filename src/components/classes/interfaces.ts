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
}

export interface UserInfo extends User {
  email: string;
  interests: UserInterest[];
}

interface PostingNotification {
  postingId: { _id: string; title: string; type: "sell" | "buy" };
  isViewed: string;
}

export interface UserWithNotification extends UserInfo {
  notifications: PostingNotification[];
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
  sender: User;
  receiver: User;

  posting: {
    _id: string;
    title: string;
    author: string;
  };
  messages: Message[];
}

export interface BggSearchResult {
  id: string;
  name: string;
  year?: string;
}

export interface BggData {
  id: string;
  name: string;
  year?: string;
}

export interface BggItem {
  attributes: { id: string };
  children: [
    { name: "name"; attributes: { value: string } },
    { name: "yearpublished"; attributes: { value: string } }?,
  ];
}

export interface BggResponse {
  children: BggItem[];
}
