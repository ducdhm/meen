const multer = require('multer');
const { getUploadFileName } = require('@meenjs/utils');

module.exports = (uploadPath) => {
    const storage = multer.diskStorage({
        destination: (req, file, next) => {
            next(null, uploadPath);
        },
        filename: (req, file, next) => {
            next(null, getUploadFileName(file.originalname));
        },
    });

    return multer({ storage });
};
