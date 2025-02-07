import mongoose from "mongoose";

const dataSchema = mongoose.Schema({
  about: {
    aboutTitle: {
      type: String,
    },
    aboutDescription: {
      type: String,
    },
  },
  // uses: {
  //   data1: {
  //     description1: String,
  //     image1: String,
  //     title1: String,
  //   },
  //   data2: {
  //     description2: String,
  //     image2: String,
  //     title2: String,
  //   },
  //   data3: {
  //     description3: String,
  //     image3: String,
  //     title3: String,
  //   },
  //   data4: {
  //     description4: String,
  //     image4: String,
  //     title4: String,
  //   },
  //   data5: {
  //     description5: String,
  //     image5: String,
  //     title5: String,
  //   },
  //   data6: {
  //     description6: String,
  //     image6: String,
  //     title6: String,
  //   },
  // },
});

const Data = mongoose.model("data", dataSchema);

export default Data;
