/* eslint-disable prettier/prettier */
import { Injectable , NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './product.model';
import {Model } from 'mongoose';

@Injectable()
export class ProductService {
     products: Product[] = [];
     
     constructor(
         @InjectModel('Product') private readonly productModel: Model<Product>
     ){}

     async insertProduct(title: string, description:string, price:number){
        const newProduct = new this.productModel( {title, description, price})

        const result = await newProduct.save()
        console.log(result)
        return result.id

     }

     async getProducts(){
        const products =   await this.productModel.find().exec()
         return products as Product[];
     }

     async getOneProduct(prodID: string){
         
        const product = await this.findProduct(prodID);

         return product
     }

     async updateProduct(prodID: string,title: string, description:string, price:number){

        // const product = await this.findProduct(prodID);
        // const updatedProduct = {...product};

        // if(title){
        //     updatedProduct.title = title;
        // }
        // if(description){
        //     updatedProduct.description = description;
        // }
        // if(price){
        //     updatedProduct.price = price;
        // }
       
        // this.products[productIndex] = updatedProduct;

        
     }

     DeleteProduct(prodID: string){
        const  index = this.findProduct(prodID)[1];

        this.products.splice(index, 1);
     }

     private async findProduct(id:string) : Promise<Product>{
        const product = await this.productModel.findById(id)


        if(!product){
            throw new NotFoundException("Product not found");
        }

        return {
            id: product.id, 
            title: product.title, 
            description: product.description, 
            price: product.price
        }
     }
}
