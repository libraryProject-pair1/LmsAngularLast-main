import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Announcement } from '../../../../models/Announcement';
import { AnnouncementService } from '../../../../services/Announcement.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-announcement',
  standalone: true,
  imports: [CommonModule,RouterModule,FormsModule,ReactiveFormsModule],
  templateUrl: './add-announcement.component.html',
  styleUrl: './add-announcement.component.scss'
})
export class AddAnnouncementComponent {
  announcementAddForm!:FormGroup;
  announcements:Announcement[]=[];

 
  constructor(private formBuilder:FormBuilder,
   private announcementService: AnnouncementService,
   private toastr: ToastrService){}
 
   ngOnInit():void{
    this.createAnnouncementAddForm();
 
   }

   createAnnouncementAddForm(){
     this.announcementAddForm=this.formBuilder.group({
       
       title:["", (Validators.required, Validators.minLength(2))],
       description:["", Validators.required],
     })
   }
   addToDb():void{
     if(this.announcementAddForm.valid){
       const formData:Announcement=this.announcementAddForm.value;
      // console.log(formData.title);
       this.announcementService.add(formData).subscribe(
        (response) => {
          console.log("response", response);
          this.toastr.success(formData.title.toUpperCase() + " başarıyla eklendi");
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
