import { Request, Response } from "express";

export const getItems = (req: Request, res: Response) => {
  try {
    // Your logic to get items here:
    console.log(req.body);
    res.status(200).json({ message: "Items" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const postItems = (req: Request, res: Response) => {
  try {
    // Your logic to post items here:
    console.log(req.body);
    res.status(200).json({ message: "Items" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const putItems = (req: Request, res: Response) => {
  try {
    // Your logic to put items here:
    console.log(req.body);
    res.status(200).json({ message: "Items" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const deleteItems = (req: Request, res: Response) => {
  try {
    // Your logic to delete items here:
    console.log(req.body);
    res.status(200).json({ message: "Items" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
