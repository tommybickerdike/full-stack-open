import express from "express";
import patientsService from "../services/patients";
import { toNewPatient } from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
	res.send(patientsService.getPatients());
});

router.get("/:id", (req, res) => {
	try {
		res.json(patientsService.getPatient(req.params.id));
	} catch (e: unknown) {
		if (e instanceof Error) {
			res.status(404).send(e.message);
		}
	}
});

router.post("/:id/entries", (req, res) => {
	try {
		res.json(patientsService.addEntry(req.params.id, req.body));
	} catch (e: unknown) {
		if (e instanceof Error) {
			res.status(400).send(e.message);
		}
	}
});

router.post("/", (req, res) => {
	try {
		const newPatient = toNewPatient(req.body);
		res.json(patientsService.addPatient(newPatient));
	} catch (e: unknown) {
		if (e instanceof Error) {
			res.status(400).send(e.message);
		}
	}
});

export default router;
