
import asynchandler from 'express-async-handler';
import { Request } from '../models/Request.model.js';
import { transporter } from '../utils/NodeMailerNotification.js';
import { Team } from '../models/team.model.js';
import crypto from 'crypto';
import User from "../models/user.model.js"
import Chat from '../models/chat.model.js';

export const createRequest = asynchandler(async (req, res) => {

    const {to , team} = req.body;
    console.log({to , team})
    if(!to || !team){
        return res.status(400).json({ message: "All fields are required" });
    }


    const from = req.user._id;
    

    
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiry = Date.now() +   60 * 1000 * 60 * 24 * 2 ; // Valid 2 days

    const newRequest =  new Request({
        from , 
        to , 
        team,
        token: resetToken,
        tokenExpiry: resetTokenExpiry
    });

    const recipient = await User.findById(to);
    if(!recipient){
        return res.status(404).json({ message: "Recipient not found" });
    }

    

    await newRequest.save();

    if(!newRequest){
        return res.status(500).json({ message: "Invalid Request Data" });
    }


    const teamInfo = await Team.findById(team);
    if(!teamInfo){
        return res.status(404).json({ message: "Team not found" });
    }

    const mailOptions = {
        from: process.env.EMAIL,
        to: recipient.email,
        subject: "HackMates | Request",
        html: `<h1>HackMates | Request</h1>
        <p>Hi ${recipient.name},</p>
        <p>You have a new request from ${req.user.name}.</p>
        <p>Team: ${teamInfo.name}</p>
        <p>This token is valid for 2 days.</p>
        <p>Click <a href="https://hack-meets.vercel.app/accept-request/${newRequest._id}/${resetToken}">here</a> to accept the request.</p>
        <p>Thanks</p>
        <p>HackMates</p>
        `,
      };

      await transporter.sendMail(mailOptions);

    res.status(201).json({ message: "Request created 🤩", request: newRequest });
});

export const withdrawRequest = asynchandler(async (req, res) => {
    const { id } = req.params;
    const request = await Request.findByIdAndDelete(id);
    if(!request){
        return res.status(404).json({ message: "Request not found" });
    }
    res.status(200).json({ message: "Request withdrawn successfully", request });
});

export const getUserRequests = asynchandler(async (req, res) => {
    const requests = await Request.find({ to: req.user._id  , status: "requested" , tokenExpiry: { $gt: Date.now() } }).populate("team").populate("from");
    res.status(200).json({ requests });
});

export const getTeamRequests = asynchandler(async (req, res) => {
    const { teamId } = req.params;
    const requests = await Request.find({ team: teamId });

    res.status(200).json({ requests });
});


export const acceptRequest = asynchandler(async (req, res) => {
    const { requestId  } = req.body;

    // make and condition for request id and token
    const request = await Request.findOne( { _id: requestId  } );
    if(!request){
        return res.status(400).json({ message: "Request not found" });
    }

    

    if(request.tokenExpiry < Date.now()){
        return res.status(400).json({ message: "Request has expired" });
    }

    request.status = "accepted";
    request.token = "";
    request.tokenExpiry = null;

    
    await request.save();

    const team = await Team.findById(request.team);
    if(!team){
        return res.status(404).json({ message: "Team not found" });
    }

    team.members.push(req.user._id);

    // push the user to the chat
    const chatid = team.chat;
    const chat = await Chat.findById(chatid);
    if(!chat){
        return res.status(404).json({ message: "Chat not found" });
    }
    chat.users.push(req.user._id);
    await chat.save();
    

    if(team.members.length >= team.size){
        team.isFilled = true;
    }
    await team.save();

    
    res.status(200).json({ message: "Request accepted successfully", request });
});

export const rejectReuqest = asynchandler(async (req, res) => {
    const { requestId } = req.params;
    const request = await Request.findByIdAndDelete(requestId);
    if(!request){
        return res.status(404).json({ message: "Request not found" });
    }
    res.status(200).json({ message: "Request rejected successfully", request });
});