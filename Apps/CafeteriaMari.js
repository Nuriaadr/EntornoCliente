import 'bootstrap/dist/css/bootstrap.min.css';
import { Component } from 'react';
import {
  Card, CardBody, CardTitle, CardSubtitle, CardText, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter,
  Navbar, Nav, Badge
} from 'reactstrap';

// ===== COMPONENTE PRODUCTO =====
// Este componente muestra un producto
const Producto = (props) => {

  // Función que se ejecuta cuando haces clic en "Añadir al pedido"
  // Le pasa al padre el ID del producto
  function aniadirAlCarrito() {
    props.aniadirAlCarrito(props.producto.id);
  }

  // Devolvemos la tarjeta con la información del producto
  return (
    <Card
      style={{
        width: '18rem'
      }}
    >

      <img alt="cafetería la Mari" src={props.producto.imagen} width="285" height="200" />
      <CardBody>

        <CardTitle tag="h5">
          {props.producto.titulo}
        </CardTitle>

        <CardSubtitle
          className="mb-2 text-muted"
          tag="h6"
        >
          {props.producto.subtitulo}
        </CardSubtitle>
        <CardText>
          {props.producto.texto}
        </CardText>
        {/* Botón para añadir al carrito - cuando lo clickeas, llama a la función aniadirAlCarrito */}
        <Button color="warning" onClick={() => aniadirAlCarrito()}>
          Añadir al pedido
        </Button>
      </CardBody>
    </Card>
  )
}

