import "bootstrap/dist/css/bootstrap.min.css";
import { Component, useState } from "react";
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
  Row,
  Table,
} from "reactstrap";

const initialPatines = [
  {
    numeroSerie: "PAT-1001",
    potencia: 350,
    marca: "Xiaomi",
    modelo: "Mi Scooter 3",
    color: "Negro",
    precio: 499,
  },
  {
    numeroSerie: "PAT-1002",
    potencia: 500,
    marca: "Segway",
    modelo: "Ninebot Max G2",
    color: "Gris",
    precio: 899,
  },
  {
    numeroSerie: "PAT-1003",
    potencia: 800,
    marca: "SmartGyro",
    modelo: "Rockway Pro",
    color: "Rojo",
    precio: 749,
  },
  {
    numeroSerie: "PAT-1004",
    potencia: 600,
    marca: "Cecotec",
    modelo: "Bongo A+",
    color: "Azul",
    precio: 579,
  },
  {
    numeroSerie: "PAT-1005",
    potencia: 450,
    marca: "Hiboy",
    modelo: "S2 Pro",
    color: "Blanco",
    precio: 529,
  },
];

const initialNuevoPatin = {
  numeroSerie: "",
  potencia: "",
  marca: "",
  modelo: "",
  color: "",
  precio: "",
};

function FormularioAltaPatin(props) {
  const [nuevoPatin, setNuevoPatin] = useState(initialNuevoPatin);

  const handleInputChange = (event) => {
    let n = nuevoPatin;
    if (event.target.name == "numeroSerie") {
      n.numeroSerie = event.target.value;
    }
    if (event.target.name == "marca") {
      n.marca = event.target.value;
    }
    if (event.target.name == "modelo") {
      n.modelo = event.target.value;
    }
    if (event.target.name == "color") {
      n.color = event.target.value;
    }
    if (event.target.name == "precio") {
      n.precio = event.target.value;
    }
    setNuevoPatin(n);
  };

  function handleAlta() {
    const altaCorrecta = props.onAlta(nuevoPatin);
    if (altaCorrecta) {
      setNuevoPatin(initialNuevoPatin);
    }
  }

  return (
    <Card className="mb-4">
      <CardBody>
        <CardTitle tag="h2" className="h5 mb-3">
          Dar de alta nuevo patín eléctrico
        </CardTitle>
        <Form>
          <Row>
            <Col md="2">
              <FormGroup>
                <Input
                  name="numeroSerie"
                  placeholder="No serie"
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
            </Col>
            <Col md="2">
              <FormGroup>
                <Input
                  type="number"
                  min="0"
                  name="potencia"
                  placeholder="Potencia (W)"
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
            </Col>
            <Col md="2">
              <FormGroup>
                <Input
                  name="marca"
                  placeholder="Marca"
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
            </Col>
            <Col md="2">
              <FormGroup>
                <Input
                  name="modelo"
                  placeholder="Modelo"
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
            </Col>
            <Col md="2">
              <FormGroup>
                <Input
                  name="color"
                  placeholder="Color"
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
            </Col>
            <Col md="2">
              <FormGroup>
                <Input
                  type="number"
                  min="0"
                  name="precio"
                  placeholder="Precio (€)"
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
            </Col>
          </Row>
          <Button color="primary" onClick={() => handleAlta()}>
            Agregar patín
          </Button>
        </Form>
      </CardBody>
    </Card>
  );
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { patines: initialPatines };
  }


  handleEliminar = (numeroSerie) => {
    const patinesFiltrados = this.state.patines.filter((p) => p.numeroSerie !== numeroSerie);
    this.setState({patines: patinesFiltrados});
  };

  handleAlta = (nuevoPatin) => {
    const patinesNuevo = this.state.patines;
    patinesNuevo.push(nuevoPatin);
    this.setState({patines: patinesNuevo});
    
  };

  render() {
    return (
      <Container className="py-4">
        <h1 className="mb-4">Gestión de patines eléctricos</h1>
        <Table dark bordered responsive className="align-middle">
          <thead>
            <tr>
              <th>Número de serie</th>
              <th>Potencia</th>
              <th>Marca</th>
              <th>Modelo</th>
              <th>Color</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {this.state.patines.map((patin) => (
              <tr key={patin.numeroSerie}>
                <td>{patin.numeroSerie}</td>
                <td>{patin.potencia}W</td>
                <td>{patin.marca}</td>
                <td>{patin.modelo}</td>
                <td>{patin.color}</td>
                <td>{patin.precio} €</td>
                <td>
                  <Button color="danger" size="sm" type="button" onClick={() => this.handleEliminar(patin.numeroSerie)}>
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
             
        <FormularioAltaPatin onAlta={this.handleAlta} />
      </Container>
    );
  }
}

export default App;
