import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {Link} from "react-router-dom"
import moment from 'moment'

function BookingTicket() {
    let [user , setUser] = useState({
        date:"",
    })
    let [day , setDay] = useState(false)
    let [train , setTrain] = useState({
        id:""
    })
    let [stations,setStations] = useState([])
    let [root , setRoot] = useState([])
    let [route , setroute] = useState([])
    let [station , setStation] = useState({
        from:'',
        to:"",
    })
    let data0 = moment(user.date).format("dddd")
    useEffect(()=>{
        let data = async()=>{
            let res =await axios.post("http://localhost:3000/getStation")
            setRoot(res.data.trainRoot)
            setStations(res.data.stationData)
        }
        data()
    },[])
    const handleClick = ()=>{
        setDay(true)
        let data = root.find(value=>value._id === train.id)
        setroute(data)
        console.log(data)
    }
    const handleHtml =(id)=>{
        if(id == true){
            return("Yes")
        }else{
            return("No")
        }
    }
    const handle =()=>{
            console.log(data0,station)

    }
  return (
    <div>
            <div>
                Date
            <input type="date" name='date' value={user.date} onChange={(e)=>setUser({...user,[e.target.name]:e.target.value})} />
            </div>
        <div>
        <select
            name="from"
            value={station.from}
            onChange={e => setStation({ ...station, [e.target.name]: e.target.value })}
          >
            {stations.map(data => (
              <option key={data.stationName} value={data.stationName}>
                {data.stationName}
              </option>
            ))}
          </select>
        <select
            name="to"
            value={station.to}
            onChange={e => setStation({ ...station, [e.target.name]: e.target.value })}
          >
            {stations.map(data => (
              <option key={data.stationName} value={data.stationName}>
                {data.stationName}
              </option>
            ))}
          </select>
            <button onClick={handle}>
                check
            </button>
        </div>
        <div>
            <select
            name="id"
            value={train.id}
            onChange={e => setTrain({ ...train, id: e.target.value })}
          >
            {root.map(data => (
              <option key={data._id} value={data._id}>
                {data.trainName}
              </option>
            ))}
          </select>
            <button onClick={handleClick}>
                Check
            </button>
        </div>
        <div>
            <div>Train Name:- {route.trainName}</div>
            
                {
                    day && <div>
                        <table style={{border:"1px solid black", display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",width:"100%"}}>
                            <tr style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"row",}}>
                                <th style={{width:"300px"}}>Station Name</th>
                                <th style={{width:"300px"}}>Arrival Time</th>
                                <th style={{width:"300px"}}>Departure Time</th>
                            </tr>
                        {
                        route.trainRoot.map((value)=>(
                            <tr style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"row",}}>
                                <td  style={{width:"300px",display:"flex",alignItems:"center",justifyContent:"center"}}>{value.name}</td>
                                <td style={{width:"300px",display:"flex",alignItems:"center",justifyContent:"center"}}>{value.arri}</td>
                                <td style={{width:"300px",display:"flex",alignItems:"center",justifyContent:"center"}}>{value.dipa}</td>
                            </tr>
                        ))
                    }
                    </table>
                    </div>
                }
                {
                    day && <div>
                        <table style={{border:"1px solid black", display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",width:"100%"}}>
                            <tr style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"row",gap:"60px"}}>
                                <th style={{width:"300px",display:"flex",alignItems:"center",justifyContent:"center"}}>Monday</th>
                                <th style={{width:"300px",display:"flex",alignItems:"center",justifyContent:"center"}}>Tuesday</th>
                                <th style={{width:"300px",display:"flex",alignItems:"center",justifyContent:"center"}}>Wednesday</th>
                                <th style={{width:"300px",display:"flex",alignItems:"center",justifyContent:"center"}}>Thursday</th>
                                <th style={{width:"300px",display:"flex",alignItems:"center",justifyContent:"center"}}>Friday</th>
                                <th style={{width:"300px",display:"flex",alignItems:"center",justifyContent:"center"}}>Saturday</th>
                                <th style={{width:"300px",display:"flex",alignItems:"center",justifyContent:"center"}}>Sunday</th>
                            </tr>
                            <tr style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"row",gap:"60px"}}>
                                <td style={{width:"300px",display:"flex",alignItems:"center",justifyContent:"center"}}>{handleHtml(route.trainDay[0].monday)}</td>
                                <td style={{width:"300px",display:"flex",alignItems:"center",justifyContent:"center"}}>{handleHtml(route.trainDay[0].tuesday)}</td>
                                <td style={{width:"300px",display:"flex",alignItems:"center",justifyContent:"center"}}>{handleHtml(route.trainDay[0].wednesday)}</td>
                                <td style={{width:"300px",display:"flex",alignItems:"center",justifyContent:"center"}}>{handleHtml(route.trainDay[0].thursday)}</td>
                                <td style={{width:"300px",display:"flex",alignItems:"center",justifyContent:"center"}}>{handleHtml(route.trainDay[0].firday)}</td>
                                <td style={{width:"300px",display:"flex",alignItems:"center",justifyContent:"center"}}>{handleHtml(route.trainDay[0].saturday)}</td>
                                <td style={{width:"300px",display:"flex",alignItems:"center",justifyContent:"center"}}>{handleHtml(route.trainDay[0].sunday)}</td>
                            </tr>
                        </table>
                                {/* <div>Monday:-{handleHtml(route.trainDay[0].monday)}</div>
                                <div>Tuesday:-{handleHtml(route.trainDay[0].tuesday)}</div>
                                <div>Wednesday:-{handleHtml(route.trainDay[0].wednesday)}</div>
                                <div>Thursday:-{handleHtml(route.trainDay[0].thursday)}</div>
                                <div>Friday:-{handleHtml(route.trainDay[0].firday)}</div>
                                <div>Saturday:-{handleHtml(route.trainDay[0].saturday)}</div>
                                <div>Sunday:-{handleHtml(route.trainDay[0].sunday)}</div> */}
                            
                            </div>
                }
            
        </div>
        <Link to={"/booking"}>hello</Link>
    </div>
  )
}

export default BookingTicket

