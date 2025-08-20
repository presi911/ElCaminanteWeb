import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
  standalone: true,
  imports: [RouterModule] // <-- IMPORTANTE
})
export class AdminDashboard {}