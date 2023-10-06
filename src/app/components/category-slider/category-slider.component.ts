import { CategoryService } from './../../services/category.service';
import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { category } from 'src/app/interfaces/user-data';

@Component({
  selector: 'app-category-slider',
  templateUrl: './category-slider.component.html',
  styleUrls: ['./category-slider.component.scss']
})
export class CategorySliderComponent implements OnInit {

  categories: category[] = [];

  constructor(private _CategoryService: CategoryService) { }

  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    autoplayTimeout: 1500,
    mouseDrag: true,
    touchDrag: false,
    autoplayHoverPause: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['<i class="fa-solid fa-chevron-left text-black"></i>', '<i class="fa-solid fa-chevron-right text-black"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 3
      },
      740: {
        items: 4
      },
      940: {
        items: 7
      }
    },
    nav: true
  }

  ngOnInit(): void {
    this._CategoryService.getAllCategories(1).subscribe({
      next: (res) => {
        this.categories = res.data;
      }
    })
  }
}
