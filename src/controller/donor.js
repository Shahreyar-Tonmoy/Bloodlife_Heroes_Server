// controllers/donorController.js

import { Donor } from "../models/donor.models.js";
import admin from "firebase-admin";
import { DonationHistory } from "../models/donationHistory.models.js";


const serviceAccount =
 {
  "type": "service_account",
  "project_id": "bloodlife-heroes",
  "private_key_id": "7be9b5ce93834c9458229519513951ec3d923e6b",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDSONskYmEdfWDg\nMUNQcT6DJkAfSaboscf0ZTo9oBpULuBYIO8XRQ5HvJjw9iiqCSdG1vYcohE0Dj0A\nb/Ihh2tFYv2EswiRVwsHWu/GMKzM+6S2LRLPi5b3mSdf2R+GMlFerTSEgHX9XnFG\nKwaGQLB26lmSiAe0NoGAtLXOS9L5SFyrS6qa7AUssmfM4mFOF/3+rd5nugc7Qujr\nZassI669+t8NoTBh6L3//bJFHK/1/zj6ILeXsGRHrcrNKyO/4cSGrEMZvtdjBt07\nQ9rynYO5kj3PnrO7MrMi5239vkF5NxK348pQW4MXlwEq+rWs4/d8B/3vmOJ2SVsv\nLB1lOPGjAgMBAAECggEAGpi15QMLXWNE8+hXp2BEc+xNdYfodY00io+aEDzmx9rM\naGn2Rd/nQB00zlueZnDVBsnghlvcyFS61AjVvfc3k6ZEA9twzI6SJyKSrmTvH9oA\ni0nllNuIxJecWyyJp/1KvSs1t0PXabBerW15HFgn20un/Hl4XAz/UmzKiaifLwmF\nczFFZi0w3LjQ2ZVV/Gson9JaK/yIQrL0NxDm4OgoYJDGT1+okBgzudx/X/1/rWKY\nwa9zea6nbmaXZJn+2QNqfwN/zDpfRd/1X0mLBZYArovN8401XZfySaelAp5JVXwy\niNV41iGLS2mFegiTGQ/13jhdcrDWxxKxHvg1Xwdi8QKBgQDuRQv1alUYwlV8jsJd\np7ThYJJNpFBzAsGWcAh/6MAJFVuejCKcE0nBZI+tWoblFee0YSq1hnG5WJ+LcF9j\nzh87spw5SsBf7Y87maj97IUHMGf45oNEZD26vxOJc0YwtX0VcWlpX6CM94gESYVb\nu771fbl1GGDxtRyOvAGLuiDiEQKBgQDh3YMa5MXx5gMGLykO+SSiidq6ay5Kl5fw\n1s/jAZfwyTygKtw1rtHAMsGy1eccrqcNKhEoXRnEwlEs6KHWqwhXsWfWUUf+0pg2\nWTicDxBnhhvhqtfCbi5DMmoUPBF4KBG8SFCdb8zPOV3Ez10z+hi0zOJX5vDCVjWj\naXoPxRkkcwKBgC12vU5pqK0dv6QRtWKbcnciryfjd3pKh1fGLskBR0s0aRP6l0wC\nnispngSs5lpl8J1JgRW7/o0oLOE1Yu4vUWRZs1d3PPfQ42iy7DzvWX7CrMQgb+Gn\n4uN0PC0Y8sauipyB1GRH2+GqBakTwj97tncvMyj1quHT9gwCMaVQsZ+RAoGATQXq\nKKitbBGBJIG+obGKsbcLFRlp3twVX3cRy5sGgoFNoF0dXV0xgDaO4XqaZqiUpSOc\nWERvfi652fO3BOqsXKNOAsMTJy4P5DDG4kks0fDk3y8Qhuhl9Fpj3GSjnHMloSyT\n+SxgDqbEeFIyuX/nHvjjkxBZOByIDCLzEh+ntEsCgYEA41PBMMBk/2NFgOkxr9hR\nV6WtNW1EkFTQqUtJruOk81S7VVMd0aPqMj3Ugobne6H5ZdrFQeaEdZGzYQu+WYnU\nzqrrEIzhezLvGjC5wEVSUndzEiVyqIOW6LDOeftWPVpyW+PgmfJBVFkESbDakpeW\ndRM8i4rtQsJ3kWdMRkREdOs=\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-jvpjz@bloodlife-heroes.iam.gserviceaccount.com",
  "client_id": "101848336739032772144",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-jvpjz%40bloodlife-heroes.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}


// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});





const createDonor = async (req, res) => {
  try {
    const donorData = req.body;

    // Check if a donor with the same email or phone number already exists
    const existingDonor = await Donor.findOne({
      $or: [{ email: donorData.email }, { phone: donorData.phone }],
    });

    if (existingDonor) {
      // If donor already exists, respond with a message
      return res
        .status(201)
        .json({
          message: "Donor with this email or phone number already exists",
        });
    }
    // Create a new Donor instance
    const newDonor = new Donor(donorData);

    // Create Firebase user account
    const firebaseUser = await admin.auth().createUser({
      email: donorData.email,
      password: donorData.password,
      photoURL: donorData.image, // Make sure to handle password securely
    });

    const donationHistory = new DonationHistory();
    await donationHistory.save();

    newDonor.donation_history = donationHistory._id;
   const savedDonor = await newDonor.save();

    // Respond with success message and saved donor details
    res.status(200).json({
      message: "Donor registered successfully",
      donor: savedDonor,
      firebaseUser: firebaseUser, // Optionally include Firebase user details
    });
  } catch (error) {
    // Handle errors
    console.error("Error creating donor:", error);
    res.status(500).json({ error: "Failed to register donor" });
  }
};

const getDonors = async (req, res) => {
  try {
    const donors = await Donor.find()
      .populate("district")
      .populate("union")
      .populate("upzila");

    res.json(donors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const getAdminStatus = async (req, res) => {
  try {
    const userEmail = req.params.email;
    const donor = await Donor.findOne({ email: userEmail });

    if (!donor) {
      res.status(404).json({ message: 'Donor not found' });
      return;
    }

    res.json({ donor });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};













export { createDonor, getDonors,getAdminStatus };
