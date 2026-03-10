
const express=require("express")
const fetch=require("node-fetch")

const app=express()
const PORT=3000

app.use(express.static("public"))

app.get("/api/satellite",(req,res)=>{
res.json({
lat:(Math.random()*180-90).toFixed(4),
lng:(Math.random()*360-180).toFixed(4),
alt:(415+Math.random()*5).toFixed(2)
})
})

app.get("/api/iss",async(req,res)=>{
try{
const r=await fetch("http://api.open-notify.org/iss-now.json")
const j=await r.json()
res.json({
latitude:j.iss_position.latitude,
longitude:j.iss_position.longitude
})
}catch(e){
res.json({error:true})
}
})

app.get("/api/asteroids",async(req,res)=>{
try{
const r=await fetch("https://api.nasa.gov/neo/rest/v1/feed?api_key=DEMO_KEY")
const j=await r.json()
const d=Object.keys(j.near_earth_objects)[0]
const neo=j.near_earth_objects[d][0]
res.json({
name:neo.name,
hazard:neo.is_potentially_hazardous_asteroid
})
}catch(e){
res.json({error:true})
}
})

app.get("/api/launch",async(req,res)=>{
try{
const r=await fetch("https://api.spacexdata.com/v4/launches/latest")
const j=await r.json()
res.json({
name:j.name,
date:j.date_utc
})
}catch(e){
res.json({error:true})
}
})

app.get("/api/space-weather",async(req,res)=>{
try{
const r=await fetch("https://services.swpc.noaa.gov/json/planetary_k_index_1m.json")
const j=await r.json()
res.json({kp:j[j.length-1].kp_index})
}catch(e){
res.json({error:true})
}
})

app.listen(PORT,()=>console.log("COSMOS-X running on "+PORT))
