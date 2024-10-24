import React, { useEffect, useState } from 'react'
import axios from 'axios'
import TimePicker from 'react-time-picker'
import 'react-time-picker/dist/TimePicker.css'
import 'react-clock/dist/Clock.css'




function Booking() {
  const [data, setData] = useState({ trainName: '', trainCode: '' })
  const [station, setStation] = useState({ stationName: '', stationCode: '' })
  const [station1, setStation1] = useState([])
  const [root, setRoot] = useState([])
  const [count, setCount] = useState(0)
  const [rootTrain, setRootTrain] = useState({
    id:"",
    trainDay:[ {
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false
    }],
    trainRoot: [
      { name: '', arri: '00:00', dipa: '00:00' }
    ]
  })

  
console.log(rootTrain)
  const handleClick = async () => {
    try {
      let res = await axios.post('http://localhost:3000/trainRoot', data)
      console.log(res)
      setRoot([...root, data])
      window.location.reload()
      localStorage.setItem('trainCode', data.trainCode)
    } catch (error) {
      console.log(error)
    }
  }
  const handleStation = async () => {
    try {
      let res = await axios.post('http://localhost:3000/stationCode', station)
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const user = async () => {
      let res = await axios.post('http://localhost:3000/getStation')
      setRoot(res.data.trainRoot)
      setStation1(res.data.stationData)
        }
    user()
  }, [])

  const handleCount = () => {
    setCount(count + 1)
    setRootTrain({
      ...rootTrain,
      trainRoot: [...rootTrain.trainRoot, { name: '', arri: '', dipa: '' }]
    })
  }

  const handleTrainRoot = (index, field, value) => {
    const newTrainRoot = [...rootTrain.trainRoot]
    newTrainRoot[index][field] = value
    setRootTrain({ ...rootTrain, trainRoot: newTrainRoot })
}

  const handleTrainDay = (day, isChecked) => {
    setRootTrain(prevState => ({
      ...prevState,
      trainDay: {
        ...prevState.trainDay,
        [day]: isChecked
      }
    }))
  }
  
  const handleTrainRoute = async()=>{
    let id = rootTrain.id
    let res = await axios.put(`http://localhost:3000/root/${id}`,rootTrain)
    console.log(res)
  }
  console.log(station1)
  return (
    <div>
      <div>
        <div>TRAIN & STATION</div>
      </div>
      <div>
        <input
          type="text"
          placeholder="Train Name"
          name="trainName"
          value={data.trainName}
          onChange={e => setData({ ...data, [e.target.name]: e.target.value })}
        />
        <input
          type="text"
          placeholder="Train Code"
          name="trainCode"
          value={data.trainCode}
          onChange={e => setData({ ...data, [e.target.name]: e.target.value })}
        />
        <button onClick={handleClick}>Add Train</button>
      </div>
      <div>
        <input
          type="text"
          placeholder="Station Name"
          name="stationName"
          value={station.stationName}
          onChange={e => setStation({ ...station, [e.target.name]: e.target.value })}
        />
        <input
          type="text"
          placeholder="Station Code"
          name="stationCode"
          value={station.stationCode}
          onChange={e => setStation({ ...station, [e.target.name]: e.target.value })}
        />
        <button onClick={handleStation}>Add Station</button>
      </div>
      <div style={{ marginTop: '100px' }}>
        <div>
          <select
            name="id"
            value={rootTrain.id}
            onChange={e => setRootTrain({ ...rootTrain, id: e.target.value })}
          >
            {root.map(data => (
              <option key={data._id} value={data._id}>
                {data.trainName}
              </option>
            ))}
          </select>
        </div>
        <div>
        {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map(
  day => (
    <React.Fragment key={day}>
      <label>{day}</label>
      <input
        type="checkbox"
        checked={rootTrain.trainDay[day]}
        name={day}
        onChange={e => handleTrainDay(day, e.target.checked)}
      />
    </React.Fragment>
  )
)}

        </div>
        <div>
          {rootTrain.trainRoot.map((station, index) => (
            <div key={index}>
              <select
            name="name"
            value={station.name}
            onChange={e => handleTrainRoot(index, 'name', e.target.value)}
          >
              {station1.map(data => (
              <option key={data.stationName} value={data.stationName}>
                {data.stationName}
              </option>
            ))}
          </select>
              {/* <input
                type="time"
                placeholder="Arrival Time"
                value={station.arri}
                onChange={e => handleTrainRoot(index, 'arri', e.target.value)}
              /> */}
              {/* <TimePicker onChange={""}  /> */}
              {/* <input
                type="time"
                placeholder="Departure Time"
                value={station.dipa}
                onChange={e => handleTrainRoot(index, 'dipa', e.target.value)}
              /> */}
              <TimePicker
                  value={rootTrain.trainRoot[index].arri}
                  onChange={(time) => handleTrainRoot(index, 'arri', time)}
                />
              <TimePicker
                  value={rootTrain.trainRoot[index].dipa}
                  onChange={(time) => handleTrainRoot(index, 'dipa', time)}
                />
              {index === count && <button onClick={handleCount}>+</button>}
            </div>
          ))}
        </div>
      </div>
      <div>
        <button onClick={handleTrainRoute}>
            Submit
        </button>
      </div>
      
    </div>
  )
}

export default Booking
