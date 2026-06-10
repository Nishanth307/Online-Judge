const Contest = require("../model/contest");

const getContests = async (req, res) => {
    try {
        const contests = await Contest.find().populate("problems");
        return res.status(200).json({
            success: true,
            message: "Contests fetched successfully",
            contests: contests
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getContestById = async (req, res) => {
    try {
        const { id } = req.params;
        const contest = await Contest.findById(id).populate("problems");
        if (!contest) {
            return res.status(404).json({
                success: false,
                message: "Contest not found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Contest fetched successfully",
            contest: contest
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const createContest = async (req, res) => {
    try {
        const contest = await Contest.create(req.body);
        return res.status(201).json({
            success: true,
            message: "Contest created successfully",
            contest: contest
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const updateContest = async (req, res) => {
    try {
        const { id } = req.params;
        const contest = await Contest.findByIdAndUpdate(id, req.body, { new: true });
        if (!contest) {
            return res.status(404).json({
                success: false,
                message: "Contest not found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Contest updated successfully",
            contest: contest
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const deleteContest = async (req, res) => {
    try {
        const { id } = req.params;
        const contest = await Contest.findByIdAndDelete(id);
        if (!contest) {
            return res.status(404).json({
                success: false,
                message: "Contest not found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Contest deleted successfully",
            contest: contest
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = { getContests, getContestById, createContest, updateContest, deleteContest };