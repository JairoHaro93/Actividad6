import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FormUserComponent } from '../../components/form-user/form-user.component';

@Component({
  selector: 'app-newuser',
  standalone: true,
  imports: [NavbarComponent, FormUserComponent],
  templateUrl: './newuser.component.html',
  styleUrl: './newuser.component.css',
})
export class NewuserComponent {}
