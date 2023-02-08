import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNamePokemons,getError } from "../../redux/actions";
import style from "./SearchBar.module.css";


const SearchBar = ()=>{
    const allPokemons = useSelector((state) =>state.pokemons);
    const dispatch = useDispatch();
    const [name,setName] = useState("");

    const handleInput = (e) =>{
        e.preventDefault();
        setName(e.target.value)
    } 
    
    const handleSubmit = (e) =>{
        e.preventDefault();
        const findPokemon = allPokemons.filter(pokemon => pokemon.name === name);
        if (allPokemons.length && findPokemon.length) {
            dispatch(getError(0));
            dispatch(getNamePokemons(name));
            // setName("");
        }else{
            dispatch(getError(1));
        }
        setName("");

    }


    return (
        <div>
            {/* <p>Buscar:</p> */}
            <input 
            className={style.inputSearch}
            type="text"
            placeholder="Search Pokemon..."
            onChange={(e) => handleInput(e)}
            />
            <button type="submit" onClick={(e) => handleSubmit(e)} className={style.btnSearch}  title="Buscar Pokemon">
                <img src="https://cdn0.iconfinder.com/data/icons/google-material-design-3-0/48/ic_search_48px-512.png" width={12} alt="" />
            </button>

            {/* <section className={style.mainInput}>
                <div className={style.mainInputContainer}>
                    <span className={style.searchIcon}>
                    </span> 
                    <input 
                    type="text"
                    placeholder="Buscar..."
                    onChange={(e) => handleInput(e)}
                    />
                    <btn onClick={(e) => handleSubmit(e)} >Buscar</btn>
                </div>
            </section> */}
            
        </div>
    )
}


export default SearchBar;