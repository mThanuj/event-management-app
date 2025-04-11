const app = require("./app.js");
const connectDB = require("./lib/db.js");
require("dotenv").config();

const PORT = process.env.PORT;

app.listen(PORT, async () => {
  await connectDB()
    .then(() => console.log("Database connected"))
    .catch((err) => console.log(err));
  console.log(`Server running on port ${PORT}`);
});
