export type Note = {
  title?: string;
  path: string;
  deadline_at?: number;
  body: string;
  is_pinned: boolean;
  tag_ids: string[];
};
