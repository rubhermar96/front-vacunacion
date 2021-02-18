import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
//para trabajar con imagenes
//primero la tengo que importar de dnde esta
import imagenes from'../assets/imagenes'
const inicio = () => {
    return(
        <div className="App">
            <header>
                <h1>Campaña Vacunación Covid-19</h1>
                <h2>Datos España</h2>
            </header>
            <img src={imagenes.img3} alt="img usuarios" width="800" height="400"></img>
        </div>
    )
}

export default inicio;