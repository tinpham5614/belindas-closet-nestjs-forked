import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from 'src/products/services/products/products.service';
import { CreateProductDto } from 'src/products/dto/create-product.dto';
import { UpdateProductDto } from 'src/products/dto/update-product.dto';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RoleGuard } from 'src/auth/role.guard';

@Controller('products')
export class ProductsController {

  private readonly logger = new Logger;
  CONTROLLER: string = ProductsController.name;

  constructor(private readonly productService: ProductsService) { }
  
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post('new')
  async createProduct(@Body() productDto: CreateProductDto) {
    this.logger.log(`Creating Product ${JSON.stringify(productDto, null, '\t')}`, this.CONTROLLER);
    return await this.productService.createProduct(productDto);
  }
  
  @Get('')
  async getProducts() {
    this.logger.log('Finding all Products', this.CONTROLLER);
    return await this.productService.findAll();
  }

  @Get('find/:id')
  async findByID(@Param('id') id: string) {
    this.logger.log(`Finding Product with id: ${id}`, this.CONTROLLER);
    return await this.productService.findOne(id);
  }

  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Put('update/:id')
  async updateProductById(@Param('id') id: string, @Body() productDto: UpdateProductDto) {
    this.logger.log(
      `Updating Product with id: ${id} with: ${JSON.stringify(productDto, null, '\t')}`, 
      this.CONTROLLER
    );
    return await this.productService.updateProduct(id, productDto);
  }
}
 
  // we will more than likely change this delete function to an update sort of like a soft-delete. ex. isDeleted = true

  //  @Roles('admin')
  //  @UseGuards(JwtAuthGuard, RoleGuard)
  //   @Delete('remove/:id')
  //   async deleteProduct(@Res() response, @Param('id') id: string) {
  //     try {
  //       const deletedProduct = await this.productService.delete(id);
  //       return response.status(HttpStatus.OK).json({
  //         message: 'Product successfully deleted',
  //         product: deletedProduct,
  //       });
  //     } catch (error) {
  //       return response.status(HttpStatus.NOT_FOUND).json({
  //         message: "Failed to delete product, please try again",
  //         error: error.message,
  //       });
  //     }
  //   }
  // }
