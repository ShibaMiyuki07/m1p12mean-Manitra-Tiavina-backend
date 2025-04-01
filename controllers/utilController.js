const utilService = require("../services/utilService");

const uploadFile = async (req, res) => {
    if (!req.file) throw new Error('No file uploaded');
    const uploadedFile = utilService.processImageUpload(req.file);
    res.status(200).json({message : "uploaded", uploadedFile });

}

module.exports = {
    uploadFile,
}