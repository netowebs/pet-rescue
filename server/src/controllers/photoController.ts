import { Request, Response } from 'express'
import {base64encode} from 'nodejs-base64'

export const photo = async (req: Request, res: Response) => {

    if(req.file){
        let fileContent = base64encode(req.file.filename)
        
    }

}

