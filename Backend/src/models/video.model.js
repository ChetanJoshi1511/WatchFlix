import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema({
    videoFile: {
        type:String, //cloudinary url
        required:[true, "Video is mandatory!"]
    },
    thumbnail:{
        type:String, //cloudinary url
        requird:true
    },
    title:{
        type:String, 
        required:[true, "Title is needed!"]
    },
    description:{
        type:String,
        required:false
    },
    duration:{
        type:Number, //obtain duration from cloudinary url
        required:true
    },
    views:{
        type:Number,
        default:0
    },
    isPublished:{
        type:Boolean,
        default:true
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true});

videoSchema.plugin(mongooseAggregatePaginate); //register aggregate paginate plugin for the video schema

export const Video = mongoose.model("Video",videoSchema);