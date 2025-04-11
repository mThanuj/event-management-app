import app from "./app.js";
import connectDB from "./lib/db.js";

const PORT = process.env.PORT;

app.listen(PORT, async () => {
  await connectDB()
    .then(() => console.log("Database connected"))
    .catch((err) => console.log(err));
  console.log(`Server running on port ${PORT}`);
});
