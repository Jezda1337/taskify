import mongoose from 'mongoose';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

const withMongo = (handler: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
  if (mongoose.connections[0].readyState) {
    return handler(req, res);
  }
  
  mongoose.connect(process.env.MONGODB_URL!);
  return handler(req, res);
};

export default withMongo;