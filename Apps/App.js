import { useState } from "react";
import { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const ListaCorredores = (props) => {
  const [isOpen, setIsOpen] = useState(false)
  const [accion, setAccion] = useState(undefined)
  const [posicion, setPosicion] = useState(null);

  const toggleModal = () => { setIsOpen(!isOpen) }

  let lista = props.corredores.map(e => <li>{e.nombre} ------- {e.posicion}
    <Button color="warning" size="sm" onClick={() => { setAccion("modificar");setPosicion(e.posicion); toggleModal(); }}>Modificar</Button>
    <Button color="danger" size="sm" onClick={() => props.bajaCorredor(e.posicion)}>Baja</Button> </li>
  )

  return (
    <>
      <ul>
        {lista}
      </ul>
      <Button color="success" size="sm" onClick={() => { setAccion("alta"); toggleModal(); }}> Alta </Button>{" "}
      <ModalCorredor
        isOpen={isOpen}
        toggle={() => toggleModal()}
        accion={accion}
        posicion={posicion}
        altaCorredor={(nombre) => props.altaCorredor(nombre)}
        modificarCorredor={(posicion, nombre) => props.modificarCorredor(posicion, nombre)}
      />
    </>
  );
};
const ModalCorredor = (props) => {

  const [nombre, setNombre] = useState(null);

  function enviar() {
    if (props.accion == "modificar") {
      props.modificarCorredor(props.posicion, nombre);
    } else
      props.altaCorredor(nombre);
  }
  return (
    <Modal isOpen={props.isOpen} toggle={props.toggle} onEntering={() => { }}>
      <h1>{props.accion}</h1>
      <ModalHeader toggle={props.toggle}>Corredor</ModalHeader>
      <ModalBody>
        {props.accion == "modificar" &&
          <FormGroup>
            <Label>Posicion</Label>
            <Input name="posicion" value={props.posicion} disabled />
          </FormGroup>
        }
        <FormGroup>
          <Label>Nombre</Label>
          <Input name="nombre" value={props.nombre} onChange={(e) => { setNombre(e.target.value) }} />
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={enviar} >Guardar</Button>
        <Button color="secondary" onClick={props.toggle}>Cancelar</Button>
      </ModalFooter>
    </Modal>
  );
};
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      corredores: [{ posicion: 1, nombre: "FULANITO" },
      { posicion: 2, nombre: "MENGANITO", }]
    }
  }

  bajaCorredor(posicion) {
    let c = this.state.corredores.filter(f => f.posicion != posicion)
    this.setState({ corredores: c })
  }

  getMax() {
    let max = 1;
    this.state.corredores.map(e => { if (e.posicion > max) { max = e.posicion } })
    return (max)
  }

  altaCorredor = (nombre) => {
    let c = this.state.corredores;
    let newpos = this.getMax() + 1
    console.log(newpos)
    c.push({ posicion: newpos, nombre: nombre })
    this.setState({ corredores: c });
  };

  modificarCorredor(posicion, nombre) {
    let c = this.state.corredores.map((e) => (e.posicion === posicion ? { posicion: posicion, nombre: nombre } : e))
    this.setState({ corredores: c });
  };

  render() {
    return (
      <div>
        <h2>CARRERA DE ISTAN</h2>
        <ListaCorredores
          corredores={this.state.corredores}
          bajaCorredor={(p) => this.bajaCorredor(p)}
          altaCorredor={(nombre) => this.altaCorredor(nombre)}
          modificarCorredor={(posicion, nombre) => this.modificarCorredor(posicion, nombre)}
        />

      </div >
    )
  };
}
export default App;