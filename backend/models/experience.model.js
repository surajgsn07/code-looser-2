import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    description: {
        type: String,
    },
});

const Experience = mongoose.model("Experience", experienceSchema);

export  {Experience};