import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {  modifyPage, especificPage } from "../../redux/actions";
import style from "./Paginate.module.css";

const Paginate = ({max}) => {
// const Paginate = ({paginate,setPaginate,max}) => {
    
    // const [input,setInput] = useState(1);

    // const nextPage = () => {
    //     setInput(input + 1);
    //     setPaginate(paginate + 1);
    // }

    // const previusPage = () => {
    //     setInput(input - 1);
    //     setPaginate(paginate - 1);
    // }

    // const onKeyDown = (e) => {
    //     const value = parseInt(e.target.value);
    //     if (e.keyCode === 13) {
    //         setPaginate(value);
    //         if (value < 1 || value > Math.ceil(max) || isNaN(value)) {
    //             setPaginate(1);
    //             setInput(1);
    //         }
    //     }else{
    //         setPaginate(value);
    //     }

    // }

    // const onChange = (e) => {
    //     const value = parseInt(e.target.value);
    //     setInput(value);
    // }

    // return (
    //     <div className={style.containerPaginate}>
    //         <button disabled={paginate ===1 || paginate < 1} className={style.btnPage} onClick={previusPage} >
    //             <img src="/imagenes/prevent.png" width={15} alt="" />
    //         </button>
    //         <input onChange={(e) => onChange(e)} onKeyDown={(e) => onKeyDown(e)} type="number" name="page" autoComplete="off" value={input} className={style.inputPage} />
    //         <p> de {Math.ceil(max)}</p>
    //         <button disabled={paginate === Math.ceil(max)  || paginate > Math.ceil(max)} className={style.btnPage} onClick={nextPage}>
    //             <img src="/imagenes/next.png" width={15} alt="" />
    //             {/* &raquo; */}
    //         </button>
    //     </div>
    // );   

    const currentPage = useSelector((state) => state.currentPage);
    let dispatch = useDispatch();

    function onBackPage(e){
        dispatch(modifyPage(-1));
    }

    function onNextPage(e){
        dispatch(modifyPage(1));
    }
    
    function onEspecificPage(e) {
        dispatch(especificPage(e));
    }

    // function onTopPage(e){
    //     dispatch(topPage());
    // }

    // function onBottomPage(e){
    //     dispatch(bottomPage());
    // }


    // console.log(currentPage);
    // console.log(max);

    let pageNumbers = [];

    for (let i = 0; i < Math.ceil(max); i++) {
        pageNumbers.push((i+1));
    }

    return (

        <div className={style.containerPaginate}>
            {/* <button 
            disabled={paginate ===1 || paginate < 1} 
            className={style.btnPage} 
            onClick={onBackPage} >
                <img src="/imagenes/prevent.png" width={15} alt=""/>
            </button>
            <input onChange={(e) => onChange(e)} onKeyDown={(e) => onKeyDown(e)} type="number" name="page" autoComplete="off" value={input} className={style.inputPage} />
            <input type="number" name="page" autoComplete="off" value={max}  />
            
            <p> de {Math.ceil(currentPage)}</p>
            <button 
            disabled={paginate === Math.ceil(max)  || paginate > Math.ceil(max)} 
            className={style.btnPage} 
            onClick={onNextPage}
            >
                <img src="/imagenes/next.png" width={15} alt="" />
            </button> */}

            {/* <button  className={style.btnPage}  onClick={onBottomPage} disabled={currentPage ===1 || currentPage < 1}>{"|<"}</button> */}
            <div className={style.containerRight}>
                <button   className={style.btnPage} onClick={onBackPage} disabled={currentPage ===1 || currentPage < 1}>
                    &#10096;&nbsp; Prev
                </button>
                <ul className={style.containerPaginate }>
                        {
                            pageNumbers && pageNumbers.map(num => (
                                <li key={num} className={style.numberPaginate} style={{ textDecoration: 'none' }} >
                                    <a className={`${num === currentPage ? style.isCurrent : ''}`} onClick={ () => onEspecificPage(num) } >{num}</a>
                                </li>
                            ))
                        }
                        <h3 className={style.textPageMobile}>Page {currentPage} of {Math.ceil(max)} in Total </h3>
                </ul>
                <button  className={style.btnPage} disabled={currentPage === Math.ceil(max)  || currentPage > Math.ceil(max)} onClick={onNextPage}>
                    Next &nbsp;&#10097;
                </button>
            </div>

            <div>
                <h3 className={style.textPage}>Page {currentPage} of {Math.ceil(max)} in Total </h3>
            </div>
            {/* <button  className={style.btnPage} disabled={currentPage === Math.ceil(max)  || currentPage > Math.ceil(max)} onClick={onTopP age}>{">|"}</button> */}
            

        </div>
    );    
}


export default Paginate;