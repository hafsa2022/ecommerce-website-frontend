import { CategoryService } from './../../services/category.service';
import { Category } from './../../models/Category';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
})
export class AddCategoryComponent {
  category: Category;
  error: any = [];
  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) {
    this.category = new Category();
  }

  addCategory() {
    this.categoryService.addCategory(this.category).subscribe(
      (res) => {
        this.router.navigateByUrl('categories');
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
