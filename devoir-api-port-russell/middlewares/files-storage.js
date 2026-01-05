const multer = require('multer');

const MIME_TYPES = {
    'image/jpg' : 'jpg',
    'image/jpeg' : 'jpeg',
    'image/png' : 'png',
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'uploads');
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        console.log(name)
        const extension = MIME_TYPES[file.mimetype];
        callback(null,Date.now() + '_' + name);
    } 
});

const upload = multer({ storage: storage });

module.exports = upload.single('upload_file');