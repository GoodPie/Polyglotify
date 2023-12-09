import React from 'react'
import { IoPlayCircle } from "react-icons/io5";
import {BiSkipNext, BiSkipPrevious} from "react-icons/bi"
import {IconContext} from "react-icons"

const Playback = () => {
  return (
    <div>
      <button className='playButton'>
        <IconContext.Provider value={{color:" #1DB954"}}>
          <BiSkipPrevious />
        </IconContext.Provider>        
      </button> 
      <button>
      <IconContext.Provider value={{color:" #1DB954"}}>
          <IoPlayCircle />
        </IconContext.Provider>       
      </button>
      <button>
      <IconContext.Provider value={{color:" #1DB954"}}>
          <BiSkipNext />
        </IconContext.Provider>       
      </button>
    </div>
  )
}

export default Playback