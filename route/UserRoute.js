import express from 'express';

const userRouter=express.Router();
import { userLogin } from '../controller/UserController.js';
import { userRegister } from '../controller/UserController.js';

userRouter.post('/login', userLogin);
userRouter.post('/register', userRegister);

export default userRouter;
