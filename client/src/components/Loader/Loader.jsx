import React from "react";
import style from "./Loader.module.css";

const Loader = () => {
    return (
        <>
            <div className={style.containerLoader}>
                <img src="https://i.imgur.com/ID0zQxj.gif" alt="" />
                <span className={style.loader}>Loading</span>
            </div>
        </>
    );

}

export default Loader;