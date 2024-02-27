import { mongoose } from 'mongoose';
const { Schema } = mongoose;
const profileSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    hobby: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);
export const Profile = mongoose.models.Profile || mongoose.model('Profile', profileSchema);
