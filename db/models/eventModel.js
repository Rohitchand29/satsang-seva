import connectDB from "../connect/connector";
import mongoose from "mongoose";
connectDB();

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    date: {
        type: Date,
        required: true
    },
    image: {
        type: String,
    },
    location_name: {
        type: String,
        required: true
    },
    location: {
        type: {
            type: String, // Must be 'Point' for GeoJSON
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number], // Longitude, Latitude
            required: true
        }
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'organizations'
    },
    peopleAttending: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }]
});

// Create 2dsphere index for geospatial searches
eventSchema.index({ location: '2dsphere' });

export const EVENT = mongoose.models["events"] || mongoose.model("events",eventSchema);