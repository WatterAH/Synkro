import { Router } from "express";
import {
  deleteItems,
  getItems,
  postItems,
  putItems,
} from "../controllers/template.controller";

const router = Router();

router.get("/getItems", getItems);
router.post("/postItems", postItems);
router.put("/putItems", putItems);
router.delete("/deleteItems", deleteItems);

export { router };
