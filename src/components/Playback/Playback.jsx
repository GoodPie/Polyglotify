import React from 'react'
import {IoPauseCircle, IoPlayCircle} from "react-icons/io5";
import {BiSkipNext, BiSkipPrevious, BiVolume, BiVolumeFull} from "react-icons/bi"
import {Box, Flex, HStack, IconButton, Progress, Text, VStack} from "@chakra-ui/react";
import './Playback.scss'


const ICON_FONT_SIZE = {
    "default": "3rem",
    "hover": "3.2rem"
}

const Playback = ({playBackState, onPlayToggle, songName, artist, duration, currentTime, previousSong, nextSong}) => {

    const calculateTime = (milliseconds) => {
        const mins = Math.floor((milliseconds/1000) / 60);
        const returnedMins = mins < 10 ? `0${mins}` : `${mins}`;
        const secs = Math.floor((milliseconds/1000) % 60);
        const returnedSecs = secs < 10 ? `0${secs}` : `${secs}`;
        return `${returnedMins}:${returnedSecs}`;
    }

    return (

        <Box position={"absolute"} bottom={0} left={0} bg={"black"} w={"100%"} height={"75px"} pb={8} px={4}>

            <Flex justifyContent={"center"} alignItems={"center"} w={"100%"} h={"100%"}>

                <Box me={"auto"}>
                    <VStack justifyContent={"flex-start"} alignItems={"flex-start"} color={"white"} spacing={0}>
                        <Text>
                            {songName}
                        </Text>

                        <Text>
                            {artist}
                        </Text>
                    </VStack>
                </Box>

                <VStack>
                <Box>

                    <IconButton onClick={previousSong} _hover={{background: "none", fontSize: ICON_FONT_SIZE.hover}} colorScheme={"green"}
                                variant={"ghost"} fontSize={ICON_FONT_SIZE.default} className='playButton'
                                icon={<BiSkipPrevious/>} aria-label={"Previous Button"}/>
                    <IconButton onClick={onPlayToggle} _hover={{background: "none", fontSize: ICON_FONT_SIZE.hover}}
                                colorScheme={"green"} variant={"ghost"} fontSize={ICON_FONT_SIZE.default}
                                aria-label={"Play"} className='playButton'
                                icon={playBackState.isPlaying ? <IoPauseCircle/> : <IoPlayCircle/>}/>
                    <IconButton onClick={nextSong} _hover={{background: "none", fontSize: ICON_FONT_SIZE.hover}} colorScheme={"green"}
                                variant={"ghost"} fontSize={ICON_FONT_SIZE.default} className='playButton'
                                icon={<BiSkipNext/>} aria-label={"Next Button"}/>
                </Box>
                <Box w={"300px"}>
                    <div className='progress-area'>
                            <div className='progress-bar' style={{width:`${currentTime / (duration*1000) * 100}%`}}>
                                <span></span>
                            </div>
                            <div className='song-timer'>
                                <span className='current-time'>{calculateTime(currentTime)}</span>
                                <span className='current-duration'>{!isNaN(duration) && calculateTime(duration*1000)}</span>
                            </div>
                    </div>
                </Box>
                </VStack>

                <HStack ms={"auto"}>
                    <BiVolumeFull color={"white"}/>
                    <Progress rounded={"xl"} value={playBackState.volume * 100} colorScheme={"green"} size={"xs"} w={"100px"}/>
                </HStack>


            </Flex>

        </Box>
    )
}

export default Playback