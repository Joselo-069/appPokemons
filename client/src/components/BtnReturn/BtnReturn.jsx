
import { React } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getError, getPokemons } from "../../redux/actions";
// import { getIdPokemons } from "../../redux/actions";
import style from "./BtnReturn.module.css";





// BtnReturn
const BtnReturn = () => { 
  
    const dispatch = useDispatch();
    const {id} = useParams();
    const detailPokemon = useSelector((state) =>state.pokemonDetail);

    // const findPokemon = allPokemons.filter(pokemon => pokemon.name === name);
    const handleSubmit = (e) =>{
        e.preventDefault();
        dispatch(getError(0));
        dispatch(getPokemons());
    }
    
    console.log(detailPokemon);
    console.log(id);
    return (
        <Link to='/home' style={{ textDecoration: 'none' }}>
            <div className={style.contenedorBtn} >
                {
                    id
                    ? <button  className={style.btn}>
                        <img src="/imagenes/retun.png" width={20} alt="" />
                        &nbsp;
                        Return
                      </ button>
                    : <button onClick={(e) => handleSubmit(e)} className={style.btn}>
                        <img src="/imagenes/retun.png" width={20} alt="" />
                        &nbsp;
                        Return
                        </ button>
                }
                
            </div>
        </Link>
    )
}

export default BtnReturn;
