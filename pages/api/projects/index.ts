import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import { withAuth } from "server/middleware/withAuth";
import withMongo from "server/middleware/withMongo";
import Project from "server/models/Project";

const Handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { adminId, keyword, contributorId } = req.query;

  try {
    const ownProjects = await Project.find({
      $and: [
        {
          ...(adminId && { adminId }),
        },
        {
          ...(contributorId && { contributors: { $in: [contributorId] } }),
        },
        {
          ...(keyword && { name: { $regex: keyword, $options: "i" } }),
        },
        {
          ...(keyword && {
            description: { $regex: keyword, $options: "i" },
          }),
        },
      ],
    });
    return res.status(200).json(ownProjects);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export default withAuth(withMongo(Handler));
