export interface User {
  id: number;
  name: string;
  email: string;
  image_url?: string;
}

export type PageProps<
  T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
  auth: {
    user: User;
  };
};
