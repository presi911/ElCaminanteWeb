import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
  standalone: true,
  imports: [RouterModule] // <-- IMPORTANTE
})
export class AdminDashboard {
  totalProductos = 12;
  totalPedidos = 0; // Cuando tengas pedidos, cámbialo
  totalUsuarios = 1; // Si tienes usuarios/admins
  productosRecientes = [
    // Llena este array con los productos recientes desde tu backend
    // { name, description, imageUrl, createdAt }
  ];
}