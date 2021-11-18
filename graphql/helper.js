import User from "../model/User";
import Comment from "../model/Comment";

const dateToString = (date) => new Date(date).toISOString();

export const user = async (userId) => {
  try {
    const findUser = await User.findById(userId);
    return {
      ...findUser._doc,
      _id: findUser.id,
      comments: Comments.bind(this, findUser._doc.comments),
    };
  } catch (err) {
    throw err;
  }
};

export const singleComment = async (commentId) => {
  try {
    const findComment = await Comment.findById(commentId);
    return transformComment(findComment);
  } catch (err) {
    throw err;
  }
};

export const Comments = async (commentIds) => {
  try {
    const findComments = await Comment.find({ _id: { $in: commentIds } });
    return findComments.map((comment) => {
      return transformComment(comment);
    });
  } catch (err) {
    throw err;
  }
};

export const transformComment = (comment) => {
  return {
    ...comment._doc,
    _id: comment.id,
    createdAt: dateToString(comment._doc.createdAt),
    updatedAt: dateToString(comment._doc.updateAt),
    creator: user.bind(this, comment.creator),
  };
};
