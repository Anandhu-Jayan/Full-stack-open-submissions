const express=require('express')
require('dotenv').config()
const morgan=require('morgan')
const cors=require('cors')
const app=express()
const PORT = process.env.PORT || 3001
const Contact=require('./models/contact')
app.use(express.json())
app.use(express.static('dist'))
app.use(morgan('tiny'))
app.use(cors())
morgan.token('body', function (req, ) { return JSON.stringify(req.body) })
app.use(morgan(function (tokens, req, res) {
  if(tokens.method(req, res).toString()==='POST'){
    return tokens.body(req,res)
  }
  else return
}))
app.get('/api/persons',(request,response,next) => {
  Contact.find({}).then(
    result => response.json(result)
  ).catch((error) => next(error))
})
app.get('/info',(request,response,next) => {
  const date = new Date()
  Contact.countDocuments({}).then((result) =>
    response.send(
      `<p>Phone book has info for ${result} people <p>
        <p>${date.toString()}<p>`
    ))
    .catch((error) => next(error))
})
app.get('/api/persons/:id',(request,response,next) => {
  const id=request.params.id
  Contact.findById(id).then(
    (result) => {
      if(result){
        return response.json(result)
      }else{
        return response.status(404).json({ error:'Not Found' })
      }
    }
  )
    .catch((error) => next(error))
})
app.delete('/api/persons/:id',(request,response,next) => {
  const id=request.params.id
  Contact.findByIdAndDelete(id).then((result) => {response.json(result)}).
    catch((error) => next(error))
})
app.post('/api/persons',(request,response,next) => {
  const note=request.body
  if(!note.name || !note.number){
    return response.status(400).json({
      'error':'missing fields for name or number'
    })
  }
  const contact=Contact({
    name:note.name,
    number:note.number
  })
  contact.save().then((result) => response.json(result)).catch((error) => next(error))
})
app.put('/api/persons/:id',(request,response,next) => {
  const newNumber=request.body.number
  const contact={
    number:newNumber
  }
  Contact.findByIdAndUpdate(request.params.id,contact,{ new:true, runValidators: true, context: 'query' }).then(
    (result) => response.json(result)
  ).catch((error) => next(error))

})
const errorHandler=(error,request,response,next) => {
  if(error.name==='CastError'){
    return response.status(400).send({ error: 'malformatted id' })
  }else if(error.name === 'ValidationError'){
    console.log(error.message )
    return response.status(400).json({ error: error.message })
  }
  else{
    next(error)
  }
}
app.use(errorHandler)
app.listen(PORT,() => {
  console.log(`Server running on port ${PORT}`)
})
