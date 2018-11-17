export interface CommentSchema {
  thread: string;
  author?: string;
  content: string;
  date: number;
  file?: string;
}
