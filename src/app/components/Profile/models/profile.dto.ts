export class ProfileDTO {
  profileID: string;
  operation: string[] | undefined; //operacions
  hairColor: string | undefined; //color de cabell
  scars: number | undefined; //cicatriu
  constitution: string | undefined; //constitucio
  skinColor: string | undefined; //color de la pell
  bornLocation: string | undefined; //lloc de naixement
  name: string | undefined; //nom
  dateBorn: number | undefined; //data de naixement
  surname2: string | undefined; //segon cognom
  ethnic_characteristics: string | undefined; // caracteristiques etniques
  eyeColor: string | undefined; //color dels ulls
  deaf: boolean | undefined; //sord
  lackExtremitats: number | undefined; //falta de extremitats
  mute: boolean | undefined; //si es mud
  surname1: string | undefined; //primer cognom;
  age: number | undefined; //edat
  studies: string[] | undefined; //llistat d'estudis

  constructor(profileID: string) {
    this.profileID = profileID;
  }
}
