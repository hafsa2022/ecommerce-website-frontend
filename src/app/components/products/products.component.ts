import { CartService } from './../../services/cart.service';
import { UserStatusService } from './../../services/user-status.service';
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
  productsfiltred: any[] = [];
  products: any[] = [];
  adminLoggedIn: boolean = false;
  userLoggedIn: boolean = false;
  searchProduct: string = '';
  constructor(
    private adminStatusService: AdminStatusService,
    private userStatusService: UserStatusService,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService
  ) {}
  ngOnInit(): void {
    this.adminStatusService.authStatus.subscribe(
      (value) => (this.adminLoggedIn = value)
    );

    this.userStatusService.authStatus.subscribe(
      (value) => (this.userLoggedIn = value)
    );

    this.getAllProducts();
  }

  getAllProducts() {
    this.products = [];
    this.productsfiltred = [];
    this.productService.getProducts().subscribe((res) => {
      res.forEach((element: any) => {
        element.processedImage =
          'data:image/jpg;base64,' + element.returnedImage;
        this.products?.push(element);
        this.productsfiltred.push(element);
      });
    });
  }

  searchProductMethod() {
    if (this.searchProduct != '') {
      this.productsfiltred = this.products.filter((product: any) => {
        if (product.name != null) {
          return product.name
            .toLowerCase()
            .includes(this.searchProduct.toLowerCase());
        }
      });
    } else {
      this.productsfiltred = this.products;
    }
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe((res) => {
      this.getAllProducts();
      // this.toastr.success('This product was deleted successfully', '', {
      //   timeOut: 2000,
      //   progressBar: true,
      // });
      // this.toastr.success('This product was deleted successfully!', '');
    });
  }

  toAddProduct() {
    this.router.navigateByUrl('add-product');
  }

  addProductToCart(productId: number) {
    this.cartService
      .addProductToCart(productId)
      .subscribe((res) => console.log(res));
  }
}
