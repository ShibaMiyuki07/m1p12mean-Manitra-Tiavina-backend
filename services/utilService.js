const multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'pictures/product');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

var upload = multer({ storage: storage });
const processImageUpload = (file) => ({
    filename: file.filename,
    path: file.path,
    size: file.size,
    mimetype: file.mimetype
});

module.exports = {
    processImageUpload,
    upload
}