import mongoose, { Schema } from "mongoose";


const donationDateSchema = new Schema(
  {
    donation_date: {
      type: Date,
      required: true,
    }
  },
  { timestamps: true }
);

export const DonationDate = mongoose.model("DonationDate", donationDateSchema);

const donationHistorySchema = Schema({
  donation_dates: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DonationDate",
    },
  ],
});

export const DonationHistory = mongoose.model(
  "DonationHistory",
  donationHistorySchema
);
