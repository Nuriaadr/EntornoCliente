import "bootstrap/dist/css/bootstrap.min.css";
import { Component, useState } from "react";
import { Nav, NavItem, NavLink } from "reactstrap";

const MenuNavegacion = (props) => {
  return (
    <Nav tabs>
      <NavItem>
        <NavLink
          href="#"
          active={props.vista === "inicio"}
          onClick={() => props.setVista("inicio")}
        >
          Inicio
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          href="#"
          active={props.vista === "configuracion"}
          onClick={() => props.setVista("configuracion")}
        >
          Configuracion
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          href="#"
          active={props.vista === "alumnos"}
          onClick={() => props.setVista("alumnos")}
        >
          Alumnos
        </NavLink>
      </NavItem>
    </Nav>
  );
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vista: "inicio",
    };
  }

  render() {
    return (
      <div className="container mt-4">
        <MenuNavegacion
          vista={this.state.vista}
          setVista={(vista) => this.setState({ vista })}
        />
        {this.state.vista === "inicio" && (
          <h2>Bienvenido a la aplicación de alumnos</h2>
        )}
        {this.state.vista === "configuracion" && (
          <h2>Aquí se mostrarán las configuraciones</h2>
        )}
        {this.state.vista === "alumnos" && (
          <h2>Aquí se mostrarán los alumnos</h2>
        )}
      </div>
    );
  }
}

export default App;
