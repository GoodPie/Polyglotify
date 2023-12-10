import {useState} from "react";
import {auth} from "../firebase.js";
import {createUserWithEmailAndPassword} from "firebase/auth";
import {
    Alert,
    AlertIcon,
    Box, Button,
    FormControl,
    FormLabel,
    Heading,
    Input, Link,
    Stack,
    Text,
    useColorModeValue
} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";
import {APP_NAME} from "../constants.js";

export const Register = () => {

    const navigate = useNavigate();

    // Define the states use for login
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const [registerState, setRegisterState] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });


    const onEmailChangeListener = (event) => {
        setRegisterState({...registerState, email: event.target.value});
    }

    const onPasswordChangeListener = (event) => {
        setRegisterState({...registerState, password: event.target.value});
    }

    const onConfirmPasswordChangeListener = (event) => {
        setRegisterState({...registerState, confirmPassword: event.target.value});
    }

    const handleRegister = () => {
        setLoading(true);


        // Make sure passwords match
        if (registerState.password !== registerState.confirmPassword) {
            setError("Passwords do not match");
            setLoading(false);
            return;
        }

        createUserWithEmailAndPassword(auth, registerState.email, registerState.password)
            .then((userCredential) => {
                // Navigate to login
                navigate("/login/")
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => setLoading(false));
    }



    return (<>
            {/* Login form heder */}
            <Stack align={"center"}>
                <Heading fontSize={"4xl"}>Sign Up</Heading>
                <Text fontSize={"lg"}>
                    Create a New {APP_NAME} Account
                </Text>
            </Stack>

            {/* Login form body */}
            <Box p={8} >
                <Stack spacing={4}>
                    {/* Error */}
                    {error && (
                        <Alert status="error">
                            <AlertIcon/>
                            {error}
                        </Alert>
                    )}

                    {/* Email input */}
                    <FormControl isRequired={true} id="email">
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <Input type="email" onChange={onEmailChangeListener}/>
                    </FormControl>

                    {/* Password input */}
                    <FormControl isRequired={true} id="password">
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <Input type="password" onChange={onPasswordChangeListener}/>
                    </FormControl>

                    {/* Confirm Password input */}
                    <FormControl isRequired={true} id="confirmPassword">
                        <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
                        <Input type="password" onChange={onConfirmPasswordChangeListener}/>
                    </FormControl>

                </Stack>

                <Stack spacing={4} marginTop={4}>
                    <Button
                        colorScheme={"green"}
                        onClick={handleRegister}
                        isLoading={loading}
                    >
                        Register
                    </Button>


                    <Link alignSelf={"center"} onClick={() => navigate("/login/")}>
                        Already have an account?
                    </Link>

                </Stack>
            </Box>
        </>
    )
}