const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const AdminUser = require('../models/AdminUser');
const sendEmail = require('../utils/sendEmail');
const auth = require('../middleware/auth');
const rateLimit = require('express-rate-limit');

// GET /api/auth/me
router.get('/me', auth, async (req, res) => {
  try {
    const user = await AdminUser.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: { message: 'Too many authentication attempts, please try again later.' }
});

// POST /api/auth/invite (Protected: only existing admins can invite)
router.post('/invite', auth, authLimiter, async (req, res) => {
  try {
    const reqUser = await AdminUser.findById(req.user.id);
    if (!reqUser || reqUser.role !== 'owner') {
      return res.status(403).json({ message: 'Access denied. Only owners can invite new administrators.' });
    }

    const { email } = req.body;
    let user = await AdminUser.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // Generate Verification Token
    const verificationToken = crypto.randomBytes(20).toString('hex');
    const randomTempPassword = crypto.randomBytes(20).toString('hex');

    user = new AdminUser({ 
      email, 
      password: randomTempPassword,
      verificationToken,
      isVerified: false
    });
    await user.save();

    // Send Invitation Email
    const setupUrl = `http://localhost:3000/admin/setup-account/${verificationToken}`;
    const message = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9f9f9; padding: 40px 20px; border-radius: 8px;">
        <div style="background-color: #ffffff; padding: 40px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); text-align: center;">
          <h1 style="color: #111827; margin-bottom: 20px; font-size: 28px; font-weight: 800;">You've been invited!</h1>
          <p style="color: #4b5563; font-size: 16px; margin-bottom: 30px; line-height: 1.6;">You have been invited to join the Weblinq Admin Portal. Please click the button below to securely set up your password and activate your account.</p>
          <a href="${setupUrl}" style="display: inline-block; background-color: #3b82f6; color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: bold; font-size: 16px; transition: background-color 0.2s;">Setup Account</a>
          <p style="color: #9ca3af; font-size: 14px; margin-top: 40px; border-top: 1px solid #e5e7eb; padding-top: 20px;">If the button doesn't work, copy and paste this link into your browser:</p>
          <p style="color: #3b82f6; font-size: 13px; word-break: break-all; margin-top: 5px;">${setupUrl}</p>
        </div>
      </div>
    `;

    try {
      await sendEmail({
        email: user.email,
        subject: 'Admin Portal - You have been invited!',
        message
      });
      res.status(201).json({ message: 'Invitation sent successfully.' });
    } catch (error) {
      console.error(error);
      user.verificationToken = undefined;
      await user.save();
      return res.status(500).json({ message: 'Email could not be sent' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// POST /api/auth/setup-account/:token
router.post('/setup-account/:token', async (req, res) => {
  try {
    const { password } = req.body;
    const user = await AdminUser.findOne({ verificationToken: req.params.token });
    
    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired setup token' });
    }

    user.password = password;
    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    res.json({ message: 'Account setup successfully. You can now log in.' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// POST /api/auth/login
router.post('/login', authLimiter, async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await AdminUser.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    if (!user.isVerified) {
      return res.status(401).json({ message: 'Please set up your account via the link sent to your email before logging in.' });
    }

    const payload = { user: { id: user.id } };
    jwt.sign(payload, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// POST /api/auth/forgot-password
router.post('/forgot-password', authLimiter, async (req, res) => {
  try {
    const user = await AdminUser.findOne({ email: req.body.email });
    if (!user) {
      return res.json({ message: 'If that email is registered, a reset link has been sent.' });
    }

    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    const resetUrl = `http://localhost:3000/admin/reset-password/${resetToken}`;
    const message = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9f9f9; padding: 40px 20px; border-radius: 8px;">
        <div style="background-color: #ffffff; padding: 40px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); text-align: center;">
          <h1 style="color: #111827; margin-bottom: 20px; font-size: 28px; font-weight: 800;">Password Reset</h1>
          <p style="color: #4b5563; font-size: 16px; margin-bottom: 30px; line-height: 1.6;">You recently requested to reset your password for your Weblinq Admin account. Click the button below to proceed.</p>
          <a href="${resetUrl}" style="display: inline-block; background-color: #3b82f6; color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: bold; font-size: 16px; transition: background-color 0.2s;">Reset Password</a>
          <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">If you did not request a password reset, please ignore this email or reply to let us know. This password reset is only valid for the next 1 hour.</p>
          <p style="color: #9ca3af; font-size: 14px; margin-top: 30px; border-top: 1px solid #e5e7eb; padding-top: 20px;">If the button doesn't work, copy and paste this link into your browser:</p>
          <p style="color: #3b82f6; font-size: 13px; word-break: break-all; margin-top: 5px;">${resetUrl}</p>
        </div>
      </div>
    `;

    try {
      await sendEmail({
        email: user.email,
        subject: 'Admin Portal - Password Reset',
        message
      });
      res.json({ message: 'If that email is registered, a reset link has been sent.' });
    } catch (error) {
      console.error(error);
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      await user.save();
      return res.status(500).json({ message: 'Email could not be sent' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// POST /api/auth/reset-password/:token
router.post('/reset-password/:token', async (req, res) => {
  try {
    const user = await AdminUser.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired reset token' });
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.json({ message: 'Password reset successful. You can now log in.' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
