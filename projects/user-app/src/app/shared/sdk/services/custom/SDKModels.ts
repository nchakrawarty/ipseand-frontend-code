/* tslint:disable */
import { Injectable } from '@angular/core';
import { User } from '../../models/User';
import { UserProfile } from '../../models/UserProfile';
import { Product } from '../../models/Product';
import { Category } from '../../models/Category';

export interface Models { [name: string]: any }

@Injectable()
export class SDKModels {

  private models: Models = {
    User: User,
    UserProfile: UserProfile,
    Product: Product,
    Category: Category,
    
  };

  public get(modelName: string): any {
    return this.models[modelName];
  }

  public getAll(): Models {
    return this.models;
  }

  public getModelNames(): string[] {
    return Object.keys(this.models);
  }
}
