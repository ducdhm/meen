const multer = require('multer');
const { getUploadFileName, newError } = require('@meenjs/utils');

const isValidFile = function (file, acceptedFiles) {
    if (!acceptedFiles || (Array.isArray(acceptedFiles) && acceptedFiles.length === 0)) {
        return true;
    }

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


module.exports = (options) => {
    let acceptedFiles = options.acceptedFiles;
    let acceptedFileErrorMessage = options.acceptedFileErrorMessage;
    let fileSize = options.fileSize;
    let fileName = options.fileName;

    const storage = multer.diskStorage({
        destination: (req, file, next) => {
            let uploadPath = options.uploadPath;
            if (typeof options.uploadPath === 'function') {
                uploadPath = options.uploadPath(req, file);
            }

            next(null, uploadPath);
        },
        filename: (req, file, next) => {
            let fileName = getUploadFileName(file.originalname);

            if (options.fileName) {
                fileName = options.fileName;

                if (typeof options.fileName === 'function') {
                    fileName = options.fileName(req, file);
                }
            }

            next(null, fileName);
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
