import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "./firebase.js";
import {useEffect} from "react";
import {Header, LyricDisplay, Playback} from "./components/index.jsx";
import {useNavigate} from "react-router-dom";

export const Home = () => {

    const navigate = useNavigate();
    const [user, loading] = useAuthState(auth);

    useEffect(() => {
        if (!user && !loading) return navigate("/Login");
    }, [loading, navigate, user]);

    return (
        <>
            <Header />
            <LyricDisplay />
            <Playback />
        </>
    )
}