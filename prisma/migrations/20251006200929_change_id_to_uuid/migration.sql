/*
  Warnings:

  - The primary key for the `discoveries` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "discoveries" DROP CONSTRAINT "discoveries_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "discoveries_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "discoveries_id_seq";
