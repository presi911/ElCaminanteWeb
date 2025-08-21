import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
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
    imageUrl: '',
    availableStock: 0,
    size: '',
    color: '',
    rating: 0,
    material: '',
    productType: 0 // ShoeStore por defecto
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

  onSubmit(productForm: NgForm) {
    // Validación simple
    if (
      !this.product.name ||
      !this.product.description ||
      !this.product.price ||
      !this.product.availableStock ||
      !this.product.size ||
      !this.product.color ||
      !this.product.rating ||
      !this.product.material
    ) {
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
        // Resetea el formulario y deja productType en 0
        productForm.resetForm({ productType: 0 });
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
