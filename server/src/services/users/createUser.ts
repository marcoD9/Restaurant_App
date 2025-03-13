import { PrismaClient } from "@prisma/client";

const createUser = async (
  username: string,
  password: string,
  name: string,
  email: string,
  phoneNumber: string
) => {
  const newUser = {
    username,
    password,
    name,
    email,
    phoneNumber,
  };

  const prisma = new PrismaClient();
  const user = await prisma.user.create({
    data: newUser,
  });
  return user;
};

export default createUser;
