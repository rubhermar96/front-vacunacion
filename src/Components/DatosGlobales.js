import React, {useState, useEffect} from 'react';
import * as ReactBootStrap from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
const Pricing = () => {
    let Dosis_totales;
    let Totales_Admin;
    let Total_pauta;
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
    const dosisTotales=()=>{
      Dosis_totales=0;
      {data.map(framework=>(
        <tr key={framework.id}>
            {Dosis_totales+=(framework.dosis_Pfizer+framework.dosis_Moderna+framework.dosis_Astrazeneca)}
        </tr>
        ))}
      return Dosis_totales;
    }
    const totalesAdministradas=()=>{
      Totales_Admin=0;
      {data.map(framework=>(
        <tr key={framework.id}>
            {Totales_Admin+=framework.administradas_totales}
        </tr>
        ))}
      return Totales_Admin;
    }
    const totalPauta=()=>{
      Total_pauta=0;
      {data.map(framework=>(
        <tr key={framework.id}>
            {Total_pauta+=framework.pauta_completa}
        </tr>
        ))}
      return Total_pauta;
    }
    
    return(
        <div className="App">
            <h1 className="h1" style={{borderBottom:"10px solid black"}}>Datos Globales</h1>
            <br/><br/>
            <ReactBootStrap.CardColumns>
                <ReactBootStrap.Card>
                    <h3>Dosis Entregadas</h3>
                    <h1 style={{backgroundColor:"black",color:"whitesmoke"}}>{dosisTotales()}</h1>
                    <h4>-</h4>
                </ReactBootStrap.Card>
                <ReactBootStrap.Card>
                    <h3>Dosis Administradas</h3>
                    <h1 style={{backgroundColor:"black",color:"whitesmoke"}}>{totalesAdministradas()}</h1>
                    <h4>{(totalesAdministradas()/dosisTotales()*100).toFixed(1)}% dosis recibidas</h4>
                </ReactBootStrap.Card>
                <ReactBootStrap.Card>
                    <h3>Pauta Completa</h3>
                    <h1 style={{backgroundColor:"black",color:"whitesmoke"}}>{totalPauta()}</h1>
                    <h4>{(totalPauta()/totalesAdministradas()*100).toFixed(1)}% dosis administradas</h4>
                </ReactBootStrap.Card>
            </ReactBootStrap.CardColumns>
        </div>
    )
}

export default Pricing;