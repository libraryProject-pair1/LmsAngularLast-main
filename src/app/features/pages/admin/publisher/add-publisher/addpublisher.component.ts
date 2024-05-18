import { Component } from '@angular/core';
import { Publisher } from '../../../../models/publisher';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PublisherService } from '../../../../services/publisher.service'; 
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { BaseInputErrorsComponent } from '../../../../../core/components/base-input-errors/base-input-errors.component';

@Component({
  selector: 'app-add-publisher',
  standalone: true,
  imports: [CommonModule,RouterModule,FormsModule,ReactiveFormsModule, BaseInputErrorsComponent],
  templateUrl: './addpublisher.component.html',
  styleUrl: './addpublisher.component.scss'
})
export class AddPublisherComponent {
  publisherAddForm!:FormGroup;
 publisher:Publisher[]=[];

 constructor(private formBuilder:FormBuilder,
  private publisherService: PublisherService,
  private toastr:ToastrService){}

  ngOnInit():void{
   this.createPublisherAddForm();

  }
  createPublisherAddForm(){
    this.publisherAddForm=this.formBuilder.group({
      name:["",[Validators.required, Validators.minLength(2)]],
    })
  }
  addToDb():void{
    if(this.publisherAddForm.valid){
      const formData:Publisher=this.publisherAddForm.value;
      console.log(formData.name);
      this.publisherService.add(formData).subscribe(
        (response) => {
          console.log("response", response);
          this.toastr.success(formData.name.toUpperCase() + " başarıyla eklendi");
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
      this.toastr.info("Lütfen geçerli bir yayınevi formu doldurun!");
  }
  }
}