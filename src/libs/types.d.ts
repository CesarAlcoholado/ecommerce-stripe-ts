export interface ProductItem {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  quantity?: number
}

//********* Cart type *********

export interface CartContextProps {
  products: ProductItem[];
  addToCart: (id:number, image:string, name:string, category:string, price:number, quantity?:number)=>void
}

export interface CartProviderProps {
  children: React.Node
}