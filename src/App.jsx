import './App.css'
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import Login from "./Authentication/Login.jsx";
import LoginForm from "./Authentication/LoginForm.jsx";
import ForgotPasswordForm from "./Authentication/ForgotPassword.jsx";
import {Center} from "@chakra-ui/react";
import {Register} from "./Authentication/Register.jsx";
import {Home} from "./Home.jsx";
import {Logout} from "./Authentication/Logout.jsx";


function App() {




    return (
        <Router>
            <Routes>

                {/*  404 */}
                <Route path="*" element={<Center h={"100vh"}>404</Center>} />

                <Route path="/login" element={<Login></Login>} >
                    <Route path="/login/" element={<LoginForm></LoginForm>} />
                    <Route path="/login/forgot-password" element={<ForgotPasswordForm></ForgotPasswordForm>} />
                    <Route path="/login/register" element={<Register></Register>} />
                </Route>

                <Route path={"/"} element={<Home></Home>}>

                </Route>

                <Route path="/logout" element={<Logout></Logout>} />


            </Routes>
        </Router>
    )
}

export default App
