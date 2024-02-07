import { ProductService } from './../../services/product.service';
import { Product } from './../../models/Product';
import { Category } from './../../models/Category';
import { CategoryService } from './../../services/category.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  categoryId!: number;
  product: Product = {
    name: '',
    description: '',
    price: 0,
    image: null,
  };
  sendedProduct: Product = {
    name: '',
    description: '',
    price: 0,
    image: null,
  };
  categories: any;
  error: any = [];
  file!: File;
  constructor(
    private categoryService: CategoryService,
    private productService: ProductService
  ) {}
  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getCategories().subscribe((res) => {
      this.categories = res;
    });
  }

  uploadFile(event: any) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
    } else {
      return;
    }
  }

  addProduct() {
    this.sendedProduct.description = this.product.description;
    this.sendedProduct.name = this.product.name;
    this.sendedProduct.price = this.product.price;

    const formData = new FormData();
    // formData.append('name', this.product.name);
    // formData.append('description', this.product.description);
    // formData.append('price', this.product.price.toString());
    formData.append(
      'product',
      new Blob([JSON.stringify(this.sendedProduct)], {
        type: 'application/json',
      })
    );

    if (this.file) {
      formData.append('image', this.file);
    }
    this.productService.addProduct(this.categoryId, formData).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        this.handelError(err);
      }
    );
  }

  handelError(error: any) {
    this.error = error.error;
  }
}
