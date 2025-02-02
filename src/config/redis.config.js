const { default: Redis } = require("ioredis");
const Queue = require("bull");
const config = require("./config");

// Redis connection options
const redisOptions = {
  host: config.redisHost,
  port: config.redisPort,
  password: config.redisPass,
};

// Initialize Redis connection
const redis = new Redis(redisOptions);

console.log("Redis connected", config.redisHost);

// Initialize Bull Queue with Redis configuration
const queue = new Queue("package-expiration", {
  redis: redisOptions,
});

const addQueue = async (jobData, expiredTimeInMiliSecond = 0) => {
  try {
    // Validate job data
    if (!jobData || typeof jobData !== "object") {
      throw new Error("Job data must be a valid object.");
    }

    // Add the job to the queue
    const job = await queue.add(jobData, {
      delay: expiredTimeInMiliSecond,
      attempts: 3,
      backoff: { type: "fixed", delay: 5000 },
      removeOnComplete: true,
      removeOnFail: false,
    });

    console.log(`Job added to queue: ${job.id}`);
    return job;
  } catch (error) {
    console.error("Error adding job to queue:", error);
    throw error;
  }
};

module.exports = { redis, queue, addQueue };
