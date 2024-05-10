import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Category } from '../../../../models/Category';
import { CategoryService } from '../../../../services/category.service';

@Component({
  selector: 'app-category-add',
  standalone: true,
  imports: [CommonModule,RouterModule,FormsModule,ReactiveFormsModule],
  templateUrl: './category-add.component.html',
  styleUrl: './category-add.component.scss'
})
export class CategoryAddComponent {
  categoryAddForm!:FormGroup;
  categories:Category[]=[];

 
  constructor(private formBuilder:FormBuilder,
   private categoryService: CategoryService){}
 
   ngOnInit():void{
    this.createCategoryAddForm();
 
   }

   createCategoryAddForm(){
     this.categoryAddForm=this.formBuilder.group({
       categoryName:["", (Validators.required, Validators.minLength(2))]
     })
   }
   addToDb():void{
     if(this.categoryAddForm.valid){
       const formData:Category=this.categoryAddForm.value;
       console.log(formData.categoryName);
       this.categoryService.add(formData).subscribe(
        (response) => {
          console.log("response", response);
          alert(formData.categoryName.toUpperCase() + " başarıyla eklendi");
        },
        (error) => {
          if (error.status === 500) {
            alert("Eklemeye çalıştığınız veri zaten mevcut!");
          } else {
            alert("Beklenmeyen bir hata oluştu, lütfen tekrar deneyin.");
          }
        }
      );
    } else {
      alert("Lütfen geçerli bir kitap formu doldurun!");
    }
   }
}
