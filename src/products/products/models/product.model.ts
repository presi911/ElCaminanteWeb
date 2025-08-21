export interface Product {
  id?: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  availableStock: number;
  size: string;
  color: string;
  rating: number;
  material: string;
  productType: number; // Enviar 0 para ShoeStore
}