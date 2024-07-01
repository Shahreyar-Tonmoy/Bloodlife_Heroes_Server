// controllers/donorController.js

import { Donor } from "../models/donor.models.js";

const filterDonors = async (req, res) => {
    try {
      const { district, upzila, union, blood_group } = req.query;

      console.log(blood_group)


  
      const filterCriteria = {};
      if (blood_group) filterCriteria.blood_group = blood_group;
      if (district) filterCriteria.district = district;
      if (upzila) filterCriteria.upzila = upzila;
      if (union) filterCriteria.union = union;

  
      const donors = await Donor.find(filterCriteria)
        .populate("district")
        .populate("upzila")
        .populate("union")
        .populate({
          path: 'donation_history',
          populate: {
            path: 'donation_dates',
            options: { sort: { createdAt: -1 } }
          }
          
        })
        .exec();
  
      res.status(200).json(donors);
    } catch (error) {
      console.error('Error filtering donors:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };


const filterBloodGroup = async (req, res) => {
    try {
      const { blood_group } = req.query;
  
      const filterCriteria = {};
  

      if (blood_group) filterCriteria.blood_group = blood_group;
  
      const donors = await Donor.find(filterCriteria)
        .populate("district")
        .populate("upzila")
        .populate("union")
        .populate({
          path: 'donation_history',
          populate: {
            path: 'donation_dates',
            options: { sort: { createdAt: -1 } }
          }
          
        })
        .exec();
  
      res.status(200).json(donors);
    } catch (error) {
      console.error('Error filtering donors:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  
export { filterDonors,filterBloodGroup };
