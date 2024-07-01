import { Donor } from "../models/donor.models.js";

const verifyAdmin = async (req, res) => {
  const email = req.params.email;

  if (email !== req.decoded?.email) {
    return res.status(403).send({ message: "Unauthorized access" });
  }

  const user = await Donor.findOne({ useremail: email });

  const isAdmin = user?.role === "admin";



  res.send({ isAdmin });
};

const verifySubAdmin = async (req, res) => {
  const email = req.params.email;

  if (email !== req.decoded?.email) {
    return res.status(403).send({ message: "Unauthorized access" });
  }

  const user = await Donor.findOne({ useremail: email });

  const isSubAdmin = user?.role === "subadmin";

  res.send({ isSubAdmin });
};

export { verifyAdmin, verifySubAdmin };
