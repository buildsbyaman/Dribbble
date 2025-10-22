const cron = require("node-cron");
const User = require("../models/user.js");

const cleanupUnverifiedUsers = async () => {
  try {
    const thirtyMinutesAgo = Date.now() - 30 * 60 * 1000;

    const result = await User.deleteMany({
      isVerified: false,
      verificationTokenExpires: { $lt: Date.now() },
      createdAt: { $lt: thirtyMinutesAgo },
    });

    if (result.deletedCount > 0) {
      console.log(
        `Cleanup job: Deleted ${result.deletedCount} unverified user(s)`
      );
    }
  } catch (error) {
    console.error("Error in cleanup job:", error);
  }
};

const startCleanupJob = () => {
  cron.schedule("*/30 * * * *", () => {
    console.log("Running unverified users cleanup job...");
    cleanupUnverifiedUsers();
  });

  console.log("Cleanup job scheduled: Runs every 30 minutes");
};

module.exports = { startCleanupJob, cleanupUnverifiedUsers };
