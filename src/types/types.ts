export interface Post {
  id: number;
  account: string;
  content: string;
  date: Date;
  parentId: number | null;
  responses?: Post[];
}
