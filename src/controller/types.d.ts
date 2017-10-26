import express = require("express");

export type RequestHandler = express.RequestHandler;
export interface API {
    [propName: string]: RequestHandler;
}
