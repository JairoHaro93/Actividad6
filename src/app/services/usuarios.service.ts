import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IUsuario } from '../interfaces/iusuario.interface';
import { firstValueFrom } from 'rxjs';
import { IResult } from '../interfaces/iresult.interface';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  private baseUrl: string = 'https://peticiones.online/api/users/';
  private http = inject(HttpClient);

  /**
   * GETALL()
   * return Promise <Usuario[]>
   *
   */

  getAll(page: number = 1): Promise<IUsuario> {
    return firstValueFrom(
      this.http.get<IUsuario>(`${this.baseUrl}?page=${page}`)
    );
  }

  /**
   * GETALL()
   * return Promise <Usuario[]>
   *
   */

  getInfo(): Promise<IUsuario> {
    return firstValueFrom(this.http.get<IUsuario>(this.baseUrl));
  }

  /**
   * GETUSERBYID(id:String)
   * return Promise <Usuario[]>
   *
   */

  getUserById(id: string): Promise<IResult> {
    return firstValueFrom(this.http.get<IResult>(`${this.baseUrl}${id}`));
  }

  /**
   * DELETEBYID(id:String)
   * return Promise <Usuario[]>
   *
   */

  deleteUserById(id: string): Promise<IResult> {
    return firstValueFrom(this.http.delete<IResult>(`${this.baseUrl}${id}`));
  }

  /**
   * CREATEUSER(body:IResult)
   * return Promise <Usuario[]>
   *
   */
  createUser(body: IResult): Promise<IResult> {
    return firstValueFrom(this.http.post<IResult>(this.baseUrl, body));
  }

  /**
   * CREATEUSER(body:IResult)
   * return Promise <Usuario[]>
   *
   */
  updateUser(body: IResult): Promise<IResult> {
    return firstValueFrom(this.http.post<IResult>(this.baseUrl, body));
  }
}
