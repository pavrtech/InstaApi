import { Router } from "express";
import { fetchuserJson, formatResponse } from "../utils/dp-utils.js";

const router = Router();

router.get("/", async (req, res, next) => {
  let userID = req.query.id;
  if (!userID) {
    const error = new Error("Please provide an instagram  user ID");
    error.statusCode = 400;
    return next(error);
  }

  if (userID.length > 255) {
    const error = new Error("Invalid instagram  user ID");
    error.statusCode = 400;
    return next(error);
  }

  if (userID.includes("instagram.com")) {
    const idIndex = userID.includes("https://") ? 4 : 2;
    const tempID = userID.split("/").at(idIndex);
    if (!tempID) {
      const error = new Error("Could not find   user ID in the url");
      error.statusCode = 400;
      return next(error);
    }

    userID = tempID;
  }

  try {
    const json = await fetchuserJson(userID);
    const response = formatResponse(userID, json);
    return res.send(response);
  } catch (error) {
    return next(error);
  }
});

export default router;
