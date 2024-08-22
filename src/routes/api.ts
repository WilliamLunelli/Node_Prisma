import { Router } from 'express';
import { prisma } from '../Libs/prisma';
import { createUser } from '../Services/User';

const router = Router();

export default router;

router.get('/ping', (req,res) =>{
    res.json({pong:true})
})

router.get('/test', (req,res) => {
    res.json({testado:true})
})

router.post('/user', async (req,res) =>{
    const user = await createUser({
        name: 'will',
        email:'will@gmail.com'
    }
    )
    res.json({user});
})