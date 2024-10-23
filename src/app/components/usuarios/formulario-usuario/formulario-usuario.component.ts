import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserInterface } from '../../../interfaces/user.interface';
import { UsuariosService } from '../../../services/usuarios.service';
import { lastValueFrom, map } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-formulario-usuario',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './formulario-usuario.component.html',
  styleUrl: './formulario-usuario.component.css',
})
export class FormularioUsuarioComponent {
  sexos = [
    { id: 1, tipo: 'Femenino' },
    { id: 2, tipo: 'Masculino' },
  ];

  formularioU = this.fb.group({
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    fechaNacimiento: ['', Validators.required],
    correo: ['', [Validators.required, Validators.email]],
    direccion: ['', Validators.required],
    telefono: ['', Validators.required],
    idSex: ['', Validators.required],
  });

  idUser: any = 0;
  esEdicion: boolean = false;

  constructor(
    private fb: FormBuilder,
    private usuarioS: UsuariosService,
    private router: Router,
    private activate: ActivatedRoute
  ) {
    this.activate.params.subscribe((params) => {
      this.idUser = params['id'];
    });
    if (this.idUser) {
      this.esEdicion = true;
    }
  }
  ngOnInit(): void {
    if (this.esEdicion) {
      this.traerUsuario(this.idUser);
    }
  }

  async traerUsuario(id: number) {
    try {
      let usuario = await lastValueFrom(this.usuarioS.getUserById(id));
      console.log(usuario);
      if (usuario.response.fechaNacimiento) {
        usuario.response.fechaNacimiento = this.formatDate(
          usuario.response.fechaNacimiento
        );
      }
      this.formularioU.patchValue(usuario.response);
    } catch (error) {
      console.error(error);
    }
  }

  async guardar() {
    if (this.formularioU.valid) {
      let obj: UserInterface = {
        id: this.esEdicion ? this.idUser : 0,
        nombre: String(this.formularioU.get('nombre')?.value),
        apellido: String(this.formularioU.get('apellido')?.value),
        correo: String(this.formularioU.get('correo')?.value),
        direccion: String(this.formularioU.get('direccion')?.value),
        telefono: Number(this.formularioU.get('telefono')?.value),
        idSex: Number(this.formularioU.get('idSex')?.value),
        fechaNacimiento: new Date(
          String(this.formularioU.get('fechaNacimiento')?.value)
        ),
      };
      let respuesta
      if (this.esEdicion) {
        respuesta= await lastValueFrom(this.usuarioS.editarUsuario(obj));
      } else {
        respuesta = await lastValueFrom(this.usuarioS.guardarUsuario(obj));
      }

      console.log(respuesta.mensaje);
      this.cancelar();
    } else {
      console.log('Llene todos los campos porfavor!!!!');
    }
  }

  cancelar() {
    this.router.navigate(['/']);
  }

  formatDate(isoString: string): string {
    const date = new Date(isoString); // Convertir la cadena ISO a objeto Date
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses son base 0, se suma 1
    const day = String(date.getDate()).padStart(2, '0'); // Asegura formato de dos dígitos

    return `${year}-${month}-${day}`; // Retorna la fecha en formato YYYY-MM-DD
  }
}
