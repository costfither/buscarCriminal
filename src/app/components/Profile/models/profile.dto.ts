export class ProfileDTO {
  profileID: string;
  operation: string[] = []; //operacions
  hairColor: string = ''; //color de cabell
  scars: number = 0; //cicatriu
  constitution: string = ''; //constitucio
  skinColor: string = ''; //color de la pell
  bornLocation: string = ''; //lloc de naixement
  name: string = ''; //nom
  dateBorn: string = ''; //data de naixement
  surname2: string = ''; //segon cognom
  ethnic_characteristics: string = ''; // caracteristiques etniques
  eyeColor: string = ''; //color dels ulls
  deaf: boolean = false; //sord
  lackExtremitats: number = 0; //falta de extremitats
  mute: boolean = false; //si es mud
  surname1: string = ''; //primer cognom;
  age: number = 0; //edat
  studies: string[] = []; //llistat d'estudis

  constructor(profileID: string) {
    this.profileID = profileID;
  }
}
