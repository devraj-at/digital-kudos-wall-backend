import { PrismaClient } from "@prisma/client";
import { KudoCardRepository } from "../../../domain/kudo.repository";
import { KudoCard } from "../../../domain/kudo.entity";

export class PrismaKudoRepository implements KudoCardRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async save(kudo: KudoCard): Promise<void> {
    
    await this.prisma.kudoCards.create({
      data: {
        message: kudo.message,
        categoryId: kudo.categoryId,
        fromUserId: kudo.fromUserId,
        toUserId: kudo.toUserId,
        createdAt: new Date(),
      },
    });
  }
}
