import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'seeMore'
})
export class SeeMorePipe implements PipeTransform {

  transform(title: string | undefined, limit: number): unknown {
    return title?.split(' ').slice(0, limit).join(' ');
  }

}
