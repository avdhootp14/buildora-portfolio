const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const AdminUser = require('../models/AdminUser');
const sendEmail = require('../utils/sendEmail');
const auth = require('../middleware/auth');
const rateLimit = require('express-rate-limit');

// Strict rate limiter for contact form submissions
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // limit each IP to 3 contact requests per hour
  message: { message: 'You have sent too many messages. Please try again later.' }
});

// POST a new contact message (Public)
router.post('/', contactLimiter, async (req, res) => {
  try {
    // 1. Honeypot Check (Anti-Spam)
    // Bots often fill out hidden fields. If 'website' is filled, silently ignore.
    if (req.body.website) {
      return res.status(200).json({ message: 'Message sent successfully.' });
    }

    const { name, email, phone, message } = req.body;
    
    // Save to database
    const newContact = new Contact({ name, email, phone, message });
    const contact = await newContact.save();

    // 2. Alert all verified admins
    const admins = await AdminUser.find({ isVerified: true });
    const adminEmails = admins.filter(admin => admin.email).map(a => a.email);
    
    if (adminEmails.length > 0) {
      const adminAlertMessage = `
        <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0a0a0a; color: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #222;">
          <div style="background-color: #111; padding: 30px; text-align: center; border-bottom: 1px solid #222;">
            <h1 style="margin: 0; font-size: 24px; font-weight: 700; letter-spacing: -0.5px;">Weblinq <span style="color: #3b82f6;">Lead</span></h1>
          </div>
          <div style="padding: 40px 30px;">
            <p style="margin: 0 0 20px 0; color: #a1a1aa; font-size: 16px;">A new contact form has been submitted on your website.</p>
            
            <div style="background-color: #111; border: 1px solid #222; border-radius: 8px; padding: 20px; margin-bottom: 30px;">
              <p style="margin: 0 0 10px 0; font-size: 14px;"><strong style="color: #fff; display: inline-block; width: 80px;">Name:</strong> <span style="color: #cbd5e1;">${name}</span></p>
              <p style="margin: 0 0 10px 0; font-size: 14px;"><strong style="color: #fff; display: inline-block; width: 80px;">Email:</strong> <span style="color: #cbd5e1;">${email}</span></p>
              <p style="margin: 0; font-size: 14px;"><strong style="color: #fff; display: inline-block; width: 80px;">Mobile:</strong> <span style="color: #cbd5e1;">${phone || 'N/A'}</span></p>
            </div>

            <h3 style="margin: 0 0 15px 0; font-size: 16px; color: #fff; text-transform: uppercase; letter-spacing: 1px;">Message</h3>
            <blockquote style="margin: 0; background: #111; padding: 20px; border-left: 4px solid #3b82f6; border-radius: 0 8px 8px 0; color: #cbd5e1; font-style: italic; line-height: 1.6;">
              ${message.replace(/\n/g, '<br>')}
            </blockquote>
            
            <div style="text-align: center; margin-top: 40px;">
              <a href="http://localhost:3000/admin/contacts" style="display: inline-block; background-color: #3b82f6; color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-weight: 600; font-size: 14px;">Open Admin Dashboard</a>
            </div>
          </div>
          <div style="padding: 20px; text-align: center; background-color: #050505; border-top: 1px solid #222;">
            <p style="margin: 0; color: #52525b; font-size: 12px;">This is an automated alert from your Weblinq server.</p>
            <p style="margin: 5px 0 0 0; color: #52525b; font-size: 12px;">Please do not reply to this email.</p>
          </div>
        </div>
      `;
      
      // We don't await this so the user isn't kept waiting
      sendEmail({
        email: adminEmails.join(','),
        subject: `New Lead: ${name}`,
        message: adminAlertMessage
      }).catch(err => console.error('Admin alert email failed:', err));
    }

    // 3. Send Auto-Responder to Client
    const clientAutoResponderMessage = `
      <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0a0a0a; color: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #222;">
        <div style="background-color: #111; padding: 40px 30px; text-align: center; border-bottom: 1px solid #222;">
          <h1 style="margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -1px;">Weblinq</h1>
        </div>
        <div style="padding: 40px 30px;">
          <h2 style="margin: 0 0 20px 0; font-size: 20px; font-weight: 600;">Message Received</h2>
          <p style="margin: 0 0 20px 0; color: #a1a1aa; font-size: 16px; line-height: 1.6;">Hi ${name.split(' ')[0]},</p>
          <p style="margin: 0 0 30px 0; color: #a1a1aa; font-size: 16px; line-height: 1.6;">Thank you for reaching out to us. We have successfully received your message and our team will be reviewing your project details shortly. We typically respond within 24-48 hours.</p>
          
          <h3 style="margin: 0 0 15px 0; font-size: 14px; color: #fff; text-transform: uppercase; letter-spacing: 1px;">Copy of your message:</h3>
          <blockquote style="margin: 0; background: #111; padding: 20px; border-left: 4px solid #3b82f6; border-radius: 0 8px 8px 0; color: #cbd5e1; font-style: italic; line-height: 1.6;">
            ${message.replace(/\n/g, '<br>')}
          </blockquote>
          
          <div style="margin-top: 40px; padding-top: 30px; border-top: 1px solid #222;">
            <p style="margin: 0 0 5px 0; font-size: 16px; font-weight: 600; color: #fff;">Best regards,</p>
            <p style="margin: 0; color: #3b82f6; font-size: 16px; font-weight: 600;">The Weblinq Team</p>
          </div>
        </div>
      </div>
    `;

    // Again, don't await to ensure quick response to client
    sendEmail({
      email: email,
      subject: 'Thank you for contacting Weblinq',
      message: clientAutoResponderMessage
    }).catch(err => console.error('Client auto-responder email failed:', err));

    res.json(contact);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET all contacts (Admin Only)
router.get('/', auth, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT mark contact as read (Admin Only)
router.put('/:id', auth, async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, { isRead: true }, { new: true });
    res.json(contact);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE a contact (Admin Only)
router.delete('/:id', auth, async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: 'Contact removed' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST reply to a contact message (Admin Only)
router.post('/:id/reply', auth, async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    const { replyMessage } = req.body;
    if (!replyMessage) {
      return res.status(400).json({ message: 'Reply message is required' });
    }

    // Wrap the plain text reply in a clean HTML template matching the dark premium theme
    const emailHtml = `
      <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0a0a0a; color: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #222;">
        
        <!-- Header -->
        <div style="background-color: #111; padding: 35px 30px; text-align: center; border-bottom: 1px solid #222;">
          <h1 style="margin: 0; font-size: 26px; font-weight: 700; letter-spacing: -0.5px; color: #ffffff;">Weblinq</h1>
          <p style="margin: 5px 0 0 0; color: #3b82f6; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Support Response</p>
        </div>
        
        <!-- Body (Your Reply) -->
        <div style="padding: 40px 30px 20px 30px;">
          <div style="color: #cbd5e1; font-size: 16px; line-height: 1.7;">
            ${replyMessage.replace(/\n/g, '<br>')}
          </div>
        </div>

        <!-- Original Message Context -->
        <div style="padding: 0 30px 40px 30px;">
          <div style="margin-top: 30px; border-top: 1px solid #222; padding-top: 30px;">
            <p style="margin: 0 0 10px 0; color: #52525b; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">On ${new Date(contact.createdAt).toLocaleDateString()}, you wrote:</p>
            <blockquote style="margin: 0; background: #111; padding: 20px; border-left: 3px solid #52525b; border-radius: 0 8px 8px 0; color: #a1a1aa; font-style: italic; font-size: 14px; line-height: 1.6;">
              ${contact.message.replace(/\n/g, '<br>')}
            </blockquote>
          </div>
        </div>
        
        <!-- Footer -->
        <div style="padding: 20px; text-align: center; background-color: #050505; border-top: 1px solid #222;">
          <p style="margin: 0; color: #52525b; font-size: 12px;">This email was securely delivered by the Weblinq communications system.</p>
        </div>
      </div>
    `;

    // Send the email
    await sendEmail({
      email: contact.email,
      subject: `Re: Your inquiry to Weblinq`,
      message: emailHtml
    });

    // Mark as read automatically since we replied
    contact.isRead = true;
    await contact.save();

    res.json({ message: 'Reply sent successfully', contact });
  } catch (err) {
    console.error('Error sending reply:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
