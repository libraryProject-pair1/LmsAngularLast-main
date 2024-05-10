import { Pipe, PipeTransform } from '@angular/core';
import { Author } from '../models/Author';

@Pipe({
  name: 'author',
  standalone: true
})
export class AuthorPipe implements PipeTransform {

  transform(value: Author[], authorFilter:string): Author[] {
   authorFilter=authorFilter?authorFilter.toLowerCase():""
   return authorFilter?value.filter((a:Author)=>a.name.toLocaleLowerCase().indexOf(authorFilter)!==-1):value;

  }

}
