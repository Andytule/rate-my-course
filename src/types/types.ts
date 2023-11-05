export interface Post {
  id: number;
  account: number;
  content: string;
  date: Date;
  parent_id: number | null;
  responses?: Post[];
  email: string;
}
