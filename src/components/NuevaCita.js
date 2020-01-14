import React, { Component } from 'react';
import uuid from 'uuid';

const stateInicial = {
    cita: {
        mascota: '',
        propietario: '',
        fecha: '',              //Name igual que la propiedad del objeto y state
        hora: '',
        sintomas: '',
    }, 
    error : false,
}

class NuevaCita extends Component {

    state = { ...stateInicial }

    //Cuando el usuario escribe en los inputs
    handleChange = (e) => {
        
        //Colocar lo que el usuario escribe en el state
        this.setState({
            cita : {
                ...this.state.cita,
                [e.target.name] : e.target.value
            }
        })
    }

    //Cuando el usuario envia el formulario
    handleSubmit = (e) => {
        e.preventDefault();

        //Extraer los valores del state
        const { mascota, propietario, fecha, hora, sintomas } = this.state.cita; 

        //Validar que todos los campos este llenos
        if(mascota === '' || propietario === '' || fecha === '' || hora === '' || sintomas === '') {
            this.setState({
                error: true
            });
            //Detener la ejecucion 
            return;
        }

        //Generar objeto con los datos
        const nuevaCita = {...this.state.cita};
        nuevaCita.id = uuid();

        //Agregar la cita al state de App
        this.props.crearNuevaCita(nuevaCita);

        //Colocar en es state el stateInicial
        this.setState({
            ...stateInicial
        });
    }

    render() {

        //Extraer el valor de state
        const { error } = this.state;

        return (
            <div className="card mt-5 py-5">
                <div className="card-body">
                    <h2 className="card-title text-center mb-5">
                        Llenar el formulario para crear una nueva cita
                    </h2>

                    { 
                        error 
                            ? 
                            <div className="alert alert-danger mt-2 mb-5 text-center">
                                Todos los campos son obligatorios !
                            </div> 
                            : 
                            null
                    }

                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group row">
                            <label htmlFor="" className="col-sm-4 col-lg-2 col-form-label">
                                Nombre Mascota
                            </label>
                            <div className="col-sm-8 col-lg-10">
                                <input 
                                    id="mascota"
                                    type="text" 
                                    className="form-control"
                                    placeholder="Nombre de la Mascota" 
                                    name="mascota" 
                                    onChange={this.handleChange}
                                    value={this.state.cita.mascota}
                                />
                            </div>
                        </div> {/* Cierra form-group MASCOTA*/}

                        <div className="form-group row">
                            <label htmlFor="" className="col-sm-4 col-lg-2 col-form-label">
                                Nombre Dueño
                            </label>
                            <div className="col-sm-8 col-lg-10">
                                <input 
                                    type="text" 
                                    className="form-control"
                                    placeholder="Nombre del Dueño"
                                    name="propietario"
                                    onChange={this.handleChange}
                                    value={this.state.cita.propietario}  
                                />
                            </div>
                        </div> {/* Cierra form-group DUEÑO*/}

                        <div className="form-group row">
                            <label htmlFor="" className="col-sm-4 col-lg-2 col-form-label">
                                Fecha
                            </label>
                            <div className="col-sm-8 col-lg-4">
                                <input 
                                    type="date" 
                                    className="form-control"
                                    name="fecha" 
                                    onChange={this.handleChange}
                                    value={this.state.cita.fecha}
                                />
                            </div>

                            <label htmlFor="" className="col-sm-4 col-lg-2 col-form-label">
                                Hora
                            </label>
                            <div className="col-sm-8 col-lg-4">
                                <input 
                                    type="time" 
                                    className="form-control"
                                    name="hora" 
                                    onChange={this.handleChange}
                                    value={this.state.cita.hora}
                                />
                            </div> 
                        </div> {/* Cierra form-group FECHA-HORA*/}

                        <div className="form-group row">
                            <label htmlFor="" className="col-sm-4 col-lg-2 col-form-label">
                                Síntomas
                            </label>
                            <div className="col-sm-8 col-lg-10">

                                <textarea 
                                    className="form-control" 
                                    name="sintomas" 
                                    placeholder="Síntomas de la mascota"
                                    onChange={this.handleChange}
                                    value={this.state.cita.sintomas}
                                >
                                </textarea>
                            </div>
                        </div> {/* Cierra form-group Sintomas*/}

                        <input 
                            type="submit" 
                            className="py-3 mt-2 btn btn-success btn-block"
                            value="Agregar nueva cita" 
                        />

                    </form>

                </div>
            </div>
        );
    }
}

export default NuevaCita;