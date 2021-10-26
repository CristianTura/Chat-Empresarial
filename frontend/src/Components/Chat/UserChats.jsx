import { useContext } from "react"
import Images from "../assest/Images"
import { AuthContext } from "../Auth/AuthContext"

export const UserChats = () => {
    const {chat, setChat}= useContext(AuthContext)
    const render =()=>{
        setChat(!chat)
    }
    return (
        <div className="messages">
        <div className="messages_contant" onClick={render}>
            <div className="messages_photo">
                <img src={Images.contacts} alt="" />
            </div>
            <div className="messages_data">
                <h3>Name chat</h3>
                <p>Ultimo mensaje</p>
            </div>
            <div className="messages_time">
                <p>hace 2min</p>
            </div>
        </div>
    </div>
    )
}
