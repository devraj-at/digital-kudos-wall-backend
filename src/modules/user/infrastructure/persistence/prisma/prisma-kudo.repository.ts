import { PrismaClient } from "@prisma/client";
import { KudoCardRepository } from "../../../domain/kudo.repository";
import { KudoCard } from "../../../domain/kudo.entity";

export class PrismaKudoRepository implements KudoCardRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async save(kudo: KudoCard): Promise<void> {
    console.log("kudo", kudo);
    
    await this.prisma.kudoCard.create({
      data: {
        message: kudo.message,
        category: kudo.category,
        senderName: kudo.sender,
        receiverName: kudo.receiver,
        teamName: kudo.team,
        createdAt: new Date(),
      },
    });
  }
}
