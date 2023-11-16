const RanksController = require('../controllers/RanksController');
const router = require('express').Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const extname = path.extname(file.originalname);
    cb(null, uniqueSuffix + extname);
  }
});

const upload = multer({ storage: storage });
// router (đường dẫn)
router.post('/addrank' , upload.single('excelFile') , RanksController.Add_rank);

router.get('/listrank' , RanksController.List_rank);

router.get('/getrank/:id' , RanksController.getOneRank);

router.post('/editrank' , upload.single('data') , RanksController.editRank) ;

router.post('/delrank' , RanksController.delRank) ;
module.exports = router ;