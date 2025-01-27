import ExpertModel from '../models/expertModel.js';
import {sendExpertDeclineNotification, sendExpertApprovalNotification} from '../services/emailService.js';


// Get all approved experts
const getAllApprovedExperts = async (req, res) => {  
    try {
        const experts = await ExpertModel.find({ approved: "true" }) 
        res.status(200).json({ message: 'experts fetched successfully', data: experts });
    } catch (error) {
        console.error('Error fetching experts:', error);
        res.status(500).json({ message: 'Failed to fetch experts', error: error.message });
    }
};

// Get all experts pending approval
const getAllPendingExperts = async (req, res) => {
    try {
        const experts = await ExpertModel.find({ approved: "pending" })
        res.status(200).json({ message: 'experts fetched successfully', data: experts });
    } catch (error) {
        console.error('Error fetching experts:', error);
        res.status(500).json({ message: 'Failed to fetch experts', error: error.message });
    }
};

// Post: Approve an expert
const approveExpert = async (req, res) => {
    try {
        const { expertID } = req.params;
        const expert = await ExpertModel.findOne({ expertID: expertID });
        if (!expert) {
            return res.status(404).json({ message: 'Expert not found' });
        }
        expert.approved = "true";
        await expert.save();

        // Send email notification to expert
        sendExpertApprovalNotification(expert.email);

        res.status(200).json({ message: 'Expert approved successfully', data: expert });
    } catch (error) {
        console.error('Error approving expert:', error);
        res.status(500).json({ message: 'Failed to approve expert', error: error.message });
    }
};

// Post: Decline an expert
const DeclineExpert = async (req, res) => {
    try {
        const { expertID } = req.params;
        const expert = await ExpertModel.findOne({ expertID: expertID });
        if (!expert) {
            return res.status(404).json({ message: 'Expert not found' });
        }
        expert.approved = "false";
        await expert.save();

        // Send email notification to expert
        sendExpertDeclineNotification(expert.email);

        res.status(200).json({ message: 'Expert declined successfully', data: expert });
    } catch (error) {
        console.error('Error declining expert:', error);
        res.status(500).json({ message: 'Failed to decline expert', error: error.message });
    }
};

// Get all experts who were unapproved
const getAllUnApprovedExperts = async (req, res) => {
    try {
        const unapproved_experts = await ExpertModel.find({ approved: "false" })
        res.status(200).json({ message: 'unapproved experts fetched successfully', data: unapproved_experts });
    } catch (error) {
        console.error('Error fetching unapproved experts:', error);
        res.status(500).json({ message: 'Failed to fetch unapproved experts', error: error.message });
    }
};

export {
    getAllApprovedExperts,
    getAllPendingExperts,
    approveExpert,
    DeclineExpert,
    getAllUnApprovedExperts,
};