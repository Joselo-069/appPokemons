import React from "react";
import style from "./Footer.module.css";


const Footer = () => {

    return(
        <>
            <footer className={style.containerFooter}>
                <div className={style.containerImage}>
                    <img src="https://d92mrp7hetgfk.cloudfront.net/images/sites/misc/HENRY/original.PNG?1627058942" width={60} alt="" />
                </div>
                <div>
                    <small className={style.copyrightFooter}>© Copyright 2023. Gonzalo Alexander Pineda Quispe Todos los Derechos Reservados.</small>
                </div>
                <div className={style.aboutFooter}>
                    <b className={style.titleFooter}>Sigueme:</b>
                    <div className={style.socialFooter}>
                        <a href="https://www.facebook.com/profile.php?id=100008200292558" target={"_blank"} rel="noreferrer">
                            <img src="https://www.unasam.edu.pe/web/redsocialunasam/redsocial_24-10-2021-01-15-36.png" width={20} alt="logo facebook" />
                        </a>
                        <a href="https://www.instagram.com/" target={"_blank"} rel="noreferrer">
                            <img src="https://www.unasam.edu.pe/web/redsocialunasam/redsocial_24-10-2021-01-15-54.png" width={20} alt="logo ig" />
                        </a>
                        <a href="https://github.com/Joselo-069" target={"_blank"} rel="noreferrer">
                            <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" width={20} alt="github" />
                        </a>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer;