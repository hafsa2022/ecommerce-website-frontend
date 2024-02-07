import { AdminStatusService } from './../../services/admin-status.service';
import { CategoryService } from './../../services/category.service';
import { Router } from '@angular/router';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  categoriesfiltred: any;
  categories: any;
  searchCategory: string = '';
  adminLoggedIn: boolean = false;
  constructor(
    private router: Router,
    private categoryService: CategoryService,
    private adminStatusService: AdminStatusService
  ) {}
  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((res) => {
      this.categories = res;
      this.categoriesfiltred = res;
    });

    this.adminStatusService.authStatus.subscribe(
      (value) => (this.adminLoggedIn = value)
    );
  }

  searchCategoryMethod() {
    if (this.searchCategory != '') {
      this.categoriesfiltred = this.categories.filter((category: any) => {
        return category.name
          .toLowerCase()
          .includes(this.searchCategory.toLowerCase());
      });
      // .slice(0, 5)
      // .sort((a: any, b: any) => b.id - a.id);
    } else {
      this.categoriesfiltred = this.categories;
    }
  }

  toAddCategory() {
    this.router.navigateByUrl('add-category');
  }
}
