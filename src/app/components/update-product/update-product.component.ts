import { Product } from './../../models/Product';
import { CategoryService } from './../../services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css'],
})
export class UpdateProductComponent implements OnInit {
  id: number = this.activated.snapshot.params['id'];
  categories: any;
  imagePreview: string | ArrayBuffer | null = null;
  existingImage: string | null = null;
  imgChanged = false;
  selectedFile: any;
  updateForm!: FormGroup;
  sendedProduct: Product = {
    name: '',
    description: '',
    price: 0,
    image: null,
  };
  constructor(
    private productService: ProductService,
    private activated: ActivatedRoute,
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.updateForm = this.fb.group({
      categoryId: [null, Validators.required],
      name: [null, Validators.required],
      description: [null, Validators.required],
      price: [null, Validators.required],
    });
    this.getProductById();
    this.getCategories();
  }

  get product() {
    return this.updateForm.controls;
  }

  getCategories() {
    this.categoryService.getCategories().subscribe((res) => {
      this.categories = res;
    });
  }

  getProductById() {
    this.productService.getProductById(this.id).subscribe((res) => {
      const product = res;

      this.existingImage = 'data:image/jpg;base64,' + product.returnedImage;
      this.updateForm.patchValue(product);
      this.updateForm.get('categoryId')?.setValue(res.categoryId.toString());
    });
  }

  updateProduct() {
    this.sendedProduct.name = this.updateForm.get('name')?.value;
    this.sendedProduct.description = this.updateForm.get('description')?.value;
    this.sendedProduct.price = this.updateForm.get('price')?.value;

    const productDTO = new FormData();
    if (this.imgChanged) {
      productDTO.append('image', this.selectedFile);
    }

    productDTO.append(
      'product',
      new Blob([JSON.stringify(this.sendedProduct)], {
        type: 'application/json',
      })
    );

    this.productService
      .updateProduct(
        this.updateForm.get('categoryId')?.value,
        this.id,
        productDTO
      )
      .subscribe((res) => {
        console.log(res);
        this.router.navigateByUrl('products');
      });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.previewImage();
    this.imgChanged = true;
    this.existingImage = null;
  }

  previewImage() {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }
}
