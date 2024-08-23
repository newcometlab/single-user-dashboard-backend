import { Router } from 'express';
import { AppDataSource } from '../data-source';
import { User } from '../entity/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = Router();

// Register User
router.post('/register', async (req, res) => {
    const { email, password } = req.body;
    // console.log(email, 'email')
    // console.log(password, 'password')

    // const user = AppDataSource.manager.getId()

    const userRepository = AppDataSource.getRepository(User);
    const existingUser = await userRepository.findOneBy({ email });

    if (existingUser) {
        return res.status(409).send('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = userRepository.create({
        email,
        password: hashedPassword
    });

    await userRepository.save(newUser);
    res.status(201).send('User registered');
});

// User Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({ email });

    if (!user) {
        return res.status(404).send('User not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).send('Invalid credentials');
    }

    const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
    res.json({ token });
});

export default router;
