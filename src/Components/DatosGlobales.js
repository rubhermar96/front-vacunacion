import React, {useState, useEffect} from 'react';
import * as ReactBootStrap from "react-bootstrap";
import { Card } from 'reactstrap';
const Pricing = () => {
    return(
        <div className="App">
            <h1 className="h1">Datos Globales</h1>
            <br/><br/>
            <ReactBootStrap.CardColumns>
                <ReactBootStrap.Card>
                    <h3>Dosis Entregadas en CC.AA</h3>
                    <h1>1123412</h1>
                </ReactBootStrap.Card>
                <ReactBootStrap.Card>
                    <h3>Dosis Administradas</h3>
                    <h1>1123412</h1>
                </ReactBootStrap.Card>
                <ReactBootStrap.Card>
                    <h3>Personas con Pauta Completa</h3>
                    <h1>1123412</h1>
                </ReactBootStrap.Card>
            </ReactBootStrap.CardColumns>
        </div>
    )
}

export default Pricing;