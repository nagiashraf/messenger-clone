export type User = {
  id: number;
  name: string;
  email: string;
  image_url?: string;
}

export type Conversation = {
  id: number;
  last_message_at: Date;
  name?: string;
  is_group?: boolean;
  users?: User[];
  messages?: Message[];
}

export type Message = {
  id: number;
  body: string;
  image_url?: string;
  sender?: User;
  seen_by?: User[];
  created_at: Date;
  conversation?: Conversation;
}

export type PageProps<
  T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
  auth: {
    user: User;
  };
};
