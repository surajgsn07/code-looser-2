import mongoose from "mongoose";

const joinRequestSchema = new mongoose.Schema({
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      team: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Team',
        required: true,
      },
      status: {
        type: String,
        enum: ['requested', 'accepted'], 
        default: 'requested',
      }
});

export default mongoose.model('JoinRequest', joinRequestSchema);
