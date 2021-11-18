import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../model/User";
import { Comments } from "./helper";

const userResolvers = {
  // getUsers: async (parent, args, context, info) => {
  //   try {
  //     const users = await User.find();
  //     return users.map((user) => {
  //       return { ...user._doc, _id: user.id };
  //     });
  //   } catch (err) {
  //     throw err;
  //   }
  // },
  createUser: async (parent, args, context, info) => {
    try {
      const findUser = await User.findOne({ email: args.email });
      if (findUser) {
        throw new Error("User already exist");
      }
      const hashedPw = await bcrypt.hash(args.password, 12);
      const newUser = new User({
        email: args.email,
        password: hashedPw,
      });
      const res = await newUser.save();
      return {
        ...res._doc,
        password: null,
        _id: res.id,
        comments: Comments.bind(this, res._doc.comments),
      };
    } catch (err) {
      throw err;
    }
  },
  login: async (parent, args, context, info) => {
    try {
      const findUser = await User.findOne({ email: args.email });
      const { email, password: hashedPw } = findUser._doc;
      const valid = await bcrypt.compare(args.password, hashedPw);
      if (valid) {
        const token = jwt.sign(
          { userId: findUser.id, email: findUser.email },
          process.env.JWT_SECRET,
          {
            expiresIn: "12h",
          }
        );
        // set 12 hr
        return {
          userId: findUser.id,
          token,
          tokenExpiration: Date.now() + 12 * 60 * 60 * 1000,
        };
      } else {
        throw new Error("Email or password is incorrect");
      }
    } catch (err) {
      throw err;
    }
  },
};

export default userResolvers;
