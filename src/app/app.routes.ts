import { Routes } from '@angular/router';
import { AdminDashboard } from '../admin-dashboard/admin-dashboard';
import { ProductCreate } from '../products/products/components/product-create/product-create';
import { ProductList } from '../products/products/components/product-list/product-list';
import { ProductEdit } from '../products/products/components/product-edit/product-edit'; // Asegúrate de importar el componente

export const routes: Routes = [
  { path: '', component: AdminDashboard },
  { path: 'crear-producto', component: ProductCreate },
  { path: 'productos', component: ProductList },
  // @ts-expect-error
  { path: 'editar-producto/:id', component: ProductEdit, renderMode: 'default' }, // Desactiva prerendering aquí
];
