import { Component, OnInit } from '@angular/core';
import { Usuario, Rutina } from '../../../../Dominio/src/usuario';
import { service } from '../../service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-perfil-usuario-form',
  templateUrl: './perfil-usuario-form.component.html',
  styleUrls: ['./perfil-usuario-form.component.css']
})
export class PerfilUsuarioFormComponent implements OnInit {
  
  usuario: Usuario
  opcionesRutina: Rutina[] = ["NADA", "LEVE", "MEDIANO", "ACTIVO", "INTENSIVO"]
  opcionElegida: Rutina
  fecha: String = "1991-01-28"

  constructor(private route: ActivatedRoute) {
    this.usuario = service.getUsuarioLogueado()
  }
  
  
  ngOnInit(): void {
    this.formatearFecha()
  }
  
  formatearFecha(){
    const fecha = this.usuario.fechaDeNacimiento.toISOString()
    console.log(fecha.substring(0, 10))
  }

  getStatus(): String {
    if(this.usuario.imcEsSaludable()) {
      return "Estado Saludable"
    } else {return "No Saludable"}
  }


}
