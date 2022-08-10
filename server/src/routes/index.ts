import {Router, Request, Response} from 'express'

const router = Router();

router.get('/users', (req: Request, res: Response)=>{
    res.send('Olá Mundo!')
})

//Rotas de Pets
router.get('/pets', (req: Request, res: Response)=>{
    res.send('Listagem de Pets!')
})

router.get('/pets/:idPet', (req: Request, res: Response)=>{
    res.send(`Detalhes do pet ${req.params.idPet}`)
})


//Rotas de Fichas Médicas
router.get('/medical-records', (req: Request, res: Response)=>{
    res.send(`Listagem de Fichas Médicas`)
})

router.get('/medical-records/:idRecord', (req: Request, res: Response)=>{
    res.send(`Detalhes da Ficha ${req.params.idRecord}`)
})


//Rotas Tutores
router.get('/tutors', (req: Request, res: Response)=>{
    res.send(`Listagem de Tutores`)
})

router.get('/tutors/:idTutor', (req: Request, res: Response)=>{
    res.send(`Detalhes do Tutor ${req.params.idTutor}`)
})

export default router;