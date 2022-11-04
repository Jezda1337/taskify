import { NextApiHandler } from "next";
import withMongo from "server/middleware/withMongo";
import { clearTokens } from "server/services/token.service";

const handler: NextApiHandler = (req, res) => {
  if (req.method !== "GET") {
    res.status(500).json({ message: "Only GET requests here!" })
  }
  clearTokens(req, res);
  res.end();
};

export default withMongo(handler);