/*
  Warnings:

  - You are about to drop the column `typeId` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `NotificationType` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[code]` on the table `NotificationType` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `type` to the `Notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `code` to the `NotificationType` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "NotificationTypeCodeEnum" AS ENUM ('PLATFORM_UPDATE', 'COMMENT_TAG', 'ACCESS_GRANTED', 'JOIN_WORKSPACE');

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_typeId_fkey";

-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "typeId",
ADD COLUMN     "type" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "NotificationType" DROP COLUMN "name",
ADD COLUMN     "code" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "NotificationType_code_key" ON "NotificationType"("code");

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_type_fkey" FOREIGN KEY ("type") REFERENCES "NotificationType"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
