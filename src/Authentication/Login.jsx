import {Flex, Stack, useColorModeValue,} from "@chakra-ui/react";
import "./Login.css";
import {Outlet, useNavigate} from "react-router-dom";
import React, {useEffect} from "react";
import AnimatedLoginBackground from "./AnimatedLoginBackground";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../firebase.js";


const Login = () => {


    const navigate = useNavigate();
    const [user, loading] = useAuthState(auth);

    useEffect(() => {
        console.debug("User", user, "Loading", loading)
        if (user && !loading) return navigate("/");
    }, [user, navigate, user]);

    return (
        <>
            <AnimatedLoginBackground/>
            <Flex
                minH={"100vh"}
                align={"center"}
                justify={"center"}
                bg={useColorModeValue("gray.50", "gray.800")}
            >
                <Stack
                    boxShadow={"lg"}
                    rounded={"lg"}
                    backgroundColor={"white"}
                    zIndex={1}
                    spacing={8}
                    mx={"auto"}
                    maxW={"lg"}
                    py={12}
                    px={12}
                    width={"full"}
                >
                    <Outlet />
                </Stack>
            </Flex>
        </>

    )

};

export default Login;
