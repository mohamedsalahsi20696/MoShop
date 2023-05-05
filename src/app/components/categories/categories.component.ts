import { Component, OnInit } from '@angular/core';
import { CategoryService } from './../../services/category.service';
import { category } from 'src/app/interfaces/user-data';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  categories: category[] = [];
  page: number = 1;
  limit: number = 0;
  count: number = 0;

  constructor(private _CategoryService: CategoryService) { }

  ngOnInit(): void {
    this.getAllCategories(1);
  }

  getAllCategories(numberOfPages: number) {
    this._CategoryService.getAllCategories(numberOfPages).subscribe({
      next: (res) => {
        this.page = res.metadata.currentPage;
        this.limit = res.metadata.limit;
        this.count = res.results;
        this.categories = res.data;
      },
      error: (myError) => {

      },
      complete: () => {

      }
    })
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getAllCategories(this.page);
  }

  onTableSizeChange(event: any): void {
    this.limit = event;
    this.page = 1;
    this.getAllCategories(this.page);
  }

}
