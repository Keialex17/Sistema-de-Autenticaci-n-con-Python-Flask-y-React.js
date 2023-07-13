import React, {useState, useContext} from "react";
import {useNavigate} from "react-router-dom";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Login =() => {

    const { store, actions } = useContext(Context)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const[validateCredentials, setValidateCredentials] = useState(true)
    const navigate = useNavigate()

    const handleClick = async () => {
        let response = await actions.login(email, password);
        if(response){
            navigate("/private")
        }
        else{
            console.log("¡Datos inválidos! Vuelve a intentar")
            navigate("/private")
        }
    }


    return(
        <>
                <div className="fondo-login">
            <div className="container">
                <div className="card position-absolute top-50 start-50 translate-middle" style={{width: "500px", backgroundColor: "#87cefa"}}>
                    <h2 className="card-header text-light text-center">Welcome</h2>
                   <div className="card-body">
                        <div className="input-group mb-3">
                            <input type="email" className="form-control" placeholder="Email" aria-label="email" aria-describedby="basic-addon1" value={email} onChange={e => setEmail(e.target.value)}/>
                        </div>
                        <div className="input-group mb-3">
                            <input type="password" className="form-control" placeholder="Password" aria-label="email" aria-describedby="basic-addon1" value={password} onChange={e => setPassword(e.target.value)}/>
                        </div>
                        
                        <button onClick={handleClick} className="btn btn-success" style={{width: "100%"}}>Sign In</button>
                    </div>  
                </div>
            </div>
        </div>
        </>
    )
}