import { IsEmpty, IsOptional, IsString, IsBoolean, IsEnum } from "class-validator";
import { User } from "../../user/schemas/user.schema";

export class CreateProductDto {
    @IsEmpty({message: 'ID field is not required'})
    readonly createdByUser: User;
    
    @IsEnum(['Shoes', 'Shirts', 'Pants', 'Skirts', 'Jacket/Blazer', 'Dress', 'Casual Wear', 'Suits', 'Accessories'])
    readonly productType: [];
  
    @IsOptional()
    @IsEnum(['MALE','FEMALE', 'NON_BINARY'])
    readonly productGender: [];
  
    @IsOptional()
    @IsEnum([null, 5, 6, 7, 8, 9, 10, 11, 12])
    readonly productSizeShoe: [];
  
    @IsOptional()
    @IsEnum(['SELECT_SIZE', 'XS', 'S', 'M', 'L', 'XL', 'XXL'])
    readonly productSizes: [];
  
    @IsOptional()
    @IsEnum([null, 28, 30, 32, 34, 36, 38, 40, 42])
    readonly productSizePantsWaist: []; // Assuming size is a number
  
    @IsOptional()
    @IsEnum([null, 28, 30, 32, 34, 36, 38, 40, 42])
    readonly productSizePantsInseam: []; // Assuming size is a number
  
    @IsOptional()
    @IsString()
    readonly productDescription: string;
  
    @IsOptional()
    @IsString()
    readonly productImage: string;
  
    @IsOptional()
    @IsBoolean()
    readonly isHidden: boolean;
  
    @IsOptional()
    @IsBoolean()
    readonly isSold: boolean;
}