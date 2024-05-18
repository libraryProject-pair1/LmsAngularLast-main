import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Author } from '../../../../models/Author';
import { AuthorService } from '../../../../services/author.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { BaseInputComponent } from '../../../../../core/components/base-input/base-input.component';

@Component({
  selector: 'app-add-author',
  standalone: true,
  imports: [CommonModule,RouterModule,FormsModule,ReactiveFormsModule, BaseInputComponent],
  templateUrl: './add-author.component.html',
  styleUrl: './add-author.component.scss'
})
export class AddAuthorComponent {
  authorAddForm!:FormGroup;
  authors:Author[]=[];

 
  constructor(private formBuilder:FormBuilder,
   private authorService: AuthorService, private toastr: ToastrService){}
 
   ngOnInit():void{
    this.createAuthorAddForm();
 
   }

   createAuthorAddForm(){
     this.authorAddForm=this.formBuilder.group({
       name:['', [Validators.required, Validators.minLength(2),]],
       identityNumber:["", (Validators.required)],
       biography:["", (Validators.required)],
     })
   }
   addToDb():void{
     if(this.authorAddForm.valid){
       const formData:Author=this.authorAddForm.value;
       console.log(formData.name);
       this.authorService.add(formData).subscribe(
        (response) => {
          console.log("response", response);
          this.toastr.success(formData.name.toUpperCase() + " başarıyla eklendi.");
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
   


