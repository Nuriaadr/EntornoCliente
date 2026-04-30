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
      <tbody>
        <th>Nombre</th>
        <th>Curso</th>
        <th>Acciones</th>

        {props.alumnos.map((alumno) => (
          <FilaTabla
            key={alumno.indice}
            alumno={alumno}
            borrar={props.borrar}
          />
        ))}
      </tbody>
    </Table>
  );
};

const FilaTabla = (props) => {
  return (
    <tr key={props.alumno.indice}>
      <td>{props.alumno.nombre}</td>
      <td>{props.alumno.curso}</td>
      <td>{props.alumno.edad}</td>
      <td>
        <Button
          color="danger"
          onClick={() => props.borrar(props.alumno.id)}
        >
          Borrar
        </Button>
      </td>
    </tr>
  );
};

const FormAniadir = (props) => {
  const [nombre, setNombre] = useState("");
  const [curso, setCurso] = useState("");
  const [edad, setEdad] = useState("");

  function guardar() {
    props.aniadir(nombre, curso, edad);
  }

  return (
    <Row>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          guardar();
        }}
      >
        <FormGroup>
          <Label>Nombre</Label>
          <Input onChange={(e) => setNombre(e.target.value)}></Input>
        </FormGroup>
        <FormGroup>
          <Label>Curso</Label>
          <Input onChange={(e) => setCurso(e.target.value)}></Input>
        </FormGroup>
        <FormGroup>
          <Label>Edad</Label>
          <Input onChange={(e) => setEdad(e.target.value)}></Input>
        </FormGroup>
        <Button type="submit">Guardar</Button>
      </Form>
    </Row>
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
    };
  }

  borrar = (id) => {
    this.setState({
      alumnos: this.state.alumnos.filter((alumno) => alumno.id !== id),
    });
  };
  aniadir = (nombre, curso, edad) => {
    const nuevoAlumno = {
      id: this.state.alumnos.length + 1,
      nombre: nombre,
      curso: curso,
      edad: edad,
    };
    this.setState({
      alumnos: [...this.state.alumnos, nuevoAlumno],
    });
  };
  render() {
    return (
      <div className="container mt-4">
        <h1 className="mb-4"> Lista de alumnos</h1>

        <Tabla alumnos={this.state.alumnos} borrar={this.borrar} />
        <FormAniadir aniadir={this.aniadir}></FormAniadir>
      </div>
    );
  }
}

export default App;
