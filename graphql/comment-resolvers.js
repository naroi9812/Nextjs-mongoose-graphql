import User from "../model/User";
import Comment from "../model/Comment";
import { transformComment } from "./helper";

const commentResolvers = {
  createComment: async (parent, args, context, info) => {
    if (!context.isAuth) {
      throw new Error("Please login");
    }
    try {
      const creator = await User.findById(context.userId);
      if (!creator) {
        throw new Error("User not found");
      }
      const comment = new Comment({
        body: args.body,
        creator: context.userId,
      });
      const res = await comment.save();
      creator.comments.push(res);
      await creator.save();
      return transformComment(res);
    } catch (err) {
      throw err;
    }
  },
};

export default commentResolvers;
