import {Link} from 'react-router-dom'
import Images from '../../Components/assest/Images'
import './Register.css'
import Swal from 'sweetalert2'
import { useContext, useState } from 'react'
import { AuthContext } from '../../Components/Auth/AuthContext'


const Register = () => {
    
    const {register}= useContext(AuthContext)
    const [form, setForm] = useState({
        name:'test55',
        email:'test55@test.com',
        password:'123456789',
        typeUser:'CEO'
    });

    const onChange=({target})=>{
        const {name, value}=target;
        setForm({
            ...form,
            [name]:value
        });
    }

    const onSubmit=async(e)=>{
        e.preventDefault();
        // console.log(form)
        //backend llamado
        const {name,email,password, typeUser}= form;
        const msg= await register(name, email,password, typeUser);
        if(msg !== true){
            Swal.fire("Error", msg, 'error')
        }else{
            console.log('.')
        }
    }
    const allOk =()=>{
        return ( form.email.length>0 && 
                form.password.length>0 &&
                form.name.length>0&& 
                form.typeUser.length>0
                )? true:false;
    }
    return (
        <section className="register">
            <img src={Images.logo} alt="logo" />
                <h1>CREA UNA CUENTA EN <br/>INTOPCOL</h1>
            <div className="register_card">
                
                <form className="register_input" onSubmit={onSubmit}>
                    <label for="name">Nombre completo</label>
                    <input type="text"  
                        id="name"
                        name="name"
                        value={form.name}
                        onChange={onChange} 
                        />
                    <label for="user">Correo</label>
                    <input type="email" 
                        id="user"
                        name="email"
                        value={form.email}
                        onChange={onChange}
                        />
                    <label for="passwordInput">Contraseña</label>
                    <input type="password" 
                        id="passwordInput"
                        name="password"
                        value={form.password}
                        onChange={onChange}
                        />
                    <label for="typeSelect">Tipo de usuario</label>
                    <select name="typeUser"
                            value={form.typeUser}
                            onChange={onChange}
                    >
                        <option value="" selected>Elige una opción</option>
                        <option value="colaborador">Colaborador</option>
                        <option value="líder de área">Líder de área</option>
                        <option value="CEO">CEO</option>
                    </select>
                    
                   
                    <button
                        type="submit"
                        disabled={!allOk()}>Registrarse</button>
                    
                </form>
            </div>
            <Link to="/">Volver a inicio</Link>
            
        </section>
    )
}

export default Register
