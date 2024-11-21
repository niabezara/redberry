import { prisma } from "../index.js";

export const getAgents = async (req, res, next) => {
  try {
    const agents = await prisma.agent.findMany();
    return res.json({
      data: agents,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching agents",
      error: error.message,
    });
  }
};

export const getAgent = async (req, res, next) => {
  try {
    const { id } = req.params;

    const agent = await prisma.agent.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!agent) {
      return res.status(404).json({
        message: "Agent not found",
      });
    }
    return res.json({
      data: agent,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching agent",
      error: error.message,
    });
  }
};

// export const createAgent = async (req, res) => {
//   if (req.file) {
//     try {
//       // Explicitly pass cloud name to upload
//       const result = await cloudinary.uploader.upload(req.file.path, {
//         cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//         folder: "flats_upload",
//       });

//       const {
//         type,
//         address,
//         postalCode,
//         region,
//         city,
//         price,
//         area,
//         bedrooms,
//         description,
//         agents,
//       } = req.body;

//       let profilePictureData = null;

//       // Handle file upload if a file is provided
//       if (req.file) {
//         try {
//           const result = await cloudinary.uploader.upload(req.file.path, {
//             folder: "flats_upload",
//           });

//           // Assign uploaded file details to profilePictureData
//           profilePictureData = {
//             path: result.secure_url,
//             name: req.file.originalname,
//             size: req.file.size,
//           };
//         } catch (uploadError) {
//           console.error("Cloudinary Upload Error:", uploadError);
//           return res.status(500).json({
//             error: "Error uploading to Cloudinary",
//             details: uploadError.message,
//           });
//         }
//       }

//       const flat = await prisma.flat.create({
//         data: {
//           type,
//           streetAddress: address,
//           postalCode,
//           price: price ? parseFloat(price) : null,
//           area,
//           bedrooms,
//           description,
//           agent: {
//             connect: { id: agents },
//           },
//           ...(profilePictureData && {
//             profilePicture: {
//               create: profilePictureData,
//             },
//           }),
//           region: {
//             connect: { id: region },
//           },
//           city: {
//             connect: { id: city },
//           },
//         },
//       });
//       return res.status(201).json({ data: flat });
//     } catch (error) {
//       console.error("Error");
//       return res.status(500).json({
//         error: "Error uploading to Cloudinary",
//       });
//     }
//   }
// };
