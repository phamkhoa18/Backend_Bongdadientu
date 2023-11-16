const ImagesController = require('../controllers/ImagesController');
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

router.post('/addimage', upload.single('image'),ImagesController.Add_images);
router.post('/editimage' ,upload.single('image') ,ImagesController.Edit_images);
router.get('/listimage',ImagesController.List_images);
router.get('/listimage/:id' ,ImagesController.get_one_images);
router.get('/delimage/:id',ImagesController.Del_images);
router.get('/oneimage/:position',ImagesController.One_images);

module.exports = router;
