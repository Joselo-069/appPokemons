import React ,{useState,useEffect} from "react";
// import {useHistory } from "react-router-dom";// history.push('/home');
import style from "./Edit.module.css";
import {useHistory } from "react-router-dom";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {getIdPokemons, editPokemon, getTypes, setLoading } from "../../redux/actions";
import Error from "../Error/Error";
import Loader from "../Loader/Loader";

const EditPokemon = (props) => {
    const {id} = useParams();
    const history = useHistory();
    const [input,  setInput ] = useState({
        name:"",
        hp:0,
        attack:0,
        defense:0,
        speed:0,
        height:0,
        weight:0,
        // image:'',
        typeId:[]
    });

    const [img, setImg] = useState('');
    const [erros,setErros] = useState({});
    const URL = "http://localhost:3001/pokemons/";
    const dispatch = useDispatch();
    const types = useSelector((state) => state.types);
    const allPokemons = useSelector((state) =>state.pokemons);
    const loading = useSelector((state) => state.loading);

    useEffect (() =>{
        getBlogId();
        dispatch(getTypes())
    },[dispatch]);

    const handleChange = (e) => {
        
        const property = e.target.name;
        const value = e.target.value;
        
        setErros(validate({...input,[property]: value}));
        setInput({...input,[property]: value})

    }

    // console.log(input.typeId);
    const validate = (input) => {
        
        const errors = {}
        // const pokemons = allPokemons.filter(pokemon => pokemon.name === input.name.toLowerCase());
        const pokemons =[];

        if ( !(/^[^]+$/.test(input.name)) ) {
                errors.name = "*required field";               
            }else if (pokemons.length) {
                errors.name = "*the pokemon already exists";               
            }else if ( !(/^[ñíóáéú a-zA-Z ]+$/.test(input.name)) ) {
                errors.name = "*only letters are allowed";               
            }else if (input.name.length < 3 || input.name.length >10) {
                errors.name = "*It must have more than 3 and less than 10 lettersonly letters are allowed";               
        }
        
        if (!(input.hp.length === 0)) {
            if ( !(/^[0-9]+$/.test(input.hp)) ) {
                errors.hp = "*Only numbers are allowed";
            }else if ( input.hp > 150){
                errors.hp = "*maximum number is 150";
            }
        }

        if (!(input.attack.length === 0)) {
            if ( !(/^[0-9]+$/.test(input.attack)) ) {
                errors.attack = "*Only numbers are allowed";
            }else if (input.attack > 500) {
                errors.attack = "*maximum number is 500";
            }
        }
        
        if (!(input.defense.length === 0)) {
            if ( !(/^[0-9]+$/.test(input.defense)) ) {
                errors.defense = "*Only numbers are allowed";
            }else if (input.defense > 500) {
                errors.defense = "*maximum number is 500";
            }
        }

        if (!(input.speed.length === 0)) {
            if ( !(/^[0-9]+$/.test(input.speed)) ) {
                errors.speed = "*Only numbers are allowed";
            }else if (input.speed > 500) {
                errors.speed = "*maximum number is 500";
            }
        }
        
        if (!(input.height.length === 0)) {
            if ( !(/^[0-9]+$/.test(input.height)) ) {
                errors.height = "*Only numbers are allowed";
            }else if (input.height > 150) {
                errors.height = "*maximum number is 150";
            }
        }

        if (!(input.weight.length === 0)) {        
            if ( !(/^[0-9]+$/.test(input.weight)) ) {
                errors.weight = "*Only numbers are allowed";
            }else if (input.weight > 150) {
                errors.weight = "*maximum number is 150";
            }
        }

        if (!(input.typeId.length === 0 )) {        
            if ( (input.typeId.length > 2) ) {
                errors.typeId = "*Only 2 types can be chosen";
            }
        }

        if ( (/.*(png|jpg|jpeg|gif)$/.test(img.name)) ) {   
            errors.image = "*The file is not an image";
        }   
        return errors;
    }

    const handleSelect = (e) => {
        const value = e.target.value;
        if (value) {
            setInput({
                ...input,
                typeId:[...input.typeId,value]
            })

            // setErros(validate({
            //     ...input,
            //     typeId: [...input.typeId, value]
            // }));
            
        }
    }

    const handleFile = (e) => {
        const property = e.target.name;
        const value = e.target.files[0].name; 

        setImg(e.target.files[0]);
        setErros(validate({...input,[property]: value}))
    }
    
    const handleDelete = (e) => {
        
        setInput({
            ...input,
            typeId: input.typeId.filter(type => type !== e),
        })

        // setErros(validate({
        //     ...input,
        //     typeId: [input.typeId]
        // }));

        
    }

    const update = async (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('name',input.name);
        formData.append('hp',input.hp);
        formData.append('attack',input.attack);
        formData.append('defense',input.defense);
        formData.append('speed',input.speed);
        formData.append('height',input.height);
        formData.append('weight',input.weight);
        formData.append('image',img);
        
        if (input.typeId.length === 1) {
            formData.append('typeId', input.typeId[0]); 
        }

        await axios.put(URL+id,formData)
        alert('updated pokemon');

        history.push('/home');
    };



    const getBlogId = async () =>{
        dispatch(setLoading(true));

        const res = await axios.get(URL+id);
        setInput({
            name:res.data[0].name,
            hp:res.data[0].hp,
            attack:res.data[0].attack,
            defense:res.data[0].defense,
            speed:res.data[0].speed,
            height:res.data[0].height,
            weight:res.data[0].weight,
            // image:'',
            typeId:res.data[0].types.map(type => {
                return type.name
            })

        });
        setImg(res.data[0].image);

        dispatch(setLoading(false));
    }


    return (
        <>
                <nav className={style.menu}>
                
                <Link to='/home' style={{ textDecoration: 'none' }}>
                    <img src="https://1000marcas.net/wp-content/uploads/2020/01/Logo-Pokemon.png" width={100} alt="" />
                </Link>

                <div className={style.menuLeft}>
                    <li className={style.menuLink}>
                        <h1 className={style.titleCreate}>Edit Pokemon</h1>
                    </li>

                    <li className={style.menuLink}>
                        <h1 className={style.titleCreate}>N° 0{allPokemons.length }</h1>
                    </li>
                </div>

                <div className={style.menuLeft}>
                    <li className={style.menuLink}>
                        <Link to='/Home' style={{ textDecoration: 'none' }}>
                            <button className={style.btnCreateNav} title="Return Home">
                                <img src="/imagenes/retun.png" width={15} alt="" />
                                {/* &nbsp;
                                Return */}
                            </button>
                        </Link>
                    </li>
                </div>

                </nav>
            {
                !loading ?
                // ? <Loader />  
                // : 
                
                    allPokemons.length ?
                    
                        <div className={style.containerCreate}>
                            <form onSubmit={update} className={style.formCreate}>
                                    <div className={style.containerForm}>
                                        <div>
                                            {/* name */}
                                            <div className={style.divCreate}>
                                                <label htmlFor="name">name<small className={style.errorCreate}>*</small> </label>
                                                <input 
                                                    type="text" 
                                                    id="name" 
                                                    value={input.name} 
                                                    name="name"
                                                    onChange={handleChange}
                                                    placeholder="Ingrese nombre del pokemon"
                                                    autoComplete="off"
                                                    autoFocus
                                                    required
                                                />
                                                {erros.name && (
                                                    <small className={style.errorCreate}>{erros.name}</small>
                                                )}
                                            </div>

                                            {/* height y weight */}
                                            <div className={style.rowCreate}>
                                                <div className={style.divCreate}>
                                                    <label htmlFor="height">height</label>
                                                    <input 
                                                        type="text" 
                                                        id="height" 
                                                        value={input.height} 
                                                        name="height"
                                                        onChange={handleChange}
                                                        placeholder="(cm.)"
                                                        autoComplete="off"
                                                    />
                                                    {erros.height && (
                                                    <small className={style.errorCreate}>{erros.height}</small>
                                                    )}
                                                </div>  
                                                <div className={style.divCreate}>
                                                    <label htmlFor="weight">weight</label>
                                                    <input 
                                                        type="text" 
                                                        id="weight" 
                                                        value={input.weight} 
                                                        name="weight"
                                                        onChange={handleChange}
                                                        placeholder="(g.)"
                                                        autoComplete="off"
                                                    />
                                                    {erros.weight && (
                                                    <small className={style.errorCreate}>{erros.weight}</small>
                                                    )}
                                                </div>
                                            </div>

                                            {/* hp y attack  */}
                                            <div className={style.rowCreate}>
                                                <div className={style.divCreate}>
                                                    <label htmlFor="hp">hp</label>
                                                    <input 
                                                        type="text" 
                                                        id="hp" 
                                                        value={input.hp} 
                                                        name="hp"
                                                        onChange={handleChange}
                                                        placeholder=" range (0- 150)"
                                                        autoComplete="off"
                                                    />
                                                    {erros.hp && (
                                                    <small className={style.errorCreate}>{erros.hp}</small>
                                                    )}
                                                </div>
                                                <div className={style.divCreate}>
                                                    <label htmlFor="attack">attack</label>
                                                    <input 
                                                        type="text" 
                                                        id="attack" 
                                                        value={input.attack} 
                                                        name="attack"
                                                        onChange={handleChange}
                                                        placeholder="range (0 - 500)"
                                                        autoComplete="off"
                                                    />
                                                    {erros.attack && (
                                                    <small className={style.errorCreate}>{erros.attack}</small>
                                                    )}
                                                </div> 
                                            </div>

                                            {/* defense y speend */}
                                            <div className={style.rowCreate}>
                                                <div className={style.divCreate}>
                                                    <label htmlFor="defense">defense</label>
                                                    <input 
                                                        type="text" 
                                                        id="defense" 
                                                        value={input.defense} 
                                                        name="defense"
                                                        onChange={handleChange}
                                                        placeholder="range (0 - 500)"
                                                        autoComplete="off"
                                                    />
                                                    {erros.defense && (
                                                    <small className={style.errorCreate}>{erros.defense}</small>
                                                    )}
                                                </div>
                                                <div className={style.divCreate}>
                                                    <label htmlFor="speed">speed</label>
                                                    <input 
                                                        type="text" 
                                                        id="speed" 
                                                        value={input.speed} 
                                                        name="speed"
                                                        onChange={handleChange}
                                                        placeholder="range (0 - 500)"
                                                        autoComplete="off"
                                                    />
                                                    {erros.speed && (
                                                    <small className={style.errorCreate}>{erros.speed}</small>
                                                    )}
                                                </div>  
                                            </div>
                                        </div>

                                        <div>
                                            {/* types */}
                                            <div className={style.divCreate}>
                                                <label htmlFor="typeId">types</label>
                                                <select name="typeId" id="typeId" onChange={handleSelect} >
                                                    <option value="">Select Type</option>
                                                {
                                                    types.map(t => (
                                                        <option value={t.name}>{t.name}</option>
                                                    ))
                                                }
                                                </select>

                                                { (
                                                    <small className={style.errorCreate}>{erros.typeId}</small>
                                                )}


                                                <div className={style.containerTypesCreate}>
                                                    {
                                                        input.typeId.length === 0 ? 
                                                            <h5 className={style.validateTypes}> ⚠ The types have not yet been selected!</h5>
                                                        :
                                                        input.typeId.map(t => 
                                                            <div className={style.containerType}>
                                                                <button className={style.btnType} onClick={() => handleDelete(t)}>
                                                                    <p onChange={handleChange}>{t}</p>
                                                                    &nbsp;
                                                                    <span className={style.spanType} >&#10006;</span>
                                                                </button>
                                                            </div>       
                                                        )
                                                    }

                                                </div>
                                            </div> 
                                            
                                            {/* image */}
                                            <div className={style.divCreate}>
                                                <label htmlFor="image">Image</label>

                                                <input 
                                                    type="file" 
                                                    id="image" 
                                                    // value={input.image} 
                                                    name="image"
                                                    onChange={handleFile}
                                                />
                                                                                    { (
                                                <small className={style.errorCreate}>{erros.image}</small>
                                            )}
                                                <img src={img} width={80} alt="" className={style.image}/>
                                            </div>
                                            
                                            

                                        </div>
                                    </div>

                                    <div>
                                        {/* btn */}
                                        <div className={style.contenedorBtn}>
                                            {/* <button type="submit" disabled={Object.keys(erros).length} className={style.btnCreate}>Create</button> */}
                                            <button type="submit" className={style.btnCreate}>
                                                <img src="/imagenes/update.jpg" alt="" width={25} />
                                                Update
                                            </button>
                                        </div>
                                    </div>
                            </form>

                        {/* <div className={style.detailCreate}>
                            <Link to='/home'><button>return</button></Link>
                            <div>
                                <div>

                                </div>

                                <div>

                                </div>
                            </div>
                            <BtnReturn />
                        </div> */}
                        </div>  
                    :<Error /> 

                : 
                // <Error />  
                <Loader /> 
            }
        </>
    )
}

export default EditPokemon;
