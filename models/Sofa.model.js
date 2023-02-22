const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const sofaSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: false,
    },
    picture: {
      type: String,
      default: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1",
    },
    description: {
      type: String,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Sofa = model("Sofa", sofaSchema);

module.exports = Sofa;
