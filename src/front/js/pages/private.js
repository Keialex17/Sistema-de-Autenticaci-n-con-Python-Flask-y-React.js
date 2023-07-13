import React, { useContext } from "react";
import {useNavigate} from "react-router-dom";
import {Context} from "../store/appContext";



export const Private = () => {
    
    const {store, actions} = useContext(Context)
    const navigate = useNavigate()

    return(
        <>
            <div className="position-absolute top-50 start-50 translate-middle text-center" style={{width: "40%"}}>
                {
                    store.token ? 
                    <>
                        <div className="alert alert-success" role="alert">
                            <h4 className="alert-heading">Haz iniciado sesion con exito!  </h4>
                            <p>¡Bienvenido a tu cuenta!</p>
                            <p className="mb-0">Recuerda cerrar tu sesión antes de irte</p>
                        </div>
                    </>
                    :
                    <>
                        <div class="alert alert-danger" role="alert">
                            <p>Algo ha fallado en los datos</p>
                            <p class="mb-0">¡Vuelve al Login e intenta de nuevo!</p>
                        </div>
                        {navigate("/login")}
                    </>
                }
			</div>
        </>
    )
}