import React, { Component } from 'react';
import './bootstrap.min.css';
import Header from './components/Header';
import NuevaCita from './components/NuevaCita';
import ListaCitas from './components/ListaCitas';


class App extends Component {

  state = {
    citas: []
  }

  //Cuando la app carga
  componentDidMount(){ //Como document.ready de jquery
    const citasLS = localStorage.getItem('citas');

    if(citasLS) {
      this.setState({
        citas: JSON.parse(citasLS),
      });
    }
  }
  
  //Cuando eliminamos o agregamos una nueva cita
  componentDidUpdate(){
    localStorage.setItem('citas', JSON.stringify(this.state.citas));
  }

  crearNuevaCita = (datos) => {
    //Copiar el state actual
    const citas = [...this.state.citas, datos]; //Simil a un push en un arreglo

    //Agregar el nuevo state
    this.setState({
      citas: citas,
    });
  }

  //Elimina las citas del state
  eliminarCita = (id) => {
    //Tomar copia del state
    const citasActuales = [...this.state.citas];

    //Utiliza filter para sacar id del arreglo
    const citas = citasActuales.filter(cita => cita.id !== id)

    //Actualizar el state
    this.setState({
      citas,
    });
  }

  render() {
    return (
      <div className="container">
        <Header titulo='Administrador Pacientes Veterinaria' />
        <div className="row">
          <div className="col-md-10 mx-auto">
            <NuevaCita crearNuevaCita={this.crearNuevaCita} />
          </div>
          <div className="mt-5 col-md-10 mx-auto">
            <ListaCitas 
              citas={this.state.citas} 
              eliminarCita={this.eliminarCita}  
            />
          </div>
        </div>
      </div>
    );
  }
}


export default App;
