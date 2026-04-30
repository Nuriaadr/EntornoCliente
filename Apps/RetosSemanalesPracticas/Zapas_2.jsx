import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Table,
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Component, useEffect, useState } from "react";

const initialZapatillas = [
  { id: 1, marca: "Nike", modelo: "Air Max 90", color: "Blanco", precio: 139 },
  { id: 2, marca: "Adidas", modelo: "Ultraboost", color: "Negro", precio: 180 },
  { id: 3, marca: "Puma", modelo: "RS-X", color: "Azul", precio: 110 },
  { id: 4, marca: "New Balance", modelo: "574", color: "Gris", precio: 95 },
  {
    id: 5,
    marca: "Asics",
    modelo: "Gel-Lyte III",
    color: "Verde",
    precio: 120,
  },
  {
    id: 6,
    marca: "Reebok",
    modelo: "Classic Leather",
    color: "Blanco",
    precio: 85,
  },
  {
    id: 7,
    marca: "Converse",
    modelo: "Chuck Taylor",
    color: "Rojo",
    precio: 75,
  },
  { id: 8, marca: "Vans", modelo: "Old Skool", color: "Negro", precio: 80 },
  { id: 9, marca: "Jordan", modelo: "1 Mid", color: "Multicolor", precio: 135 },
  { id: 10, marca: "Skechers", modelo: "D'Lites", color: "Beige", precio: 70 },
];

const ModalConfirmacion = (props) => {
  return (
    <Modal isOpen={props.abierto} toggle={props.cerrarEliminar}>
      <ModalHeader>Confirmar eliminación</ModalHeader>
      <ModalBody>
        ¿Estás seguro de que quieres eliminar esta zapatilla?
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={props.cerrarEliminar}>
          Cancelar
        </Button>
        <Button
          color="danger"
          onClick={() => props.eliminarZapatilla(props.zapatillaAEliminar)}
        >
          Eliminar
        </Button>
      </ModalFooter>
    </Modal>
  );
};

const ModalEdicion = (props) => {
  const [modelo, setModelo] = useState("");
  const [marca, setMarca] = useState("");
  const [color, setColor] = useState("");
  const [precio, setPrecio] = useState("");

  useEffect(() => {
    if (props.zapatillaEditar) {
      setMarca(props.zapatillaEditar.marca);
      setModelo(props.zapatillaEditar.modelo);
      setColor(props.zapatillaEditar.color);
      setPrecio(props.zapatillaEditar.precio);
    }
  }, [props.zapatillaEditar]);

  function editar() {
    props.editarZapatilla(modelo, marca, color, precio);
    props.cerrarEditar();
  }
  return (
    <Modal isOpen={props.abierto} toggle={props.cerrarEditar}>
      <ModalHeader>Edición</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label>Marca:</Label>
            <Input
              value={marca}
              onChange={(e) => setMarca(e.target.value)}
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label>Modelo:</Label>
            <Input
              value={modelo}
              onChange={(e) => setModelo(e.target.value)}
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label>Color:</Label>
            <Input
              value={color}
              onChange={(e) => setColor(e.target.value)}
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label>Precio:</Label>
            <Input
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
            ></Input>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={props.cerrarEditar}>
          Cancelar
        </Button>
        <Button color="warning" onClick={editar}>
          Editar
        </Button>
      </ModalFooter>
    </Modal>
  );
};

const FormularioAniadir = (props) => {
  const [modelo, setModelo] = useState("");
  const [marca, setMarca] = useState("");
  const [color, setColor] = useState("");
  const [precio, setPrecio] = useState("");

  function enviar() {
    props.aniadir(modelo, marca, color, precio);
  }
  return (
    <Card>
      <CardHeader>Añadir una zapatilla</CardHeader>
      <CardBody>
        <Row>
          <Form>
            <FormGroup>
              <Label>Marca:</Label>
              <Input
                value={marca}
                onChange={(e) => setMarca(e.target.value)}
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label>Modelo:</Label>
              <Input
                value={modelo}
                onChange={(e) => setModelo(e.target.value)}
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label>Color:</Label>
              <Input
                value={color}
                onChange={(e) => setColor(e.target.value)}
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label>Precio:</Label>
              <Input
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
              ></Input>
            </FormGroup>
          </Form>
        </Row>
      </CardBody>
      <CardFooter>
        <Button color="success" onClick={enviar}>
          Añadir
        </Button>
      </CardFooter>
    </Card>
  );
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zapatillas: initialZapatillas,
      modalEditar: false,
      modalBorrar: false,
      zapatillaEliminar: null,
      zapatillaEditar: null,
    };
  }

  abrirEliminarModal = (zapatilla) => {
    this.setState({ modalBorrar: true, zapatillaEliminar: zapatilla });
  };
  cerrarEliminarModal = () => {
    this.setState({ modalBorrar: false, zapatillaEliminar: null });
  };
  eliminarZapatilla = (id) => {
    let copiaLista = this.state.zapatillas;
    copiaLista = copiaLista.filter((zapatilla) => zapatilla.id !== id);
    this.setState({
      zapatillas: copiaLista,
      modalBorrar: false,
      zapatillaEliminar: null,
    });
  };

  abrirEditarModal = (zapatilla) => {
    this.setState({ modalEditar: true, zapatillaEditar: zapatilla });
  };
  cerrarEditarModal = () => {
    this.setState({ modalEditar: false, zapatillaEditar: null });
  };

  editarZapatilla = (modelo, marca, color, precio) => {
    const listaActualizada = this.state.zapatillas.map((zapatilla) => {
      if (zapatilla.id === this.state.zapatillaEditar.id) {
        return { ...zapatilla, modelo, marca, color, precio };
      }
      return zapatilla;
    });
    this.setState({
      zapatillas: listaActualizada,
      zapatillaEditar: null,
      modalEditar: false,
    });
  };

  aniadir = (modelo, marca, color, precio) => {
    let nuevaZapatilla = {
      id: this.state.zapatillas.length + 1,
      modelo: modelo,
      marca: marca,
      color: color,
      precio: precio,
    };
    let copiaLista = this.state.zapatillas;
    copiaLista.push(nuevaZapatilla);
    this.setState({zapatillas: copiaLista});

  };
  render() {
    return (
      <div className="container py-4">
        <h1 className="mb-4">Gestion de zapatillas</h1>

        <Table bordered>
          <thead>
            <tr>
              <th>Marca</th>
              <th>Modelo</th>
              <th>Color</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {this.state.zapatillas.map((zapatilla) => {
              return (
                <tr key={zapatilla.id}>
                  <td>{zapatilla.marca}</td>
                  <td>{zapatilla.modelo}</td>
                  <td>{zapatilla.color}</td>
                  <td>{zapatilla.precio}</td>
                  <td>
                    <Button
                      color="warning"
                      onClick={() => this.abrirEditarModal(zapatilla)}
                    >
                      Editar
                    </Button>
                    &nbsp;
                    <Button
                      color="danger"
                      onClick={() => this.abrirEliminarModal(zapatilla.id)}
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <ModalConfirmacion
          abierto={this.state.modalBorrar}
          cerrarEliminar={this.cerrarEliminarModal}
          eliminarZapatilla={this.eliminarZapatilla}
          zapatillaAEliminar={this.state.zapatillaEliminar}
        />
        <ModalEdicion
          abierto={this.state.modalEditar}
          cerrarEditar={this.cerrarEditarModal}
          editarZapatilla={this.editarZapatilla}
          zapatillaEditar={this.state.zapatillaEditar}
        />

        <FormularioAniadir aniadir={this.aniadir} />
      </div>
    );
  }
}
export default App;
