import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BookListComponent } from './features/pages/admin/book/book-list/book-list.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { ToastrModule } from 'ngx-toastr';

import { LayoutComponent } from './shared/layout/layout.component';
import { HomepageComponent } from './shared/homepage/homepage.component';
import { LoadingComponent } from "./core/components/loading/loading.component";




@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, BookListComponent, ToastrModule, LayoutComponent, LoadingComponent]
})
export class AppComponent {
  
  
}
