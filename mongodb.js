const mongoDb=require('mongodb')                // C R U D
const mongoClient=mongoDb.MongoClient
//const ObjectID=mongoDb.ObjectID // 
const connectionUrl='mongodb://127.0.0.1:27017'
const databaseName='company'

// const id=new ObjectID() //this is a function that will generate new id for us here the @new keyword is techniaclly optional becasue the mongoDB library has a little defencive programming to add it. if we dont also no problem,  but good practice to use 
// console.log(id)
// console.log(id.id.length)
// console.log(id.toHexString().length)
// console.log(id.getTimestamp())

// useNewUrlParser: The underlying MongoDB driver has deprecated their current connection string parser. Because this is a major change, they added the useNewUrlParser flag to allow users to fall back to the old parser if they find a bug in the new parser.
mongoClient.connect(connectionUrl,{useNewUrlParser:true},(err,client)=>{
    if(err){
       return console.log("unable to connect to database");
    }
    console.log("connected")
    const db=client.db(databaseName)
    //Fetch a specific collection (containing the actual collection information). If the application does not use strict mode you can use it without a callback in the following way: const collection = db.collection('mycollection');
    // db.collection("employees").insertMany(
    // [
    //     {
    //     "name":"Gowtham",
    //     "age":"22",
    //     "salary":"5 lpa",
    //     },
    //     {
    //     "name":"shireen",
    //     "age":"22",
    //     "salary":"4.5 lpa",
    //     },
    //     {
    //         "name":"chikilammetla Gowthamkumar",
    //         "age":22,
    //         "salary":"7 lpa"
    //     }
    // ]
    // ).then((res)=>{
    //     console.log(res.ops)
    // })

    // db.collection("employees").deleteMany({"name":"Gowtham"}).then((res)=>{
    //     console.log("deleted", res.deletedCount)
    // }).catch((err)=>{
    //     console.log("error",err)
    // })

    // db.collection("employees").updateOne({name:"shireen"},{$set:{age:20}}).then((res)=>{
    //     console.log(res)
    // }).catch((e)=>{
    //     console.log("error")
    // })

    // db.collection("employees").updateMany({name:"shireen", name:"chikilammetla Gowthamkumar"},{$set:{age:22}}).then((res)=>{
    //     console.log(res)
    // }).catch((e)=>{
    //     console.log("error")
    // })

    //returnOriginal : When false, returns the updated document rather than the original. The default is true
    // db.collection("employees").findOneAndUpdate({name:"shireen"},{$set:{age:22}},{returnOriginal:false}).then((res)=>{
    //         console.log(res)
    //     }).catch((e)=>{
    //         console.log("error")
    //     })

    // find gives a cursor it will show only 20 documents in general. if we have lot of documents it will not show all. as we use array methods to iterate over
    // db.collection("employees").find({}).forEach(x=>console.log(x))

})

