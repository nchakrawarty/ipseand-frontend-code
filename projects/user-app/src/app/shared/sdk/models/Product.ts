/* tslint:disable */
import {
  Category
} from '../index';

declare var Object: any;
export interface ProductInterface {
  "name": string;
  "price"?: number;
  "totalQuantity"?: number;
  "skuNum"?: string;
  "gender"?: string;
  "brand"?: string;
  "description"?: string;
  "shortDescription"?: string;
  "weight"?: number;
  "size"?: string;
  "dimension"?: Array<any>;
  "subCategoryId"?: Array<any>;
  "categoryId"?: string;
  "material"?: string;
  "ratings"?: number;
  "couponId"?: string;
  "images"?: Array<any>;
  "id"?: any;
  productCategory?: Category[];
}

export class Product implements ProductInterface {
  "name": string;
  "price": number;
  "totalQuantity": number;
  "skuNum": string;
  "gender": string;
  "brand": string;
  "description": string;
  "shortDescription": string;
  "weight": number;
  "size": string;
  "dimension": Array<any>;
  "subCategoryId": Array<any>;
  "categoryId": string;
  "material": string;
  "ratings": number;
  "couponId": string;
  "images": Array<any>;
  "id": any;
  productCategory: Category[];
  constructor(data?: ProductInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Product`.
   */
  public static getModelName() {
    return "Product";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Product for dynamic purposes.
  **/
  public static factory(data: ProductInterface): Product{
    return new Product(data);
  }
  /**
  * @method getModelDefinition
  * @author Julien Ledun
  * @license MIT
  * This method returns an object that represents some of the model
  * definitions.
  **/
  public static getModelDefinition() {
    return {
      name: 'Product',
      plural: 'products',
      path: 'products',
      idName: 'id',
      properties: {
        "name": {
          name: 'name',
          type: 'string'
        },
        "price": {
          name: 'price',
          type: 'number'
        },
        "totalQuantity": {
          name: 'totalQuantity',
          type: 'number'
        },
        "skuNum": {
          name: 'skuNum',
          type: 'string'
        },
        "gender": {
          name: 'gender',
          type: 'string'
        },
        "brand": {
          name: 'brand',
          type: 'string'
        },
        "description": {
          name: 'description',
          type: 'string'
        },
        "shortDescription": {
          name: 'shortDescription',
          type: 'string'
        },
        "weight": {
          name: 'weight',
          type: 'number'
        },
        "size": {
          name: 'size',
          type: 'string'
        },
        "dimension": {
          name: 'dimension',
          type: 'Array&lt;any&gt;'
        },
        "subCategoryId": {
          name: 'subCategoryId',
          type: 'Array&lt;any&gt;'
        },
        "categoryId": {
          name: 'categoryId',
          type: 'string'
        },
        "material": {
          name: 'material',
          type: 'string'
        },
        "ratings": {
          name: 'ratings',
          type: 'number'
        },
        "couponId": {
          name: 'couponId',
          type: 'string'
        },
        "images": {
          name: 'images',
          type: 'Array&lt;any&gt;'
        },
        "id": {
          name: 'id',
          type: 'any'
        },
      },
      relations: {
        productCategory: {
          name: 'productCategory',
          type: 'Category[]',
          model: 'Category',
          relationType: 'hasMany',
          modelThrough: 'Categoryproduct',
          keyThrough: 'categoryId',
          keyFrom: 'id',
          keyTo: 'productId'
        },
      }
    }
  }
}
