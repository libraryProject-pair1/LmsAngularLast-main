import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Category } from '../../../../models/Category';
import { CategoryService } from '../../../../services/category.service';
import { ToastrService } from 'ngx-toastr';
import { BaseInputErrorsComponent } from '../../../../../core/components/base-input-errors/base-input-errors.component';

@Component({
  selector: 'app-category-add',
  standalone: true,
  imports: [CommonModule,RouterModule,FormsModule,ReactiveFormsModule,BaseInputErrorsComponent],
  templateUrl: './category-add.component.html',
  styleUrl: './category-add.component.scss'
})
export class CategoryAddComponent {
  categoryAddForm!:FormGroup;
  categories:Category[]=[];

 
  constructor(private formBuilder:FormBuilder,
   private categoryService: CategoryService,
   private toastr: ToastrService){}
 
   ngOnInit():void{
    this.createCategoryAddForm();
 
   }

   createCategoryAddForm(){
     this.categoryAddForm=this.formBuilder.group({
       categoryName:["",[Validators.required, Validators.minLength(2)]],
     })
   }
   addToDb():void{
     if(this.categoryAddForm.valid){
       const formData:Category=this.categoryAddForm.value;
       console.log(formData.categoryName);
       this.categoryService.add(formData).subscribe(
        (response) => {
          console.log("response", response);
          this.toastr.success(formData.categoryName.toUpperCase() + " başarıyla eklendi");
        },
        (error) => {
          if (error.status === 500) {
            this.toastr.info("Eklemeye çalıştığınız veri zaten mevcut!");
          } else {
            this.toastr.error("Beklenmeyen bir hata oluştu, lütfen tekrar deneyin.");
          }
        }
      );
    } else {
      this.toastr.info("Lütfen geçerli bir kitap formu doldurun!");
    }
   }
}
