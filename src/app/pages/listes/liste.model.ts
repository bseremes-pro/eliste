import { ShellModel } from '../../shell/data-store';

export class ListeValeurModel extends ShellModel {
  id: string;
  index: number;

  constructor() {
    super();
  }
}
export class SchemaItem extends ShellModel {
  nom: string;
  type: string;
  estTableau: boolean;

  constructor() {
    super();
  }
}

export class LivreBaseModel extends ShellModel {
  id: string;
  titre: string;
  desc: string;
  schema: [SchemaItem];
  pValeurs: [ListeValeurModel];
  estPublic: boolean;
  majLe: string;

  /**
   * Initialise l'instance
   * @param data données optionnelles d'initialisation
   */
  constructor(data: any = {}) {
    super();
    this.id = data.id ? data.id : this.id || '';
    this.titre = data.titre ? data.titre : this.titre || '';
    this.desc = data.desc ? data.desc : this.desc || '';
    this.schema = data.schema ? data.schema : this.schema || [];
    this.pValeurs = data.pValeurs ? data.pValeurs : this.pValeurs || [];
    this.majLe = data.majLe ? data.majLe : this.majLe || '';
  }
}
