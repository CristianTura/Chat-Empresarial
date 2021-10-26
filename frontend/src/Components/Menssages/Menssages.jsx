import { useContext } from 'react'
import Images from '../assest/Images'
import { AuthContext } from '../Auth/AuthContext'
import './Menssages.css'

export const Menssages = () => {
    const {chat, setChat}= useContext(AuthContext)
    const render =()=>{
        setChat(!chat)
    }
    return (
        <section className="menssages">
            <div className="menssage_close">
                <img src={Images.settings} alt="" onClick={render}/>
                <img src={Images.settings} alt="" />
            </div>
            <div className="complete">
                {/* recibe */}
                <div className="mesages_int">
                <div className="menssages_in">
                    <img src={Images.contacts} alt="" /> 
                </div>
                <div className="messages_recieve">
                    <p> tus sapiente deleniti!</p>
                </div>
                </div>
                <span>11:01 AM / juni 9</span> 

                {/* envio */}
                <div className="mensages_out">
                    <div className="mensages_sent">
                        <p>Hola quetal</p>

                    </div>
                </div>
                <p className="time_out">11:01 AM / juni 9</p>

                
                </div>

                        


            <div className="send">
                    <input type="text" placeholder="mensage" />
                    <button><img src={Images.send} alt="" /></button>
            </div>
        </section>
    )
}
