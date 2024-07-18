const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config({ path: ".env.local" });

const app = express();
const port = 3001;

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

app.use(bodyParser.json());
app.use(cors());

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
    console.log("Request body:", req.body);
    const newEmployee = await prisma.employee.create({ data: req.body });
    res.status(201).json(newEmployee);
  } catch (error) {
    console.error("Error creating employee:", error);
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
    res.status(204).send();
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
    const updated = await prisma.employee.update({
      where: { id: parseInt(id) },
      data: req.body,
    });
    if (updated) {
      const updatedEmployee = await prisma.employee.findUnique({
        where: { id: parseInt(id) },
      });
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

app.get("/api/companies", async (req, res) => {
  try {
    const companies = await prisma.company.findMany();
    res.json(companies);
  } catch (error) {
    console.error("Error fetching companies:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching companies" });
  }
});

app.post("/api/companies", async (req, res) => {
  try {
    console.log("Request body:", req.body);
    const newCompany = await prisma.company.create({ data: req.body });
    res.status(201).json(newCompany);
  } catch (error) {
    console.error("Error creating company:", error);
    res.status(500).json({
      error: "An error occurred while creating the company",
      details: error.message,
    });
  }
});

app.get("/api/projects", async (req, res) => {
  try {
    const projects = await prisma.project.findMany();
    res.status(200).json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching projects" });
  }
});

app.post("/api/projects", async (req, res) => {
  try {
    console.log("Request body:", req.body);
    const newProject = await prisma.project.create({
      data: {
        name: req.body.name,
        qualifications: req.body.qualifications,
        qualificationsPersonCount: req.body.qualificationsPersonCount,
        needMember: req.body.needMember,
        type: req.body.type,
        price: req.body.price, // 文字列型としてそのまま保存
        date: req.body.date, // クライアント側でISO形式に変換済み
        startDate: req.body.startDate, // クライアント側でISO形式に変換済み
        endDate: req.body.endDate, // クライアント側でISO形式に変換済み
        staff: req.body.staff,
        staffPhone: req.body.staffPhone,
        note: req.body.note,
        companyId: parseInt(req.body.companyId, 10), // Ensure companyId is an integer
      },
    });
    res.status(201).json(newProject);
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({
      error: "An error occurred while creating the project",
      details: error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
