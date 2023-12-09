import './App.css'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from "./Authentication/Login.jsx";
import LoginForm from "./Authentication/LoginForm.jsx";
import ForgotPasswordForm from "./Authentication/ForgotPassword.jsx";
import {Center, ChakraProvider} from "@chakra-ui/react";
import {Register} from "./Authentication/Register.jsx";
import {Home} from "./Home.jsx";
import {Logout} from "./Authentication/Logout.jsx";
import theme from "./theme";


function App() {


    return (
        <ChakraProvider theme={theme}>
            <Router>
                <Routes>

                    {/*  404 */}
                    <Route path="*" element={<Center h={"100vh"}>404</Center>}/>

                    <Route path="/login" element={<Login></Login>}>
                        <Route path="/login/" element={<LoginForm></LoginForm>}/>
                        <Route path="/login/forgot-password" element={<ForgotPasswordForm></ForgotPasswordForm>}/>
                        <Route path="/login/register" element={<Register></Register>}/>
                    </Route>

                    <Route path={"/"} element={<Home></Home>}/>


                    <Route path="/logout" element={<Logout></Logout>}/>


                </Routes>
            </Router>
        </ChakraProvider>
    )
}

export default App
