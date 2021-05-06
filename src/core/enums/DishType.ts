export enum DishType {
  Takoyaki = 'Takoyaki',
  Katsudon = 'Katsudon',
  Udon =  'Udon',
  Ramen = 'Ramen',
  MatchaCookie = 'MatchaCookie',
}

export function isDishType(value: string): value is DishType {
  return value in DishType
}

export default DishType
