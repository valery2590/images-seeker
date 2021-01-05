import { Component } from "react";
import Buscador from "./components/Buscador/buscador";
import Navigation from "./components/navigation/nav";
import Resultado from "./components/resultado/resultado";

class App extends Component {
  state = {
    termino: '',
    imagenes: [],
    pagina: ''
  };
  paginaAnterior = () => {
    console.log("anterior");
  };

  paginaSiguiente = () => {
    //leer el state de la página actual
    let pagina = this.state.pagina;
    //sumar una pagina a la actual
    pagina += 1; 
    // agregar el cambio al state
    this.setState({
      pagina
    })
    console.log(pagina)
  };

  consultarApi = () => {
    const termino = this.state.termino;
    const url = `https://pixabay.com/api/?key=1732750-d45b5378879d1e877cd1d35a6&q=${termino}`;
    // console.log(url);
    fetch(url)
      .then((res) => res.json())
      .then((resultado) => this.setState({ imagenes: resultado.hits }));
  };

  datosBusqueda = (termino) => {
    this.setState(
      {
        termino,
      },
      () => {
        this.consultarApi();
      }
    );
  };
  render() {
    return (
      <div className="container">
        <div className="jumbotron">
          <p className="lead text-center">Buscador de imágenes</p>

          <Buscador datosBusqueda={this.datosBusqueda} />
      
        </div>
        <div className="row justify-content-center">
          <Resultado
            imagenes={this.state.imagenes}
            paginaAnterior={this.paginaAnterior}
            paginaSiguiente={this.paginaSiguiente}
          />
        </div>
      </div>
    );
  }
}

export default App;
