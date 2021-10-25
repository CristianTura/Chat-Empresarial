import Images from '../../Components/assest/Images'
import {Link} from 'react-router-dom'
import './Login.css'
import { useContext, useState } from 'react'
import { AuthContext } from '../../Components/Auth/AuthContext'
import Swal from 'sweetalert2'

const Login = () => {
    const [form, setForm] = useState({
        email:'ashey@test.com',
        password:'123456789',
    });
    const {login}=useContext(AuthContext);
    const onChange=({target})=>{
        const {name, value}=target;
        setForm({
            ...form,
            [name]:value
        });
    }
    const onSubmit=async(e)=>{
        e.preventDefault();
        console.log(form)
        //backend llamado
        const {email,password}= form;
        const ok= await login(email,password);
        if(!ok){
            Swal.fire("Error", 'Verifique el usuario y contraseña', 'error')
        }
    }
    const allOk =()=>{
        return ( form.email.length>0 && form.password.length>0)? true:false;
    }

    return (
        <section className="login">
            <img src={Images.logo} alt="logo" />
            <form className="login_background" onSubmit={onSubmit}>
                <h1>Iniciar Sesion</h1>
                <label for="User" >Usuario</label>
                <input 
                    type="email" 
                    name="email"
                    id="User" 
                    placeholder="User@email.com"
                    value={form.email}
                    onChange={onChange} 
                />
                <label for="inputPassword" >Contraseña</label>
                <input 
                    type="password"
                    name="password"
                    id="inputPassword" 
                    placeholder="*******"
                    value={form.password}
                    onChange={onChange}
                />
                <button 
                    type="submit"
                    disabled={!allOk()}
                >Acceder</button>
            </form>
            <Link to="/">Volver a inicio</Link>
        </section>
    )
}

export default Login
