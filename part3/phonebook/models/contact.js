const mongoose=require('mongoose')
const url=process.env.URL
mongoose.connect(url).
  then(() =>
    console.log('Connected to database')
  )
  .catch((error) => console.log('Error!!',error.message
  ))
const contactSchema=new mongoose.Schema({
  name:{
    type:String,
    minLength:3,
    required:true,
  },
  number:{
    type:String,
    validate:{
      validator:(num) => /^\d{2}-\d{6,}$|^\d{3}-\d{5,}$/g.test(num),
      message:(num) => `${num.value} is not a valid number`
    },
    required:true
  }
})
contactSchema.set('toJSON',
  {
    transform:(document,newDocument) => {
      newDocument.id=newDocument._id.toString()
      delete newDocument._id
      delete newDocument.__v
    }
  }
)
const Contact= mongoose.model('Contact',contactSchema)
module.exports=Contact