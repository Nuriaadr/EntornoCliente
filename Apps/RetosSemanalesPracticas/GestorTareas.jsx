import "bootstrap/dist/css/bootstrap.min.css";
import { Component, useState } from "react";
import {
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
  Card,
  CardBody,
  Col,
} from "reactstrap";

const Tabla = (props) => {
  return (
    <Table bordered>
      <thead>
        <tr>
          <th>#</th>
          <th>Título</th>
          <th>Descripción</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody>
        {props.tareas.length === 0 ? (
          <tr>
            <td colSpan="5" className="text-center">
              No hay tareas
            </td>
          </tr>
        ) : (
          props.tareas.map((tarea) => (
            <tr key={tarea.indice}>
              <td>{tarea.indice}</td>
              <td>{tarea.titulo}</td>
              <td>{tarea.descripcion}</td>
              <td>{tarea.estado}</td>
              <td>
                <Button
                  color="danger"
                  onClick={() => props.abrirEliminar(tarea.indice)}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </Table>
  );
};

const ModalConfirmacion = (props) => {
  return (
    <Modal isOpen={props.isOpen} toggle={props.toggle}>
      <ModalHeader toggle={props.toggle}>Confirmar eliminación</ModalHeader>

      <ModalBody>¿Seguro que quieres eliminar esta tarea?</ModalBody>

      <ModalFooter>
        <Button color="danger" onClick={props.confirmar}>
          Eliminar
        </Button>

        <Button color="secondary" onClick={props.toggle}>
          Cancelar
        </Button>
      </ModalFooter>
    </Modal>
  );
};

const ModalAniadir = (props) => {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [estado, setEstado] = useState("Pendiente");

  function aniadir() {
    props.aniadir(titulo, descripcion, estado);
    setTitulo("");
    setDescripcion("");
    props.toggle();
  }
  return (
    <Modal isOpen={props.isOpen} toggle={props.toggle}>
      <ModalHeader toggle={props.toggle}>Añadir una tarea</ModalHeader>

      <ModalBody>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            aniadir();
          }}
        >
          <FormGroup>
            <Label>Título</Label>
            <Input
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Descripción</Label>
            <Input
              type="text"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Estado</Label>
            <Input
              type="select"
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
              required
            >
              <option value="Pendiente">Pendiente</option>
              <option value="En curso">En curso</option>
              <option value="Finalizada">Finalizada</option>
            </Input>
          </FormGroup>
          <Button color="success" type="submit">
            Añadir
          </Button>
        </Form>
      </ModalBody>

      <ModalFooter>
        <Button color="secondary" onClick={props.toggle}>
          Cancelar
        </Button>
      </ModalFooter>
    </Modal>
  );
};

const FiltroEstado = (props) => {
  const [estadoFiltro, setEstadoFiltro] = useState("");

  function filtrar() {
    props.filtrar(estadoFiltro);
  }
  return (
    <Card>
      <CardBody>
        <Col>
          <Label for="filtroEstado">Filtrar por estado:</Label>
          <Input
            type="select"
            id="filtroEstado"
            value={estadoFiltro}
            onChange={(e) => setEstadoFiltro(e.target.value)}
          >
            <option value="">Todos</option>
            <option value="Pendiente">Pendiente</option>
            <option value="En curso">En curso</option>
            <option value="Finalizada">Finalizada</option>
          </Input>
          <Button color="primary" className="mt-2" onClick={filtrar}>
            Filtrar
          </Button>
        </Col>
      </CardBody>
    </Card>
  );
};

const BusquedaTareas = (props) => {
  const [texto, setTexto] = useState("");

  const buscar = () => {
    props.buscar(texto);
  };

  return (
    <Card className="mb-3">
      <CardBody>
        <Col>
          <Label for="buscarTarea">Buscar tareas:</Label>
          <Input
            type="text"
            id="buscarTarea"
            placeholder="Escribe título o descripción"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
          />
          <Button color="primary" className="mt-2" onClick={buscar}>
            Buscar
          </Button>
          <Button
            color="secondary"
            className="mt-2 ms-2"
            onClick={() => {
              setTexto("");
              props.buscar("");
            }}
          >
            Limpiar
          </Button>
        </Col>
      </CardBody>
    </Card>
  );
};
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tareas: [
        {
          indice: 1,
          titulo: "Libro",
          descripcion: "Objeto que tiene muchas hojas",
          estado: "Pendiente",
        },
        {
          indice: 2,
          titulo: "Comprar pan",
          descripcion: "Ir a la panadería y comprar pan fresco",
          estado: "En curso",
        },
        {
          indice: 3,
          titulo: "Estudiar React",
          descripcion: "Hacer ejercicios de componentes y hooks",
          estado: "Pendiente",
        },
        {
          indice: 4,
          titulo: "Limpiar habitación",
          descripcion: "Ordenar y aspirar el cuarto",
          estado: "Finalizada",
        },
        {
          indice: 5,
          titulo: "Enviar email",
          descripcion: "Responder al correo del jefe",
          estado: "En curso",
        },
      ],
      isOpenConfirmacion: false,
      idPalabraEliminar: null,
      isOpenAniadir: false,
    };
    this.tareasCopia = [...this.state.tareas];
  }

  abrirEliminar = (id) => {
    this.setState({ isOpenConfirmacion: true, idPalabraEliminar: id });
  };
  cerrarEliminar = () => {
    this.setState({ isOpenConfirmacion: false, idPalabraEliminar: null });
  };

  toggleAniadir = () => {
    this.setState({ isOpenAniadir: !this.state.isOpenAniadir });
  };
  eliminar = (id) => {
    let listaFiltrados = this.state.tareas.filter((t) => t.indice !== id);
    this.setState({ tareas: listaFiltrados });
  };

  aniadir = (titulo, descripcion, estado) => {
    let nuevaTarea = {
      indice: this.state.tareas.length + 1,
      titulo: titulo,
      descripcion: descripcion,
      estado: estado,
    };
    let copiaLista = [...this.state.tareas, nuevaTarea];
    this.setState({ tareas: copiaLista });
  };

  filtrar = (estado) => {
    if (estado === "") {
      this.setState({ tareas: [...this.tareasCopia] });
    } else {
      let listaFiltrados = this.tareasCopia.filter((t) => t.estado === estado);
      this.setState({ tareas: listaFiltrados });
    }
  };

  buscar = (texto) => {
    if (texto === "") {
      this.setState({ tareas: [...this.tareasCopia] });
    } else {
      const filtradas = this.tareasCopia.filter(
        (t) =>
          t.titulo.toLowerCase().includes(texto.toLowerCase()) ||
          t.descripcion.toLowerCase().includes(texto.toLowerCase()),
      );
      this.setState({ tareas: filtradas });
    }
  };
  
  render() {
    return (
      <div className="container mt-4">
        <h1 className="mb-4">Gestor de tareas</h1>
        <Button color="success" onClick={this.toggleAniadir}>
          Añadir Tarea
        </Button>
        <Tabla
          tareas={this.state.tareas}
          abrirEliminar={this.abrirEliminar}
          cerrarEliminar={this.cerrarEliminar}
          eliminar={this.eliminar}
        />

        <ModalConfirmacion
          isOpen={this.state.isOpenConfirmacion}
          toggle={this.cerrarEliminar}
          confirmar={() => {
            this.eliminar(this.state.idPalabraEliminar);
            this.cerrarEliminar();
          }}
        />

        <ModalAniadir
          isOpen={this.state.isOpenAniadir}
          toggle={this.toggleAniadir}
          aniadir={this.aniadir}
        />

        <FiltroEstado filtrar={this.filtrar} />
        <BusquedaTareas buscar={this.buscar} />
      </div>
    );
  }
}

export default App;
