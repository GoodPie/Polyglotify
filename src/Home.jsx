import {useAuthState} from "react-firebase-hooks/auth";
import {auth, db} from "./firebase.js";
import {useEffect, useState, useCallback} from "react";
import {LyricDisplay, Playback} from "./components/index.jsx";
import {useNavigate} from "react-router-dom";
import {Box, Center, CircularProgress} from "@chakra-ui/react";
import {IconContext} from "react-icons"
import {collection, doc, getDoc, getDocs, query, where} from "firebase/firestore";

/**
 * Fetch all the music from Firestore collection music
 */
const fetchMusic = async () => {

    const newMusic = {};

    const musicRef = collection(db, "music");
    const musicQuery = query(musicRef, where("is_active", "==", true));

    const docSnapshot = await getDocs(musicQuery)

    docSnapshot.forEach((snapshot) => {
        const musicData = snapshot.data();
        const id = snapshot.id;
        newMusic[id] = musicData;

    });

    // Loop through the new music IDs and fetch the lyrics
    for (const [id, musicData] of Object.entries(newMusic)) {
        console.debug("Fetching lyrics for", id)
        const lyricsRef = doc(db, "lyrics", id);
        const lyricsSnapshot = await getDoc(lyricsRef);

        const lyricsData = lyricsSnapshot.data();
        newMusic[id].lyrics = lyricsData;
    }


    return newMusic;

}


export const Home = () => {

    const navigate = useNavigate();

    const [audio, setAudio] = useState(new Audio());
    const [user, loading] = useAuthState(auth);
    const [loadingSongs, setLoadingSongs] = useState(true);
    const [currTime, setcurrTime] = useState(0);

    const [music, setMusic] = useState({});

    const [currentTime, setCurrentTime] = useState(0);

    const timeUpdate = useCallback((event) => {
        const milliSeconds = event.target.currentTime * 1000;
        setCurrentTime(milliSeconds);
    }, [setCurrentTime]);


    const [lyrics, setLyrics] = useState({
        lyrics: "",
        song: "",
        artist: "",
        songDirectory: "",
        translatedLanguage: "en",
        translatedLyrics: "",
        availableLyrics: [],
        onChangeLanguage: (event) => {

            setLyrics((prevState) => {
                return {
                    ...prevState,
                    translatedLanguage: event.target.value,
                    translatedLyrics: prevState.availableLyrics[event.target.value],
                }
            });
        },
    });


    useEffect(() => {

        if (user) {
            setLoadingSongs(true);
            fetchMusic()
                .then((newMusic) => {
                    setMusic(newMusic);

                    // Set lyrics to the first song
                    const firstSong = newMusic[Object.keys(newMusic)[0]];
                    setLyrics((prevState) => {
                        return {
                            ...prevState,
                            lyrics: firstSong.lyrics.en,
                            song: firstSong.song_name,
                            artist: firstSong.song_artist,
                            songDirectory: firstSong.song_id,
                            availableLyrics: firstSong.lyrics,
                            translatedLanguage: "en",
                            translatedLyrics: firstSong.lyrics["en"],
                        }
                    });

                    const newAudio = new Audio(`/songs/${firstSong.song_id}`);
                    newAudio.ontimeupdate = timeUpdate;
                    setAudio(newAudio);
                })
                .finally(() => setLoadingSongs(false));
        }

    }, [user]);

    const [playBackDetails, setPlayBackDetails] = useState({
        isPlaying: false,
        currentSong: null,
        currentSongProgress: 0.0,
        volume: 0.5,
    });


    const togglePlayBack = () => {


        setPlayBackDetails((prevState) => {
            return {
                ...playBackDetails,
                isPlaying: !prevState.isPlaying,
            }
        });

        // Import the sound
        // import (`assets/songs/${lyrics.songDirectory}`);
        if (playBackDetails.isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
    }


    useEffect(() => {
        if (!user && !loading) return navigate("/Login");
    }, [loading, navigate, user]);

    const timeUpdate = useCallback((event) => {
        const milliSeconds = event.target.currentTime * 1000;
        setcurrTime(milliSeconds);
    }, [setcurrTime]);
    

    return (

        <IconContext.Provider value={{}}>
            <Box w={"100%"} h={"100vh"} margin={0} padding={0}>
                {loadingSongs ?
                    <Center p={10}>
                        <CircularProgress isIndeterminate color={"green.300"} size={"100px"} thickness={"10px"}/>
                    </Center> :
                    <>
                        {/* <audio src={lyrics.songDirectory}/> */}
                        <LyricDisplay currentTime={currentTime} lyrics={lyrics}/>
                        <Playback songName={lyrics.song} artist={lyrics.artist} playBackState={playBackDetails}
                                  onPlayToggle={togglePlayBack} duration={audio.duration} currentTime={currTime}/>
                    </>
                }
            </Box>
        </IconContext.Provider>

    )
}