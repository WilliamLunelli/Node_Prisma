import { Router } from 'express';
import { prisma } from '../Libs/prisma';

const router = Router();

export default router;

router.get('/ping', (req,res) =>{
    res.json({pong:true})
})

router.get('/test', (req,res) => {
    res.json({testado:true})
})