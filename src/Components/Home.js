import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
//para trabajar con imagenes
//primero la tengo que importar de dnde esta
import imagenes from'../assets/imagenes'
const inicio = () => {
    return(
        <div className="App">
            <header>
                <h1 className="h1">Campaña Vacunación Covid-19</h1>
                <h2 className="h2" style={{borderBottom:"10px solid black"}}>Datos España</h2>
            </header>
            <img src={imagenes.img3} alt="Vacunación Covid-19 España" width="80%"></img>
        </div>
    )
}

export default inicio;