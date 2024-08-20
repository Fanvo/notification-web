import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create notification types
  const users = ["Alice", "Henry", "Max", "Kaka"];
  const avatars = [
    "https://www.shutterstock.com/image-vector/african-bearded-man-wearing-tshirt-600nw-1476685571.jpg",
    "https://i.pinimg.com/736x/59/46/c4/5946c4926dbe86f246715bccd85dd4f8.jpg",
    "https://i.pinimg.com/originals/c0/4b/01/c04b017b6b9d1c189e15e6559aeb3ca8.png",
    "https://i.redd.it/trying-to-come-up-with-a-new-avatar-for-my-various-social-v0-wby69l6e1lsb1.jpg",
  ];
  users.forEach(async (name, index) => {
    await prisma.user.create({
      data: {
        username: name,
        avatarUrl: avatars[index]!,
      },
    });
  });
  //
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
