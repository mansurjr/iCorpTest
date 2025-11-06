import express from "express";
import axios from "axios";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

const app = express();
app.use(express.json());

const API_URL = "https://test.icorp.uz/interview.php";
const PORT = 3000;
const BASE_URL = `http://18.158.178.73:${PORT}`;

let firstPart = "";
let secondPart = "";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Interview API Demo",
      version: "1.0.0",
      description: "Express API to interact with the interview test endpoint",
    },
    servers: [{ url: BASE_URL }],
  },
  apis: ["./index.js"], 
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /start:
 *   post:
 *     summary: Start the interview API process
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - msg
 *             properties:
 *               msg:
 *                 type: string
 *                 example: Hello world
 *     responses:
 *       200:
 *         description: Initial request sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 firstPart:
 *                   type: string
 *       500:
 *         description: Error sending POST request
 */
app.post("/start", async (req, res) => {
  try {
    const response = await axios.post(API_URL, {
      msg: req.body.msg,
      url: `${BASE_URL}/callback`,
    });
    firstPart = response.data?.code || response.data;
    res.json({ message: "Initial request sent", firstPart });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /callback:
 *   post:
 *     summary: Receive second part of code from API
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 example: XYZ789
 *     responses:
 *       200:
 *         description: Full code combined and verified
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 fullCode:
 *                   type: string
 *                 result:
 *                   type: object
 *       500:
 *         description: Error processing callback
 */
app.post("/callback", async (req, res) => {
  try {
    secondPart = req.body?.code || req.body;
    const fullCode = `${firstPart}${secondPart}`;
    const getResponse = await axios.get(API_URL, { params: { code: fullCode } });
    res.json({ message: "OK", fullCode, result: getResponse.data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on ${BASE_URL}`);
  console.log(`Swagger docs available at ${BASE_URL}/api-docs`);
});
