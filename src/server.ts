
import mongoose from "mongoose";
import app from "./app";
import config from "./config";


async function main() {
  try {
    await mongoose.connect(config.db_url as string);
     console.log("mongoes connection");
     
    app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}}`)
    })
  } catch (error) {
    console.log(error);

  }
}

main()


// import mongoose from "mongoose";
// import app from "./app";
// import dotenv from "dotenv";

// dotenv.config();

// async function main() {
//     try {
//         const dbUrl = process.env.DB_URL as string;
//         if (!dbUrl) {
//             throw new Error("Database URL is not defined");
//         }
//         await mongoose.connect(dbUrl);
//         const port = process.env.PORT || 3000;
//         app.listen(port, () => {
//             console.log(`Example app listening on port ${port}`);
//         });
//     } catch (error) {
//         console.error("Error connecting to the database:", error);
//     }
// }

// main();