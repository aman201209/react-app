const express = require("express")
const app = express()
const mongoose = require("mongoose")
const cors = require("cors")


app.use(cors())
app.use(express.json())
mongoose.connect("mongodb+srv://mramankushwah30:aman123@cluster0.vki5l8d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then((res)=>{
    console.log("server successfully run")
}).catch((error)=>{
    console.log(error)
})

const trainCode = mongoose.Schema({
    trainName : String,
    trainCode:String,
})
const stationCode = mongoose.Schema({
    stationName : String,
    stationCode:String,
})
const trainRoot = mongoose.Schema({
    trainName:String,
    trainCode:String,
    trainDate:String,
    trainRoot:[

    ],
    trainDay:[{
        monday:Boolean,
        tuesday:Boolean,
        wednesday:Boolean,
        thursday:Boolean,
        firday:Boolean,
        saturday:Boolean,
        sunday:Boolean,
    }],

})

const TrainCode = mongoose.model("TrainCode" , trainCode)
const StationCode = mongoose.model("StationCode" , stationCode)
const TrainRoot = mongoose.model("TrainRoot" , trainRoot)


app.post("/trainCode",function (req,res){
    const user = new TrainCode(req.body).save().then((data)=>{
        res.json("Train Data save")
    })
})
app.post("/stationCode",function (req,res){
    const user = new StationCode(req.body).save().then((data)=>{
        res.json("Station Data save")
    })
})
app.post("/trainRoot",function (req,res){
    const user = new TrainRoot(req.body).save().then((data)=>{
        res.json("Root Data save")
    })
})

app.post("/getStation" ,async function(req,res){
    let train = await TrainCode.find({})
    let station = await StationCode.find({})
    let root = await TrainRoot.find({})
    res.json({trainData:train,stationData:station,trainRoot:root})
})
app.put("/root/:Id",async function(req,res){
    let usre = await TrainRoot.findByIdAndUpdate(req.params.Id,req.body)
    res.json("success")
})



app.listen(3000 , ()=>{
    console.log("successful")
})