import { Component, inject } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { UsuariosService } from '../../services/usuarios.service';
import { IResult } from '../../interfaces/iresult.interface';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario-card',
  standalone: true,
  imports: [NavbarComponent, RouterLink],
  templateUrl: './usuario-card.component.html',
  styleUrl: './usuario-card.component.css',
})
export class UsuarioCardComponent {
  //inyeccion de dependencias
  usuariosService = inject(UsuariosService);

  //tipados y propieadades de clase
  paginaactual: number = 1;
  arrUsuarios: IResult[] = [];
  totalpaginas: number = 0;

  async ngOnInit() {
    try {
      const response = await this.usuariosService.getAll();
      this.totalpaginas = (await this.usuariosService.getInfo()).total_pages;

      this.arrUsuarios = response.results;
    } catch (error) {
      console.log(error);
    }
  }

  async addPag() {
    this.paginaactual++;
    if (this.paginaactual > this.totalpaginas) {
      this.paginaactual = this.totalpaginas;
    }
    try {
      const response = await this.usuariosService.getAll(this.paginaactual);

      this.arrUsuarios = response.results;
    } catch (error) {
      console.log(error);
    }
  }
  async subPag() {
    this.paginaactual--;
    if (this.paginaactual === 0) {
      this.paginaactual = 1;
    }

    try {
      const response = await this.usuariosService.getAll(this.paginaactual);

      this.arrUsuarios = response.results;
    } catch (error) {
      console.log(error);
    }
  }

  async delete(id: string, nombre: string, apellido: string) {
    Swal.fire({
      title: 'Deseas Eliminar a ' + nombre + ' ' + apellido + '?',

      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, Eliminar!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await this.usuariosService.deleteUserById(id);
        } catch (error) {
          console.log(error);
        }
        Swal.fire({
          title: 'Usuario ' + nombre + ' Eliminado!',
          icon: 'success',
        });
      }
    });
  }
}
