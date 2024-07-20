// exercise 3.1
const mongoose =require('mongoose')
const Schema=new mongoose.Schema({
  name:String,
  number:String
})
const Contact=mongoose.model('Contact',Schema)

const showContacts=(password) => {
  const url=`mongodb+srv://20cs247:${password}@cluster0.afojmwj.mongodb.net/phoneBook?retryWrites=true&w=majority&appName=Cluster0`
  mongoose.set('strictQuery',false)
  mongoose.connect(url)
  Contact.find({}).then((results) => {
    console.log('phonebook:')
    results.forEach((result) => console.log(result.name,result.number))
    mongoose.connection.close()
  })
}
const addContact=(password,name,number) => {
  const url=`mongodb+srv://20cs247:${password}@cluster0.afojmwj.mongodb.net/phoneBook?retryWrites=true&w=majority&appName=Cluster0`
  mongoose.set('strictQuery',false)
  mongoose.connect(url)
  const note=new Contact({
    name:name,
    number:number
  })
  note.save().then((result) => {
    console.log(`added ${result.name} number ${result.number} to phonebook`)
    mongoose.connection.close()
  })
}
if (process.argv.length<3) {
  console.log('Please add password to the command')
  process.exit(1)
}
else if(process.argv.length===3){
  const password=process.argv[2]
  showContacts(password)
}
else{
  const password=process.argv[2]
  const name=process.argv[3]
  const number=process.argv[4]
  addContact(password,name,number)
}
