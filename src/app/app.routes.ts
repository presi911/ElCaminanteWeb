import { Routes } from '@angular/router';
import { AdminDashboard } from '../admin-dashboard/admin-dashboard';
import { ProductCreate } from '../products/products/components/product-create/product-create';

export const routes: Routes = [
  { path: '', component: AdminDashboard },
  { path: 'crear-producto', component: ProductCreate },
];
