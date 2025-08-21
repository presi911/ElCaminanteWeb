import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';

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
    productType: 0
  };
  selectedFile: File | null = null;
  imagePreview: string | null = null;
  uploading = false;

  constructor(
    private productService: ProductService,
    private toastr: ToastrService,
    private http: HttpClient
  ) {}

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];

      // Mostrar preview
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview = e.target.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  async uploadImageToCloudinary(file: File): Promise<string | null> {
    const url = 'https://api.cloudinary.com/v1_1/productsonline/image/upload';
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'productos');

    try {
      this.uploading = true;
      const response: any = await this.http.post(url, formData).toPromise();
      this.uploading = false;
      return response.secure_url;
    } catch (error) {
      this.uploading = false;
      this.toastr.error('Error al subir la imagen a Cloudinary');
      return null;
    }
  }

  async onSubmit(productForm: NgForm) {
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

    // Subir imagen si hay archivo seleccionado
    if (this.selectedFile) {
      const imageUrl = await this.uploadImageToCloudinary(this.selectedFile);
      if (imageUrl) {
        this.product.imageUrl = imageUrl;
      } else {
        return; // Si falla la subida, no continúes
      }
    }

    this.productService.createProduct(this.product).subscribe({
      next: () => {
        this.toastr.success('Producto guardado exitosamente.', '¡Éxito!', {
          timeOut: 3000,
          progressBar: true,
          positionClass: 'toast-top-right'
        });
        productForm.resetForm({ productType: 0 });
        this.imagePreview = null;
        this.selectedFile = null;
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
