import { useContext, useState } from "react"
import Images from "../../Components/assest/Images";
import './Chats.css'
import { AuthContext } from "../../Components/Auth/AuthContext"
import Profile from "../../Components/Profile/Profile";
import Chat from "../../Components/Chat/Chat";

const Chats = () => {
    const { logout}= useContext(AuthContext);
    const [activate, setActivate] = useState(false);
    const togle=()=>{
        console.log('jjj')
        setActivate(true);
    }
    const togle2=()=>{
        console.log('jjj')
        setActivate(false);
    }
    // const active1 = ;
    // const active2 = ;
    return (    
        <section className="chats">
        <div className="sections">
            <div className={activate ? "chat activeC": "chat"}>
                <Chat/>
            </div>
            <div className={activate ? "profile activeP": "profile "}>
                <Profile/>
            </div>
        </div>




        {/* navegartion de responsive */}
        <nav className="navegation">
            <ul>
                <li onClick={togle2}>
                    <img src={Images.chats} alt="chats" /> 
                    <p>Home</p>s
                </li>
                <li onClick={togle}>
                    <img src={Images.profile} alt="chats" /> 
                    <p>Work</p>
                </li>
            </ul>
        </nav>
        </section>
    )
}

export default Chats
