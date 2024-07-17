const express=require('express')
const morgan=require('morgan')
const cors=require('cors')
const app=express()
const PORT = process.env.PORT || 3001
app.use(express.json())
app.use(express.static('dist'))
app.use(morgan('tiny'))
app.use(cors())
morgan.token('body', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(function (tokens, req, res) {
    if(tokens.method(req, res).toString()=="POST"){
    return tokens.body(req,res)
}
    else return 
  }))
function generateID() {
    return Math.floor(Math.random() * 10000);
  }
let notes=[
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]
app.get('/api/persons',(request,response)=>{
    response.json(notes)
})
app.get('/info',(request,response)=>{
    const date = new Date()
    response.send(
        `<p>Phone book has info for ${notes.length} people <p>
        <p>${date.toString()}<p>`
    )
})
app.get('/api/persons/:id',(request,response)=>{
    const id=request.params.id
    const note=notes.find((note)=>note.id===id)
    note?response.json(note):response.status(404).end()
})
app.delete('/api/persons/:id',(request,response)=>{
    const id=request.params.id
    const note=notes.find((note)=>note.id===id)
    notes=notes.filter((note)=>note.id!==id)
    response.json(note)
})
app.post('/api/persons',(request,response)=>{
    const note=request.body
    const search=notes.findIndex((singleNote)=>note.name.toLowerCase()===singleNote.name.toLowerCase())
    if(!note.name || !note.number){
        return response.status(400).json({
            'error':'missing fields for name or number'
        })
    }
    if(search!==-1){
        return response.status(403).json({
            'error':'name must be unique'
        })
    }
    const newNote={
        'id':generateID().toString(),
        'name':note.name,
        'number':note.number
    }
    notes=notes.concat(newNote)
    response.json(newNote)
})
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})
