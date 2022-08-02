import jwt from "jsonwebtoken";
import config from "../../config";
import express from "express";

export async function validateToken(
  req: express.Request,
  res: express.Response,
  next: () => void
) {
  console.log(`validationToken invoked for ${req.headers.authorization}`);
  try {
    //   get the token from the authorization header
    const token: string = req.headers.authorization!.split(" ")[1];

    //check if the token matches the supposed origin
    const decodedToken = jwt.verify(token, config.TOKEN_SECRET);
    // retrieve the user details of the logged in user
    const user = decodedToken;
    console.log(user);

    // pass the user down to the endpoints here
    req.user = user;
    // pass down functionality to the endpoint
    next();
  } catch (error: any) {
    res.status(401).json({
      //error: new Error('Invalid request!'),
      message: "Not authorized",
      error: error.message,
    });
  }
}
