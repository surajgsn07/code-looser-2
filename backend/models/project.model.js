import mongoose from "mongoose";

const projectSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    link:{
        type:String,
        default:""
    }
})


const Project = mongoose.model('Project', projectSchema);

export{
    Project
}