const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

dotenv.config();
const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('Backend is live!'));
app.post('/auth/login', async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password)
      return res.status(400).json({ error: 'Email and password are required.' });
  
    try {
      // Check if user exists
      let user = await prisma.user.findUnique({ where: { email } });
  
      if (user) {
        // Login flow
        if (!user.password)
          return res.status(400).json({ error: 'Use Google login for this account.' });
  
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid)
          return res.status(401).json({ error: 'Invalid password.' });
      } else {
        // Register flow
        const hashedPassword = await bcrypt.hash(password, 10);
        user = await prisma.user.create({
          data: { email, password: hashedPassword },
        });
      }
  
      // Create JWT
      const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: '7d',
      });
  
      res.json({ token, user: { id: user.id, email: user.email } });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  });
  
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));