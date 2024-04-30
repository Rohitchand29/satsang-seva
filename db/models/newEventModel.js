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
    start: {
        type: Date,
        required: true
    },
    end: {
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
    location_url: {
      type: String,
    },
    peopleAttending: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }],
    event_performer: {
        type: String,
    },
    event_type: {
      type: String,
    },
    host_name: {
      type: String,
    },
    host_contact: {
      type: String,
    },
    host_email: {
      type: String,
    },
    event_visibility: {
        type: String,
    }
});

// Create 2dsphere index for geospatial searches
eventSchema.index({ location: '2dsphere' });

export const EVENT_NEW = mongoose.models["new_events"] || mongoose.model("new_events",eventSchema);