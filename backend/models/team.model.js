import mongoose ,{Schema} from 'mongoose';


const TeamSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  leader: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the User model
    ref: 'User',
    required: true,
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId, // Reference to the User model
      ref: 'User',
    },
  ],
  isFilled: {
    type: Boolean,
    default: false, // Assuming the team isn't filled by default
  },
  size: {
    type: Number,
    required: true,
    min: 1, // Ensuring that team size is at least 1
  },
});

// Create the Team model
const Team = mongoose.model('Team', TeamSchema);

export{
    Team
}
