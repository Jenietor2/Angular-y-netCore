import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination'

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { TablaProductoComponent } from './components/tabla-producto/tabla-producto.component';

//Servicios
import { ProductoServices } from './Servicios/producto.Services';
import { CategoriaServicio } from './Servicios/categoria.servicio.service';
import { PersonaService } from './Servicios/persona.service';
import { UsuarioService } from './Servicios/usuario.service';

import { BuscadorProductoNombreComponent } from './components/buscador-producto-nombre/buscador-producto-nombre.component';
import { FiltradoProductoNombreComponent } from './components/filtrado-producto-nombre/filtrado-producto-nombre.component';
import { BuscadorProductoCategoriaComponent } from './components/buscador-producto-categoria/buscador-producto-categoria.component';
import { FiltradoProductoCategoriaComponent } from './components/filtrado-producto-categoria/filtrado-producto-categoria.component';
import { TablaPersonaComponent } from './components/tabla-persona/tabla-persona.component';
import { BuscadorPersonaNombreCompletoComponent } from './components/buscador-persona-nombre-completo/buscador-persona-nombre-completo.component';
import { FiltardoPersonaNombreComponent } from './components/filtardo-persona-nombre/filtardo-persona-nombre.component';
import { BuscadorUsuarioTipoUsuarioComponent } from './components/buscador-usuario-tipo-usuario/buscador-usuario-tipo-usuario.component';
import { FiltradoUsuarioTipoUsuarioComponent } from './components/filtrado-usuario-tipo-usuario/filtrado-usuario-tipo-usuario.component';
import { TablaUsuarioComponent } from './components/tabla-usuario/tabla-usuario.component';
import { MatenimientoPersonaComponent } from './components/matenimiento-persona/matenimiento-persona.component';
import { FormularioPersonaMantenimientoComponent } from './components/formulario-persona-mantenimiento/formulario-persona-mantenimiento.component';
import { FormularioProductoComponent } from './components/formulario-producto/formulario-producto.component';
import { ProductosComponent } from './components/productos/productos.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { FormularioUsuarioComponent } from './components/formulario-usuario/formulario-usuario.component'


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    FetchDataComponent,
    TablaProductoComponent,
    BuscadorProductoNombreComponent,
    FiltradoProductoNombreComponent,
    BuscadorProductoCategoriaComponent,
    FiltradoProductoCategoriaComponent,
    TablaPersonaComponent,
    BuscadorPersonaNombreCompletoComponent,
    FiltardoPersonaNombreComponent,
    BuscadorUsuarioTipoUsuarioComponent,
    FiltradoUsuarioTipoUsuarioComponent,
    TablaUsuarioComponent,
    MatenimientoPersonaComponent,
    FormularioPersonaMantenimientoComponent,
    FormularioProductoComponent,
    ProductosComponent,
    UsuariosComponent,
    FormularioUsuarioComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'filtradoProductoNombre', component: FiltradoProductoNombreComponent },
      { path: 'filtradoProductoCategoria', component: FiltradoProductoCategoriaComponent },
      { path: 'fitradoPersonaNombre', component: FiltardoPersonaNombreComponent},
      { path: 'usuario', component: FiltradoUsuarioTipoUsuarioComponent },
      { path: 'persona-crear', component: MatenimientoPersonaComponent },
      { path: 'matenimiento-persona/:id', component: FormularioPersonaMantenimientoComponent },
      { path: 'productos', component: ProductosComponent },
      { path: 'formulario-producto/:id', component: FormularioProductoComponent },
      { path: 'usuarios', component: UsuariosComponent },
      { path: 'usuario-opciones/:id', component: FormularioUsuarioComponent}
    ])
  ],
  providers: [ProductoServices, CategoriaServicio, PersonaService, UsuarioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
