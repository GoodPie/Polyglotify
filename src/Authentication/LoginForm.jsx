import {
    Alert,
    AlertIcon,
    Box,
    Button,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Link,
    Stack,
    Text,
    useColorModeValue
} from "@chakra-ui/react";
import {useState} from "react";
import {logEvent} from "firebase/analytics";
import {analytics, auth} from "../firebase";
import {signInWithEmailAndPassword} from "firebase/auth";
import {useNavigate} from "react-router-dom";
import {APP_NAME} from "../constants.js";

/**
 * Form to handle logging the user in to the system
 * @constructor
 */
export default function LoginForm() {

    const navigate = useNavigate();

    // Define the states use for login
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const [email, setEmail] = useState("");


    const onEmailChangeListener = (event) => {
        setEmail(event.target.value);
    };

    const [password, setPassword] = useState("");


    const onPasswordChangeListener = (event) => {
        setPassword(event.target.value);
    };

    /**
     * Attempts to log the user in via their email and password
     */
    const handleLogin = () => {

        setLoading(true);

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential);
                logEvent(analytics, "Login Successful", {
                    email: email,
                });
                navigate("/")
            })
            .catch((error) => {
                logEvent(analytics, "Login Failed", {
                    error: error.message,
                });
                setError(error.message);
            })
            .then(() => setLoading(false));
    }

    return (<>

        {/* Login form heder */}
        <Stack align={"center"} color={"blackx"}>
            <Heading fontSize={"4xl"}>Sign In</Heading>
            <Text fontSize={"lg"}>
                Sign in to access {APP_NAME}
            </Text>
        </Stack>

        {/* Login form body */}
        <Box p={8} bg={"white"}>
            <Stack spacing={4}>
                {/* Error */}
                {error && (
                    <Alert status="error">
                        <AlertIcon/>
                        {error}
                    </Alert>
                )}

                {/* Email input */}
                <FormControl id="email">
                    <FormLabel color={"black"} htmlFor="email">Email</FormLabel>
                    <Input border={"black"} color={"black"} type="email" onChange={onEmailChangeListener}/>
                </FormControl>

                {/* Password input */}
                <FormControl id="password">
                    <FormLabel color={"black"} htmlFor="password">Password</FormLabel>
                    <Input border={"black"} color={"black"} type="password" onChange={onPasswordChangeListener}/>
                </FormControl>
            </Stack>

            <Stack spacing={4} marginTop={4}>
                <Button
                    colorScheme={"green"}
                    onClick={handleLogin}
                    isLoading={loading}
                >
                    Sign In
                </Button>

                <Button
                    display={loading ? "none" : "block"}
                    colorScheme={"green"}
                    onClick={() => {
                        // Navigate to register
                        navigate("/login/register")
                    }}
                    isLoading={loading}
                >
                    Register
                </Button>

                <Link alignSelf={"center"} onClick={() => navigate("/login/forgot-password")}>
                    Forgot Password?
                </Link>

            </Stack>
        </Box>
    </>)
}
