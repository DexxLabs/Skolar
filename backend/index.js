const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

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

  app.post('/auth/google', async (req, res) => {
    const { token } = req.body;
  
    try {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
  
      const payload = ticket.getPayload();
  
      const {
        email,
        sub: googleId,
        name,
        picture: profilePic,
        locale,
        given_name: givenName,
        family_name: familyName,
      } = payload;
  
      let user = await prisma.user.findUnique({ where: { email } });
  
      if (!user) {
        user = await prisma.user.create({
          data: {
            email,
            googleId,
            name,
            profilePic,
            locale,
            givenName,
            familyName,
          },
        });
      } else if (!user.googleId) {
        // Update existing user with Google info if missing
        user = await prisma.user.update({
          where: { email },
          data: {
            googleId,
            name: user.name || name,
            profilePic: user.profilePic || profilePic,
            locale: user.locale || locale,
            givenName: user.givenName || givenName,
            familyName: user.familyName || familyName,
          },
        });
      }
  
      const jwtToken = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );
  
      res.json({
        token: jwtToken,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          profilePic: user.profilePic,
          locale: user.locale,
          givenName: user.givenName,
          familyName: user.familyName,
        },
      });


    } catch (err) {
      console.error(err);
      res.status(401).json({ error: 'Invalid Google Token' });
    }
  });


  app.get('/student/:regNo/attendance', async (req, res) => {
    const { regNo } = req.params;
  
    try {
      const student = await prisma.student.findUnique({
        where: { regNo },
        include: {
          attendance: {
            include: { subject: true },
          },
        },
      });
  
      if (!student) {
        return res.status(404).json({ error: 'Student not found' });
      }
  
      const attendanceData = student.attendance.map(record => ({
        subject: record.subject.name,
        attended: record.attended,
        total: record.total,
        percentage: ((record.attended / record.total) * 100).toFixed(2),
      }));
  
      res.json({
        regNo: student.regNo,
        name: student.name,
        branch: student.branch,
        attendance: attendanceData,
      });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch attendance' });
    }
  });
  
//registration no check
app.get('/student/:regNo/check', async (req, res) => {
  const { regNo } = req.params;
  const student = await prisma.student.findUnique({ where: { regNo } });
  if (!student) return res.status(404).json({ error: 'Not found' });
  res.json({ exists: true });
});

  
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));