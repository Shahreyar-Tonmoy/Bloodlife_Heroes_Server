import mongoose from "mongoose";
const { Schema, model } = mongoose;

const donorSchema = new Schema(
  {
    donor_id: {
      type: String,
      unique: true,
    },
    role: {
      type: String,
      enum: ["donor", "admin", "subadmin"],
      default: "donor",
    },
    name: {
      type: String,
      required: true,
    },
    date_Of_birth: {
      type: Date,
      required: true,
    },
    blood_group: {
      type: String,
      required: true,
    },
    district: {
      type: Schema.Types.ObjectId,
      ref: "District",
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    facebook: {
      type: String,
    },
    image: {
      type: String,
    },
    nid: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    union: {
      type: Schema.Types.ObjectId,
      ref: "Union",
      required: true,
    },
    upzila: {
      type: Schema.Types.ObjectId,
      ref: "Upzila",
      required: true,
    },
    village: {
      type: String,
    },
    donation_history: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DonationHistory",
    },
    admin_status: {
      type: Boolean,
      
      default: false,
    },

  },
  { timestamps: true }
);

donorSchema.pre('save', async function(next) {
  try {
    if (!this.donor_id) {
      const lastDonor = await Donor.findOne({}, {}, { sort: { createdAt: -1 } });

      let lastdonorid = 4999; // Starting value if no donor found

      if (lastDonor) {
        const lastDonorSplit = lastDonor.donor_id.split('-')[2];
        lastdonorid = parseInt(lastDonorSplit);
      }

      const newdonorid = `DON-${new Date().getFullYear()}-${lastdonorid + 1}`;

      this.donor_id = newdonorid;
    }
    next();
  } catch (error) {
    next(error);
  }
});

const Donor = model("Donor", donorSchema);

export { Donor };
