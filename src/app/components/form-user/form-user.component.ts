import { Component, inject } from '@angular/core';
import Swal from 'sweetalert2';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UsuariosService } from '../../services/usuarios.service';
import { IResult } from '../../interfaces/iresult.interface';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form-user',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form-user.component.html',
  styleUrl: './form-user.component.css',
})
export class FormUserComponent {
  //tipados y propiedades de clase
  usuarioForm: FormGroup;
  tipo: string = 'Crear';
  //injecciones de dependencias
  activatedRoute = inject(ActivatedRoute);
  usuariosService = inject(UsuariosService);
  router = inject(Router);
  constructor() {
    this.usuarioForm = new FormGroup(
      {
        // -----VALIDADOR NOMBRE
        first_name: new FormControl(null, [
          Validators.required,
          Validators.minLength(3),
        ]),
        // -----VALIDADOR Apellido
        last_name: new FormControl(null, [
          Validators.required,
          Validators.minLength(3),
        ]),
        // -----VALIDADOR USERNAME
        username: new FormControl(null, [
          Validators.required,
          Validators.minLength(3),
        ]),

        // -----VALIDADOR PASSWORD
        password: new FormControl(null, [
          Validators.required,
          Validators.minLength(8),
        ]),

        // -----VALIDADOR IMAGEN
        image: new FormControl(null, [
          Validators.required,
          Validators.pattern(
            /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/
          ),
          Validators.pattern(/\.(jpeg|jpg|gif|png|bmp|webp|svg)$/i),
        ]),
        // -----VALIDADOR EMAIL
        email: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/),
        ]),
      },
      []
    );
  }

  async getDataForm() {
    if (this.tipo === 'Crear') {
      try {
        const response: IResult = await this.usuariosService.createUser(
          this.usuarioForm.value
        );
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'El usuario ' + response.first_name + ' se ha registrado',
          showConfirmButton: false,
          timer: 3000,
        });
      } catch (error) {
        console.log(error);
      }

      // this.usuarioForm.reset(); ----resetea el formulario

      this.router.navigate(['/home']);
    } else {
      try {
        const response: IResult = await this.usuariosService.updateUser(
          this.usuarioForm.value
        );

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'El usuario ' + response.first_name + ' se ha actualizado',
          showConfirmButton: false,
          timer: 3000,
        });
      } catch (error) {
        console.log(error);
      }
    }
    this.router.navigate(['/home']);
  }

  checkControl(formControlName: string, validador: string) {
    return (
      this.usuarioForm.get(formControlName)?.hasError(validador) &&
      this.usuarioForm.get(formControlName)?.touched
    );
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(async (params: any) => {
      if (params.id) {
        this.tipo = 'Actualizar';
        const usuario: IResult = await this.usuariosService.getUserById(
          params.id
        );
        this.usuarioForm = new FormGroup(
          {
            first_name: new FormControl(usuario.first_name, []),
            last_name: new FormControl(usuario.last_name, []),
            email: new FormControl(usuario.email, []),
            username: new FormControl(usuario.username, []),
            password: new FormControl(usuario.password, []),
            image: new FormControl(usuario.image, []),
          },
          []
        );
      }
    });
  }
}
