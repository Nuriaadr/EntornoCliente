import 'bootstrap/dist/css/bootstrap.min.css';
import { Component, useState } from 'react';
import {
  Card, CardBody, CardTitle, CardText, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter,
  Form, FormGroup, Label, Input, Badge
} from 'reactstrap';

const ListadoCoches = (props) => {
  return (
    <Col md="4" className="mb-4">
      <Card className="h-100">
        <CardBody onClick={() => props.onVisitar(props.coche.id)}>
          <CardTitle tag="h5">
            {props.coche.modelo}
            {props.coche.visitado && <Badge color="success" className="ms-2">Visitado</Badge>}
          </CardTitle>

          <CardText>
            <strong>Marca:</strong> {props.coche.marca}<br />
            <strong>Combustible:</strong> {props.coche.combustible}<br />
            <strong>Precio:</strong> {props.coche.precio} €
          </CardText>

          <CardText>{props.coche.descripcion}</CardText>
          <Button color="warning" size="sm" onClick={(e) => { e.stopPropagation(); props.onEditar(props.coche); }}>Modificar</Button>{" "}
          <Button color="danger" size="sm" onClick={(e) => { e.stopPropagation(); props.onEliminar(props.coche.id); }}>Eliminar</Button>
        </CardBody>
      </Card>
    </Col>
  );
};

const Filtro = (props) => {
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [combustible, setCombustible] = useState('');
  const [precio, setPrecio] = useState('');

  return (
    <Modal isOpen={props.abierto} toggle={props.toggle}>
      <ModalHeader toggle={props.toggle}>
        Filtro de vehículos
      </ModalHeader>

      <ModalBody>
        <Form>
          <FormGroup>
            <Label>Modelo</Label>
            <Input value={modelo} onChange={e => setModelo(e.target.value)} />
          </FormGroup>

          <FormGroup>
            <Label>Marca</Label>
            <Input value={marca} onChange={e => setMarca(e.target.value)} />
          </FormGroup>

          <FormGroup>
            <Label>Combustible</Label>
            <Input type="select" value={combustible} onChange={e => setCombustible(e.target.value)}>
              <option value="">Todos</option>
              <option>Gasolina</option>
              <option>Diésel</option>
              <option>Eléctrico</option>
            </Input>
          </FormGroup>

          <FormGroup>
            <Label>Precio máximo</Label>
            <Input type="number" value={precio} onChange={e => setPrecio(e.target.value)} />
          </FormGroup>
        </Form>
      </ModalBody>

      <ModalFooter>
        <Button
          color="primary"
          onClick={() => props.filtrarCoches(marca, modelo, combustible, precio)}
        >
          Filtrar
        </Button>
        <Button
          color="success"
          onClick={props.abrirAlta}
        >
          Alta de vehículo
        </Button>
        <Button color="secondary" onClick={props.toggle}>
          Cerrar
        </Button>
      </ModalFooter>
    </Modal>
  );
};

