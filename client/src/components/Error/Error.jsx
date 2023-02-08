import React from "react";
import style from "./Error.module.css";

const Error = () => {
    return (
        <>
            <div className={style.containerLoader}>
                <img src="/imagenes/pokebolaMain.jpg"  alt="" />

                <img src="/imagenes/notFound.png" width={100} alt="" />

                <span className={style.loader}>Pokemon not found</span>
            </div>
            {/* <div>
                <h1>Hola Mundo</h1>
            </div> */}
        </>
    );

}

export default Error;