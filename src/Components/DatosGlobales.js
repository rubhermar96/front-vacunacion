import React, {useState, useEffect} from 'react';
import * as ReactBootStrap from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
const Pricing = () => {
    let Dosis_totales=0;
    let Totales_pfizer=0;
    let Totales_moderna=0;
    let Totales_astrazeneca=0;
    let Totales_Admin=0;
    let Total_pauta=0;
     //direccion de la API
     const baseUrl="http://localhost:4004/comunidades/";
     const [data, setData]=useState([]);
     const [frameworkSeleccionado, setFrameworkSeleccionado]=useState({
        id: '',
        nombre: '',
        dosis_Pfizer: '',
        dosis_Moderna: '',
        dosis_Astrazeneca: '',
        administradas_totales: '',
        pauta_completa: ''
      });
      const peticionGet=async()=>{
      
     
        await axios.get(baseUrl)
        .then(response=>{
          setData(response.data);
          console.log(response.data[0]);
          for (let i = 0; i < response.data.length; i++) {
            Dosis_totales+=response.data[i].dosis_Pfizer;
            console.log(Dosis_totales);
         }
        }).catch(error=>{
          console.log(error);
        })
      }
    useEffect(()=>{
        peticionGet();
      },[])
    return(
        <div className="App">
            <div style={{display:"none"}}>
            {data.map(framework=>(
            <tr key={framework.id}>
                {Dosis_totales+=(framework.dosis_Pfizer+framework.dosis_Moderna+framework.dosis_Astrazeneca)}
                {Totales_pfizer+=framework.dosis_Pfizer}
                {Totales_moderna+=framework.dosis_Moderna}
                {Totales_astrazeneca+=framework.dosis_Astrazeneca}
                {Totales_Admin+=framework.administradas_totales}
                {Total_pauta+=framework.pauta_completa}
            </tr>
            ))}
            </div>
            <h1 className="h1">Datos Globales</h1>
            <br/><br/>
            <ReactBootStrap.CardColumns>
                <ReactBootStrap.Card>
                    <h3>Dosis Entregadas en CC.AA</h3>
                    <h1 style={{backgroundColor:"black",color:"whitesmoke"}}>{Dosis_totales}</h1>
                </ReactBootStrap.Card>
                <ReactBootStrap.Card>
                    <h3>Dosis Administradas</h3>
                    <h1 style={{backgroundColor:"black",color:"whitesmoke"}}>{Totales_Admin}</h1>
                </ReactBootStrap.Card>
                <ReactBootStrap.Card>
                    <h3>Personas con Pauta Completa</h3>
                    <h1 style={{backgroundColor:"black",color:"whitesmoke"}}>{Total_pauta}</h1>
                </ReactBootStrap.Card>
            </ReactBootStrap.CardColumns>
        </div>
    )
}

export default Pricing;