const ModalCoche = (props) => {
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [combustible, setCombustible] = useState('');
  const [precio, setPrecio] = useState('');
  const [descripcion, setDescripcion] = useState('');

  function guardar() {
    if (props.accion === "editar") {
      props.editarCoche(props.coche.id, marca, modelo, combustible, precio, descripcion
      );
    } else {
      props.altaCoche(marca, modelo, combustible, precio, descripcion);
    }
    props.toggle();
  }
  return (
    <Modal isOpen={props.abierto} toggle={props.toggle}>
      <ModalHeader toggle={props.toggle}>{props.accion === "editar" ? "Modificar vehículo" : "Alta de vehículo"}</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label>Modelo</Label>
            <Input value={props.modelo} onChange={(e) => setModelo(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <Label>Marca</Label>
            <Input value={props.marca} onChange={(e) => setMarca(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <Label>Combustible</Label>
            <Input type="select" value={props.combustible} onChange={(e) => setCombustible(e.target.value)}>
              <option value="">Selecciona</option>
              <option>Gasolina</option>
              <option>Diésel</option>
              <option>Eléctrico</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label>Precio</Label>
            <Input type="number" value={props.precio} onChange={(e) => setPrecio(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <Label>Descripción</Label>
            <Input type="textarea" value={props.descripcion} onChange={(e) => setDescripcion(e.target.value)} />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={guardar}>Guardar</Button>
        <Button color="secondary" onClick={props.toggle}>Cerrar</Button>
      </ModalFooter>
    </Modal>
  );
};


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coches: [
        { id: 1, modelo: "Toyota Corolla", marca: "Toyota", combustible: "Gasolina", precio: 20500, descripcion: "Compacto fiable y eficiente, ideal para ciudad." },
        { id: 2, modelo: "Volkswagen Golf", marca: "Volkswagen", combustible: "Diésel", precio: 23000, descripcion: "Gran equilibrio entre rendimiento y confort." },
        { id: 3, modelo: "Tesla Model 3", marca: "Tesla", combustible: "Eléctrico", precio: 39900, descripcion: "Vehículo eléctrico con gran autonomía y tecnología." },
        { id: 4, modelo: "Ford Focus", marca: "Ford", combustible: "Gasolina", precio: 21300, descripcion: "Diseño moderno y conducción dinámica." },
        { id: 5, modelo: "BMW Serie 3", marca: "BMW", combustible: "Diésel", precio: 35000, descripcion: "Sedán prémium con altas prestaciones." },
        { id: 6, modelo: "Audi A4", marca: "Audi", combustible: "Gasolina", precio: 33500, descripcion: "Elegancia y tecnología alemana." },
        { id: 7, modelo: "Nissan Leaf", marca: "Nissan", combustible: "Eléctrico", precio: 29000, descripcion: "Eléctrico práctico y sostenible." },
        { id: 8, modelo: "Peugeot 308", marca: "Peugeot", combustible: "Diésel", precio: 22800, descripcion: "Consumo reducido y diseño atractivo." },
        { id: 9, modelo: "Hyundai Tucson", marca: "Hyundai", combustible: "Gasolina", precio: 28000, descripcion: "SUV espacioso y versátil." },
        { id: 10, modelo: "Kia EV6", marca: "Kia", combustible: "Eléctrico", precio: 41000, descripcion: "Diseño innovador y gran autonomía." }
      ],
      accion: '',
      modalFiltro: true,
      modalCoche: false,
      cocheSeleccionado: null
    };
  }

  filtrarCoches = (marca, modelo, combustible, precioMax) => {
    const cochesOriginales = this.state.coches;
     const precioNum = precioMax === '' ? Infinity : Number(precioMax);
    const cochesFiltrados = cochesOriginales.filter(coche =>
      (marca === '' || coche.marca.toLowerCase().includes(marca.toLowerCase())) &&
      (modelo === '' || coche.modelo.toLowerCase().includes(modelo.toLowerCase())) &&
      (combustible === '' || coche.combustible === combustible) &&
      (precioMax === '' || coche.precio <= precioNum)
    );
    this.setState({ coches: cochesFiltrados });
  }

  eliminar = (id) => {
    this.setState({ coches: this.state.coches.filter(c => c.id !== id) });
  }

  visitar = (id) => {
    const cochesVisitados = this.state.coches.map(coche =>
      coche.id === id ? { ...coche, visitado: true } : coche
    );
    this.setState({ coches: cochesVisitados });
  }



  toggleCoche = () => {
    this.setState({ modalCoche: !this.state.modalCoche });
  }

  abrirAlta = () => {
    this.setState({ accion: 'crear', cocheSeleccionado: null, modalCoche: true });
  }

  abrirEditar = (coche) => {
    this.setState({ accion: 'editar', cocheSeleccionado: coche, modalCoche: true });
  }

  toggleFiltro = () => {
    this.setState({ modalFiltro: !this.state.modalFiltro });
  }

  editarCoche = (id, marca, modelo, combustible, precio, descripcion) => {
    const coches = this.state.coches.map(c => c.id === id ? { ...c, marca, modelo, combustible, precio, descripcion } : c);
    this.setState({ coches });
  };

  altaCoche = (marca, modelo, combustible, precio, descripcion) => {
    const id = Math.max(0, ...this.state.coches.map(c => c.id)) + 1;
    const nuevo = { id, modelo, marca, combustible, precio: Number(precio), descripcion };
    this.setState({ coches: [...this.state.coches, nuevo] });
  };
  render() {
    return (
      <div className="container mt-4">
        <Row className="mt-4">
          {this.state.coches.length === 0 && <h1>No existen vehículos con esos criterios</h1>}
          <div className="d-flex justify-content-between mb-3">
            <h2>Listado de vehículos</h2>
            <Button color="primary" onClick={this.toggleFiltro}>Filtrar vehículos</Button>
          </div>
          {this.state.coches.map((coche) => (
            <ListadoCoches
              coche={coche}
              onEliminar={this.eliminar}
              onVisitar={this.visitar}
              onEditar={this.abrirEditar}
            />
          ))}
        </Row>


        <Filtro
          abierto={this.state.modalFiltro}
          toggle={this.toggleFiltro}
          filtrarCoches={this.filtrarCoches}
          abrirAlta={this.abrirAlta}
        />

        <ModalCoche
          abierto={this.state.modalCoche}
          toggle={this.toggleCoche}
          accion={this.state.accion}
          coche={this.state.cocheSeleccionado}
          altaCoche={this.altaCoche}
          editarCoche={this.editarCoche}
        />



      </div>
    );
  }
}

export default App;
