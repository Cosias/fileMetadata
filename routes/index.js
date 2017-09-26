var express = require('express');
var router = express.Router();



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'File Metadata Microservice' });
});

var multer = require('multer');
var cors = require('cors');
router.use(cors());

var upload = multer({storage: storage});
var storage = multer.memoryStorage();

router.use(express.static(__dirname + '/public'));

// app.get('/', function(req,res,next){
// 	res.sendFile(__dirname + '/index.html');
// });

router.post('/upload', upload.single('file'), function(req,res,next){
	if(req.file){
		res.status(200).json({
			fileName: req.file.originalname,
			fileSize: req.file.size,
			fileType: req.file.mimetype
		});
	}
	else{
		res.status(400).json({error: 'No file was provided'});
	}
});

module.exports = router;

