/* tslint:disable */

declare var Object: any;
export interface UserProfileInterface {
  "firstName": string;
  "lastName"?: string;
  "email": string;
  "primaryContactNum": number;
  "secondaryContactNum"?: number;
  "password": string;
  "lastLogin"?: Date;
  "emailVerified"?: boolean;
  "verificationLink"?: string;
  "address"?: Array<any>;
  "id"?: any;
}

export class UserProfile implements UserProfileInterface {
  "firstName": string;
  "lastName": string;
  "email": string;
  "primaryContactNum": number;
  "secondaryContactNum": number;
  "password": string;
  "lastLogin": Date;
  "emailVerified": boolean;
  "verificationLink": string;
  "address": Array<any>;
  "id": any;
  constructor(data?: UserProfileInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `UserProfile`.
   */
  public static getModelName() {
    return "UserProfile";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of UserProfile for dynamic purposes.
  **/
  public static factory(data: UserProfileInterface): UserProfile{
    return new UserProfile(data);
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
      name: 'UserProfile',
      plural: 'userProfiles',
      path: 'userProfiles',
      idName: 'id',
      properties: {
        "firstName": {
          name: 'firstName',
          type: 'string'
        },
        "lastName": {
          name: 'lastName',
          type: 'string'
        },
        "email": {
          name: 'email',
          type: 'string'
        },
        "primaryContactNum": {
          name: 'primaryContactNum',
          type: 'number'
        },
        "secondaryContactNum": {
          name: 'secondaryContactNum',
          type: 'number'
        },
        "password": {
          name: 'password',
          type: 'string'
        },
        "lastLogin": {
          name: 'lastLogin',
          type: 'Date'
        },
        "emailVerified": {
          name: 'emailVerified',
          type: 'boolean'
        },
        "verificationLink": {
          name: 'verificationLink',
          type: 'string'
        },
        "address": {
          name: 'address',
          type: 'Array&lt;any&gt;'
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
