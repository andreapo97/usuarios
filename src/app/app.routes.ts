import { Routes } from '@angular/router';
import { UsuariosComponent } from './components/usuarios/listaUsuarios/usuarios.component';
import { FormularioUsuarioComponent } from './components/usuarios/formulario-usuario/formulario-usuario.component';

export const routes: Routes = [
{
    path: '',
    component : UsuariosComponent
},
{
    path: 'form',
    component: FormularioUsuarioComponent
},
{
    path: 'form/:id',
    component: FormularioUsuarioComponent
},



];
