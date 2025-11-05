import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
 
    title:{

        type:String,
        required:true,
        lowercase:true,
    },
    category:{

        type:String,
        required:true,
        lowercase:true,
    },
    img:{

        type:String,
        required:true,
        default: null
    },
    blogData:{

        type:String,
        required:true,
        lowercase:true,
    },

},{timestamps:true});

export const Blog = mongoose.model("Blog",blogSchema)