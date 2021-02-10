
//npm i bootstrap reactstrap axios sweetalert
import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import axios from 'axios';
//libreria para mejorar los alert   https://sweetalert.js.org/guides/
//npm install sweetalert --save
import swal from 'sweetalert';
function CRUD() {
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
        //console.log(response.data);
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
  <br />
        <button className="btn btn-success" onClick={()=>abrirCerrarModalInsertar()}>Insertar</button>
        <br /><br />
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Comunidad</th>
            <th>Dosis Pfizer</th>
            <th>Dosis Moderna</th>
            <th>Dosis AstraZeneca</th>
            <th>Administradas Totales</th>
            <th>Pauta Completa</th>
          </tr>
        </thead>
        <tbody>
        {console.log(data[0])}
          {data.map(framework=>(
            <tr key={framework.id}>
              {/*console.log(framework.first_name)*/}
              {/* el nombre de los campos que vienen a continuacion tienes que ser
              los que nos devuelve el JSON. Fijate en como se llaman cuando te devuelve 
              haciendo una peticion get por la url http://localhost:4008/users/
              [{"id":1,"firstName":"juan","lastName":"Perez"},
              {"id":2,"firstName":"Ana","lastName":"Soria"},
              {"id":3,"firstName":"Luis","lastName":"Rodrigo"},
              {"id":4,"firstName":"Raquel","lastName":"Segovia"}]
  
              
              */}
              <td>{framework.nombre}</td>
              <td>{framework.dosis_Pfizer}</td>
              <td>{framework.dosis_Moderna}</td>
              <td>{framework.dosis_Astrazeneca}</td>
              <td>{framework.administradas_totales}</td>
              <td>{framework.pauta_completa}</td>
              
            <td>
            <button className="btn btn-primary" onClick={()=>seleccionarFramework(framework, "Editar")}>Editar</button> 
            <button className="btn btn-danger" onClick={()=>seleccionarFramework(framework, "Eliminar")}>Eliminar</button>
            </td>
            </tr>
          ))}
  
  
        </tbody> 
  
      </table>
  
  
      <Modal isOpen={modalInsertar}>
        <ModalHeader>Insertar Usuarios</ModalHeader>
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
          
          <button className="btn btn-primary" onClick={()=>peticionPost()}>Insertar</button>{"   "}
          <button className="btn btn-danger" onClick={()=>abrirCerrarModalInsertar()}>Cancelar</button>
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
            <input type="text" className="form-control" name="dosis_Astrazeneca" onChange={handleChange} value={frameworkSeleccionado && frameworkSeleccionado.dosis_AstraZeneca}/>
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
          <button className="btn btn-primary" onClick={()=>peticionPut()}>Modificar</button>{"   "}
          <button className="btn btn-danger" onClick={()=>abrirCerrarModalEditar()}>Cancelar</button>
        </ModalFooter>
      </Modal>
  
      <Modal isOpen={modalEliminar}>
          <ModalBody>
          ¿Estás seguro que deseas eliminar la Comunidad {frameworkSeleccionado && frameworkSeleccionado.nombre}?
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-danger" onClick={()=>peticionDelete()}>
              Sí
            </button>
            <button className="btn btn-secondary" onClick={()=>abrirCerrarModalEliminar()} >
              No
            </button>
          </ModalFooter>
        </Modal>
  
      </div>
    );
  }
  
  export default CRUD;