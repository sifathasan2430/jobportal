import mongoose from "mongoose"


const connection={}
export const dbConnect=async()=>{
    if (connection?.isConnected){
        console.log('server already created')
        return 
    }

    try {
        
        const db=await mongoose.connect(process.env.MONGO_URL || '')
        // The readyState is a numeric value that shows the current state of the database connection.
           connection.isConnected=db.connections[0].readyState
           console.log('mongodb connect successfully')
    } catch (error) {

        throw new Error(error)
        process.exit(1)
    }
}