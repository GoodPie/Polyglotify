import React, {useEffect, useRef, useState} from 'react'
import {Box, HStack, Select, Text, VStack} from "@chakra-ui/react";
import {m} from "framer-motion";


const formatLyrics = (lyrics) => {

    // We are passing down an lrc file, so we need to format it, breaking out the times
    // and the lyrics into an array of objects
    const lyricsArray = lyrics.split("\\n");
    console.debug("Lyrics Array", lyricsArray)

    const formattedLyrics = [];

    for (const line of lyricsArray) {
        const [time, lyric] = line.split("]");
        const formattedTime = time.replace("[", "");
        formattedLyrics.push({time: formattedTime, lyric: lyric});
    }

    return formattedLyrics;

}

const convertTimeStringToMilliseconds = (timeString) => {



    // Timestring will be formatted as 00:00.00
    const [minutes, seconds] = timeString.split(":");

    if (!minutes || !seconds) return 0;
    const [secondsWithoutDecimal, milliseconds] = seconds.split(".");
    const totalMilliseconds = (parseInt(minutes) * 60 * 1000) + (parseInt(secondsWithoutDecimal) * 1000) + parseInt(milliseconds);
    return totalMilliseconds;
}


const LyricDisplay = ({lyrics, onLyricLanguageChange, currentTime}) => {

    const [currentBaseLyricState, setCurrentBaseLyricState] = useState({
        lyric: null,
        time: null,
        currentIndex: 0
    });
    const [currentTranslatedLyricState, setCurrentTranslatedLyricState] = useState({
        lyric: null,
        time: null,
        currentIndex: 0
    });


    const [formattedLyrics, setFormattedLyrics] = useState([]);
    const [formattedTranslatedLyrics, setFormattedTranslatedLyrics] = useState([]);

    const currentLyricRef = useRef(null);
    const currentTranslatedLyricRef = useRef(null);

    useEffect(() => {
        // Calculate the current lyric based on currentTime
        // and update currentLyric state
        const currentLyricIndex = formattedLyrics.findIndex((line, index) => {
            if (index < 3 || !line.time) return false;
            if (!line.time) return false;
            const lineTime = convertTimeStringToMilliseconds(line.time);
            const nextLineTime = formattedLyrics[index + 1] ? convertTimeStringToMilliseconds(formattedLyrics[index + 1].time) : Infinity;
            return lineTime <= currentTime && nextLineTime > currentTime;
        });
        if (currentLyricIndex !== -1) {

            // Define the new current lyrci index
            const newCurrentLyric = formattedLyrics[currentLyricIndex];
            setCurrentBaseLyricState({
                lyric: newCurrentLyric.lyric,
                time: newCurrentLyric.time,
                currentIndex: currentLyricIndex
            });

        }
    }, [currentTime, formattedLyrics]);

    useEffect(() => {
        // Calculate the current lyric based on currentTime
        // and update currentLyric state
        const currentLyricIndex = formattedTranslatedLyrics.findIndex((line, index) => {
            if (index < 3 || !line.time) return false;
            if (!line.time) return false;
            const lineTime = convertTimeStringToMilliseconds(line.time);
            const nextLineTime = formattedTranslatedLyrics[index + 1] ? convertTimeStringToMilliseconds(formattedLyrics[index + 1].time) : Infinity;
            return lineTime <= currentTime && nextLineTime > currentTime;
        });
        if (currentLyricIndex !== -1) {
            const newCurrentLyric = formattedTranslatedLyrics[currentLyricIndex];
            setCurrentTranslatedLyricState({
                lyric: newCurrentLyric.lyric,
                time: newCurrentLyric.time,
                currentIndex: currentLyricIndex
            });
        }
    }, [currentTime, formattedLyrics]);


    useEffect(() => {
        console.debug("Current Lyric", currentLyricRef?.current, "Current Translated Lyric", currentTranslatedLyricRef?.current)
        if (currentLyricRef?.current) {
            currentLyricRef.current.scrollIntoView({behavior: 'smooth'});
        }

        if (currentTranslatedLyricRef?.current) {
            currentTranslatedLyricRef.current.scrollIntoView({behavior: 'smooth'});
        }
    }, [currentBaseLyricState, currentTranslatedLyricState]);

    useEffect(() => {
        setFormattedLyrics(formatLyrics(lyrics.lyrics));
        setFormattedTranslatedLyrics(formatLyrics(lyrics.translatedLyrics));
    }, [lyrics])

    return (

        <Box m={0} p={0}>
            <HStack height={"calc(100vh - 75px)"} spacing={0} p={0}>
                {/* Default Lyrics */}
                <Box m={0} h={"100%"} w={"100%"} bg={"black"} py={4} px={2}>


                    <Box h={"100%"} bg={"gray.900"} rounded={"xl"} overflowY={"scroll"}>
                        <VStack height={"50px"}>
                        </VStack>
                        <VStack p={12} fontSize={"2rem"} alignItems={"start"}>
                            {formattedLyrics.map((line, index) => {

                                    const isHighlighted = convertTimeStringToMilliseconds(line.time) < currentTime;
                                    return (

                                        <Text ref={currentBaseLyricState.currentIndex === index ? currentLyricRef : null}
                                              color={currentBaseLyricState.currentIndex === index  ? "green.500" : isHighlighted ? "green.700" : "white"}
                                              key={index}>
                                            {convertTimeStringToMilliseconds(line.time) < currentTime ?
                                                <span>&#8226;</span> : null}
                                            {line.lyric}
                                        </Text>
                                    )
                                }
                            )}

                        </VStack>
                    </Box>

                </Box>


                {/* Translated To Lyrics */}
                <Box h={"100%"} w={"100%"} bg={"black"} py={4} px={2}>

                    <Box h={"100%"} bg={"gray.900"} rounded={"xl"} overflowY={"scroll"}>


                        <VStack height={"50px"}>
                            <Box w={"100%"} p={4}>
                                <Text mb={1} color={"white"}>
                                    Translate To:
                                </Text>
                                <Select value={lyrics.translatedLanguage} onChange={lyrics.onChangeLanguage}
                                        bg={"white"}>
                                    <option value="en">English</option>
                                    <option value="es">Spanish</option>
                                    <option value="it">Italian</option>
                                    <option value="ar">Arabic</option>
                                </Select>
                            </Box>

                        </VStack>

                        <VStack p={12} fontSize={"2rem"}
                                alignItems={lyrics.translatedLanguage === "ar" ? "end" : "start"}>
                            {formattedTranslatedLyrics.map((line, index) => {
                                    const isHighlighted = convertTimeStringToMilliseconds(line.time) < currentTime;
                                    return (

                                        <Text ref={currentTranslatedLyricState.currentIndex === index ? currentTranslatedLyricRef : null}
                                              color={currentTranslatedLyricState.currentIndex === index ? "green.500" : isHighlighted ? "green.700" : "white"}
                                              key={index}>
                                            {convertTimeStringToMilliseconds(line.time) < currentTime ?
                                                <span>&#8226;</span> : null}
                                            {line.lyric}
                                        </Text>
                                    )
                                }
                            )}

                        </VStack>

                    </Box>

                </Box>
            </HStack>
        </Box>
    )
}

export default LyricDisplay