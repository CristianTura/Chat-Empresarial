import { useContext } from "react"
import Images from "../assest/Images"
import { AuthContext } from "../Auth/AuthContext";
import './Chat.css'

const Chat = () => {
    const {auth} = useContext(AuthContext);
    return (
        <div className="groups">
            <div className="search">
                <input type="search"placeholder="Search contacts…" />
                <img src={Images.search} alt="" />
            </div>
            <h1>Grupos de chat</h1>
            <div className="groups_items">
                <img src={Images.contacts} alt="" />
                <img src={Images.contacts} alt="" />
                <img src={Images.contacts} alt="" />
                <img src={Images.contacts} alt="" />
            </div>
            <h1>Mensajes</h1>
            <div className="messages">
                <div className="messages_contant">
                    <div className="messages_photo">
                        <img src={Images.contacts} alt="" />
                    </div>
                    <div className="messages_data">
                        <h3>{auth.name}</h3>
                        <p>Ultimo mensaje</p>
                    </div>
                    <div className="messages_time">
                        <p>hace 2min</p>
                    </div>
                </div>
                </div>
            </div>
    )
}

export default Chat
