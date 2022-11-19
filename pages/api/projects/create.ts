import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import { withAuth } from "server/middleware/withAuth";
import withMongo from "server/middleware/withMongo";
import Project from "server/models/Project";

const Handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req;

  if (method !== "POST") {
    return res.status(500).json({ message: "Only POST requests." });
  }

  try {
    if (!body.name) {
      return res.status(400).json({ message: "Provide project name." });
    }
    const createProject = await Project.create(body);
    await createProject.save();

    return res.status(200).json(createProject);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export default withAuth(withMongo(Handler));
