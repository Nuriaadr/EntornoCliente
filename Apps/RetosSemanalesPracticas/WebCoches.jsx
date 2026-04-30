import { Modal } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Component, useState } from "react";

const initialCoches = [
  {
    matricula: "1234ABC",
    marca: "Seat",
    modelo: "Ibiza",
    combustible: "Gasolina",
    color: "Rojo",
    precio: 12500,
  },
  {
    matricula: "5678DEF",
    marca: "Renault",
    modelo: "Clio",
    combustible: "Diésel",
    color: "Blanco",
    precio: 11800,
  },

  {
    matricula: "9012GHI",
    marca: "Toyota",
    modelo: "Corolla",
    combustible: "Híbrido",
    color: "Gris",
    precio: 21400,
  },
  {
    matricula: "3456JKL",
    marca: "Ford",
    modelo: "Focus",
    combustible: "Gasolina",
    color: "Azul",
    precio: 17300,
  },
  {
    matricula: "7890MNO",
    marca: "Volkswagen",
    modelo: "Golf",
    combustible: "Diésel",
    color: "Negro",
    precio: 19800,
  },
  {
    matricula: "1122PQR",
    marca: "Peugeot",
    modelo: "308",
    combustible: "Gasolina",
    color: "Verde",
    precio: 16700,
  },
  {
    matricula: "3344STU",
    marca: "Kia",
    modelo: "Ceed",
    combustible: "Híbrido",
    color: "Plata",
    precio: 18900,
  },
  {
    matricula: "5566VWX",
    marca: "Hyundai",
    modelo: "i30",
    combustible: "Gasolina",
    color: "Naranja",
    precio: 15900,
  },
  {
    matricula: "7788YZA",
    marca: "BMW",
    modelo: "Serie 1",
    combustible: "Diésel",
    color: "Blanco",
    precio: 28900,
  },
  {
    matricula: "9900BCD",
    marca: "Audi",
    modelo: "A3",
    combustible: "Gasolina",
    color: "Negro",
    precio: 31200,
  },
];

