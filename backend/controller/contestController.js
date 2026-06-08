const Contest = require("../model/contest")

const getContests = async (req, res) => {
    const contests = await Contest.find().populate(problems);

    return res.status(200).json({
        success: true,
        message: "Contests fetched successfully",
        contests: contests
    })
}

const getContestById = async (req, res) => {
    const { id } = req.params;
    const contest = await Contest.findById(id).populate("problems");
    if (!contest) {
        return res.status(404).json({
            success: false,
            message: "Contest not found"
        })
    }
    return res.status(200).json({
        success: true,
        message: "Contest fetched successfully",
        contest: contest
    })
}

const createContest = async (req, res) => {
    const contest = await Contest.create(req.body)
    return res.status(200).json({
        success: true,
        message: "Contest created successfully",
        contest: contest
    })
}

const updateContest = async (req, res) => {
    const { id } = req.params;
    const contest = await Contest.findByIdAndUpdate(id, req.body, { new: true });
    if (!contest) {
        return res.status(404).json({
            success: false,
            message: "Contest not found"
        })
    }
    return res.status(200).json({
        success: true,
        message: "Contest updated successfully",
        contest: contest
    })
}

const deleteContest = async (req, res) => {
    const { id } = req.params;
    const contest = await Contest.findByIdAndDelete(id);
    if (!contest) {
        return res.status(404).json({
            success: false,
            message: "Contest not found"
        })
    }
    return res.status(200).json({
        success: true,
        message: "Contest deleted successfully",
        contest: contest
    })
}

module.exports = { getContests, getContestById, createContest, updateContest, deleteContest}