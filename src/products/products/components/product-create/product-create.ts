import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.html',
  styleUrl: './product-create.css',
  standalone: true,
  imports: [FormsModule, NgIf, RouterModule]
})
export class ProductCreate {
  product = {
    name: '',
    description: '',
    price: 0,
    availableStock: 0,
    imageUrl: ''
  };
  selectedFile: File | null = null;

  constructor(
    private productService: ProductService,
    private toastr: ToastrService
  ) {}

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit() {
    // Validación simple
    if (!this.product.name || !this.product.description || !this.product.price || !this.product.availableStock) {
      this.toastr.warning('Por favor, completa todos los campos obligatorios.', 'Formulario incompleto', {
        timeOut: 4000,
        progressBar: true,
        positionClass: 'toast-top-right'
      });
      return;
    }

    if (!this.product.imageUrl) {
      this.product.imageUrl = 'https://res.cloudinary.com/demo/image/upload/v1690000000/default-shoe.png';
    }

    this.productService.createProduct(this.product).subscribe({
      next: () => {
        this.toastr.success('Producto guardado exitosamente.', '¡Éxito!', {
          timeOut: 3000,
          progressBar: true,
          positionClass: 'toast-top-right'
        });
        // Limpia el formulario si quieres
        this.product = { name: '', description: '', price: 0, availableStock: 0, imageUrl: '' };
      },
      error: () => {
        this.toastr.error('Ocurrió un error al guardar el producto.', 'Error', {
          timeOut: 4000,
          progressBar: true,
          positionClass: 'toast-top-right'
        });
      }
    });
  }
}
