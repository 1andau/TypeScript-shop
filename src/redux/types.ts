

export type Books = {
    imageLink: string;
    title: string;
    author: string;
  id: string;
  count: number;
  price: number;
  category: string;
}

export enum Status  {
    LOADING = 'loading',
    SUCCESS = 'completed',
    ERROR = 'error',
}


export interface BooksSliceState  {
    items: [];
    status: Status;
}
