import User from "../model/User";
import Comment from "../model/Comment";
import { Comments, transformComment } from "./helper";

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
  getComments: async (parent, args, context, info) => {
    try {
      const allComments = await Comment.find();
      return allComments.map((comment) => transformComment(comment));
    } catch (err) {
      throw err;
    }
  },
};

export default commentResolvers;
