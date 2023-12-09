import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../firebase.js";
import {signOut} from "firebase/auth";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

export const Logout = () => {

    const navigate = useNavigate();
    const [user, loading] = useAuthState(auth);

    useEffect(() => {
        signOut(auth)
            .then(() => {
                console.debug("User signed out");
                navigate("/login/");
            });

    }, [navigate, user]);


    return (
        <></>
    )
}