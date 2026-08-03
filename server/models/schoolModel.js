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
        default: "/default-school-logo.png",
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
      city: {
        type: String,
        trim: true,
        maxlength: 50,
        default: "",
      },

      state: {
        type: String,
        trim: true,
        maxlength: 50,
        default: "",
      },
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

    ownership: {
      type: String,
      enum: ["Federal", "State", "Private"],
      required: true,
    },

    yearEstablished: Number,

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

    stats: {
      departmentsCount: {
        type: Number,
        default: 0,
      },

      studentsCount: {
        type: Number,
        default: 0,
      },

      materialsCount: {
        type: Number,
        default: 0,
      },

      downloadsCount: {
        type: Number,
        default: 0,
      },

      savesCount: {
        type: Number,
        default: 0,
      },

      viewsCount: {
        type: Number,
        default: 0,
      },

      popularityScore: {
        type: Number,
        default: 0,
        index: true,
      },
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
