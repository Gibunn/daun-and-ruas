-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "fullname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "is_admin" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AddressTable" (
    "id" TEXT NOT NULL,
    "address_label" TEXT NOT NULL,
    "receiver_name" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "complete_address" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "postal_code" TEXT NOT NULL,
    "main_address" BOOLEAN NOT NULL DEFAULT false,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "AddressTable_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AddressTable" ADD CONSTRAINT "AddressTable_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
