import bcrypt from "bcryptjs";
import { User } from "../models/user.models.js";
import multer from 'multer'
import { Blog } from "../models/blog.models.js";
const uploads = multer({dest:'uploads/'})


const userSignIn = async (req, res) => {
    try {
        const {username,email,password,role} = req.body;

        const salt = bcrypt.genSaltSync(10);
        console.log(salt);
        const hashPassword = bcrypt.hashSync(password, salt);
        console.log(hashPassword);
        
        

        const tableData = new User({username,email,password:hashPassword,role});
        const saveMyData = await tableData.save();
        console.log('User Save Data:', saveMyData);

        res.status(200).json({
            success: true,
            message: 'User sign-in data received successfully!',
           
        });

    } catch (error) {
        console.error('❌ Failed to process sign-in request:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to save data in the database',
        });
    }
};

const home = (req,res)=>{
    res.send("hello backend is ruuning")
}


const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    if (bcrypt.compareSync(password,user.password)) {
       res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user: user,
    
    });
    } else {
      return res.status(400).json({ message: "Invalid email or password" });
    }

   

  } catch (error) {
    console.error("Failed to find email:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


const blogData =   (req, res) => {
  uploads.single('img')(req, res, async (err)  =>  {
    if (err) {
      console.error("File upload error:", err);
      return res.status(400).send("File upload failed");
    }
      
   
    try {
       const {title,category,blogData} = req.body;
    const img = req.file?.path.replace(/\\/g, "/");
  
    
      
      const saveData =  new Blog({title,category,img,blogData})
      const saveBlogDatas =  await  saveData.save()
      console.log(saveBlogDatas);
      
        
   
    
   res.status(200)
    } catch (error) {
      console.log("failed to save  blogs data in mongo db ",error);
      
    }
     

    res.status(200).send("Data received in the backend");
  });
};


const getBlogData =  async (req,res)=>{
  try {
    const response = await Blog.find();
    res.status(200).send(response)
  } catch (error) {
    console.log("failed to get blog data ",error);
    
  }
}

export { userSignIn ,home ,userLogin ,blogData ,getBlogData }
