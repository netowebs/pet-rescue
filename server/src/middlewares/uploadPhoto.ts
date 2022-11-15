import multer from 'multer'
import path from 'path'
import fs from 'fs'

let url = path.join( __dirname,'../../../client/src/images/photosUsers')

module.exports = (multer({
    storage: multer.diskStorage({
        destination:(req, file, cb) => {
            if(!fs.existsSync(path.join( __dirname,'../../../client/src/images/photosUsers'))){
                url = String(fs.mkdirSync(path.join( __dirname,'../../../client/src/images/photosUsers')))
            }
            cb(null, url)
        },
        filename: (req, file, cb) => {
            cb(null, file.originalname)
        }
    }),
    fileFilter: (req, file, cb) => {
        const extensoesImg = ['image/png','image/jpeg','image/jpg'].find(formatoAceito => formatoAceito == file.mimetype)

        if(extensoesImg){
            return cb(null, true)
        }

        return cb(null, false)
    }
}))