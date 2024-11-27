import { signOut } from 'firebase/auth'
import React from 'react'
import { auth } from '../Firebase/Firebase'

const Hearder = () => {
  return (
    <div>
        <button onClick={()=>{signOut(auth)}}>Logout</button>
    </div>
  )
}

export default Hearder