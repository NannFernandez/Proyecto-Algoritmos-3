import React, { Component } from "react";
import { InputText } from 'primereact/inputtext';
import "./inbox.css"
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import Mensaje from "../dominio/mensaje";
import { BusquedaComponent } from "../busqueda/busqueda";
import { mensajeService } from '../services/mensaje-service'
import { usuarioService } from '../services/usuario-service'
import { Messages } from 'primereact/messages'

export class InboxComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mensajes:[],
      valorBusqueda:""
    };
  }

  async componentDidMount () {
    try {
      const mensajes = await mensajeService.allInstances(usuarioService.userLogged.id)
      this.setState({mensajes : mensajes}) 
    } catch (e) {
       this.addMessages(e)
      }
  }

  leidoTemplate = (mensaje) => {
    return (
      mensaje.leido ?
      //<span title="No leído"  style={{ display: 'flex', alignItems: 'center', alignContent: 'center', justifyContent: 'center' }}>
      <i data-testid = {"abrirMensajito" + mensaje.id} onClick={()=>this.leerMensaje(mensaje)} className="pi pi-inbox"></i>
      //</span>
    :
      //<span title="No leído"  style={{ display: 'flex', alignItems: 'center', alignContent: 'center', justifyContent: 'center' }}>
      <i data-testid = {"abrirMensajito" + mensaje.id} onClick={()=>this.leerMensaje(mensaje)} className="pi pi-envelope"></i>
      // </span>
    )
  }

  leerTemplate = (mensaje) => {
    return (
      mensaje.leido ?
      <i data-testid={"marcarNoLeido" + mensaje.id} onClick={() => this.setearLeido(mensaje)} className="pi pi-eye-slash border"></i>:
      <i data-testid={"marcarLeido" + mensaje.id} onClick={() => this.setearLeido(mensaje)} className="pi pi-eye border"></i>
    )
  }

  eliminarTemplate = (mensaje) => {
    return (
          <i data-testid = "tachito" onClick={() => this.eliminarMensaje(mensaje)} className="pi pi-trash border"></i>
    )
  }

  buscar = async (valorBusqueda) => {
    try {
    const mensajesFiltrados= await mensajeService.buscarMensajes(usuarioService.userLogged.id, valorBusqueda)
    this.setState({mensajes : mensajesFiltrados})
    } catch (e) {
      this.addMessages(e)
    }
  }

  setearLeido = async (mensaje) => {
    try {
    mensaje.leido = !mensaje.leido
    console.log(mensaje)
    await mensajeService.actualizarMensaje(usuarioService.userLogged.id/* this.props.usuario.id */, mensaje)
    this.setState ({mensajes : this.state.mensajes})
    } catch (e){
      this.addMessages(e)
    }
  }

  eliminarMensaje = async (mensajeAEliminar) => {
    try {
      await mensajeService.eliminarMensaje(usuarioService.userLogged.id,mensajeAEliminar.id)
      const mensajesNoEliminados = this.state.mensajes.filter((mensajito) => mensajito.id !== mensajeAEliminar.id)
      this.setState({mensajes: mensajesNoEliminados})
      this.msg.show([{ severity: 'success', detail: "Mensaje Eliminado" }]);
    } catch (e) {
      this.addMessages(e)
    }    
  }

  addMessages = (result) => {
    this.msg.show([
        { severity: 'error', detail: result.response ? result.response.data : result.message }
    ]);
  }

  leerMensaje = (mensaje) => {
    this.props.history.push(`/verMensaje/${mensaje.id}`)
  }
 
  render() {
    return (
      <div className="separacion">
        <BusquedaComponent nombreTitulo="Búsqueda de mensajes" buscar={this.buscar}/>
        <h2>Resultados de la búsqueda</h2>
        <DataTable value={this.state.mensajes} data-testid="message-table">
                <Column className ="ancho-icono" body={this.leidoTemplate} ></Column>
                <Column className ="ancho-fecha" field="fechaYHoraDeEmision"></Column>
                <Column className ="ancho-remitente" field="remitente" ></Column>
                <Column className ="ancho-icono" body={this.leerTemplate} ></Column>
                <Column className ="ancho-icono" body={this.eliminarTemplate}></Column>
        </DataTable>
        <div>
          <Messages ref={(el) => this.msg = el} />
        </div>
      </div>
    );
  } 
}

export default InboxComponent;
