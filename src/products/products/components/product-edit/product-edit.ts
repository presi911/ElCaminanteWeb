import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';

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
  selectedFile: File | null = null;
  imagePreview: string | null = null;
  uploading = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private toastr: ToastrService,
    private router: Router,
    private http: HttpClient
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

  async onSubmit() {
    // Si el usuario seleccionó una nueva imagen, súbela a Cloudinary
    if (this.selectedFile) {
      const imageUrl = await this.uploadImageToCloudinary(this.selectedFile);
      if (imageUrl) {
        this.product.imageUrl = imageUrl;
      } else {
        return; // Si falla la subida, no continúes
      }
    }

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
