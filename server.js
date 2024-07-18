const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // CORSパッケージをインポート
require("dotenv").config({ path: ".env.local" }); // .env.localファイルから環境変数を読み込む

const app = express();
const port = 3001;

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

app.use(bodyParser.json());
app.use(cors()); // CORSを有効にする

app.get("/api/employees", async (req, res) => {
  try {
    const employees = await prisma.employee.findMany();
    res.status(200).json(employees);
  } catch (error) {
    console.error("Error fetching employees:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching employees" });
  }
});

app.post("/api/employees", async (req, res) => {
  try {
    console.log("Request body:", req.body); // リクエストボディをログに出力
    const newEmployee = await prisma.employee.create({ data: req.body });
    res.status(201).json(newEmployee);
  } catch (error) {
    console.error("Error creating employee:", error); // エラーメッセージをログに出力
    res.status(500).json({
      error: "An error occurred while creating the employee",
      details: error.message,
    });
  }
});

app.delete("/api/employees/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.employee.delete({ where: { id: parseInt(id) } });
    res.status(204).send(); // No Content
  } catch (error) {
    console.error("Error deleting employee:", error);
    res.status(500).json({
      error: "An error occurred while deleting the employee",
      details: error.message,
    });
  }
});

app.put("/api/employees/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await prisma.employee.update(req.body, { where: { id } });
    if (updated) {
      const updatedEmployee = await prisma.employee.findOne({ where: { id } });
      res.status(200).json(updatedEmployee);
    } else {
      throw new Error("Employee not found");
    }
  } catch (error) {
    console.error("Error updating employee:", error);
    res.status(500).json({
      error: "An error occurred while updating the employee",
      details: error.message,
    });
  }
});
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
