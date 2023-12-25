const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');
const express = require('express');
const bodyParser = require('body-parser');
const Register = require("./models/Register");
const axios = require('axios');
const nodemailer = require('nodemailer');
var pdf = require("pdf-creator-node");
const fs = require('fs').promises;
const os = require('os');
const path = require('path');


function routes(app, db) {
  app.use(bodyParser.json());
  app.get('/allusers', async(req,res)=>{
    try {
      let response = await Register.find();
      res.send({message:"Successfully fetched all users" , data: response})
    } catch (error) {
      console.log(error);
    }
  })
  app.post('/delete' , async(req,res)=>{
     try {
      let data = await Register.deleteMany({name:req.body.name});
      res.send({message:"deleted successfully" , response:data});
     } catch (error) {
        console.log(error);
     }
  })
  app.post('/create-pdf',async(req,res)=>{
     //console.log(req.body)
     try
      {
       let money= req.body.money ;
       let investmentamount= req.body.money;
       let date= req.body.date;
       let valuationcapnumber= req.body.valuationcapnumber;
       let discountnumber= req.body.discountnumber;
       let address= req.body.address;
       let companylegalname= req.body.companylegalname;
       let companyaddress= req.body.companyaddress;
       let country= req.body.country;
       let state= req.body.state;
       let benificial= req.body.benificial;
       let benificialowner= req.body.benificialowner;
       let investortype= req.body.investortype;
       let investorlegal= req.body.investorlegal;
       let MMaddress= req.body.MMaddress;
       let authorized= req.body.authorized;
       let emailOfInvestor = req.body.emailOfInvestor;
       let emailOfFounder = req.body.emailOfFounder
     var html =await chooseHtml(discountnumber , valuationcapnumber)
      async function chooseHtml(discountnumber , valuationcapnumber ){
        try {
          if((discountnumber===100) && (valuationcapnumber===0)){
            return html = await fs.readFile('./statics/MFNonly.html' , 'utf8')
          }else if (discountnumber===100){
           return html = await fs.readFile('./statics/valvationcap-no-discount.html' , 'utf8')
          }else if(valuationcapnumber===0){
           return html = await fs.readFile('./statics/no-valuationcap.html' , 'utf8')
          }
          return html = await fs.readFile('./statics/main.html' , 'utf8')
        } catch (error) {
          console.log(error)
        }
      }
      var options = {
        format: "A3",
        orientation: "portrait",
        border: "10mm",
        header: {
            height: "10mm",
            contents: '<div style="text-align: center;"></div>',
        },
        footer: {
            height: "10mm",
            contents: {
                first: 'Cover page',
                2: 'Second page',
                default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
                last: 'Last Page'
            }
        }
      };
      let users =[
        
        {money: money,
        investmentamount: investmentamount,
        date: date,
        valuationcapnumber: valuationcapnumber,
        discountnumber: 100-discountnumber,
        address: address,
        companylegalname: companylegalname,
        companyaddress: companyaddress,
        country: country,
        state: state,
        benificial: benificial,
        benificialowner: benificialowner,
        investortype: investortype,
        investorlegal: investorlegal,
        MMaddress: MMaddress,
        authorized: authorized
      }
      ]
      console.log(users,"This is user")
      var randomNumber = Math.random() * 10000|0
      var document = {
        html: html,
        data: {
          users: users,
        },
        path: `./statics/${benificial+"_"+randomNumber}_safe.pdf`,
        type: "",
      };
    
    await pdf.create(document, options)
        .then((res) => {
            console.log(res);
        })
        .catch((error) => {
            console.error(error);
        });
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: "shahrukh@evolsaur.in",
            pass: 'mzje lhga gyna vyws', // Sender password
          },
        });
        const mailOptionsForInvestor= {
          from: 'shahrukh@evolsaur.in', // Sender email
          to: emailOfInvestor,
          subject: 'SAFE Agreement document',
          text: "Download the SAFE",
          attachments: [
            {
              filename: `${benificial+"_"+randomNumber}_safe.pdf`,
              path: `./statics/${benificial+"_"+randomNumber}_safe.pdf`, 
            },
          ],
        };
        const mailOptionsForFounder= {
          from: 'shahrukh@evolsaur.in', // Sender email
          to: emailOfFounder, // reciever(Founder) mail address
          subject: 'SAFE Agreement document',
          text: "Download the SAFE",
          attachments: [
            {
              filename: `${benificial+"_"+randomNumber}_safe.pdf`,
              path: `./statics/${benificial+"_"+randomNumber}_safe.pdf`, 
            },
          ],
        };
        // try {
          //const info1 = await transporter.sendMail(mailOptionsForInvestor);
          //const info2 = await transporter.sendMail(mailOptionsForFounder);
         // console.log('Email sent: ', info1.response , info2.response);
          res.send('Email sent successfully with PDF attachment');
        } catch (error) {
          console.error('Error sending email:', error);
          res.status(500).send('Error sending email');
        }
       //res.send("pdf created successfully ") 
  })

  app.post("/register", async (req, res) => {
    try {
      let money= req.body.name ;
       let investmentamount= req.body.num1;
       let date= req.body.date;
       let valuationcapnumber= req.body.num2;
       let discountnumber= req.body.num3;
       let address= req.body.name2;
       let companylegalname= req.body.name3;
       let companyaddress= req.body.name4;
       let country= req.body.name5;
       let state= req.body.name6;
       let benificial= req.body.name7;
       let benificialowner= req.body.name8;
       let investortype= req.body.name9;
       let investorlegal= req.body.name10;
       let MMaddress= req.body.name11;
       let authorized= req.body.name12;
      let emailOfInvestor = req.body.emailOfInvestor;
      let emailOfFounder = req.body.emailOfFounder
      // Save record to mongo db.
      const index = await Register.find({address , MMaddress})
      console.log(index.length)
      const new_register = new Register({
        money: money,
        investmentamount: investmentamount,
        date: date,
        valuationcapnumber: valuationcapnumber,
        discountnumber: 100-discountnumber,
        address: address,
        companylegalname: companylegalname,
        companyaddress: companyaddress,
        country: country,
        state: state,
        benificial: benificial,
        benificialowner: benificialowner,
        investortype: investortype,
        investorlegal: investorlegal,
        MMaddress: MMaddress,
        authorized: authorized,
        emailOfInvestor:emailOfInvestor,
        emailOfFounder:emailOfFounder,
        proposal_index:index.length
      });
    //   //await Register.init();
      await new_register.save();
      res.send({message:'Successfully saved data'})
    } catch (err) {
      console.log(err);
      res.status(400).json({ status: "failure", msg: "Exception fired in data post Api", error: err });
    }
  });

  
}

module.exports = routes;
