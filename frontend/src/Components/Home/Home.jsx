import Images from '../assest/Images'
import {Link} from 'react-router-dom'
import './Home.css'
import routes from '../../Routes/Routers'

const Home = () => {
    return (
        <section className="home">
            <div className="home_card">
                <div className="home_title">
                    <h1>INTOPCOL</h1>
                    <p>Communication</p>
                </div>
                <img src={Images.logo} alt="logo" />
                <div className="home_btn">
                    <Link to={routes.login}>Ingresar</Link>    
                    <p>¿No tienes una cuenta? 
                    <Link to={routes.register}><strong>Regístrate ahora</strong> </Link></p>
                </div>
            </div>
        </section>
    )
}

export default Home
