import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const codes = ["PLATFORM_UPDATE", "COMMENT_TAG", "ACCESS_GRANTED", "JOIN_WORKSPACE"];
  codes.forEach(async (type) => {
    await prisma.notificationType.create({
      data: {
        code: type,
        notification: {},
      },
    });
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


