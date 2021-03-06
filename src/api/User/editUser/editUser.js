import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    editUser: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { username, email, avatar, firstName, lastName, bio } = args;
      const { user } = request;
      return await prisma.updateUser({
        where: { id: user.id },
        data: {
          username,
          email,
          avatar,
          firstName,
          lastName,
          bio
        }
      });
    }
  }
};
