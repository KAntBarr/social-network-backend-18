const { Schema, model, Types } = require('mongoose');
const { DateTime } = require('luxon');

const reactionSchema = new Schema({
  reactionId: { // im not sure why this needed when '_id' is still being generated
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId()
  },
  reactionBody: {
    type: String,
    required: true,
    maxLength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: DateTime.now(),
    get: function (value) {
      // ISO 8601 format (UTC)
      return value.toFormat('yyyy-MM-dd\'T\'HH:mm:ss.SSS\'Z\'');
    }
  }
});

// Schema to create Thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: DateTime.now(),
      get: function (value) {
        // ISO 8601 format (UTC)
        return value.toFormat('yyyy-MM-dd\'T\'HH:mm:ss.SSS\'Z\'');
      }
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual property `reactionCount` that gets the amount of reactions per tjpught
thoughtSchema
  .virtual('reactionCount')
  // Getter
  .get(function () {
    return this.reactions.length;
  });

// Initialize our Thought model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;
