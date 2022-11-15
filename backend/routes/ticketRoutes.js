const express = require('express');
const router = express.Router();
const {
  getTickets,
  getTicket,
  createTickets,
  updateTicket,
  deleteTicket,
} = require('../controllers/ticketController');

const { protect } = require('../middleware/authMiddleware');

// Re-router into note router
const noteRouter = require('./noteRoutes');
router.use('/:ticketId/notes', noteRouter);

router.route('/').get(protect, getTickets).post(protect, createTickets);

router
  .route('/:id')
  .get(protect, getTicket)
  .delete(protect, deleteTicket)
  .put(protect, updateTicket);

module.exports = router;
