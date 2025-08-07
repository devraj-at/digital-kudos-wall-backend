import { KudoCard } from "./kudo.entity";

export interface KudoCardRepository {
  save(kudoCard: KudoCard):Promise<void>;
}