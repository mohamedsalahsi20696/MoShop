import { Component, OnInit } from '@angular/core';
import { brand } from 'src/app/interfaces/user-data';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-slider',
  templateUrl: './brand-slider.component.html',
  styleUrls: ['./brand-slider.component.scss']
})
export class BrandSliderComponent implements OnInit {

  brands: brand[] = [];

  constructor(private _BrandService: BrandService) { }

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
    this._BrandService.getAllBrands(1).subscribe({
      next: (res) => {
        this.brands = res.data;
      }
    })
  }
}
