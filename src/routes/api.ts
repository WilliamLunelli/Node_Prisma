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

router.post('/user', async (req,res) =>{
    const user = await prisma.user.create({
        data:{
            name: 'William',
            email: 'william1@gmail.com',
        }
    });
    res.json({user});
})