import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    skills: {
      type: [String],
      default: [],
    },
    experience: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"Experience",
    },
    bio: {
      type: String,
      trim: true,
    },
    achievements: {
      type: String,
      trim: true,
    },
    links: [
      {
        title: {
          type: String,
          required: true,
          trim: true,
        },
        link: {
          type: String,
          required: true,
          trim: true,
        },
      },
    ],
    address: {
      state: {
        type: String,
        trim: true,
      },
      city: {
        type: String,
        trim: true,
      },
      country: {
        type: String,
        trim: true,
      },
    },
    avatar:{
        type: String,
        default:"https://imgs.search.brave.com/sE8MdXvDoqofUi5xFiPekWzRwNvt10-6tUkLkDA7KWA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA5LzE3LzEyLzIz/LzM2MF9GXzkxNzEy/MjM2N19rU3BkcFJK/NUhjbW4wczRXTWRK/YlNacGw3TlJ6d3Vw/VS5qcGc"
    }
  },

  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Pre-save hook for password hashing
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const hashedPassword = await bcrypt.hash(this.password, SALT_ROUNDS);
    this.password = hashedPassword;
  }
  next();
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Method to generate JWT
userSchema.methods.generateJWT = function () {
  const token = jwt.sign(
    { id: this._id, name: this.name },
    process.env.ACCESS_TOKEN_SECRET, // Replace with your JWT secret key
    { expiresIn: '7d' } // Token expiration time
  );
  return token;
};

const User = mongoose.model('User', userSchema);

export {
  User
}