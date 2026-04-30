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

const Lista = (props) => {
  return (
    <ListGroup>
      {props.tareas.map((p) => (
        <ListGroupItem key={p.id}>
          {p.titulo} ---- {p.descripcion}
          <Button color="danger" onClick={() => props.eliminar(p.id)}>
            Eliminar
          </Button>
        </ListGroupItem>
      ))}
    </ListGroup>
  );
};

const FormAniadir = (props) => {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");

  function guardar() {
    props.aniadir(titulo, descripcion);
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
          <Label>Título</Label>
          <Input onChange={(e) => setTitulo(e.target.value)}></Input>
        </FormGroup>
        <FormGroup>
          <Label>Descripcion</Label>
          <Input onChange={(e) => setDescripcion(e.target.value)}></Input>
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
      tareas: [
        {
          id: 1,
          titulo: "morirme",
          descripcion: "morirme de verdad",
        },
      ],
    };
  }

  eliminar = (id) => {
    this.setState({ tareas: this.state.tareas.filter((t) => t.id !== id) });
  };

  aniadir = (titulo, descripcion) => {
    let listaCopia = this.state.tareas;
    const nuevaTarea = {
      id: this.state.tareas.length + 1,
      titulo: titulo,
      descripcion: descripcion,
    };
    listaCopia.push(nuevaTarea);
    this.setState({ tareas: listaCopia });
  };
  render() {
    return (
      <div className="container mt-4">
        <h1 className="mb-4"> Lista de tareas</h1>

        <Lista tareas={this.state.tareas} eliminar={this.eliminar} />
        <FormAniadir aniadir={this.aniadir}></FormAniadir>
      </div>
    );
  }
}

export default App;
