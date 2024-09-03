-- DropForeignKey
ALTER TABLE "Posts" DROP CONSTRAINT "Posts_userID_fkey";

-- AddForeignKey
ALTER TABLE "Posts" ADD CONSTRAINT "Posts_userID_fkey" FOREIGN KEY ("userID") REFERENCES "Users "("id") ON DELETE CASCADE ON UPDATE CASCADE;
