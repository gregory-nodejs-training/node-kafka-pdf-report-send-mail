/*
  Warnings:

  - A unique constraint covering the columns `[code_bar]` on the table `products` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `products.code_bar_unique` ON `products`(`code_bar`);
