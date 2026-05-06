import "bootstrap/dist/css/bootstrap.min.css";
import { Component, useState } from "react";
import axios from "axios";
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
    this.state = {
      patines: [],
      patinesDesclasificados: [],
    };
  }

  componentDidMount() {
    const url = "http://localhost:4000/patinetes.php";
    axios
      .get(url)
      .then((response) => {
        this.setState({ patines: response.data || [] });
        console.log(response.data);
      })
      .catch(() => {
        this.setState({ patines: [] });
      });
  }

  eliminar(numeroSerie) {
    const patinesNuevo = this.state.patines.filter(
      (patin) => patin.numeroSerie !== numeroSerie,
    );
    this.setState({ patines: patinesNuevo });
  }

  subir(index) {
    if (index === 0) {
      return;
    }
    let nuevoIndice = index - 1;
    let patinesNuevo = [...this.state.patines];
    let patin = patinesNuevo[index];
    patinesNuevo[index] = patinesNuevo[nuevoIndice];
    patinesNuevo[nuevoIndice] = patin;
    this.setState({ patines: patinesNuevo });
  }

  bajar(index) {
    if (index === this.state.patines.length - 1) {
      return;
    }
    let nuevoIndice = index + 1;
    let patinesNuevo = [...this.state.patines];
    let patin = patinesNuevo[index];
    patinesNuevo[index] = patinesNuevo[nuevoIndice];
    patinesNuevo[nuevoIndice] = patin;
    this.setState({ patines: patinesNuevo });
  }

  desclasificar(numeroSerie) {
    const patinDesclasificado = this.state.patines.find(
      (patin) => patin.numeroSerie === numeroSerie,
    );
    const patinesNuevo = this.state.patines.filter(
      (patin) => patin.numeroSerie !== numeroSerie,
    );

    const patinesDesclasificadosCopia = [...this.state.patinesDesclasificados];
    patinesDesclasificadosCopia.push(patinDesclasificado);

    this.setState({
      patines: patinesNuevo,
      patinesDesclasificados: patinesDesclasificadosCopia,
    });
  }

  alta(potencia, marca, modelo, color, precio) {
    let initialNuevoPatin = {
      numeroSerie: "PAT-100" + this.state.patines.length + 1,
      potencia: potencia,
      marca: marca,
      modelo: modelo,
      color: color,
      precio: precio,
    };
    let copiaPatines = [...this.state.patines];
    copiaPatines.push(initialNuevoPatin);
    this.setState({ patines: copiaPatines });
  }

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
            {this.state.patines.map((patin, index) => {
              return (
                <tr key={patin.numeroSerie}>
                  <td>{patin.numeroSerie}</td>
                  <td>{patin.potencia} W</td>
                  <td>{patin.marca}</td>
                  <td>{patin.modelo}</td>
                  <td>{patin.color}</td>
                  <td>{patin.precio} EUR</td>
                  <td>
                    <Button
                      color="secondary"
                      size="sm"
                      type="button"
                      className="me-2"
                      disabled={index === 0}
                      onClick={() => this.subir(index)}
                    >
                      Subir
                    </Button>
                    <Button
                      color="secondary"
                      size="sm"
                      type="button"
                      className="me-2"
                      disabled={index === this.state.patines.length - 1}
                      onClick={() => this.bajar(index)}
                    >
                      Bajar
                    </Button>
                    <Button
                      color="warning"
                      size="sm"
                      type="button"
                      className="me-2"
                      onClick={() => this.desclasificar(patin.numeroSerie)}
                    >
                      Desclasificar
                    </Button>
                    <Button
                      color="danger"
                      size="sm"
                      type="button"
                      onClick={() => this.eliminar(patin.numeroSerie)}
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <h2 className="h4 mt-4">Patinetes desclasificados</h2>
        <Table bordered responsive className="align-middle">
          <thead>
            <tr>
              <th>Numero de serie</th>
              <th>Potencia</th>
              <th>Marca</th>
              <th>Modelo</th>
              <th>Color</th>
              <th>Precio</th>
            </tr>
          </thead>
          <tbody>
            {this.state.patinesDesclasificados.map((patin) => {
              return (
                <tr key={patin.numeroSerie}>
                  <td>{patin.numeroSerie}</td>
                  <td>{patin.potencia} W</td>
                  <td>{patin.marca}</td>
                  <td>{patin.modelo}</td>
                  <td>{patin.color}</td>
                  <td>{patin.precio} EUR</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <FormularioAltaPatin onAlta={this.handleAlta} />
      </Container>
    );
  }
}

export default App;