function FormularioAltaCoche(props) {
  const [matricula, setMatricula] = useState("");
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [combustible, setCombustible] = useState("");
  const [color, setColor] = useState("");
  const [precio, setPrecio] = useState("");

  function enviar() {
    props.altaCoche(matricula, marca, modelo, combustible, color, precio);
  }
  return (
    <form
      className="card p-3 mb-4"
      onSubmit={(e) => {
        e.preventDefault();
        enviar();
      }}
    >
      <h2 className="h5 mb-3">Dar de alta nuevo coche</h2>
      <div className="row g-2">
        <div className="col-md-2">
          <input
            className="form-control"
            name="matricula"
            placeholder="Matricula"
            onChange={(e) => setMatricula(e.target.value)}
            required
          />
        </div>
        <div className="col-md-2">
          <input
            className="form-control"
            name="marca"
            placeholder="Marca"
            onChange={(e) => setMarca(e.target.value)}
            required
          />
        </div>
        <div className="col-md-2">
          <input
            className="form-control"
            name="modelo"
            placeholder="Modelo"
            onChange={(e) => setModelo(e.target.value)}
            required
          />
        </div>
        <div className="col-md-2">
          <input
            className="form-control"
            name="combustible"
            placeholder="Combustible"
            onChange={(e) => setCombustible(e.target.value)}
            required
          />
        </div>
        <div className="col-md-2">
          <input
            className="form-control"
            name="color"
            placeholder="Color"
            onChange={(e) => setColor(e.target.value)}
            required
          />
        </div>
        <div className="col-md-2">
          <input
            className="form-control"
            type="number"
            min="0"
            name="precio"
            placeholder="Precio"
            onChange={(e) => setPrecio(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="mt-3">
        <button type="submit" className="btn btn-primary">
          Agregar coche
        </button>
      </div>
    </form>
  );
}

const ConfimacionEliminacion = (props) => {
  return (
    <Modal isOpen={props.show} toggle={props.toggleConfirmacion}>
      <div className="modal-header">
        <h5 className="modal-title">Confirmar eliminación</h5>
        <button
          type="button"
          className="btn-close"
          onClick={props.toggleConfirmacion}
        ></button>
      </div>

      <div className="modal-body">
        ¿Estás seguro de que deseas eliminar este coche?
      </div>

      <div className="modal-footer">
        <button
          className="btn btn-secondary"
          onClick={props.toggleConfirmacion}
        >
          Cancelar
        </button>
        <button className="btn btn-danger" onClick={props.eliminar}>
          Eliminar
        </button>
      </div>
    </Modal>
  );
};

const FormularioEdicionCoche = (props) => {
  const [matricula, setMatricula] = useState("");
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [combustible, setCombustible] = useState("");
  const [color, setColor] = useState("");
  const [precio, setPrecio] = useState("");

  function editar() {
    props.editar({ matricula, marca, modelo, combustible, color, precio });
    props.cerrarEditar();
  }

  return (
    <Modal isOpen={props.show} toggle={props.cerrarEditar}>
      <div className="modal-header">
        <h5 className="modal-title">Editar coche</h5>
      </div>

      <div className="modal-body">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            editar();
          }}
        >
          <div className="mb-3">
            <label className="form-label">Matricula</label>
            <input
              type="text"
              className="form-control"
              placeholder={props.coche.matricula}
              value={matricula}
              onChange={(e) => setMatricula(e.target.value)}
              required
            />
            <label className="form-label">Marca</label>
            <input
              type="text"
              className="form-control"
              placeholder={props.coche.marca}
              value={marca}
              onChange={(e) => setMarca(e.target.value)}
              required
            />
            <label className="form-label">Modelo</label>
            <input
              type="text"
              className="form-control"
              placeholder={props.coche.modelo}
              value={modelo}
              onChange={(e) => setModelo(e.target.value)}
              required
            />
            <label className="form-label">Combustible</label>
            <input
              type="text"
              className="form-control"
              placeholder={props.coche.combustible}
              value={combustible}
              onChange={(e) => setCombustible(e.target.value)}
              required
            />
            <label className="form-label">Color</label>
            <input
              type="text"
              className="form-control"
              placeholder={props.coche.color}
              value={color}
              onChange={(e) => setColor(e.target.value)}
              required
            />
            <label className="form-label">Precio</label>
            <input
              type="number"
              min="0"
              className="form-control"
              placeholder={props.coche.precio}
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Guardar cambios
          </button>

          <button
            type="button"
            className="btn btn-secondary ms-2"
            onClick={props.cerrarEditar}
          >
            Cancelar
          </button>
        </form>
      </div>
    </Modal>
  );
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coches: initialCoches,
      isOpenConfirmacion: false,
      cocheAEliminar: null,
      isOpenEditar: false,
      cocheAEditar: null,
    };
  }

  abrirConfirmacion = (indice) => {
    this.setState({ isOpenConfirmacion: true, cocheAEliminar: indice });
  };
  cerrarConfirmacion = () => {
    this.setState({ isOpenConfirmacion: false, cocheAEliminar: null });
  };

  abrirEditar = (indice) => {
    this.setState({ isOpenEditar: true, cocheAEditar: indice });
  };
  cerrarEditar = () => {
    this.setState({ isOpenEditar: false, cocheAEditar: null });
  };

  altaCoche = (matricula, marca, modelo, combustible, color, precio) => {
    const nuevoCoche = {
      matricula,
      marca,
      modelo,
      combustible,
      color,
      precio,
    };
    this.setState({ coches: [...this.state.coches, nuevoCoche] });
  };

  eliminarCoche = (indice) => {
    const cochesActualizados = this.state.coches.filter((_, i) => i !== indice);
    this.setState({ coches: cochesActualizados });
  };

  editarCoche = (indice, cocheActualizado) => {
    const coches = [...this.state.coches];
    coches[indice] = cocheActualizado;
    this.setState({ coches });
  };

  render() {
    return (
      <div className="container py-4">
        <h1 className="mb-4">Gestion de coches</h1>
        <FormularioAltaCoche altaCoche={this.altaCoche} />
        <ConfimacionEliminacion
          show={this.state.isOpenConfirmacion}
          toggleConfirmacion={this.cerrarConfirmacion}
          eliminar={() => {
            this.eliminarCoche(this.state.cocheAEliminar);
            this.cerrarConfirmacion();
          }}
        />
        
        {this.state.cocheAEditar !== null && (
          <FormularioEdicionCoche
            show={this.state.isOpenEditar}
            cerrarEditar={this.cerrarEditar}
            coche={this.state.coches[this.state.cocheAEditar]}
            editar={(cocheActualizado) =>
              this.editarCoche(this.state.cocheAEditar, cocheActualizado)
            }
          />
        )}

        <div className="table-responsive">
          <table
            className="table table-striped table-bordered
align-middle"
          >
            <thead className="table-dark">
              <tr>
                <th>Matricula</th>
                <th>Marca</th>
                <th>Modelo</th>
                <th>Combustible</th>

                <th>Color</th>
                <th>Precio</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {this.state.coches.map((coche, indice) => (
                <tr key={indice}>
                  <td>{coche.matricula}</td>
                  <td>{coche.marca}</td>
                  <td>{coche.modelo}</td>
                  <td>{coche.combustible}</td>
                  <td>{coche.color}</td>
                  <td>{coche.precio} €</td>
                  <td>
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => this.abrirEditar(indice)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => this.abrirConfirmacion(indice)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
export default App;
