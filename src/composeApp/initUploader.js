const multer = require('multer');
const { getUploadFileName, newError } = require('@meenjs/utils');

module.exports = (uploadPath, acceptedFiles = [], acceptedFileErrorMessage, fileSize) => {
    const storage = multer.diskStorage({
        destination: (req, file, next) => {
            next(null, uploadPath);
        },
        filename: (req, file, next) => {
            next(null, getUploadFileName(file.originalname));
        },
    });

    return multer({
        storage,
        fileFilter: function (req, file, next) {
            if (!Array.isArray(acceptedFiles) || acceptedFiles.length === 0) {
                return next(null, true);
            }

            if (!acceptedFiles.includes(file.mimetype)) {
                return next(newError(422, acceptedFileErrorMessage));
            }

            return next(null, true);
        },
        limits: {
            fileSize,
        }
    });
};
