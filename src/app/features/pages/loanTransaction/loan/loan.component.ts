import { Component, OnInit } from '@angular/core';
import { BookService } from '../../../services/book.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/Auth.service';
import { LoanTransaction } from '../../../models/loanTransaction';
import { LoanTransactionService } from '../../../services/loan-transaction.service';

@Component({
  selector: 'app-loan',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './loan.component.html',
  styleUrl: './loan.component.scss'
})
export class LoanComponent implements OnInit {
  constructor(public bookService: BookService, 
    public authService: AuthService,
    private formBuilder:FormBuilder,
    private loanService:LoanTransactionService) { }

  loanForm !: FormGroup;
  returnDate!: Date;

  ngOnInit(): void {
    this.loanBookForm();
  }
  loanBookForm(){
    this.loanForm = this.formBuilder.group({
      bookId:[this.bookService.selectedBook.id],
      memberId:[this.authService.loggedInMember?.id],
      returnStatus:[3], 
      returnTime:['',Validators.required]
    })}

    addToDb():void{
      if(this.loanForm.valid){
        const formData:LoanTransaction=this.loanForm.value;
        this.loanService.borrowed(formData).subscribe((response)=>{
          console.log("Ödünç alma bilgileri",response);
          alert(this.bookService.selectedBook.name+" isimli kitap "+ this.authService.loggedInMember?.email+" kullancısına ödünç verildi");
        }
      )}
    }


  
  }
