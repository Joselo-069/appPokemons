import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPokemons,setLoading } from "../../redux/actions";
import Card from "../Cards/Card";
import Loader from "../Loader/Loader";
import Navbar from "../Navbar/Navbar"; 
import Paginate from "../Paginate/Paginate";
import Error from "../Error/Error";
import Footer from "../Footer/Footer";
import style from "./Home.module.css";
import BtnReturn from "../BtnReturn/BtnReturn"
/*https://pokeapi.co/api/v2/pokemon-species/1/ */
// export default function Home() {
const Home = () => {
    const dispatch = useDispatch();
    const allPokemons = useSelector((state) =>state.pokemons);
    const loading = useSelector((state) => state.loading);
    const notFoundSearch = useSelector((state) => state.notFoundSearch);
    const currentPage = parseInt(useSelector((state) => state.currentPage));
    const totalPokemons = parseInt(useSelector((state) => state.totalPokemons));
    const itemsByPage = parseInt(useSelector((state) => state.itemsByPage));
    const typeFilter = useSelector((state) => state.typeFilter);
    // const originFilter = useSelector((state) => state.originFilter);
    /*paginado */
    // const [paginate,setPaginate] = useState(1);
    // const [byPage, setByPage] = useState(12);
    // const max = allPokemons.length/byPage;
    /* paginate*/


    let start = (currentPage - 1) * itemsByPage;
    let end = start + itemsByPage;
    if (end > totalPokemons) end = totalPokemons;
    if (start < 0) start = 0;

    const max = (allPokemons.length/itemsByPage);

    useEffect (() =>{
        const getAllPokemons = async () =>{
            dispatch(setLoading(true));
            await dispatch(getPokemons()); 
            // await getPokemons();
            dispatch(setLoading(false));
        };

        getAllPokemons();

    },[dispatch]);

    console.log(allPokemons);
    
    

    return (
        <>
            {/* {
                allPokemons.length > 0 ? 
                <Navbar />
                : ''
            }
            <div className={style.containerCards} >
                {
                    allPokemons.length > 0 ?
                    
                    allPokemons?.map( (p,index) => {
                        return (
                            <Link to={`/home/${p.id}`} style={{ textDecoration: 'none' }} key={index}>
                                <Card name={p.name} image={p.image} id={index+1}  types={p.types} db={p.createInDb}/>
                            </Link>
                        );
                    }).slice(start, end)
                    :
                    // <Loader />  
                    <h1>NOT FOUND</h1>
                }   

            </div>
                {
                    allPokemons.length > 0 ?
                    <Paginate  max = {max} />
                    : ''
                } */}

                {
                    loading
                    ? <Loader />  
                    : 
                    <div>
                        <Navbar />
                        
                        <div className={style.containerCards} >
                        {
                            !notFoundSearch ?
                            
                                allPokemons?.map( (p,index) => {
                                    return (
                                        <Link to={`/home/${p.id}`} style={{ textDecoration: 'none' }} key={index}>
                                            <Card name={p.name} image={p.image} id={index+1}  types={p.types} db={p.createInDb}/>
                                        </Link>
                                    );
                                }).slice(start, end)
                                
                            :  <Error />  
                        }   
                        </div>
                        
                        {allPokemons.length > 5 && !notFoundSearch
                        
                        ?

                        <div>
                            <Paginate  max = {max} />
                            <Footer />
                        </div>

                        :
                            <BtnReturn />
                        }

                    </div>
                }
        </>

    );
}

export default Home;