import express from 'express';
import {
    getAllApprovedExperts,
    getAllPendingExperts,
    approveExpert,
    DeclineExpert,
    getAllUnApprovedExperts,
} from '../controllers/adminController.js';


const router = express.Router();

/**
 * Read Only Permission Routes
 */
// GET all approved experts
router.get('/approvedExperts', getAllApprovedExperts);

// GET all unapproved experts
router.get('/pendingExperts', getAllPendingExperts);

// GET all unapproved experts (experts who were rejected)
router.get('/unapprovedExperts', getAllUnApprovedExperts);


/**
 * Read and Write Permission Routes
 */
// POST: Approve an expert
router.post('/approveExpert/:expertID', approveExpert);
// POST: Reject an expert
router.post('/declineExpert/:expertID', DeclineExpert);


export default router;