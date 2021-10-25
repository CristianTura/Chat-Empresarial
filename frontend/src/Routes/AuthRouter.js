import { Redirect, Route, Switch } from "react-router"
import Login from "./Login/Login";
import Register from "./Register/Register";
import routes from './Routers'
import Home from "../Components/Home/Home"; 
export const AuthRouter = () => {
    return (
        <Switch>
            <Route exact path={routes.home}  component={Home}/>
            <Route exact path={routes.login}  component={Login}/>
            <Route extact path={routes.register} component={Register}/>
            <Redirect to={routes.home}/>

        </Switch>
    )
}
