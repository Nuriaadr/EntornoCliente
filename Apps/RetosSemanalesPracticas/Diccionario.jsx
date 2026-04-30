import "bootstrap/dist/css/bootstrap.min.css";
import { Component, useState } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  CardTitle,
  CardText,
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  Table,
} from "reactstrap";

const Fila = (props) => {
  const [palabra, setPalabra] = useState(props.palabra.palabra ?? "");
  const [definicion, setDefinicion] = useState(props.palabra.definicion ?? "");
  return (
    <tr>
      <td>{props.palabra.indice}</td>
      <td>
        <Input
          name="palabra"
          value={palabra}
          onChange={(e) => {
            e.preventDefault();
            setPalabra(e.target.value);
          }}
        />
      </td>
      <td>
        <Input
          name="definicion"
          value={definicion}
          onChange={(e) => {
            e.preventDefault();
            setDefinicion(e.target.value);
          }}
        />
      </td>
      <td>
        <Button
          color="danger"
          onClick={() => props.eliminar(props.palabra.indice)}
        >
          Eliminar
        </Button>
      </td>
    </tr>
  );
};

const Tabla = (props) => {
  return (
    <Table>
      <thead>
        <tr>
          <th>#</th>
          <th>Palabra</th>
          <th>Definicion</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {props.palabras.map((palabra) => (
          <Fila
            key={palabra.indice}
            palabra={palabra}
            eliminar={props.eliminar}
          />
        ))}
      </tbody>
    </Table>
  );
};

const ModalConfirmacion = (props) => {
  return (
    <Modal isOpen={props.isOpen} toggle={props.toggle}>
      <ModalHeader toggle={props.toggle}>Confirmar eliminación</ModalHeader>
      <ModalBody>¿Estás seguro de que quieres eliminar esta palabra?</ModalBody>
      <ModalFooter>
        <Button color="danger" onClick={props.confirmar}>
          Sí, eliminar
        </Button>
        <Button color="secondary" onClick={props.toggle}>
          Cancelar
        </Button>
      </ModalFooter>
    </Modal>
  );
};

const ModalAniadir = (props) => {
  const [palabra, setPalabra] = useState("");
  const [definicion, setDefinicion] = useState("");

  function guardar() {
    props.aniadir(palabra, definicion);
    props.toggle();
    setPalabra("");
    setDefinicion("");
  }
  return (
    <Modal isOpen={props.isOpen} toggle={props.toggle}>
      <ModalHeader toggle={props.toggle}>Añadir palabra</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label>Palabra</Label>
            <Input
              type="text"
              name="palabra"
              value={palabra}
              onChange={(e) => setPalabra(e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label>Definición</Label>
            <Input
              type="text"
              name="palabra"
              value={definicion}
              onChange={(e) => setDefinicion(e.target.value)}
            />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={guardar}>
          Guardar
        </Button>
      </ModalFooter>
    </Modal>
  );
};
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      palabras: [
        {
          indice: 1,
          palabra: "libro",
          definicion: "objeto que tiene muchas hojas",
        },
        {
          indice: 2,
          palabra: "pastel",
          definicion: "objeto",
        },
        {
          indice: 3,
          palabra: "ordenador",
          definicion: "objeto",
        },
      ],
      isOpenConfirmacion: false,
      isOpenAniadir: false,
      palabraEliminar: null,
    };
  }

  abrirConfirmacion = (indice) => {
    this.setState({
      isOpenConfirmacion: true,
      palabraEliminar: indice,
    });
  };
  cerrarConfirmacion = () => {
    this.setState({
      isOpenConfirmacion: false,
      palabraEliminar: null,
    });
  };

  toggleModalAniadir = () => {
    this.setState({
      isOpenAniadir: !this.state.isOpenAniadir,
    });
  };
  eliminar = (indice) => {
    let listaFiltrados = this.state.palabras.filter((p) => p.indice !== indice);
    this.setState({ palabras: listaFiltrados });
  };

  aniadirPalabra = (palabra, definicion) => {
    let nuevaPalabra = {
      indice: this.state.palabras.length + 1,
      palabra: palabra,
      definicion: definicion,
    };
    this.setState({
      palabras: [...this.state.palabras, nuevaPalabra],
    });
  };

  render() {
    return (
      <div className="container mt-4">
        <h1 className="mb-4">Diccionario de Palabras</h1>
        <Button color="warning" onClick={this.toggleModalAniadir}>
          Añadir Palabra
        </Button>

        <ModalAniadir
          toggle={this.toggleModalAniadir}
          isOpen={this.state.isOpenAniadir}
          aniadir={this.aniadirPalabra}
        />

        <Tabla
          palabras={this.state.palabras}
          eliminar={this.abrirConfirmacion}
        />

        <ModalConfirmacion
          isOpen={this.state.isOpenConfirmacion}
          toggle={this.cerrarConfirmacion}
          confirmar={() => {
            this.eliminar(this.state.palabraEliminar);
            this.cerrarConfirmacion();
          }}
        />
      </div>
    );
  }
}

export default App;
