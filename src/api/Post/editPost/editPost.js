import { prisma } from "../../../../generated/prisma-client";

const DELETE = "DELETE";
const EDIT = "EDIT";

export default {
  Mutation: {
    editPost: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { id, location, caption, action } = args;
      const { user } = request;
      const post = await prisma.$exists.post({ id, user: { id: user.id } });
      if (post) {
        if (action === EDIT) {
          return await prisma.updatePost({
            where: { id },
            data: { location, caption }
          });
        } else if (action === DELETE) {
          return await prisma.deletePost({ id });
        } else {
          throw Error("잘못된 요청입니다.");
        }
      }
    }
  }
};
