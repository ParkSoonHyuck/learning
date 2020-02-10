import { generateLoginSecret, sendSecretMail } from "../../../utils";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    requestSecret: async (_, args, { request }) => {
      console.log(request);
      const { email } = args;
      const loginSecret = generateLoginSecret();
      console.log(loginSecret);
      try {
        await sendSecretMail(email, loginSecret);
        await prisma.updateUser({ where: { email }, data: { loginSecret } });
        return true;
      } catch {
        return false;
      }
    }
  }
};
