
export type CartItem = {
    imageLink: string;
    title: string;
    author: string;
  id: string;
  count: number;
  price: number;
  subtitle: string,
  name: string, 
  };
  
  export interface CartSliceState {
    totalPrice: number;
    items: CartItem[];
  };
  
 export  type DetailsProps = {
    imageLink: string;
    title: string;
    author: string;
  id: string;
  count: number;
  price: number;
  subtitle: string,
  name: string, 
  year:string, 
  language:string, 
  category: string, 
  country:string, 
  themes: string, 
  pages: string, 
  };
