/* tslint:disable */

declare var Object: any;
export interface SeatsInterface {
  "name": string;
  "status": string;
  "price": number;
  "id"?: any;
}

export class Seats implements SeatsInterface {
  "name": string;
  "status": string;
  "price": number;
  "id": any;
  constructor(data?: SeatsInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Seats`.
   */
  public static getModelName() {
    return "Seats";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Seats for dynamic purposes.
  **/
  public static factory(data: SeatsInterface): Seats{
    return new Seats(data);
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
      name: 'Seats',
      plural: 'seat',
      path: 'seat',
      idName: 'id',
      properties: {
        "name": {
          name: 'name',
          type: 'string'
        },
        "status": {
          name: 'status',
          type: 'string',
          default: 'blank'
        },
        "price": {
          name: 'price',
          type: 'number'
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
