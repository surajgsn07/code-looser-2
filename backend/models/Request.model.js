import mongoose  , {Schema}from "mongoose";

// Define the Request schema
const RequestSchema = new Schema({
  from: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the User model (sender of the request)
    ref: 'User',
    required: true,
  },
  to: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the User model (receiver of the request)
    ref: 'User',
    required: true,
  },
  team: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the Team model
    ref: 'Team',
    required: true,
  },
  expiry: {
    type: Date, // Expiry date for the request (2 days from the creation date)
    required: true,
    default: () => new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
  },
  status: {
    type: String,
    enum: ['requested', 'accepted'], // Only these two statuses are allowed
    default: 'requested',
  },
  token: {
    type: String, 
  },

  tokenExpiry: {
    type: Date,
  },
});

// Create the Request model
const Request = mongoose.model('Request', RequestSchema);

export{
    Request
}
