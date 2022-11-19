import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import { withAuth } from "server/middleware/withAuth";
import withMongo from "server/middleware/withMongo";
import Project from "server/models/Project";

const Handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req;
  const { adminId, keyword, contributorId } = req.query;

  switch (method) {
    case "GET":
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
          ],
        });

        res.status(200).json(ownProjects);
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        if (!body.adminId && !body.name)
          res.status(400).json({ message: "Bad request." });
        const insertNewProject = await Project.create(body);
        res.status(200).json(insertNewProject);
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};

export default withAuth(withMongo(Handler));
