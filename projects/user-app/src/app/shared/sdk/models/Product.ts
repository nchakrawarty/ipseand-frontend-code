/* tslint:disable */

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
  "subCategory"?: string;
  "id"?: any;
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
  "subCategory": string;
  "id": any;
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
        "subCategory": {
          name: 'subCategory',
          type: 'string'
        },
        "id": {
          name: 'id',
          type: 'any'
        },
      },
      relations: {
      }
    }
  }
}