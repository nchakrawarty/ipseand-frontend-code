/* tslint:disable */
import {
  Product
} from '../index';

declare var Object: any;
export interface CategoryInterface {
  "name": string;
  "productId"?: Array<any>;
  "subCategoryId"?: Array<any>;
  "description"?: string;
  "image"?: string;
  "id"?: any;
  proCat?: Product[];
}

export class Category implements CategoryInterface {
  "name": string;
  "productId": Array<any>;
  "subCategoryId": Array<any>;
  "description": string;
  "image": string;
  "id": any;
  proCat: Product[];
  constructor(data?: CategoryInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Category`.
   */
  public static getModelName() {
    return "Category";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Category for dynamic purposes.
  **/
  public static factory(data: CategoryInterface): Category{
    return new Category(data);
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
      name: 'Category',
      plural: 'categories',
      path: 'categories',
      idName: 'id',
      properties: {
        "name": {
          name: 'name',
          type: 'string'
        },
        "productId": {
          name: 'productId',
          type: 'Array&lt;any&gt;'
        },
        "subCategoryId": {
          name: 'subCategoryId',
          type: 'Array&lt;any&gt;'
        },
        "description": {
          name: 'description',
          type: 'string'
        },
        "image": {
          name: 'image',
          type: 'string'
        },
        "id": {
          name: 'id',
          type: 'any'
        },
      },
      relations: {
        proCat: {
          name: 'proCat',
          type: 'Product[]',
          model: 'Product',
          relationType: 'hasMany',
          modelThrough: 'Categoryproduct',
          keyThrough: 'productId',
          keyFrom: 'id',
          keyTo: 'categoryId'
        },
      }
    }
  }
}
