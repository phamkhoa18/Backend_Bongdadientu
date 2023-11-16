const mongoose = require('mongoose');
const Ranks = require('../models/Ranks');
const Types = require('../models/Types');
const Utils = require('../Utils');
const ExcelJS = require('exceljs');
const fs = require('fs');

const RanksController = {
    Add_rank : async (req,res) => {
        
        try {
            if (!req.file) {
                return res.status(400).json({ error: 'No file uploaded' });
              }
            
              const filePath = req.file.path;
            
              // Đọc tệp Excel và phân tích nó thành JSON
              const workbook = new ExcelJS.Workbook();
              await workbook.xlsx.readFile(filePath);
              const result = [];
        
              workbook.eachSheet(sheet => {
                const sheetData = [];
                sheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
                  const rowData = {};
                  row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
                    rowData[colNumber] = cell.value;
                  });
                  sheetData.push(rowData);
                });
                result.push({ sheetName: sheet.name, data: sheetData });
              });
            
              // Loại bỏ tệp Excel sau khi đã xử lý
              fs.unlinkSync(filePath);
              // Đường dẫn đầy đủ của tệp JSON trong thư mục "output"
              
    
              const ranksave = new Ranks({
                title : req.body.title ,
                type_id : req.body.type_id ,
                data : result 
              })
    
              const rankresult = await ranksave.save() ;
              res.status(200).json({status : 200 , message : rankresult});
    
        } catch (error) {
            res.status(404).json({status : 404 ,message : error});
        }
        
    },

    List_rank : async (req,res) => {
        try {
            const partner = await Ranks.find().populate('type_id');
            res.status(200).json(partner);
        } catch (error) {
            res.status(404).json({message : error});
        }
    },

    getOneRank : async (req,res) => {
      try {
        console.log(req.params.id);
        const partner = await Ranks.findOne({_id : req.params.id});
        res.status(200).json(partner);
        } catch (error) {
            res.status(404).json({message : error});
        }
    },

    delRank : async(req,res) => {
      const del = await Ranks.deleteOne({_id : req.body._id});

      if (del.deletedCount === 1) {
          res.status(200).json({status : 200 ,message : 'Successfully deleted one document.'});
        } else {
          res.status(404).json({status : 404 , message : 'No documents matched the query. Deleted 0 documents.'});
        }
    },

    editRank: async (req, res) => {

      try {
        var uploadData ;

      if (!req.file) {
         uploadData = {
          _id : req.body._id ,
          title : req.body.title ,
          type_id : req.body.type_id 
        }
        console.log(uploadData);
      } else {

        const filePath = req.file.path;
            
        // Đọc tệp Excel và phân tích nó thành JSON
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(filePath);
        const result = [];
  
        workbook.eachSheet(sheet => {
          const sheetData = [];
          sheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
            const rowData = {};
            row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
              rowData[colNumber] = cell.value;
            });
            sheetData.push(rowData);
          });
          result.push({ sheetName: sheet.name, data: sheetData });
        });
      
        // Loại bỏ tệp Excel sau khi đã xử lý
        fs.unlinkSync(filePath);


        uploadData = {
          title : req.body.title ,
          type_id : req.body.type_id ,
          data : result  
        }

      }

      const categorydatabase = await Ranks.findByIdAndUpdate(req.body._id, uploadData ); 

      if (!categorydatabase) {
        res.status(404).json({ status: 404, message: "sai id rồi" });
      } else {
        res.status(200).json({ status: 200, message: categorydatabase });
      }
      } catch (error) {
        res.status(404).json({status : 404 ,message : error});
      }
      
    },
}


module.exports = RanksController ;