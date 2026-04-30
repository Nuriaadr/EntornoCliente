import "bootstrap/dist/css/bootstrap.min.css";
import { Component, useState } from "react";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Card,
  CardBody,
  CardTitle,
  CardFooter,
  Modal,
} from "reactstrap";

const FormularioIncidencia = (props) => {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [tipo, setTipo] = useState("");

  function guardar() {
    props.aniadirIncidendia({ titulo, descripcion, tipo });
  }

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        guardar();
      }}
    >
      <FormGroup>
        <Label for="titulo">Título</Label>
        <Input
          type="text"
          name="titulo"
          id="titulo"
          placeholder="Título de la incidencia"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label for="descripcion">Descripcion</Label>
        <Input
          type="text"
          name="descripcion"
          id="descripcion"
          placeholder="Descripcion de la incidencia"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label for="descripcion">Tipo</Label>
        <Input
          type="select"
          name="tipo"
          id="tipo"
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
        >
          <option value="hardware">Hardware</option>
          <option value="software">Software</option>
          <option value="red">Red</option>
        </Input>
      </FormGroup>
      <Button>Añadir incidencia</Button>
    </Form>
  );
};

const CardIncidencia = (props) => {
  return (
    <Card>
      <CardBody>
        <CardTitle>{props.incidencia.titulo}</CardTitle>
        <p>{props.incidencia.descripcion}</p>
        <p>{props.incidencia.tipo}</p>
      </CardBody>
      <CardFooter>
        <Button onClick={() => props.toggleModal(props.incidencia)}>
          Ver Información
        </Button>
      </CardFooter>
    </Card>
  );
};

const ModalIncidencia = (props) => {
  return (
    <Modal isOpen={props.isOpen} toggle={props.toggleModal}>
      {props.incidencia && (
        <Card>
          <CardBody>
            <CardTitle>{props.incidencia.titulo}</CardTitle>
            <p>{props.incidencia.descripcion}</p>
            <p>{props.incidencia.tipo}</p>
          </CardBody>
          <CardFooter>
            <Button onClick={props.toggleModal}>Cerrar</Button>
          </CardFooter>
        </Card>
      )}
    </Modal>
  );
};
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      incidencias: [],
      isOpen: false,
      incidenciaSeleccionada: null,
    };
  }

  toggleModal = (incidencia) => {
    this.setState({
      isOpen: !this.state.isOpen,
      incidenciaSeleccionada: incidencia,
    });
  };

  aniadirIncidendia = (incidencia) => {
    let nuevaIncidencia = {
      id: this.state.incidencias.length + 1,
      titulo: incidencia.titulo,
      descripcion: incidencia.descripcion,
      tipo: incidencia.tipo,
    };
    let newIncidencias = [...this.state.incidencias, nuevaIncidencia];
    this.setState({ incidencias: newIncidencias });
  };

  render() {
    return (
      <div className="container mt-4">
        <h1>Gestión de Incidencias</h1>
        {this.state.incidencias.map((incidencia) => (
          <CardIncidencia
            incidencia={incidencia}
            toggleModal={this.toggleModal}
            isOpen={this.state.isOpen}
          />
        ))}
        <ModalIncidencia
          isOpen={this.state.isOpen}
          toggleModal={this.toggleModal}
          incidencia={this.state.incidenciaSeleccionada}
        />
        <FormularioIncidencia aniadirIncidendia={this.aniadirIncidendia} />
      </div>
    );
  }
}

export default App;
