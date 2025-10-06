-- CreateTable
CREATE TABLE "discoveries" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "company" VARCHAR(255) NOT NULL,
    "responsible" VARCHAR(255) NOT NULL,
    "position" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "phone_number" VARCHAR(50) NOT NULL,
    "whatsapp" BOOLEAN NOT NULL DEFAULT false,
    "challenges" VARCHAR(500) NOT NULL,
    "objectives" VARCHAR(500) NOT NULL,
    "comments" VARCHAR(500),
    "deadline" DECIMAL(10,0),
    "value" DECIMAL(10,0),
    "tools" VARCHAR(255),
    "target" VARCHAR(255),
    "products" VARCHAR(255),

    CONSTRAINT "discoveries_pkey" PRIMARY KEY ("id")
);
