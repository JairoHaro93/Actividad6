import { Component, inject } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { IUsuario } from '../../interfaces/iusuario.interface';
import { UsuariosService } from '../../services/usuarios.service';
import { IResult } from '../../interfaces/iresult.interface';
import { RouterLink } from '@angular/router';
import { UsuarioCardComponent } from '../../components/usuario-card/usuario-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, RouterLink, UsuarioCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  arrUsuarios: IResult[] = [];
  usuariosService = inject(UsuariosService);

  async ngOnInit() {
    try {
      const response = await this.usuariosService.getAll();

      this.arrUsuarios = response.results;
    } catch (error) {
      console.log(error);
    }
  }
}
