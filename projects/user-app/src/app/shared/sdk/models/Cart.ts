/* tslint:disable */

declare var Object: any;
export interface CartInterface {
  "uid": string;
  "products"?: Array<any>;
  "totalAmount"?: number;
  "orderDate"?: Date;
  "status"?: string;
  "id"?: any;
}

export class Cart implements CartInterface {
  "uid": string;
  "products": Array<any>;
  "totalAmount": number;
  "orderDate": Date;
  "status": string;
  "id": any;
  constructor(data?: CartInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Cart`.
   */
  public static getModelName() {
    return "Cart";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Cart for dynamic purposes.
  **/
  public static factory(data: CartInterface): Cart{
    return new Cart(data);
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
      name: 'Cart',
      plural: 'carts',
      path: 'carts',
      idName: 'id',
      properties: {
        "uid": {
          name: 'uid',
          type: 'string'
        },
        "products": {
          name: 'products',
          type: 'Array&lt;any&gt;'
        },
        "totalAmount": {
          name: 'totalAmount',
          type: 'number'
        },
        "orderDate": {
          name: 'orderDate',
          type: 'Date'
        },
        "status": {
          name: 'status',
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
