import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
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

const FormularioAgregar = (props) => {
  const [marca, setMarca] = useState();
  const [modelo, setModelo] = useState();
  const [color, setColor] = useState();
  const [precio, setPrecio] = useState();

  function enviarDatos() {
    if (!marca || !modelo || !color || !precio) {
      alert('Complete todos los campos');
    } else {
      props.agregarZapatilla(marca, modelo, color, precio);

    }
  }
  return (
    <Card className="mb-4">
      <CardBody>
        <CardTitle tag="h2" className="h5 mb-3">Dar de alta nueva zapatilla</CardTitle>
        <Form>
          <Row>
            <Col md="2">
              <FormGroup>
                <Input
                  value={marca}
                  onChange={(e) => setMarca(e.target.value)}
                  placeholder="Marca"

                />
              </FormGroup>
            </Col>
            <Col md="2">
              <FormGroup>
                <Input
                  value={modelo}
                  onChange={(e) => setModelo(e.target.value)}
                  placeholder="Modelo"

                />
              </FormGroup>
            </Col>
            <Col md="2">
              <FormGroup>
                <Input
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  placeholder="Color"

                />
              </FormGroup>
            </Col>
            <Col md="2">
              <FormGroup>
                <Input
                  value={precio}
                  onChange={(e) => setPrecio(e.target.value)}

                  type="number"
                  min="0"
                  placeholder="Precio"

                />
              </FormGroup>

            </Col>
          </Row>
          <Button color="primary" onClick={enviarDatos}>Agregar
            zapatilla</Button>
        </Form>
      </CardBody>
    </Card>
  );
}

const ModalConfirmacionBorrado = (props) => {

  return (
    <Modal isOpen={props.abierto} toggle={props.cerrarBorrar}>
      <ModalHeader>
        <p>¿Seguro que quieres borrar esta zapatilla?</p>
      </ModalHeader>
      <ModalBody>
        <Button color="danger" onClick={() => props.borrar(props.idZapatilla)}>Borrar</Button>
        <Button color="primary" onClick={props.cerrarBorrar}>Cancelar</Button>
      </ModalBody>
    </Modal>
  );
}

const ModalEdicion = (props) => {
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [color, setColor] = useState('');
  const [precio, setPrecio] = useState('');

  useEffect(() => {
    if (props.zapatillaEditar) {
      setMarca(props.zapatillaEditar.marca);
      setModelo(props.zapatillaEditar.modelo);
      setColor(props.zapatillaEditar.color);
      setPrecio(props.zapatillaEditar.precio);
    }
  }, [props.zapatillaEditar]);

  function editar() {
    if (!modelo || !marca || !color || !precio) {
      alert("Por favor, completa todos los campos.");
      return;
    } else {
      props.editar(marca, modelo, color, precio);
      props.cerrarEditar();
    }
  }

  return (
    <Modal isOpen={props.editarOpen} toggle={props.cerrarEditar}>
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
}

const Filtro = (props) => {
  const [filtro, setFiltro] = useState('');

  return (
    <Card className="mb-4">
      <CardBody>
        <CardTitle tag="h2" className="h5 mb-3">Filtro por marca</CardTitle>
        <Form>
          <FormGroup>
            <Label>Selecciona una marca:</Label>
            <select value={filtro} onChange={(e) => {
              setFiltro(e.target.value);
              props.filtrar(e.target.value)
            }}>
              <option value="">Todas</option>
              {props.zapatillas.map((zapatilla) => zapatilla.marca).map((marca) => (
                <option value={marca}>{marca}</option>
              ))}
            </select>
          </FormGroup>
        </Form>
      </CardBody>
    </Card>
  );
}
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zapatillas: initialZapatillas,
      zapatillaBorrar: null,
      zapatillaEditar: null,
      editarOpen: false,
      borrarOpen: false,
      filtro: "",
    };
  }

  abrirBorrar = (zapatilla) => {
    this.setState({ zapatillaBorrar: zapatilla, borrarOpen: true });
  }

  cerrarBorrar = () => {
    this.setState({ zapatillaBorrar: null, borrarOpen: false });
  }

  borrarZapatilla = (id) => {
    let listaFiltrada = this.state.zapatillas.filter((z) => z.id !== id);
    this.setState({ zapatillas: listaFiltrada, borrarOpen: false, zapatillaBorrar: null });
  }

  agregarZapatilla = (marca, modelo, color, precio) => {
    const nuevaZapa = {
      marca: marca,
      modelo: modelo,
      color: color,
      precio: precio,
    }
    let copiaLista = [...this.state.zapatillas, nuevaZapa];
    this.setState({ zapatillas: copiaLista });
  }

  abrirEditar = (zapatilla) => {
    this.setState({ zapatillaEditar: zapatilla, editarOpen: true });
  }

  cerrarEditar = () => {
    this.setState({ zapatillaEditar: null, editarOpen: false });
  }

  editarZapatilla = (marca, modelo, color, precio) => {

    const listaActualizada = this.state.zapatillas.map((z) => {
      if (z.id === this.state.zapatillaEditar.id) {
        z = { ...z, marca, modelo, color, precio };
      }
      return z;
    });
    this.setState({ zapatillas: listaActualizada });

  }

  filtrar = (marca) => {
    this.setState({ filtro: marca })
  }

  render() {
    return (
      <div className="container py-4">
        <h1 className="mb-4">Gestion de zapatillas</h1>

        <FormularioAgregar agregarZapatilla={this.agregarZapatilla} />
        <Filtro zapatillas={this.state.zapatillas} filtrar={this.filtrar} />
        {this.state.filtro != "" && (
          <Row className="mt-4">
            {this.state.zapatillas.filter((z) => z.marca === this.state.filtro).map((zapatilla) => (
              <Col md="4" key={zapatilla.id} className="mb-3">
                <Card>
                  <CardBody>
                    <h5>{zapatilla.marca}</h5>
                    <p>Modelo: {zapatilla.modelo}</p>
                    <p>Color: {zapatilla.color}</p>
                    <p>Precio: {zapatilla.precio}€</p>
                    <Form>
                      <FormGroup>
                        <p>Trendy <Input type="checkbox" /> </p>
                      </FormGroup>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
        )}

        <Table dark bordered responsive className="align-middle">
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
            {this.state.zapatillas.map(z => {
              return (
                <tr>
                  <td>{z.marca}</td>
                  <td>{z.modelo}</td>
                  <td>{z.color}</td>
                  <td>{z.precio}</td>
                  <td>
                    <Button color="danger" onClick={() => this.abrirBorrar(z.id)}>Borrar</Button>
                    <Button color="warning" onClick={() => this.abrirEditar(z)}>Editar</Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>

        <ModalConfirmacionBorrado abierto={this.state.borrarOpen} cerrarBorrar={this.cerrarBorrar} borrar={this.borrarZapatilla} idZapatilla={this.state.zapatillaBorrar} />
        <ModalEdicion
          editarOpen={this.state.editarOpen}
          cerrarEditar={this.cerrarEditar}
          editar={this.editarZapatilla}
          zapatillaEditar={this.state.zapatillaEditar}
        />
      </div>
    );
  }
}
export default App;
