import mongoose from "mongoose";
const { Schema, model } = mongoose;

const districtSchema = new Schema(
  {
    district_name: {
      type: String,
      required: true,
    },
    upzilas: [
      {
        type: Schema.Types.ObjectId,
        ref: "Upzila",
      },
    ],
  },{timestamps: true})

const District = model("District", districtSchema);

const unionSchema = new Schema(
  {
    union_name: {
      type: String,
      required: true,
    },
    upzila_id: {
      type: Schema.Types.ObjectId,
      ref: "Upzila",
      required: true,
    },
  },{timestamps: true})

const Union = model("Union", unionSchema);

const upzilaSchema = new Schema(
  {
    upzila_name: {
      type: String,
      required: true,
    },
    district_id: {
      type: Schema.Types.ObjectId,
      ref: "District",
      required: true,
    },
    unions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Union",
      },
    ],
  },{timestamps: true})

const Upzila = model("Upzila", upzilaSchema);

export { Union, District, Upzila };
