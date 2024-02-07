import { Router } from '@angular/router';
import { AdminStatusService } from './../../services/admin-status.service';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  productsfiltred: any;
  products: any;
  adminLoggedIn: boolean = false;
  searchProduct: string = '';
  constructor(
    private adminStatusService: AdminStatusService,
    private router: Router,
    private productService: ProductService
  ) {}
  ngOnInit(): void {
    this.adminStatusService.authStatus.subscribe(
      (value) => (this.adminLoggedIn = value)
    );

    this.productService.getProducts().subscribe((res) => {
      console.log(res);
      // this.products = res;
      // this.productsfiltred = res;
    });
  }

  searchCategoryMethod() {
    if (this.searchProduct != '') {
      this.productsfiltred = this.products.filter((category: any) => {
        return category.name
          .toLowerCase()
          .includes(this.searchProduct.toLowerCase());
      });
    } else {
      this.productsfiltred = this.products;
    }
  }

  toAddProduct() {
    this.router.navigateByUrl('add-product');
  }
}
