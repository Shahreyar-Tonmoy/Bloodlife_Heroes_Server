import { District, Union, Upzila } from "../models/region.models.js";



const addRegion = async (req, res) => {
    try {
      const { districtName, upzilaName, unionName } = req.body;
  
      // Create or find the district
      let district = await District.findOne({ district_name: districtName });
      if (!district) {
        district = new District({ district_name: districtName });
        await district.save();
      }
  
      // Create or find the upzila
      let upzila = await Upzila.findOne({ upzila_name: upzilaName, district_id: district._id });
      if (!upzila) {
        upzila = new Upzila({ upzila_name: upzilaName, district_id: district._id });
        await upzila.save();
        district.upzilas.push(upzila._id);
        await district.save();
      }
  
      // Create or find the union
      let union = await Union.findOne({ union_name: unionName, upzila_id: upzila._id });
      if (!union) {
        union = new Union({ union_name: unionName, upzila_id: upzila._id });
        await union.save();
        upzila.unions.push(union._id);
        await upzila.save();
      }
  
      res.status(201).json({ message: 'Region added successfully', district, upzila, union });
    } catch (error) {
      console.error('Error adding region:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
  


  const getRegion = async (req, res) => {
    try {
      const districts = await District.find()
        .populate({
          path: 'upzilas',
          populate: {
            path: 'unions'
          }
        })
        .exec();
  
      res.status(200).json(districts);
    } catch (error) {
      console.error('Error fetching regions:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }




  export  {addRegion,getRegion}