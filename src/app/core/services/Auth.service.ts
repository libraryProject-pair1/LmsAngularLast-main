import { Injectable } from '@angular/core';
import { Member } from '../../features/models/member';
import { JWT_ROLES } from '../constants/jwtAttributes';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = false;
  loggedInMember: Member | null = null;
  
  constructor(private tokenService:TokenService) { }

  login() {
    this.isLoggedIn = true;
    localStorage.setItem('isLoggedIn', 'true'); // Oturum durumunu localStorage'a kaydet
    
  }

  logout() {
    if (this.isLoggedIn) {
      this.isLoggedIn = false;
      localStorage.removeItem('isLoggedIn'); // Oturum durumunu localStorage'dan kaldır
      localStorage.clear(); // Diğer localStorage verilerini temizle
    }
  }
  
  isAuthenticated(): boolean {
    return JSON.parse(localStorage.getItem('isLoggedIn') || 'false' );
  }

 

}


