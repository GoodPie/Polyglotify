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
import { sendPasswordResetEmail } from "firebase/auth";
import {useState} from "react";
import {auth} from "../firebase";
import {useNavigate} from "react-router-dom";

const ForgotPasswordForm = () => {

    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [loading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const onEmailChangeListener = (event) => {
        setEmail(event.target.value);
    };

    const onResetPassword = () => {
        sendPasswordResetEmail(auth, email)
            .then(() => {
                navigate("/login");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setError(errorMessage);
            });
    }

    return (
        <>
            <Stack align={"center"}>
                <Heading fontSize={"4xl"}>Forgot Password</Heading>
                <Text fontSize={"lg"}>
                    Enter your email address and we'll send you a link to reset your password.
                </Text>
            </Stack>

            {/* Login form body */}
            <Box p={8} bg={useColorModeValue("white", "gray.700")}>
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
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <Input type="email" onChange={onEmailChangeListener}/>
                    </FormControl>

                </Stack>

                <Stack spacing={4} marginTop={4}>
                    <Button
                        colorScheme={"green"}
                        onClick={onResetPassword}
                        isLoading={loading}
                    >
                        Reset Password
                    </Button>

                    <Link alignSelf={"center"} onClick={() => navigate("/login/")}>
                        Go Back
                    </Link>

                </Stack>
            </Box>


        </>
    )

}

export default ForgotPasswordForm;