
import multer from "multer";
import {S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import Services from "../schemas/services.js";
// connections 
const s3 = new S3Client({
  region: process.env.S3_BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  },
});
// fucntion that acctually upload to s3 AWS
export const putObject = async(file,fileName) =>{
    try{
        const params = {
            Bucket: "service-picture-upload",
            Key: `${fileName}`,
            Body: file.buffer,
            ContentType: "image/jpg,jpeg,png",
            
        }

        const command = new PutObjectCommand(params);
        const data = await s3.send(command);

        if(data.$metadata.httpStatusCode !== 200){
            return;
        }
        let url = `https://service-picture-upload.s3.${process.env.S3_BUCKET_REGION}.amazonaws.com/${params.Key}`
        console.log(url);
        return {url,key:params.Key};
    }catch(err){
        console.error(err);
    }
}
// actull controller an important function for uploaing images to AWS

export const setServicePic = async (req, res) => {


  try {
    const file = req.file;
    const filename = `image-${Date.now()}-${file.originalname}`;
    const {url,key} = await putObject(file, filename);
    if(!url || !key){
            return res.status(400).json({
                "status": "error",
                "data": "Image is not uploaded",
            });
        }
    res.json({ success: true, url,key });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

//middle ware  stoing dat in the ram
const storage = multer.memoryStorage();
export const uploadMiddleware = multer({ storage }).single("serviceImage");


export const creatService = async(req, res) => {

  try{
      const { serviceTitle, price,
        urlImage,
        serviceDescription } = req.body;

      if (!serviceTitle || !price || !urlImage ||!serviceDescription) {
        return res.status(400).json({ error: "Missing required fields" });
      }


      const newService = await Services ({
        serviceTitle,
        price,
        urlImage,
        serviceDescription,
      })

      await newService.save();

      res.status(201).json({
        _id:newService._id,
        serviceTitle:newService.serviceTitle,
        price: newService.price,
        urlImage: newService.urlImage,
        serviceDescription: newService.serviceDescription,
      })
  }catch (err) {
     console.error("Error :", err); 
    res.status(400).json({ error: err.message });
  }
}

