import asynchandler from "express-async-handler";
import JoinRequestModel from "../models/joinRequest.model.js";
import { Team } from "../models/team.model.js";

export const createJoinRequest = asynchandler(async(req,res)=>{
    const {teamId} = req.params;
    const userId = req.user._id;
    const request = await JoinRequestModel.create({team:teamId , from:userId});
    if(!request){
        return res.status(400).json({ message: "Request not created" });
    }
    res.status(200).json({ message: "Request created 🤩", request });

})


export const withdrawJoinRequest = asynchandler(async(req,res)=>{
    const {teamId} = req.params;
    const request = await JoinRequestModel.findOne({team:teamId , from:req.user._id } );
    if(!request){
        return res.status(400).json({ message: "Request not found" });
    }

    const deletedRequest = await JoinRequestModel.findByIdAndDelete(request._id);

    if(!deletedRequest){
        return res.status(400).json({ message: "Request not found" });
    }

    res.status(200).json({ message: "Request withdrawn successfully", request });
})

// request id se reuest lao
// ab request milne pe...team dhundo
// check if team is full
// if not full, add user to team
// requested.status = accepted
export const acceptJoinRequest = asynchandler(async(req,res)=>{
    const {requestId} = req.params;

    const request = await JoinRequestModel.findById(requestId);
    if(!request){
        return res.status(400).json({ message: "Request not found" });
    }

    const team = await Team.findById(request.team);
    if(!team){
        return res.status(400).json({ message: "Team not found" });
    }

    if(team.members.length >= team.size){
        return res.status(400).json({ message: "Team is full" });
    }

    team.members.push(request.from);
    await team.save();

    request.status = "accepted";
    await request.save();
    const deletedRequest = await JoinRequestModel.findByIdAndDelete(requestId);

    if(!deletedRequest){
        return res.status(400).json({ message: "Request not found" });
    }

    res.status(200).json({ message: "Request accepted successfully", request });
})

export const getJoinRequestsByTeamId = asynchandler(async(req,res)=>{
    const {teamId} = req.params;
    const requests = await JoinRequestModel.find({team:teamId , status:"requested"});
    res.status(200).json({ requests });
})