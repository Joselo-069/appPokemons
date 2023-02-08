import React, { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import style from "./Navbar.module.css";
import SearchBar from "../SearchBar/SearchBar";
import {  filterOrder, filterOrigin, filterSort, getTypePokemons, getTypes} from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";



const NavBar = () => {

    const dispatch = useDispatch();
    const types = useSelector((state) => state.types);
    const [orden, setOrden] = useState("");
    const [isCheckedBd, setIsCheckedBd] = useState(false);
    const [isCheckedApi, setIsCheckedApi] = useState(false);


    useEffect(() => {
        dispatch(getTypes())
    },[]);

    const handleFilterOriginBd = (e) => {
        if (!isCheckedBd && isCheckedApi) {
            dispatch(filterOrigin(e.target.value));
            setIsCheckedBd(!isCheckedBd);
            setIsCheckedApi(!isCheckedApi);
        }else if(!isCheckedBd){
            dispatch(filterOrigin(e.target.value));
            setIsCheckedBd(!isCheckedBd);     
        }else{
            dispatch(filterOrigin('all'));
            setIsCheckedBd(!isCheckedBd); 
        }
    }

    const handleFilterOriginApi = (e) => {
        if (!isCheckedApi && isCheckedBd) {
            dispatch(filterOrigin(e.target.value));
            setIsCheckedApi(!isCheckedApi);
            setIsCheckedBd(!isCheckedBd);
        }else if(!isCheckedApi){
            dispatch(filterOrigin(e.target.value));
            setIsCheckedApi(!isCheckedApi);     
        }else{
            dispatch(filterOrigin('all'));
            setIsCheckedApi(!isCheckedApi);
        }
    }

    /*order by types */
    const handlefilterOrder = (e) => {
        dispatch(getTypePokemons(e.target.value));

        if (!isCheckedBd || !isCheckedApi) {
            
            setIsCheckedBd(false); 
            setIsCheckedApi(false);
            setOrden("all");
        }
    }
 
    /*order by asc y desc */
    const handleFilterSort = (e) => {
        e.preventDefault();
        setOrden(e.target.value);
        dispatch(filterSort(e.target.value));
       
        if (!isCheckedBd || !isCheckedApi) {
            
            setIsCheckedBd(false); 
            setIsCheckedApi(false);
            // checked={isCheckedApi}
        }
       
    }

    return(
        <nav className={style.menu}>
                <Link to='/home' style={{ textDecoration: 'none' }}>
                    <img src="https://1000marcas.net/wp-content/uploads/2020/01/Logo-Pokemon.png" width={100} alt="" />
                </Link>
            <div className={style.menuLeft}>
                
                <li className={style.menuLink}>
                    <p className={style.title}>
                        <img src="/imagenes/sort3.png" width={13} alt="" />
                        &nbsp;
                        Types
                    </p>
                    <select className={style.sortBy} name="" id=""  onChange={e => handlefilterOrder(e) }>
                        <option value="all">All Types</option>
                        {
                            types.map(t => (
                                <option key={t.name} value={t.name}>{t.name}</option>
                            ))
                        }
                    </select>
                </li>

                <li className={style.menuLink}>
                    <p className={style.title}>
                        <img src="/imagenes/sort1.png" width={13} alt="" />
                        &nbsp;
                        Sort by
                    </p>
                    
                    <select className={style.sortBy} onChange={e => handleFilterSort(e)} >
                        <option value="" selected={`${orden === 'all' ? true: false}`} >All Pokemons</option>
                        {/* className={`${num === currentPage ? style.isCurrent : ''}`} */}
                        <option value="asc">A - Z</option>
                        <option value="desc">Z - A</option>
                        <option value="bottom">N° Bottom number</option>
                        <option value="top">N° Top number</option>
                    </select>
                </li>

                <li className={style.menuLink}>
                        <p className={style.title}>
                            <img src="/imagenes/sort2.png" width={13} alt="" />
                            &nbsp;
                            Order Origin
                        </p>
                        <div className={style.containerCheck}>
                            <input type="checkbox" name="created" className={style.checkbox} value="created" id="created" checked={isCheckedBd} onChange={e => handleFilterOriginBd(e) }/>
                            <label htmlFor="created" className={style.textCheck}>Created</label>
                            <input type="checkbox" name="api" className={style.checkbox} value="api" id="api" checked={isCheckedApi} onChange={e => handleFilterOriginApi(e) }/>
                            <label htmlFor="api" className={style.textCheck}>Existing</label>
                        </div>
                </li>

            </div>

            
            <div className={style.menuLeft}>
                <li className={style.menuLink}>
                    <Link to='/CreatePokemon' style={{ textDecoration: 'none' }}>
                        <button className={style.btnCreate}>
                            <img src="/imagenes/add.png" width={15} alt="" />
                            &nbsp;
                            create
                        </button>
                    </Link>
                </li>

                <li className={style.menuLink}>
                    <SearchBar />
                </li>
            </div>
        </nav>
    )
}

export default NavBar;