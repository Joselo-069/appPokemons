import './App.css';
import { BrowserRouter,Route,Switch } from 'react-router-dom';
import Home from './components/Home/Home';
import LandingPage from './components/LandingPage/LandingPage';
import CreatePokemon from "./components/Formulario/Formulario";
import Detail from "./components/Detail/Detail";
import EditPokemon from "./components/Edit/Edit";


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Route exact path='/home' component={Home} />
          <Route path='/home/:id' component={Detail} />
          <Route path='/EditPokemon/:id' component={EditPokemon} />

          {/* <Route path='/detail/:detailId' element={<Detail />} >About</Route> */}
          <Route exact path='/CreatePokemon' component={CreatePokemon} />

        </Switch>
      </div>    
    </BrowserRouter>
  );
}

export default App;
