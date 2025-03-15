import express from "express";
const app = express();
const port = 5000;

app.get("/", (_req, res) => {
	res.send("hola");
});

app.listen(port, () => {
	console.log("hola");
});
