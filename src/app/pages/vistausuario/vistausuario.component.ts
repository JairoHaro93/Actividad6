import { Component, inject } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { IUsuario } from '../../interfaces/iusuario.interface';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UsuariosService } from '../../services/usuarios.service';
import { IResult } from '../../interfaces/iresult.interface';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-vistausuario',
  standalone: true,
  imports: [NavbarComponent, RouterLink],
  templateUrl: './vistausuario.component.html',
  styleUrl: './vistausuario.component.css',
})
export class VistausuarioComponent {
  usuario: IResult | null = null;
  activatedRoute = inject(ActivatedRoute);
  usuariosService = inject(UsuariosService);
  router = inject(Router);

  ngOnInit() {
    this.activatedRoute.params.subscribe(async (params: any) => {
      let id = params.id;
      console.log(id);
      this.usuario = await this.usuariosService.getUserById(id);
      console.log(this.usuario);
    });
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
          this.router.navigate(['/home']);
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
