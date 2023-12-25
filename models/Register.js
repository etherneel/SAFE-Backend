const mongoose = require("mongoose");
var SchemaTypes = mongoose.Schema.Types;

const reqString = {
  type: String,
  required: true,
};

const reqNumber = {
  type: Number,
  required: true,
};

const reqDate = {
  type: Date,
  required: true,
};

const RegisterDataSchema = mongoose.Schema(
  {
    money: reqString,
    investmentamount: reqNumber,
    date: reqDate,
    valuationcapnumber: reqNumber,
    discountnumber: reqNumber,
    address: reqString,
    companylegalname: reqString,
    companyaddress: reqString,
    country: reqString,
    state: reqString,
    benificial: reqString,
    benificialowner: reqString,
    investortype: reqString,
    investorlegal: reqString,
    MMaddress: reqString,
    authorized: reqString,
    emailOfInvestor: reqString,
    emailOfFounder: reqString,
    proposal_index:reqNumber
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("register_data", RegisterDataSchema, "register_data");