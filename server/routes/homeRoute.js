import express from "express";

const router = express.Router();

    router.route("/").get(function(req, res){
        res.send("hello")
    })
export default router; 