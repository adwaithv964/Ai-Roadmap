// @desc    Get user progress and tracking stats for a specific roadmap
// @route   GET /api/progress/:domainId
// @access  Private
exports.getProgress = async (req, res) => {
  try {
    const { domainId } = req.params;
    // Get the progress map for the domain from the user object
    const domainProgress = req.user.progress.get(domainId) || {};
    const domainTimeSpent = req.user.timeSpent?.get(domainId) || {};
    const domainQuizScores = req.user.quizScores?.get(domainId) || {};
    const domainAdaptations = req.user.roadmapAdaptations?.get(domainId) || { addedModules: [], skippedSteps: [] };

    res.status(200).json({
      progress: Object.fromEntries(domainProgress),
      timeSpent: Object.fromEntries(domainTimeSpent),
      quizScores: Object.fromEntries(domainQuizScores),
      adaptations: domainAdaptations
    });
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
    const { stepId, completed, completedDate, moduleId, timeSpent, quizScore, adaptations } = req.body;

    const user = req.user;

    // --- Basic Progress Tracking ---
    if (stepId !== undefined && completed !== undefined) {
      if (!user.progress.has(domainId)) {
        user.progress.set(domainId, new Map());
      }
      user.progress.get(domainId).set(stepId, {
        completed,
        completedDate: completed ? completedDate : null,
      });
      user.markModified('progress');
    }

    // --- Time Tracking ---
    if (moduleId !== undefined && timeSpent !== undefined) {
      if (!user.timeSpent) user.timeSpent = new Map();
      if (!user.timeSpent.has(domainId)) {
        user.timeSpent.set(domainId, new Map());
      }
      const currentDomainTime = user.timeSpent.get(domainId);
      const existingTime = currentDomainTime.get(moduleId) || 0;
      currentDomainTime.set(moduleId, existingTime + timeSpent);
      user.markModified('timeSpent');
    }

    // --- Quiz Score Tracking ---
    if (moduleId !== undefined && quizScore !== undefined) {
      if (!user.quizScores) user.quizScores = new Map();
      if (!user.quizScores.has(domainId)) {
        user.quizScores.set(domainId, new Map());
      }
      user.quizScores.get(domainId).set(moduleId, quizScore);
      user.markModified('quizScores');
    }

    // --- Save adaptations directly if sent from frontend ---
    if (adaptations !== undefined) {
      if (!user.roadmapAdaptations) user.roadmapAdaptations = new Map();
      user.roadmapAdaptations.set(domainId, adaptations);
      user.markModified('roadmapAdaptations');
    }

    await user.save();

    const updatedDomainProgress = user.progress.get(domainId) || {};
    const updatedTimeSpent = user.timeSpent?.get(domainId) || {};
    const updatedQuizScores = user.quizScores?.get(domainId) || {};
    const updatedAdaptations = user.roadmapAdaptations?.get(domainId) || { addedModules: [], skippedSteps: [] };

    res.status(200).json({
      progress: Object.fromEntries(updatedDomainProgress),
      timeSpent: Object.fromEntries(updatedTimeSpent),
      quizScores: Object.fromEntries(updatedQuizScores),
      adaptations: updatedAdaptations
    });
  } catch (error) {
    console.error('Update Progress Error:', error);
    res.status(500).json({ msg: 'Server Error' });
  }
};