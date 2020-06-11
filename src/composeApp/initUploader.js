const multer = require('multer');
const { getUploadFileName, newError } = require('@meenjs/utils');

const isValidFile = function (file, acceptedFiles) {
    if (!acceptedFiles || (Array.isArray(acceptedFiles) && acceptedFiles.length === 0)) {
        return true;
    }

    acceptedFiles = acceptedFiles.split(',');

    let mimeType = file.mimetype;
    let baseMimeType = mimeType.replace(/\/.*$/, '');

    for (let validType of acceptedFiles) {
        validType = validType.trim();
        if (validType.charAt(0) === '.') {
            if (file.name.toLowerCase().indexOf(validType.toLowerCase(), file.name.length - validType.length) !== -1) {
                return true;
            }
        } else if (/\/\*$/.test(validType)) {
            // This is something like a image/* mime type
            if (baseMimeType === validType.replace(/\/.*$/, '')) {
                return true;
            }
        } else {
            if (mimeType === validType) {
                return true;
            }
        }
    }

    return false;
};


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
            if (isValidFile(file, acceptedFiles)) {
                return next(null, true);
            } else {
                return next(newError(422, acceptedFileErrorMessage));
            }
        },
        limits: {
            fileSize,
        },
    });
};
