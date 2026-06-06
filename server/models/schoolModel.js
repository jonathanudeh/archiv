const mongoose = require("mongoose");
const slugify = require("slugify");
const validator = require("validator");

const schoolSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A school must have a name"],
      unique: true,
      trim: true,
      lowercase: true,
      minlength: [5, "A school name must have more or equal than 5 characters"],
      maxlength: [
        50,
        "A school name must have less or equal than 50 characters",
      ],
    },

    slug: {
      type: String,
      unique: true,
    },

    acronym: {
      type: String,
      trim: true,
      uppercase: true,
    },

    aliases: [
      {
        type: String,
        trim: true,
        uppercase: true,
      },
    ],

    logo: {
      url: {
        type: String,
        default:
          "https://res.cloudinary.com/dnunviyej/image/upload/v1780620503/default-school-logo_w5mtnw.png",
      },
      public_id: String,
    },

    description: {
      type: String,
      trim: true,
      maxlength: [
        500,
        "A school's description must have less or equal than 500 characters",
      ],
    },

    location: {
      type: String,
      trim: true,
      maxlength: [
        100,
        "A school's location must have less or equal than 100 characters",
      ],
    },

    website: {
      type: String,
      trim: true,
      validate: {
        validator: validator.isURL,
        message: "Please provide a valid website URL",
      },
    },

    contactEmail: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },

    contactPhone: {
      type: String,
      trim: true,
      validate: {
        validator: function (val) {
          return validator.isMobilePhone(val, "any", { strictMode: true });
        },
        message: "Please provide a valid phone number",
      },
    },

    country: {
      type: String,
      trim: true,
      maxlength: [
        50,
        "A school's country must have less or equal than 50 characters",
      ],
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      select: false,
    },

    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      select: false,
    },
  },
  { timestamps: true }, // adds createdAt and updatedAt fields
);

// INDEXES
schoolSchema.index({ country: 1 });
schoolSchema.index({ name: "text", description: "text", location: "text" });
schoolSchema.index({ acronym: 1 });
schoolSchema.index({ aliases: 1 });

schoolSchema.pre("save", function () {
  if (!this.isModified("name")) return;

  this.slug = slugify(this.name, {
    lower: true,
    strict: true,
  });
});

const School = mongoose.model("School", schoolSchema);

module.exports = School;
