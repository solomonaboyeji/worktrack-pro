import express, { Request, Response } from "express";
import routes from "./routes";

import cors from 'cors'
const app = express();

const port = process.env.PORT;
app.use(cors()); 
// Body parsing Middlewar
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

import { db } from "./models";
db.sequelize
  .sync({
  })
  .then(() =>
    console.log(
      "<<<<<<<<<<<<<<<<<<<< Resyncing Database >>>>>>>>>>>>>>>>>>>>>>"
    )

  ).catch((error: any) => console.log(error))
  

app.get("/", async (req: Request, res: Response): Promise<Response> => {
  return res.status(200).send({
    message: "Welcome to job management system!",
  });
});

try {
  app.listen(port, (): void => {
    console.log(`Connected successfully on port ${port}`);
  });
} catch (error) {
  console.error(`Error occured: ${error}`);
}
 
// Export our app for testing purposes
export default app;