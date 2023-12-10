import React from 'react'
import {Box, HStack, Select, Text, VStack} from "@chakra-ui/react";
import {Lrc} from "react-lrc"

const LyricDisplay = ({lyrics, onLyricLanguageChange}) => {
  return (

      <Box m={0} p={0}>
        <HStack height={"calc(100vh - 75px)"} spacing={0} p={0}>
          {/* Default Lyrics */}
          <Box m={0} h={"100%"} w={"100%"} bg={"black"} py={4} px={2}>


              <Box h={"100%"} bg={"gray.900"} rounded={"xl"} overflowY={"scroll"}>
                  <VStack height={"50px"}>
                  </VStack>
                  <Box p={12} fontSize={"2rem"} >
                      <Text color={"white"}>
                          {lyrics.lyrics}
                      </Text>
                  </Box>
              </Box>

          </Box>


          {/* Translated To Lyrics */}
          <Box h={"100%"} w={"100%"} bg={"black"} py={4} px={2}>

              <Box h={"100%"} bg={"gray.900"} rounded={"xl"} overflowY={"scroll"}>


              <VStack height={"50px"}>
                  <Box  w={"100%"} p={4} >

                      <Text mb={1} color={"white"}>
                          Translate To:
                      </Text>
                      <Select value={lyrics.translatedLanguage} onChange={lyrics.onChangeLanguage} bg={"white"}>
                          <option value="en">English</option>
                          <option value="es">Spanish</option>
                          <option value="it">Italian</option>
                      </Select>
                  </Box>

              </VStack>

                  <Box p={12} fontSize={"2rem"} >
                      <Text color={"white"}>
                          {lyrics.translatedLyrics}
                      </Text>
                  </Box>

              </Box>

          </Box>
        </HStack>
      </Box>
  )
}

export default LyricDisplay