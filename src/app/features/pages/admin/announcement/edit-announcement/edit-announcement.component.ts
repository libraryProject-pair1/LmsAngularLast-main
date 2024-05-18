import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Announcement } from '../../../../models/Announcement';
import { AnnouncementService } from '../../../../services/Announcement.service';
import { ResponseModel } from '../../../../models/responseModel';

@Component({
  selector: 'app-edit-announcement',
  standalone: true,
  imports: [CommonModule,RouterModule,FormsModule,ReactiveFormsModule],
  templateUrl: './edit-announcement.component.html',
  styleUrl: './edit-announcement.component.scss'
})
export class EditAnnouncementComponent {

  authorEditForm !: FormGroup ;
  announcementList:Announcement[]=[];
  today: Date = new Date();
  searchKey : string = ' ';

  constructor(private announcementService:AnnouncementService, private formBuilder: FormBuilder,private router:Router){}

  ngOnInit(): void {
   
    this.getAnnouncement();
   
    
  }

  getAnnouncement(){
    this.announcementService.getAll().subscribe({
      next:(response:ResponseModel<Announcement>)=>{
        console.log('backendden cevap geldi:',response);
        this.announcementList = response.items;
        console.log("AnnounncementList:",this.announcementList)
        this.announcementList.forEach(announcement=>{
          console.log(announcement.title);
         
        })
      },
      error : (error) =>{
        console.log('backendden hatalı cevap geldi.',error);
      },
      complete: () =>{
        console.log('backend isteği sonlandı.');
      }
    });
  }
/* 
  createCategoryEditForm(){
    this.categoryEditForm=this.formBuilder.group({
      categoryName:["",Validators.required, Validators.minLength(2)]
    })
  } */

  deleteAnnouncement(event:any,announcementId:number){
    if(confirm('Bu duyuruyu silmek istiyor musunuz ?')){
      event.target.innerText="Siliniyor...";
      this.announcementService.deleteAnnouncement(announcementId).subscribe((res:any)=>{
        this.getAnnouncement();
        console.log(res+" silindi.");
      });
    }
  }

  onSelectAnnouncement(announcement: Announcement) {
    this.announcementService.selectedAnnouncement = announcement; // Seçilen kitabı sakla
    this.router.navigate(['admin/editAnnouncement/update/:id']); 
    console.log("OnSelectedAuthor:",announcement);
  }

}
