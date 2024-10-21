import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Booking() {
  const [data, setData] = useState({ trainName: '', trainCode: '' });
  const [station, setStation] = useState({ stationName: '', stationCode: '' });
  const [root, setRoot] = useState([]);
  const [count, setCount] = useState(0);
  const [trainData, setTrainData] = useState(null);
  const [rootTrain, setRootTrain] = useState({
    id:"",
    trainDay: {
      monday: '',
      tuesday: '',
      wednesday: '',
      thursday: '',
      friday: '',
      saturday: '',
      sunday: ''
    },
    trainRoot: [
      { name: '', arri: '', dipa: '' }
    ]
  });

  const handleClick = async () => {
    try {
      let res = await axios.post('http://localhost:3000/trainRoot', data);
      console.log(res);
      setRoot([...root, data]);
      window.location.reload()
      localStorage.setItem('trainCode', data.trainCode);
    } catch (error) {
      console.log(error);
    }
  };
  const handleStation = async () => {
    try {
      let res = await axios.post('http://localhost:3000/stationCode', station);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const user = async () => {
      let res = await axios.post('http://localhost:3000/getStation');
      setRoot(res.data.trainRoot);
      console.log(res)
        };
    user();
  }, []);

  const handleCount = () => {
    setCount(count + 1);
    setRootTrain({
      ...rootTrain,
      trainRoot: [...rootTrain.trainRoot, { name: '', arri: '', dipa: '' }]
    });
  };

  const handleTrainRoot = (index, field, value) => {
    const newTrainRoot = [...rootTrain.trainRoot];
    newTrainRoot[index][field] = value;
    setRootTrain({ ...rootTrain, trainRoot: newTrainRoot });
  };

  const handleTrainDay = (day, value) => {
    setRootTrain({ ...rootTrain, trainDay: { ...rootTrain.trainDay, [day]: value } });
  };
  const handleTrainRoute = async()=>{
    let id = rootTrain.id
    let res = await axios.put(`http://localhost:3000/root/${id}`,rootTrain)
    console.log(res)
  }
  console.log(rootTrain)
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
            name="trainName"
            value={rootTrain.id}
            onChange={e => setRootTrain({ ...rootTrain, id: e.target.value })}
          >
            {root.map(data => (
              <option key={data._id} value={data._id}>
                {data.trainName}
              </option>
            ))}
          </select>
          <input type="date" name='trainDate' value={rootTrain.trainDay} onChange={(e)=>setRootTrain({...rootTrain,[e.target.name]:e.target.value})} />
        </div>
        <div>
          {rootTrain.trainRoot.map((station, index) => (
            <div key={index}>
              <input
                type="text"
                placeholder="Station Name"
                value={station.name}
                onChange={e => handleTrainRoot(index, 'name', e.target.value)}
              />
              <input
                type="text"
                placeholder="Arrival Time"
                value={station.arri}
                onChange={e => handleTrainRoot(index, 'arri', e.target.value)}
              />
              <input
                type="text"
                placeholder="Departure Time"
                value={station.dipa}
                onChange={e => handleTrainRoot(index, 'dipa', e.target.value)}
              />
              {index === count && <button onClick={handleCount}>+</button>}
            </div>
          ))}
        </div>
        <div>
          {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map(
            day => (
              <input
                key={day}
                type="boolean"
                placeholder={day}
                value={rootTrain.trainDay[day]}
                name={day}
                onChange={e => handleTrainDay(day, e.target.value)}
              />
            )
          )}
        </div>
      </div>
      <div>
        <button onClick={handleTrainRoute}>
            Submit
        </button>
      </div>
      
    </div>
  );
}

export default Booking;
