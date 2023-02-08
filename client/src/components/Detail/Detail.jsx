import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link,useHistory, useParams } from "react-router-dom";
import { getIdPokemons,deletePokemon } from "../../redux/actions";
import style from "./Detail.module.css";
import Loader from "../Loader/Loader";
import BtnReturn from "../BtnReturn/BtnReturn"
import {convertStat,convert150,convert500} from "../../helpers";

const Detail = (props) => { 

    let colorbadge;
    const {id} = useParams();
    const history =useHistory();
    const dispatch = useDispatch();
    const pokemon = useSelector((state) => state.pokemonDetail)
    const ColorTypes = (type) =>{
        switch (type) {
            case 'water':
                colorbadge = {
                    background: "#3B5995",
                    color: "white"
                }
                break;
            case 'grass':
                colorbadge = {
                    background: "#5fad56",
                    color: "white"
                }
                break;
            case 'fire':
                colorbadge = {
                    background: "#d4af37",
                    color: "white"
                }
                break; 
            case 'electric':
                colorbadge = {
                    background: "#ffdd44",
                    color: "black"
                }
                break;     
            case 'bug':
                colorbadge = {
                    background: "#9cb25a",
                    color: "white"
                }
                break;       
            case 'poison':
                colorbadge = {
                    background: "#3d81b8",
                    color: "white"
                }
                break; 
            case 'flying':
                colorbadge = {
                    background: "#e0e0e0",
                    color: "black"
                }
                break;
            case 'ground':
                colorbadge = {
                    background: "#5f7470",
                    color: "white"
                }
                break; 
            case 'fairy':
                colorbadge = {
                    background: "#eb6f99",
                    color: "white"
                }
                break; 
            default:
                colorbadge = {
                    background: "#b8bdb5",
                    color: "white"
                }
                break; 
        }
    }

    
    // console.log(props);
   

    useEffect(() =>{
        dispatch(getIdPokemons(id))
    },[dispatch]);

    const handleDelete = (id) => {
        dispatch(deletePokemon(id));
        alert('removed pokemon');
        history.push('/home');
    };



    return (
        <div className={style.container}>
            {
                pokemon.length > 0 ?
                <div>

                    <div className={style.containerBody}>
                        
                        <div className={style.containerPokemon}>

                            <div className={style.containerTitle}>
                                <h1 className={style.name}>{pokemon[0].name}</h1>
                                <p className={style.identificador}>{pokemon[0].createInDb ? "- New BD" :`N.° 00${pokemon[0].id}` }</p>
                            </div>
                            
                            <img src={ pokemon[0].image } alt={pokemon[0].name} className={style.image}/>

                            {
                            pokemon[0].createInDb 
                            ?   
                                <div className={style.containerBtn}>
                                    <Link to={`/EditPokemon/${pokemon[0].id}`} className={style.btnEdit} title='Edit Pokemon' style={{ textDecoration: 'none' }}>
                                        <img src="/imagenes/update.jpg" width={35} alt="" /> 
                                        {/* <p>Edit</p> */}
                                    </Link>
                                    <button onClick={() => {handleDelete(pokemon[0].id)} } className={style.btnDelete} title='Delete Pokemon'>
                                        <img src="/imagenes/delete.jpg" width={35} alt="" /> 
                                        {/* <p>Delete</p> */}
                                    </button>
                                </div>
                            :''
                            }

                            
                        </div>

                        {/* <div> */}
                            <div className={style.character}>
                                <b>Type:</b>
                                <div className={style.containerType}>
                                    {pokemon[0].createInDb ? 
                                        pokemon[0].types.map((type, index) => {
                                            ColorTypes(type.name)
                                            return (
                                                <span className={style.badge} key={index} style={colorbadge} >{type.name}</span>
                                            );
                                        })
                                    :
                                    pokemon[0].types.map((type, index) => {
                                        ColorTypes(type)
                                        return (
                                            <span className={style.badge} key={index} style={colorbadge} >{type}</span>
                                        );
                                    })}
                                </div><br />
                                <b>Height </b>
                                <p className={style.ability}>{pokemon[0].height/10} m</p>
                                <b>Weight</b>
                                <p className={style.ability}>{pokemon[0].weight/10} kg</p>

                            </div>
                        {/* </div> */}
                            <div></div>
                                 
                        {/* <div>
                            <div className={style.character}>
                                <b>Type:</b>
                                <div className={style.containerType}>
                                    {pokemon[0].createInDb ? 
                                        pokemon[0].types.map((type, index) => {
                                            ColorTypes(type.name)
                                            return (
                                                <span className={style.badge} key={index} style={colorbadge} >{type.name}</span>
                                            );
                                        })
                                    :
                                    pokemon[0].types.map((type, index) => {
                                        ColorTypes(type)
                                        return (
                                            <span className={style.badge} key={index} style={colorbadge} >{type}</span>
                                        );
                                    })}
                                </div><br />
                                <b>Height </b>
                                <p className={style.ability}>{convertStat(pokemon[0].height)} m</p>
                                <b>Weight</b>
                                <p className={style.ability}>{convertStat(pokemon[0].weight)} kg</p>

                            </div>
                        </div> */}

                    </div>
                    <hr className={style.separator}/>   

                    {/* Base Stats */}
                    <div className={style.containerStat}>
                        <h2 className={style.name}>Base Stats</h2>
                        <div className={style.stats}>
                            <div className={style.StatGroup}>
                                <span>Hp</span>
                                <span className={style.StatPoits}>:</span>

                                <div className={style.progress}>
                                    <div className={style.progressBar1} style={{width:`${convert150(pokemon[0].hp)}%`}} >
                                        {/* <span className={style.progressBarText}>{pokemon[0].speed}</span> */}
                                    </div>
                                </div> 
                                {/* <div className={style.progressBar}></div> */}
                                <span className={style.counterStat}>{pokemon[0].hp}</span>
                            </div>   
                            <div className={style.StatGroup}>
                                <span>Attack</span>
                                <span className={style.StatPoits}>:</span>

                                <div className={style.progress}>
                                    <div className={style.progressBar1} style={{width:`${convert500(pokemon[0].attack)}%`}} >
                                        {/* <span className={style.progressBarText}>{pokemon[0].speed}</span> */}
                                    </div>
                                </div> 
                                <span className={style.counterStat}>{pokemon[0].attack}</span>
                            </div>   
                             
                            <div className={style.StatGroup}>
                                <span>Defense</span>
                                <span className={style.StatPoits}>:</span>
                                <div className={style.progress}>
                                    <div className={style.progressBar1} style={{width:`${convert500(pokemon[0].defense)}%`}} >
                                        {/* <span className={style.progressBarText}>{pokemon[0].speed}</span> */}
                                    </div>
                                </div>  
                                <span className={style.counterStat}>{pokemon[0].defense}</span>
                            </div>   
                             
                            <div className={style.StatGroup}>
                                <span>Speed</span>
                                <span className={style.StatPoits}>:</span>


                                <div className={style.progress}>
                                    <div className={style.progressBar1} style={{width:`${convert500(pokemon[0].speed)}%`}} >
                                        {/* <span className={style.progressBarText}>{pokemon[0].speed}</span> */}
                                    </div>
                                </div>  

                                {/* <div className={style.progressBar}></div> */}
                                <span className={style.counterStat}>{pokemon[0].speed}</span>
                            </div>   

                            {/* <div className={style.progress}>
                                <div className={style.progressBar1} style={{width:pokemon[0].speed*10}} >
                                    <span className={style.progressBarText}>{pokemon[0].speed}</span>
                                </div>
                            </div>   */}

                        </div>
                    </div>

                    <br />
                    {/* <Link to='/home'>
                        <button>return</button>
                    </Link> */}
                    <BtnReturn /><br />

                </div>
                : <Loader />                    
            }

        </div>
    )
}

export default Detail;
