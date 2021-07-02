/* eslint-disable prettier/prettier */
import { Controller,Post, Body,Get, Param, Patch, Delete } from '@nestjs/common';
import { ProductService } from './products.service';

@Controller('products')
export class ProductController {
    
    constructor(private readonly productService: ProductService){}
    

    @Post()
    async addProduct( 
        @Body('title') prodTitle: string,
        @Body('description') prodDescription: string,
        @Body('price') prodPrice: number
        ) {
         const generatedId = await this.productService.insertProduct(prodTitle, prodDescription, prodPrice)
         return {id: generatedId} 
        }

    @Get()
    async getAllProducts(){
       const products = this.productService.getProducts()
       return products
    }

    @Get(':id')
    getProduct(@Param('id') prodID: string){
       return this.productService.getOneProduct(prodID);
    }

    @Patch(':id')
    updateProduct(
        @Param('id') prodID: string,
        @Body('title') prodTitle: string,
        @Body('description') prodDescription: string,
        @Body('price') prodPrice: number

    ){
        this.productService.updateProduct(prodID, prodTitle, prodDescription, prodPrice);
        return null;
     }


     @Delete(':id')
     DeleteProduct(
         @Param('id') prodID: string,
     ){
        this.productService.DeleteProduct(prodID)
         return null;
      }
}
