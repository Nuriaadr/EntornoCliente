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
  ListGroup,
  ListGroupItem,
} from "reactstrap";

const Tabla = (props) => {
  return (
    <Table bordered>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Curso</th>
          <th>Edad</th>
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody>
        {props.alumnos.map((alumno) => (
          <FilaTabla
            key={alumno.id}
            alumno={alumno}
            abrirModalBorrar={props.abrirModalBorrar}
          />
        ))}
      </tbody>
    </Table>
  );
};

const FilaTabla = (props) => {
  return (
    <tr>
      <td>{props.alumno.nombre}</td>
      <td>{props.alumno.curso}</td>
      <td>{props.alumno.edad}</td>
      <td>
        <Button
          color="danger"
          onClick={() => props.abrirModalBorrar(props.alumno.id)}
        >
          Borrar
        </Button>
      </td>
    </tr>
  );
};

const ModalConfirmarBorrado = (props) => {
  return (
    <Modal isOpen={props.isOpen} toggle={props.toggle}>
      <ModalHeader toggle={props.toggle}>Confirmar borrado</ModalHeader>
      <ModalBody>¿Estás seguro de que quieres borrar este alumno?</ModalBody>
      <ModalFooter>
        <Button color="danger" onClick={props.confirmarBorrado}>
          Sí
        </Button>
        <Button color="secondary" onClick={props.toggle}>
          No
        </Button>
      </ModalFooter>
    </Modal>
  );
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alumnos: [
        {
          id: 1,
          nombre: "Nuria",
          curso: "2 DAW",
          edad: 21,
        },
      ],
      isOpen: false,
      idAlumnoBorrar: null,
    };
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  abrirModalBorrar = (id) => {
    this.setState({
      isOpen: true,
      idAlumnoBorrar: id,
    });
  };

  confirmarBorrado = () => {
    this.setState({
      alumnos: this.state.alumnos.filter(
        (a) => a.id !== this.state.idAlumnoBorrar,
      ),
      isOpen: false,
      idAlumnoBorrar: null,
    });
  };

  render() {
    return (
      <div className="container mt-4">
        <h1 className="mb-4"> Lista de alumnos</h1>

        <Tabla alumnos={this.state.alumnos} abrirModalBorrar={this.abrirModalBorrar} />
        <ModalConfirmarBorrado
          isOpen={this.state.isOpen}
          toggle={this.toggle}
          confirmarBorrado={this.confirmarBorrado}
        />
      </div>
    );
  }
}

export default App;
