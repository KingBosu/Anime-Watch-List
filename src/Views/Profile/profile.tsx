import { onAuthStateChanged } from "firebase/auth"
import { useState} from 'react'

export default function profile() {
  return (
    <div>
      <h3> {User.email}'s Watch List</h3>
      <>Object from saved watchlist will go here</>
    </div>
  )
}
