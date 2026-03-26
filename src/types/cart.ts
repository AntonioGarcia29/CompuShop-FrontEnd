export type CartItem = {
  id: string;
  productId: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
};

export type Cart = {
  items: CartItem[];
  total: number;
};
