import {Router, Request, Response} from 'express'

const router = Router();

router.get('/pets', (req: Request, res: Response)=>{
    res.send('Listagem de Pets')
})

router.get('/pets/:idPet', (req: Request, res: Response)=>{
    res.send('Detalhe do pet slug')
})


export default router;