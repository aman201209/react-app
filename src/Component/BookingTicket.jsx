import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {Link} from "react-router-dom"

function BookingTicket() {
    let [user , setUser] = useState({
        date:"",
    })
    let [train , setTrain] = useState([])
    console.log(user)

    useEffect(()=>{
        let data = async()=>{
            let res =await axios.post("http://localhost:3000/getStation")
            let date = res.data.trainRoot.filter(value=>value.trainDate==user.date)
            console.log(date)
            setTrain(date)
        console.log(res.data.trainRoot)
        }
        data()
    },[])
    const handleClick = ()=>{
        
    }
  return (
    <div>
        <div>
            <input type="date" name='date' value={user.date} onChange={(e)=>setUser({...user,[e.target.name]:e.target.value})} />
            <button onClick={{handleClick}}>
                Check
            </button>
        </div>
        <div>
            <table>
                <tr>
                    <th>Train Name</th>
                    <th>Train Date</th>
                    <th>Train Date</th>
                </tr>
            </table>
        </div>
        <Link to={"/booking"}>hello</Link>
    </div>
  )
}

export default BookingTicket