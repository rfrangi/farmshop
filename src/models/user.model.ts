import {Adresse} from './adresse.model';
import {Role} from './role.model';

export class User {

  id: string;
  email: string;
  password: string;
  username: string;
  firstname: string;
  lastname: string;
  civilite: string;
  adresse: Adresse;
  roles: Array<Role>;
  recevoirOffre: boolean;
  creationDate: Date;
  modificationDate: Date;

  constructor(data: any= {}) {
    Object.assign(this, data);
    this.adresse = data.adresse ? new Adresse(data.adresse) : new Adresse();
    this.roles = data.roles ? data.roles.map(role => new Role(role)) : [];
  }

  serialize(): any {
    return {
      id: this.id,
      email: this.email,
      password: this.password,
      username: this.username,
      firstname: this.firstname,
      lastname: this.lastname,
      civilite: this.civilite,
      adresse: this.adresse.serialize(),
      roles: this.roles.length > 0 ? this.roles.map(role => role.id) : [],
      recevoirOffre: this.recevoirOffre,
      creationDate: this.creationDate,
      modificationDate: this.modificationDate,
    };
  }

}
