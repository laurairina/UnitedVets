import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeAdminComponent } from './pages/home-admin/home-admin.component';
import { HomeClienteComponent } from './pages/home-cliente/home-cliente.component';
import { HomeMedicoComponent } from './pages/home-medico/home-medico.component';
import { FooterComponent } from './pages/footer/footer.component';
import { RegistrarUserComponent } from './pages/registrar-user/registrar-user.component';
import { RegistrarPetComponent } from './pages/registrar-pet/registrar-pet.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { HistorialesComponent } from './pages/historiales/historiales.component';
import { CitasComponent } from './pages/citas/citas.component';
import { ListaClientesComponent } from './pages/lista-clientes/lista-clientes.component';
import { MenuArribaComponent } from './pages/menu-arriba/menu-arriba.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LadingPageComponent } from './pages/lading-page/lading-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeAdminComponent,
    HomeClienteComponent,
    HomeMedicoComponent,
    FooterComponent,
    RegistrarUserComponent,
    RegistrarPetComponent,
    PerfilComponent,
    HistorialesComponent,
    CitasComponent,
    ListaClientesComponent,
    MenuArribaComponent,
    LadingPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
