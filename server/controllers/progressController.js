// @desc    Get user progress for a specific roadmap
// @route   GET /api/progress/:domainId
// @access  Private
exports.getProgress = async (req, res) => {
  try {
    const { domainId } = req.params;
    // Get the progress map for the domain from the user object
    const domainProgress = req.user.progress.get(domainId) || {};
    res.status(200).json(Object.fromEntries(domainProgress)); // Convert Map to object for JSON
  } catch (error) {
    console.error("Get Progress Error:", error);
    res.status(500).json({ msg: 'Server Error' });
  }
};

// @desc    Update user progress for a specific step
// @route   POST /api/progress/:domainId
// @access  Private
exports.updateProgress = async (req, res) => {
  try {
    const { domainId } = req.params;
    const { stepId, completed, completedDate } = req.body;

    // Basic validation
    if (typeof completed !== 'boolean' || !stepId) {
      return res.status(400).json({ msg: 'Invalid request body' });
    }

    const user = req.user;

    // Ensure the domain map exists before setting a step
    if (!user.progress.has(domainId)) {
      user.progress.set(domainId, new Map());
    }

    // Set the progress for the specific step
    user.progress.get(domainId).set(stepId, {
      completed,
      completedDate: completed ? completedDate : null,
    });
    
    // Mongoose needs to be told that a Map has been changed
    user.markModified('progress');
    await user.save();

    const updatedDomainProgress = user.progress.get(domainId) || {};
    res.status(200).json(Object.fromEntries(updatedDomainProgress));
  } catch (error) {
    console.error('Update Progress Error:', error);
    res.status(500).json({ msg: 'Server Error' });
  }
};