-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" SERIAL NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data" TEXT NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "typeId" INTEGER NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "avatarUrl" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NotificationType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "notificationId" INTEGER NOT NULL,

    CONSTRAINT "NotificationType_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Post_name_idx" ON "Post"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "NotificationType" ADD CONSTRAINT "NotificationType_notificationId_fkey" FOREIGN KEY ("notificationId") REFERENCES "Notification"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
