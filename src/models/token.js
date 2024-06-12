"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const { mongoose } = require("../configs/dbConnection");
/* ------------------------------------------------------- */
const passwordEncrypt = require("../helpers/passwordEncrypt")

const TokenSchema = new mongoose.Schema(
  {
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        red:'User',
        required:true,
        unique:true,
        index:true // daha hızlı arama yapar 
    },
    token:{
       type:String,
       trim:true,
       required:true,
       index:true,
       unique:true 
    }
  },
  {
    collection: "tokens",
    timestamps: true,
  }
);

module.exports = mongoose.model("Token", TokenSchema);
