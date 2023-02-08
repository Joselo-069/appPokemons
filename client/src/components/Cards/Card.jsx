import React from "react";


import style from './Card.module.css';

export default function Card({name,image,id,types,db}) {

    let colorbadge;
 
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

    return (
        <div className={style.containerCard}>
           
            <div className={style.cardBody}>
                <img src={image} alt={name} className={style.cardImage}/>   
            </div>

            <div className={style.cardFooter}>
                <p className={style.cardParrafo}>N.° 00{id}</p>
                <h1 className={style.cardText}>{name} </h1>
                <div className={style.cardContenedorBadge}>

                {db ? 
                // 1
                types.map((type, index) => {
                    ColorTypes(type.name)
                    return (
                        <span className={style.cardbadge} key={index} style={colorbadge} >{type.name}</span>
                    );
                })
                :
                //0
                types.map((type, index) => {
                    ColorTypes(type)
                    return (
                        <span className={style.cardbadge} key={index} style={colorbadge} >{type}</span>
                    );
                })
                
                }
                                        
                </div>                                
            </div>
        </div>
    )
}