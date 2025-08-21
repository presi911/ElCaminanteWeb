import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.html',
  styleUrl: './product-edit.css',
  standalone: true,
  imports: [FormsModule, NgIf, RouterModule]
})
export class ProductEdit implements OnInit {
  product: any = null;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.getProductById(+id).subscribe({
        next: (data) => {
          this.product = data;
          this.loading = false;
        },
        error: () => {
          this.toastr.error('No se pudo cargar el producto.');
          this.router.navigate(['/productos']);
        }
      });
    }
  }

  onSubmit() {
    this.productService.updateProduct(this.product.id, this.product).subscribe({
      next: () => {
        this.toastr.success('Producto actualizado correctamente.');
        this.router.navigate(['/productos']);
      },
      error: () => {
        this.toastr.error('Error al actualizar el producto.');
      }
    });
  }
}
