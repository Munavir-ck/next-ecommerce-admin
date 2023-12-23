import NextAuth from "next-auth";
import configENV from "@/config";
import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/lib/mongooseConnect";
import UserModel from "@/model/adminModel";
import { use } from "react";

interface GoogleProviderConfig {
  clientId: string;
  clientSecret: string;
}

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: configENV.GOOGLE_ID,
      clientSecret: configENV.GOOGLE_SECRET,
    } as GoogleProviderConfig),
  ],

  callbacks: {
    async signIn(params) {
      await connectDB();

      const { user, account, profile } = params;
    //   const newUser = new UserModel({
    //     email: user.email,
      
    //   });
    //   await newUser.save();

      const existingUser = await UserModel.findOne({ email: user.email });


      if (existingUser) {
        return true;
      } else {
        return false;
      }
    },
  },
});
