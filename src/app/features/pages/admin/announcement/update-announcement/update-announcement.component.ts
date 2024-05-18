import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Announcement } from '../../../../models/Announcement';
import { AnnouncementService } from '../../../../services/Announcement.service';
import { ToastrService } from 'ngx-toastr';
import { Response } from '../../../../models/response';

@Component({
  selector: 'app-update-announcement',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,RouterModule],
  templateUrl: './update-announcement.component.html',
  styleUrl: './update-announcement.component.scss'
})
export class UpdateAnnouncementComponent {

  announcementUpdateForm!: FormGroup;
  getAnnouncements: Announcement[] = [];
  announcementId:any;

  
  
  
  constructor(
    private formBuilder: FormBuilder,
    public announcementService: AnnouncementService,
   private activeRoute: ActivatedRoute,
    private route: Router, 
    private toastr:ToastrService) { }


  ngOnInit(): void {
    
    this.getAnnouncementById();
    this.updateAnnouncementAddForm();
   
    
  }


  getAnnouncementById(){
    this.announcementId=this.activeRoute.snapshot.paramMap.get('id');
    this.announcementService.getById(this.announcementId).subscribe({
      next:(response:Response<Announcement>)=>{
        this.getAnnouncements=response.items;
        console.log("Response:",response);
      },
      error:(error)=>{
        console.log(error);
      },
      complete:()=>{}
   });
  }

  updateAnnouncementAddForm(){
    this.announcementUpdateForm= this.formBuilder.group({
      id:[this.announcementService.selectedAnnouncement.id],
      title:["",[Validators.required, Validators.minLength(2)]],
      description:["", (Validators.required)],
    
      
    })}

   
  onTitleChange(event:any){
    const selectedTitle = event.target.value;
     this.announcementUpdateForm.patchValue({
      title: selectedTitle
     })
   }



  updateToDb(): void {
    if (this.announcementUpdateForm.valid) {
      const formData: Announcement = this.announcementUpdateForm.value;
      console.log(formData.title);
      this.announcementService.editAnnouncement(formData).subscribe((response) => {
        console.log("response", response);
        this.toastr.success(formData.title.toUpperCase() + " başarıyla güncellendi");
      }
      );
    }
  }

  onDescriptionChange(event:any){
    const selectedDescription = event.target.value;
     this.announcementUpdateForm.patchValue({
      identity: selectedDescription
     })
   }
  
   

}
