
export type Category = {
  id: string;
  label: string;
  color: string;
};

export type Activity = {
  id: string;
  title: string;
  description: string;
  date: Date;
  time: string;
  categoryId: string;
};
