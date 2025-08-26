-- CreateTable
CREATE TABLE "public"."Source" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "mediaId" TEXT NOT NULL,

    CONSTRAINT "Source_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Recap" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Recap_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Media" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_RecapSources" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_RecapSources_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_RecapSources_B_index" ON "public"."_RecapSources"("B");

-- AddForeignKey
ALTER TABLE "public"."Source" ADD CONSTRAINT "Source_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "public"."Media"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_RecapSources" ADD CONSTRAINT "_RecapSources_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Recap"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_RecapSources" ADD CONSTRAINT "_RecapSources_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Source"("id") ON DELETE CASCADE ON UPDATE CASCADE;
