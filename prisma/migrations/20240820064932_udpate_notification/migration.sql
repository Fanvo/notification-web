/*
  Warnings:

  - You are about to drop the column `notificationTypeId` on the `Notification` table. All the data in the column will be lost.
  - Added the required column `typeId` to the `Notification` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_notificationTypeId_fkey";

-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "notificationTypeId",
ADD COLUMN     "typeId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "NotificationType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
