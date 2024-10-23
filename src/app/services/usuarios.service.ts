import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInterface } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  API_URL: string = 'http://localhost:5037/api/User/';
  constructor(private httpClient: HttpClient) {}

  getUsuario(): Observable<any> {
    return this.httpClient.get(this.API_URL + 'lista').pipe((res) => res);
  }

  getUserById(id: number): Observable<any> {
    return this.httpClient
      .get(this.API_URL + 'Obtener/' + id)
      .pipe((res) => res);
  }

  eliminarUser(id: number): Observable<any> {
    return this.httpClient
      .delete(this.API_URL + 'Eliminar/' + id)
      .pipe((res) => res);
  }
  guardarUsuario(usuario: UserInterface): Observable<any> {
    return this.httpClient
      .post(this.API_URL + 'Guardar', usuario)
      .pipe((res) => res);
  }
  editarUsuario(usuario: UserInterface): Observable<any> {
    return this.httpClient
      .put(this.API_URL + 'Editar', usuario)
      .pipe((res) => res);
  }
}
