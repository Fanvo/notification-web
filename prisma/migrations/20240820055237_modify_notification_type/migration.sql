/*
  Warnings:

  - You are about to drop the column `typeId` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `notificationId` on the `NotificationType` table. All the data in the column will be lost.
  - Added the required column `notificationTypeId` to the `Notification` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "NotificationType" DROP CONSTRAINT "NotificationType_notificationId_fkey";

-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "typeId",
ADD COLUMN     "notificationTypeId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "NotificationType" DROP COLUMN "notificationId";

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_notificationTypeId_fkey" FOREIGN KEY ("notificationTypeId") REFERENCES "NotificationType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
