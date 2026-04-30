import 'bootstrap/dist/css/bootstrap.min.css';
import { Component, useState } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Table
} from 'reactstrap';

const ModalConfirmacion = (props) => {
  return (
    <Modal isOpen={props.confirmarEliminacion}>
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
}

const AgregarZapatilla = (props) => {
  const [marca, setMarca] = useState();
  const [modelo, setModelo] = useState();
  const [color, setColor] = useState();
  const [precio, setPrecio] = useState();

  function enviar() {
    props.aniadirZapatilla(marca, modelo, color, precio);
  }
  return (
    <Card>
      <CardBody>
        <h3>Formulario Alta de Zapatillas</h3>
        <Col>
          <Form>
            <FormGroup>
              <Label>Marca:</Label>
              <Input value={marca} onChange={(e) => setMarca(e.target.value)} />
            </FormGroup>
            <FormGroup>
              <Label>Modelo:</Label>
              <Input value={modelo} onChange={(e) => setModelo(e.target.value)} />
            </FormGroup>
            <FormGroup>
              <Label>Color:</Label>
              <Input value={color} onChange={(e) => setColor(e.target.value)} />
            </FormGroup>
            <FormGroup>
              <Label>Precio:</Label>
              <Input value={precio} onChange={(e) => setPrecio(e.target.value)} />
            </FormGroup>
          </Form>
          <Button onClick={enviar} color='primary'>Añadir</Button>
        </Col>
      </CardBody>
    </Card>
  );

}

const initialZapatillas = [
  { id: 1, marca: "Nike", modelo: "Air Max 90", color: "Blanco", precio: 139 },
  { id: 2, marca: "Adidas", modelo: "Ultraboost", color: "Negro", precio: 180 },
  { id: 3, marca: "Puma", modelo: "RS-X", color: "Azul", precio: 110 },
  { id: 4, marca: "New Balance", modelo: "574", color: "Gris", precio: 95 },
  { id: 5, marca: "Asics", modelo: "Gel-Lyte III", color: "Verde", precio: 120 },
  { id: 6, marca: "Reebok", modelo: "Classic Leather", color: "Blanco", precio: 85 },
  { id: 7, marca: "Converse", modelo: "Chuck Taylor", color: "Rojo", precio: 75 },
  { id: 8, marca: "Vans", modelo: "Old Skool", color: "Negro", precio: 80 },
  { id: 9, marca: "Jordan", modelo: "1 Mid", color: "Multicolor", precio: 135 },
  { id: 10, marca: "Skechers", modelo: "D'Lites", color: "Beige", precio: 70 }
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zapatillas: initialZapatillas
      , zapatillaAEliminar: null,
      confirmarEliminacion: false,

    };
  }



  abrirEliminar = (id) => {
    this.setState({ zapatillaAEliminar: id, confirmarEliminacion: true });
  }
  cerrarEliminar = () => {
    this.setState({ zapatillaAEliminar: null, confirmarEliminacion: false });
  }

  eliminarZapatilla = (id) => {
    this.setState({
      zapatillas: this.state.zapatillas.filter((z) => z.id !== id),
      confirmarEliminacion: false
    });
  };

  aniadirZapatilla = (marca, modelo, color, precio) => {
    const nuevaZapatilla = {
      id: this.state.zapatillas.length + 1,
      marca: marca,
      modelo: modelo,
      color: color,
      precio: precio
    }
    let copiaZapatillas = this.state.zapatillas;
    copiaZapatillas.push(nuevaZapatilla);
    this.setState({ zapatillas: copiaZapatillas });
  }

  render() {
    return (

      <div>
      
        <Container className="py-4">
          <h1 className="mb-4">Gestión de zapatillas</h1>
            <AgregarZapatilla aniadirZapatilla={this.aniadirZapatilla} />
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
              {this.state.zapatillas.map((zapatilla) => (
                <tr key={zapatilla.id}>

                  <td>{zapatilla.marca}</td>
                  <td> {zapatilla.modelo}</td>
                  <td>{zapatilla.color}</td>
                  <td>{zapatilla.precio}€</td>
                  <td>
                    <Button
                      color="danger"
                      size="sm"
                      type="button"
                      onClick={() => this.abrirEliminar(zapatilla.id)}
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}

            </tbody>
          </Table>
        </Container>

        <ModalConfirmacion
          confirmarEliminacion={this.state.confirmarEliminacion}
          zapatillaAEliminar={this.state.zapatillaAEliminar}
          cerrarEliminar={this.cerrarEliminar}
          eliminarZapatilla={this.eliminarZapatilla}
        />

        
      </div>
    );
  }
}

export default App;