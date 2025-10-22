
import './App.css'
import { Route, Routes } from "react-router-dom";
import Login from './Login.tsx';
import PokemonView from './PokemonView.tsx';

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={ <Login/> } />
      <Route path='/PokemonView' element={ <PokemonView /> } />
    </Routes>
    </>
  )
}

export default App
