const mongoose = require("mongoose");

const EmailHistorySchema = new mongoose.Schema(
  {
    mailName: {
      type: String,
      required: [true, "mail name"],
    },
    data: {
      type: Object,
    },
    error: {
      type: Object,
    },
    origin: {
      type: String,
    },
    actorEmail: {
        type: String
    }
  },
  {
    timestamps: true,
  }
);
