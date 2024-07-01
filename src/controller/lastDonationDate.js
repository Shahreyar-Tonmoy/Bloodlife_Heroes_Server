import moment from "moment";
import { DonationDate, DonationHistory } from "../models/donationHistory.models.js";
import { Donor } from "../models/donor.models.js";


// const LastDonationDate = async (req, res) => {
//   try {
//     const userEmail = req.params.email; // Assuming you're retrieving email from params
//     const donation_date = req.body.donation_date; // Assuming donation_date is in req.body

//     // Check if donation_date is provided
//     if (!donation_date) {
//       return res.status(400).json({ message: "Donation date is required" });
//     }

//     // Find the donor by email
//     const donor = await Donor.findOne({ email: userEmail });
//     if (!donor) {
//       return res.status(404).json({ message: "Donor not found" });
//     }

//     // Create a new DonationDate document
//     const newDonationDate = new DonationDate({
//       donation_date: donation_date,
//     });
//     await newDonationDate.save();

//     // Find the DonationHistory document for the donor
//     let donationHistory = await DonationHistory.findById(donor.donation_history);
//     if (!donationHistory) {
//       // If no DonationHistory exists, create a new one and associate with donor
//       donationHistory = new DonationHistory({
//         donation_dates: [newDonationDate._id],
//       });
//       donor.donation_history = donationHistory._id;
//       await donor.save();
//     } else {
//       // Ensure donationHistory.donation_dates is initialized as an array
//       donationHistory.donation_dates = donationHistory.donation_dates || [];
//       // Add the new DonationDate to the DonationHistory
//       donationHistory.donation_dates.push(newDonationDate._id);
//       await donationHistory.save();
//     }

//     // Respond with success message and data
//     res.status(201).json({ newDonationDate, donationHistory });
//   } catch (error) {
//     // Handle errors
//     console.error("Error updating donation date:", error);
//     res.status(500).json({ error: "Failed to update donation date" });
//   }
// };





const LastDonationDate = async (req, res) => {
  try {
    const userEmail = req.params.email; // Assuming you're retrieving email from params
    const donation_date = req.body.donation_date; // Assuming donation_date is in req.body

    // Check if donation_date is provided
    if (!donation_date) {
      return res.status(400).json({ message: "Donation date is required" });
    }

    // Find the donor by email
    const donor = await Donor.findOne({ email: userEmail });
    if (!donor) {
      return res.status(404).json({ message: "Donor not found" });
    }

    // Find the DonationHistory document for the donor
    let donationHistory = await DonationHistory.findById(donor.donation_history).populate('donation_dates');

    if (!donationHistory) {
      // If no DonationHistory exists, create a new one and associate with donor
      donationHistory = new DonationHistory({
        donation_dates: [],
      });
      donor.donation_history = donationHistory._id;
      await donor.save();
    }

    // Check if the last donation date is at least 4 months prior to the new donation date
    if (donationHistory.donation_dates.length > 0) {
      const recentDonations = donationHistory.donation_dates.map(donation => moment(donation.donation_date));
      const fourMonthsAgo = moment(donation_date).subtract(4, 'months');
      
      const invalidDates = recentDonations.filter(date => moment(date).isAfter(fourMonthsAgo));
      if (invalidDates.length > 0) {

        console.log("One or more donation dates are less than 4 months before the new donation date.");


        return res.status(400).json({ message: "One or more donation dates are less than 4 months before the new donation date." });
      }
    }

    // Create a new DonationDate
    const newDonationDate = new DonationDate({
      donation_date: donation_date,
    });
    await newDonationDate.save();

    // Add the new DonationDate to the DonationHistory
    donationHistory.donation_dates.push(newDonationDate._id);
    await donationHistory.save();

    // Respond with success message and data
    res.status(201).json({  newDonationDate, donationHistory,message: "Last Donation Date Update successful" });
  } catch (error) {
    // Handle errors
    console.error("Error updating donation date:", error);
    res.status(500).json({ error: "Failed to update donation date" });
  }
};




const getDonationDate = async (req, res) => {
  try {
    const email = req.params.email;

    const donor = await Donor.findOne({ email })
      .populate({
        path: 'donation_history',
        populate: {
          path: 'donation_dates',
          options: { sort: { createdAt: -1 } }
        }
        
      })
      .exec();

    if (!donor) {
      return res.status(404).json({ message: 'Donor not found' });
    }

    res.status(200).json(donor);
  } catch (error) {
    console.error('Error fetching donor:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



export { LastDonationDate,getDonationDate };
