import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../../services/usuarios.service';
import { UserInterface } from '../../../interfaces/user.interface';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css',
})
export class UsuariosComponent implements OnInit {
  UsuarioList: UserInterface[] = [];

  constructor(
    private usuarioService: UsuariosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.traerUsuarios();
  }

  async traerUsuarios() {
    try {
      let resultado = await lastValueFrom(this.usuarioService.getUsuario());
      this.UsuarioList = resultado.response;
    } catch (error) {
      console.error(error);
    }
  }


  async deletUser(id: number) {
    try {
      let respuesta = await lastValueFrom(this.usuarioService.eliminarUser(id));
      console.log(respuesta.mensaje);
      //this.traerUsuarios()
      this.UsuarioList = this.UsuarioList.filter((u) => u.id != id);
    } catch (error) {
      console.error(error);
    }
  }

  editarUsuario(id:number){
    this.router.navigate(['/form/'+ id]);
  }

  crear() {
    this.router.navigate(['/form']);
  }
}
