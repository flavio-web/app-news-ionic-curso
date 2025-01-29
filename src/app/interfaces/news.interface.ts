export interface ResponseNews {
  pagination: Pagination;
  data:       News[];
  error?: Error;
}

export interface News {
  author:       null | string;
  title:        string;
  description:  string;
  url:          string;
  source:       string;
  image:        null | string;
  category:     Category;
  language:     string;
  country:      string;
  published_at: Date;
}

export enum Category {
  General = "general",
}

export interface Pagination {
  limit:  number;
  offset: number;
  count:  number;
  total:  number;
}



export interface Error {
    code:    string;
    message: string;
    context: Context;
}

export interface Context {
    date: string[];
}
