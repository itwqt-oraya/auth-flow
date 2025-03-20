export type LIST<T> = {
  data: T[];
  meta: Meta;
};

export type Meta = {
  totalPages: number;
  totalRows?: number;
  limit: number;
  offset: number;
  order: string;
  orderBy: string;
};
