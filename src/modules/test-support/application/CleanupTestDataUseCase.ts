import { PrismaClient } from "@prisma/client";
import { UserRepository } from "../../user/domain/user.repository";
import { prisma } from "../../../shared/infrastructure/persistence/prisma/client";

export class CleanupTestDataUseCase {
  private readonly prisma: PrismaClient;

  constructor(
    private readonly userRepository: UserRepository,
    prismaClient: PrismaClient = prisma
  ) {
    this.prisma = prismaClient;
  }

  async execute(): Promise<void> {
    // Clean up users
    await this.userRepository.deleteAll();

    // Clean up teams
    await this.prisma.team.deleteMany();

    // Clean up categories
    await this.prisma.category.deleteMany();

    // In a more sophisticated setup, you might want to:
    // 1. Only delete entities created during tests (e.g., with a test flag)
    // 2. Reset sequences/auto-increment values
  }
}