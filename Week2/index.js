const express = require("express")
const app = express()
const port = 3000

app.use(express.json())

const person = [{
    id: 0,
    name: "John",
    age: 30,
    city: "New York",
    kidneis:[{healthy:false}],
    appointments:0
},{
    id: 1,
    name: "Jane",
    age: 25,
    city: "Los Angeles",
    kidneis:[{healthy:true}],
    appointments:1
}]
    
console.log(person)

app.get("/", (req, res) => {
    let pageString = ""
    for(let i = 0; i < person.length; i++){
        pageString += "<b>Name:</b>" + person[i].name + "<br>"
        pageString += "<b>Age:</b>" + person[i].age + "<br>"
        pageString += "<b>City:</b>" + person[i].city + "<br>"
        for(let j = 0; j < person[i].kidneis.length; j++){
            pageString += "<b>Kidney:</b>"+ (j+1)+ "->" + person[i].kidneis[j].healthy + "<br>"    
        }
        pageString += "<b>Appointments:</b>" + person[i].appointments + "<br>"
        pageString += "<br><br>"
    }
    
    res.send(pageString)
})

app.get("/person/:id", (req, res) => {
    let found = false
    let id = req.params.id
    for(let i = 0; i < person.length; i++){
        if(person[i].id == id){
            res.send(person[i])
            found = true
            return
        }
    }
    if(!found){
        res.send("Person not found")
    }
})

app.post("/appointments/:id", (req, res) => {
    let id = req.params.id
    for(let i = 0; i < person.length; i++){
        if(person[i].id == id){
            person[i].appointments++
            if(person[i].kidneis.length < 2){
                person[i].kidneis.push({healthy:false})
                for(let j = 0; j < person[i].kidneis.length; j++){
                    if(person[i].kidneis[j].healthy == false){
                        person[i].kidneis[j].healthy = true
                    }
                }
            }
            res.send(person[i])
            return
        }
    }
    res.send("Person not found")
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
