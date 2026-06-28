const express = require('express');
const router = express.Router();
const AdminUser = require('../models/AdminUser');
const auth = require('../middleware/auth');

// GET /api/team
// Get all admins
router.get('/', auth, async (req, res) => {
  try {
    const admins = await AdminUser.find().select('-password').sort({ createdAt: -1 });
    res.json(admins);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/team/:id
// Remove an admin
router.delete('/:id', auth, async (req, res) => {
  try {
    const reqUser = await AdminUser.findById(req.user.id);
    if (!reqUser || reqUser.role !== 'owner') {
      return res.status(403).json({ message: 'Access denied. Only owners can remove administrators.' });
    }

    const adminToDelete = await AdminUser.findById(req.params.id);
    if (!adminToDelete) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    
    // Prevent deleting oneself
    if (adminToDelete._id.toString() === req.user.id) {
      return res.status(400).json({ message: 'You cannot delete your own account' });
    }

    // Prevent deleting other owners
    if (adminToDelete.role === 'owner') {
      return res.status(403).json({ message: 'Owners cannot be deleted' });
    }

    await AdminUser.findByIdAndDelete(req.params.id);
    res.json({ message: 'Admin removed successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/team/:id/role
// Change admin role
router.put('/:id/role', auth, async (req, res) => {
  try {
    const { role } = req.body;
    if (!['owner', 'admin'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    const reqUser = await AdminUser.findById(req.user.id);
    if (!reqUser || reqUser.role !== 'owner') {
      return res.status(403).json({ message: 'Access denied. Only owners can change roles.' });
    }

    const targetUser = await AdminUser.findById(req.params.id);
    if (!targetUser) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    if (targetUser._id.toString() === req.user.id) {
      return res.status(400).json({ message: 'You cannot change your own role' });
    }

    targetUser.role = role;
    await targetUser.save();
    
    res.json({ message: 'Role updated successfully', user: { _id: targetUser._id, role: targetUser.role } });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
