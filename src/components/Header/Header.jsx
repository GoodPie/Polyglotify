import React from 'react'

const Header = () => {
  return (
    <div>
      <div>
       <h2 className='playing'>Playing Now</h2>
     </div>

      <div>
        <h3 className='title'>Song Name</h3>
        <p className='artist'>Artist Name</p>
      </div>
    </div>
  )
}

export default Header