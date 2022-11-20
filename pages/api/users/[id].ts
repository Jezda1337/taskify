import { NextApiHandler } from "next";
import { withAuth } from "server/middleware/withAuth";
import withMongo from "server/middleware/withMongo";
import { getUserById } from "server/services/user.service";

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "GET") {
    res.status(500).json({ message: "Only GET requests here!" })
  }
  
  try {
    const { id } = req.query;
    if(!id) {
      throw new Error('User id was not provided!');
    }

    const user = await getUserById(id as string);
    if (!user) {
      throw new Error('User not found');
    }
  
    return res.json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export default withAuth(withMongo(handler));