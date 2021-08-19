import { IsNotEmpty } from 'class-validator';

class CreateProduct {
  @IsNotEmpty()
  codeBar: string;

  @IsNotEmpty()
  description: string;

  price: number;
  quantity: number;
  userId: string;

  constructor(codeBar: string, description: string, price: number, quantity: number, userId: string) {
    this.codeBar = codeBar;
    this.description = description;
    this.price = price;
    this.quantity = quantity;
    this.userId = userId;
  }
}

export { CreateProduct };
