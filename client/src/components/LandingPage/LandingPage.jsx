import React from "react";
import { Link } from "react-router-dom";
import style from "./LandingPage.module.css";

export default function LandingPage() {
    return (
        <div>
            <header className={style.hero}>
                <nav className={style.containerNav}>
                    <div className={style.flexNav}>
                        <h2 className={style.logoNav}>
                            <img src="/imagenes/user.png" width={25} alt="" />
                            &nbsp;Gonzalo Pineda Quispe</h2>
                        <h2 className={style.logoNav}>
                        <a href="https://github.com/Joselo-069" target={"_blank"} rel="noreferrer">
                            <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" width={20} alt="github" />
                        </a>    
                        &nbsp;
                        <a href="https://www.linkedin.com/in/gonzalo-pineda-b1598b254/" target={"_blank"} rel="noreferrer">
                            <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png " width={20} alt="github" />
                        </a>
                        </h2> 
                    </div>

                    {/* 
                    <ul className={style.listNav}>
                    <li className={style.itemNav}><a href="#" className={style.linkNav}>Inicio</a></li>
                        <li className={style.itemNav}><a href="#" className={style.linkNav}>Acerca de</a></li>
                        <li className={style.itemNav}><a href="#" className={style.linkNav}>Contacto</a></li> 
                       
                        <li className={style.itemNav}><p href="#" className={style.linkNav}>Contacto</p></li>
                    </ul>
                    */}
                    {/* <figure className={style.menuNav}>
                        <img src="/imagenes/pikachu.jpeg" className= alt="" />
                    </figure> 
                     */}

                     <section className={style.containerManin}>
                        <div className={style.textMain}>
                            <h1 className={style.titleMain}>
                                Hello!, Welcome to the Pokedex
                            </h1>
                            <p className={style.subtitleMain}>
                                Discover and collect extraordinary pokemon
                            </p>
                            <Link to='/home' >
                                <button className={style.btnMain}>Start Now</button>
                            </Link>
                        </div>
                        <figure className={style.pictureMain}>
                            <img src="/imagenes/pikachu.jpeg" alt="" className={style.imgMain} />
                            {/* <img src="/imagenes/pokebolaMain.jpg" alt="" /> */}
                        </figure>
                     </section>
                </nav>

                <div style={{height: '150px' ,overflow: 'hidden'}} className={style.foot}>
                    <svg viewBox="0 0 500 150" preserveAspectRatio="none" style= {{height: '100%', width: '100%'}}>
                        <path d="M0.00,49.99 C150.00,150.00 422.91,-57.72 500.00,49.99 L500.00,150.00 L0.00,150.00 Z" style={{stroke: 'none', fill: '#fffafa'}}></path>
                    </svg>
                </div>
            </header>
        </div>
    );
}