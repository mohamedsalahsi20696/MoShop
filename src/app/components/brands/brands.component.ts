import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { brand } from 'src/app/interfaces/user-data';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent {

  brands: brand[] = [];

  page: number = 1;
  limit: number = 0;
  count: number = 0;

  constructor(private _BrandService: BrandService) { }

  ngOnInit(): void {
    this.getAllBrands(1);
  }

  getAllBrands(numberOfPages: number) {
    this._BrandService.getAllBrands(numberOfPages).subscribe({
      next: (res) => {
        console.log(res);
        this.page = res.metadata.currentPage;
        this.limit = res.metadata.limit;
        this.count = res.results;
        this.brands = res.data;
      },
      error: (myError) => {
        console.log(myError);
      },
      complete: () => {

      }
    })
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getAllBrands(this.page);
  }

  onTableSizeChange(event: any): void {
    this.limit = event;
    this.page = 1;
    this.getAllBrands(this.page);
  }

}
