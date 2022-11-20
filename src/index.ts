import express, {Request, Response} from "express";
import bodyParser from "body-parser";
import * as dotenv from 'dotenv';
dotenv.config()
import {videosRouter} from "./routes/videos-router";
import {videos} from "./routes/videos-router";
const port = process.env.PORT || 30012;
export const app = express();
app.use(bodyParser.json());

app.delete('/testing/alldata', (req: Request, res:Response) => {
  videos.length = 0;
  res.status(204).send();
})

app.use(`/videos`, videosRouter);
app.listen(port, () => {
  console.log(`App was started on port ${port}`);
})