// ===== COMPONENTE VENTANA MODAL =====
// Este componente muestra una ventana (modal) que se abre cuando haces clic en "Carrito"
const VentanaModal = (props) => {
  const { className } = props;
  // Filtramos los productos: solo mostramos los que tienen carrito > 0 (los que se añaden)
  const productosEnCarrito = props.productos.filter(p => p.carrito > 0);

  return (
    <div>
      {/* La ventana modal - isOpen controla si se ve o no */}
      <Modal isOpen={props.mostrar} toggle={props.toggle} className={className} onEntering={"//ESTO SE EJECUTA CUANDO MUESTRAS LA VENTANA"}>
    
        <ModalHeader toggle={props.toggle}>{props.titulo}</ModalHeader>

        <ModalBody>
          {/* Si el carrito está vacío (no hay productos), mostramos este mensaje */}
          {productosEnCarrito.length === 0 ? (
            <p>El carrito está vacío</p>
          ) : (
            // Si hay productos en el carrito, los listamos uno por uno
            productosEnCarrito.map(p => (
              // Cada producto ocupa su propio div con una línea debajo
              <div key={p.id}>
                {/* Mostramos el nombre del producto en negrita */}
                <strong>{p.titulo}</strong>
                {/* Mostramos cuántos de ese producto hay en el carrito */}
                <p>Cantidad: {p.carrito}</p>
                <p>
                  <Button onClick={() => props.aniadirAlCarrito(p.id)}>+</Button>
                  <br></br>
                  <Button onClick={() => props.eliminarDelCarrito(p.id)}>-</Button>
                </p>
              </div>
            ))
          )}
        </ModalBody>

        <ModalFooter>
          <Button color="primary" onClick={props.toggle}>Cerrar</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

// ===== COMPONENTE APP  =====
// Esta es la clase que controla toda la aplicación
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false, // Controla si el modal (ventana del carrito) está abierto o cerrado
    
      productos: [
        {
          id: 1, // Identificador único del producto
          titulo: "Café", // Nombre del producto
          imagen: "https://cdn.pixabay.com/photo/2020/09/21/05/57/coffee-5589036_1280.jpg", // URL de la imagen
          subtitulo: "Café recién molido", // Subtítulo
          texto: "Una taza de café aromático elaborado con granos seleccionados para empezar bien el día.", // Descripción
          carrito: 0 // Cantidad que hay en el carrito (al principio es 0)
        },
        {
          id: 2,
          titulo: "Tostada",
          imagen: "https://img-global.cpcdn.com/recipes/d2238d5a3e8ab530/680x781f0.56303_0.463404_1.36018q80/tostada-crujiente-de-aguacate-foto-principal.jpg",
          subtitulo: "Tostada crujiente",
          texto: "Deliciosa tostada de pan artesano, acompañada de aceite de oliva virgen extra o mantequilla.",
          carrito: 0
        },
        {
          id: 3,
          titulo: "Refresco",
          imagen: "https://images.stockcake.com/public/a/c/b/acb75fb8-a212-4593-9c2c-2a2ec10c1503_large/colorful-drinks-toast-stockcake.jpg",
          subtitulo: "Bebida refrescante",
          texto: "Refresco frío ideal para acompañar cualquier comida o para disfrutar en un descanso.",
          carrito: 0
        }
      ]
    }
  }

  // Función que cambia el estado isOpen a lo que le pases (true o false)
  setIsOpen(d) {
    if (d === undefined) return; // Si no te pasan nada, no hagas nada
    this.setState({ isOpen: d })
  }

  // Función que invierte isOpen (si está abierto lo cierra, si está cerrado lo abre)
  toggleModal() { this.setIsOpen(!this.state.isOpen) }

  // ===== FUNCIÓN AÑADIR AL CARRITO =====
  // Esta función se ejecuta cuando clickeas "Añadir al pedido"
  aniadirAlCarrito = (id) => {
    // Recorremos todos los productos
    const productosCopia = this.state.productos.map(p => {
      // Si encontramos el producto con el ID que nos pasaron
      if (p.id === id) {
        // devolvemos una copia del producto pero con carrito + 1
        return { ...p, carrito: p.carrito + 1 };
      }
      // Si no es ese producto, lo devolvemos como está
      return p;
    });
    // Actualizamos el estado con los productos modificados
    this.setState({ productos: productosCopia });
  }

  eliminarDelCarrito = (id) => {
    const productosCopia = this.state.productos.map(p => {
      if (p.id === id) {
        return { ...p, carrito: Math.max(0, p.carrito - 1) };
      }
      return p;
    });
    this.setState({ productos: productosCopia });
  }
  render() {
    // Sumamos todos los productos que hay en los carritos para mostrar el total
    const totalCarrito = this.state.productos.reduce((total, p) => total + p.carrito, 0);

    return (
      <div className="App">
        <Navbar>
          <Nav className="me-auto" navbar>
            {/* cuando lo clickeas, abre/cierra el modal */}
            <Button color="primary" onClick={() => this.toggleModal()}>
              Carrito{" "}
              {/* la burbuja roja que muestra cuántos productos hay en total */}
              <Badge color="danger"> {totalCarrito} </Badge>
            </Button>
          </Nav>
        </Navbar>

        {/* FILA CON LAS 3 TARJETAS DE PRODUCTOS */}
        <Row>
          {/* Le pasamos el producto (objeto con datos) y la función para añadir al carrito */}
          <Col><Producto producto={this.state.productos[0]} aniadirAlCarrito={this.aniadirAlCarrito} /></Col>
          <Col><Producto producto={this.state.productos[1]} aniadirAlCarrito={this.aniadirAlCarrito} /></Col>
          <Col><Producto producto={this.state.productos[2]} aniadirAlCarrito={this.aniadirAlCarrito} /></Col>
        </Row>

        {/* MODAL DEL CARRITO - la ventana que se abre cuando haces clic en "Carrito" */}
        <VentanaModal
          mostrar={this.state.isOpen} // Le decimos si debe estar abierto o cerrado
          toggle={() => this.toggleModal()} // Le pasamos la función para abrir/cerrar
          titulo="Mi Carrito" // El título de la ventana
          productos={this.state.productos} // Le pasamos todos los productos para que los muestre
          aniadirAlCarrito = {this.aniadirAlCarrito}
          eliminarDelCarrito ={this.eliminarDelCarrito}
        />
      </div>
    );
  }
}

// Exportar el componente principal para que se use
export default App;

