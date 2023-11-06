export interface Thread {
  id: number;
  account: number;
  content: string;
  date: Date;
  parent_id: number | null;
  responses?: Thread[];
  email: string;
}
