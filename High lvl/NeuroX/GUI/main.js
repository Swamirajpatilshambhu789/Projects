// import express from "express";
// import ejs from "ejs";
// import { exec } from "child_process";
// import path from "path";

// const app = express();
// const port = 3000;

// app.set("view engine", "ejs");

// app.use(express.json({ limit: "100mb" }));
// app.use(express.urlencoded({ limit: "100mb", extended: true }));

// app.use(express.static(path.join(process.cwd(), "public")));

// app.get("/", (req, res) => {
//   res.render("Index", { response: "" });
// });

// app.post("/ask", (req, res) => {
//   const { query, images } = req.body;

//   if (!query) {
//     return res.status(400).json({ error: "Query is required" });
//   }

//   // build a safe path to the Python script
//   const scriptPath = path.resolve(process.cwd(), "Machine Learning", "main.py");

//   // escape quotes in the query
//   const escapedQuery = query.replace(/"/g, '\\"');

//   // build images argument only if images provided (expects array of paths or identifiers)
//   const imagesArg =
//     Array.isArray(images) && images.length
//       ? `-i "${images.map((s) => String(s).replace(/"/g, '\\"')).join(",")}"`
//       : "";

//   const cmd = `python "${scriptPath}" -q "${escapedQuery}" ${imagesArg}`.trim();

//  exec(cmd, (err, stdout, stderr) => {
//   if (err) {
//     console.error(err);
//     return res.status(500).json({ error: err.message });
//   }
//   const response = stdout.trim() || stderr.trim() || "No response from Python";
//   res.json({ response });
// });

// });

// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });
import express from "express";
import { exec } from "child_process";
import fs from "fs";
import path from "path";

const app = express();
const port = 3000;

// Paths
const mlDir = path.join(process.cwd(), "..", "Machine Learning");
if (!fs.existsSync(mlDir)) {
  console.error("❌ Machine Learning folder not found at:", mlDir);
  process.exit(1);
}
const queryFile = path.join(mlDir, "query.txt");
const responseFile = path.join(mlDir, "response.txt");
const pythonScript = path.join(mlDir, "main.py");

// Express setup
app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "views"));
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));
app.use(express.static(path.join(process.cwd(), "public")));
app.use("/assets", express.static(path.join(process.cwd(), "views", "assets")));

// Home page
app.get("/", (req, res) => {
  res.render("Index", { response: "" });
});

// Ask route
app.post("/ask", (req, res) => {
  const { query } = req.body;
  if (!query) return res.status(400).json({ error: "Query is required" });

  // Write query.txt
  try {
    fs.writeFileSync(queryFile, query, "utf-8");
  } catch (err) {
    return res.status(500).json({ error: "Failed to write query.txt" });
  }

  // Run Python RAG system
  exec(`python "${pythonScript}"`, (error, stdout, stderr) => {
    if (error) return res.status(500).json({ error: error.message });
    setTimeout(() => {
      try {
        const response = fs.readFileSync(responseFile, "utf-8").trim();
        res.json({ response });
      } catch (err) {
        res.status(500).json({ error: "Failed to read response.txt" });
      }
    }, 1000);
  });
});

// Start server
app.listen(port, () => {
  console.log(`NeuroX GUI running at http://localhost:${port}`);
  console.log(`Machine Learning folder: ${mlDir}`);
});
