import {BrowserRouter as Router, Switch} from "react-router-dom";


import Chats from "./Chats/Chats";
import { useContext, useEffect } from "react";
import { AuthContext } from "../Components/Auth/AuthContext";
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";
import { AuthRouter } from "./AuthRouter";
const Routes = () => {
    const {auth,verificaToken} = useContext(AuthContext);
    useEffect(() => {
        verificaToken();
    }, [verificaToken])
    if(auth.checking){
        return <h1>Espere por favor</h1>
    }
    return (
    <Router>
        <div>
        <Switch>

            <PublicRoute isAuthenticated={auth.logged} path="/auth"  component={AuthRouter}/>
            <PrivateRoute isAuthenticated={auth.logged} exatc path="/"  component={Chats}/>
        </Switch>
        </div>
    </Router>
    )
}

export default Routes
