-- CreateTable
CREATE TABLE "_applications" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_applications_AB_unique" ON "_applications"("A", "B");

-- CreateIndex
CREATE INDEX "_applications_B_index" ON "_applications"("B");

-- AddForeignKey
ALTER TABLE "_applications" ADD CONSTRAINT "_applications_A_fkey" FOREIGN KEY ("A") REFERENCES "FreelancerProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_applications" ADD CONSTRAINT "_applications_B_fkey" FOREIGN KEY ("B") REFERENCES "Vacancy"("id") ON DELETE CASCADE ON UPDATE CASCADE;
