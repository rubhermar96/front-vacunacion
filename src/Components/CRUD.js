
//npm i bootstrap reactstrap axios sweetalert
import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import axios from 'axios';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

//libreria para mejorar los alert   https://sweetalert.js.org/guides/
//npm install sweetalert --save
import swal from 'sweetalert';
function CRUD() {
  let Dosis_totales=0;
  let Totales_pfizer=0;
  let Totales_moderna=0;
  let Totales_astrazeneca=0;
  let Totales_Admin=0;
  let Total_pauta=0;
    //direccion de la API
    const baseUrl="http://localhost:4004/comunidades/";
    const [data, setData]=useState([]);
    const [modalInsertar, setModalInsertar]= useState(false);
    const [modalEditar, setModalEditar]= useState(false);
    const [modalEliminar, setModalEliminar]= useState(false);
    const [frameworkSeleccionado, setFrameworkSeleccionado]=useState({
      id: '',
      nombre: '',
      dosis_Pfizer: '',
      dosis_Moderna: '',
      dosis_Astrazeneca: '',
      administradas_totales: '',
      pauta_completa: ''
    });
    const handleChange=e=>{
      const {name, value}=e.target;
      setFrameworkSeleccionado((prevState)=>({
        ...prevState,
        [name]: value
      }))
      console.log(frameworkSeleccionado);
    }
  
    const abrirCerrarModalInsertar=()=>{
      setModalInsertar(!modalInsertar);
    }
  
    const abrirCerrarModalEditar=()=>{
      setModalEditar(!modalEditar);
    }
  
    const abrirCerrarModalEliminar=()=>{
      setModalEliminar(!modalEliminar);
    }
  
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
    }//peticionGet
  
    const peticionPost=async()=>{
      const comunidad={
        nombre:frameworkSeleccionado.nombre,
        dosis_Pfizer:frameworkSeleccionado.dosis_Pfizer,
        dosis_Moderna:frameworkSeleccionado.dosis_Moderna,
        dosis_Astrazeneca:frameworkSeleccionado.dosis_Astrazeneca,
        administradas_totales:frameworkSeleccionado.administradas_totales,
        pauta_completa:frameworkSeleccionado.pauta_completa
      };
      
      await axios.post(baseUrl+"insertar/", comunidad)
      .then(response=>{
       
        //cerramos la ventana modal
        abrirCerrarModalInsertar();
        //refresco la tabla haciendo una peticion get
        peticionGet();
        
      }).catch(error=>{
        console.log(error);
      })
    }//peticionPost
  
    const peticionPut=async()=>{
      
      
      const comunidad={
        nombre:frameworkSeleccionado.nombre,
        dosis_Pfizer:frameworkSeleccionado.dosis_Pfizer,
        dosis_Moderna:frameworkSeleccionado.dosis_Moderna,
        dosis_Astrazeneca:frameworkSeleccionado.dosis_Astrazeneca,
        administradas_totales:frameworkSeleccionado.administradas_totales,
        pauta_completa:frameworkSeleccionado.pauta_completa
      };
      await axios.put(baseUrl+"modificar/"+frameworkSeleccionado.id,comunidad)
      .then(response=>{
        if (response.data!=null)
        {
         //swal("Good job!", "You clicked the button!", "success"); 
          swal("Buen trabajo!","Registro Modificado Satisfactoriamente","success");
         
          abrirCerrarModalEditar();
           //refresco la tabla haciendo una peticion delete
           peticionGet();
        }  
       
      }).catch(error=>{
        console.log(error);
      })
    }//peticionPut
  
    const peticionDelete=async()=>{
     
      axios.delete(baseUrl+"borrar/"+frameworkSeleccionado.id).then(response=>{
      if (response.data!=null)
      {
        swal("Buen trabajo!","Registro Borrado Satisfactoriamente","success");
        abrirCerrarModalEliminar();
         //refresco la tabla haciendo una peticion delete
         peticionGet();
      }
      
       
      }).catch(error=>{
        console.log(error);
       
      })
    }//peticionDelete
  
    const seleccionarFramework=(framework, caso)=>{
      setFrameworkSeleccionado(framework);
  
      (caso==="Editar")?
      abrirCerrarModalEditar():
      abrirCerrarModalEliminar()
    }
  
    useEffect(()=>{
      peticionGet();
    },[])

  
    return (
      <div style={{textAlign: 'center'}}>
        <h1 className="h1">Datos Por Comunidades Autónomas</h1><br/>
        <button className="btn btn-success" onClick={()=>abrirCerrarModalInsertar()}><AddCircleIcon></AddCircleIcon></button>
        <br /><br />
      <table className="table table-striped table-hover">
        <thead>
          <tr style={{backgroundColor:"black", color:"whitesmoke"}}>
            <th>Comunidad</th>
            <th>Dosis Pfizer</th>
            <th>Dosis Moderna</th>
            <th>Dosis AstraZeneca</th>
            <th>Dosis Totales</th>
            <th>Administradas Totales</th>
            <th>% Sobre Entregadas</th>
            <th>Pauta Completa</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
        {console.log(data[3])}
          {data.map(framework=>(
            <tr key={framework.id}>
              <div style={{display:"none"}}>
                {Dosis_totales+=(framework.dosis_Pfizer+framework.dosis_Moderna+framework.dosis_Astrazeneca)}
                {Totales_pfizer+=framework.dosis_Pfizer}
                {Totales_moderna+=framework.dosis_Moderna}
                {Totales_astrazeneca+=framework.dosis_Astrazeneca}
                {Totales_Admin+=framework.administradas_totales}
                {Total_pauta+=framework.pauta_completa}
              </div>
              <td>{framework.nombre}</td>
              <td>{framework.dosis_Pfizer}</td>
              <td>{framework.dosis_Moderna}</td>
              <td>{framework.dosis_Astrazeneca}</td>
              <td>{framework.dosis_Pfizer+framework.dosis_Moderna+framework.dosis_Astrazeneca}</td>
              <td>{framework.administradas_totales}</td>
              <td>{(framework.administradas_totales/(framework.dosis_Pfizer+framework.dosis_Moderna+framework.dosis_Astrazeneca)*100).toFixed(1)}%</td>
              <td>{framework.pauta_completa}</td>
              
            <td>
            <button className="btn btn-primary" onClick={()=>seleccionarFramework(framework, "Editar")}><EditIcon></EditIcon></button>
            <button className="btn btn-danger" onClick={()=>seleccionarFramework(framework, "Eliminar")}><DeleteIcon></DeleteIcon></button>
            </td>
            </tr>
          ))}
        </tbody>
        <tr style={{backgroundColor:"black",color:"whitesmoke",fontWeight:"bold"}}>
            <th>TOTAL</th>
            <th>{Totales_pfizer}</th>
            <th>{Totales_moderna}</th>
            <th>{Totales_astrazeneca}</th>
            <th>{Dosis_totales}</th>
            <th>{Totales_Admin}</th>
            <th>{(Totales_Admin/Dosis_totales*100).toFixed(1)}%</th>
            <th>{Total_pauta}</th>
            <th></th>
          </tr> 
  
      </table>
  
      <Modal isOpen={modalInsertar}>
        <ModalHeader>Insertar Comunidad</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Nombre Comunidad: </label>
            <br />
            <input type="text" className="form-control" name="nombre" onChange={handleChange}/>
            <br />
            <label>Dosis Pfizer: </label>
            <br />
            <input type="text" className="form-control" name="dosis_Pfizer" onChange={handleChange}/>
            <br />
            <label>Dosis Moderna: </label>
            <br />
            <input type="text" className="form-control" name="dosis_Moderna" onChange={handleChange}/>
            <br />
            <label>Dosis AstraZeneca: </label>
            <br />
            <input type="text" className="form-control" name="dosis_Astrazeneca" onChange={handleChange}/>
            <br />
            <label>Administradas Totales: </label>
            <br />
            <input type="text" className="form-control" name="administradas_totales" onChange={handleChange}/>
            <br />
            <label>Pauta Completa: </label>
            <br />
            <input type="text" className="form-control" name="pauta_completa" onChange={handleChange}/>
            <br />
            
          </div>
        </ModalBody>
        <ModalFooter>
          
          <button className="btn btn-primary" onClick={()=>peticionPost()}><AddCircleIcon></AddCircleIcon></button>{"   "}
          <button className="btn btn-danger" onClick={()=>abrirCerrarModalInsertar()}><CancelIcon></CancelIcon></button>
        </ModalFooter>
      </Modal>
  
      <Modal isOpen={modalEditar}>
        <ModalHeader>Editar Comunidad</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Nombre Comunidad: </label>
            <br />
            <input type="text" className="form-control" name="nombre" onChange={handleChange} value={frameworkSeleccionado && frameworkSeleccionado.nombre}/>
            <br />
            <label>Dosis Pfizer: </label>
            <br />
            <input type="text" className="form-control" name="dosis_Pfizer" onChange={handleChange} value={frameworkSeleccionado && frameworkSeleccionado.dosis_Pfizer}/>
            <br />
            <label>Dosis Moderna: </label>
            <br />
            <input type="text" className="form-control" name="dosis_Moderna" onChange={handleChange} value={frameworkSeleccionado && frameworkSeleccionado.dosis_Moderna}/>
            <br />
            <label>Dosis AstraZeneca: </label>
            <br />
            <input type="text" className="form-control" name="dosis_Astrazeneca" onChange={handleChange} value={frameworkSeleccionado && frameworkSeleccionado.dosis_Astrazeneca}/>
            <br />
            <label>Administradas Totales: </label>
            <br />
            <input type="text" className="form-control" name="administradas_totales" onChange={handleChange} value={frameworkSeleccionado && frameworkSeleccionado.administradas_totales}/>
            <br />
            <label>Pauta Completa: </label>
            <br />
            <input type="text" className="form-control" name="pauta_completa" onChange={handleChange} value={frameworkSeleccionado && frameworkSeleccionado.pauta_completa}/>
            <br />
            
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={()=>peticionPut()}><EditIcon></EditIcon></button>{"   "}
          <button className="btn btn-danger" onClick={()=>abrirCerrarModalEditar()}><CancelIcon></CancelIcon></button>
        </ModalFooter>
      </Modal>
  
      <Modal isOpen={modalEliminar}>
          <ModalBody>
          ¿Estás seguro que deseas eliminar la Comunidad {frameworkSeleccionado && frameworkSeleccionado.nombre}?
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-primary" onClick={()=>peticionDelete()}>
              <CheckCircleIcon></CheckCircleIcon>
            </button>
            <button className="btn btn-danger" onClick={()=>abrirCerrarModalEliminar()} >
              <CancelIcon></CancelIcon>
            </button>
          </ModalFooter>
        </Modal>
  
      </div>
    );
  }
  
  export default CRUD;