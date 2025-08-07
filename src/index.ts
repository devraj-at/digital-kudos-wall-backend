import dotenv from "dotenv";
import { createApp } from "./app";
import { RegisterUserUseCase } from "./modules/user/application/use-cases/register-user/register-user.use-case";
import { LoginUseCase } from "./modules/user/application/use-cases/login/login.use-case";
import { PrismaUserRepository } from "./modules/user/infrastructure/persistence/prisma/prisma-user.repository";
import { NodemailerEmailService } from "./modules/user/infrastructure/services/nodemailer-email.service";
import { TestEmailService } from "./modules/user/infrastructure/services/test-email.service";
import { EmailService } from "./modules/user/domain/email.service";
import { prisma } from "./shared/infrastructure/persistence/prisma/client";
import { CreateKudoUseCase } from "./modules/kudos/application/use-cases/create-kudos/create-kudos.use-case";
import { PrismaKudoRepository } from "./modules/user/infrastructure/persistence/prisma/prisma-kudo.repository";

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 3001;

// Initialize infrastructure dependencies
const userRepository = new PrismaUserRepository(prisma);
const kudoRepository = new PrismaKudoRepository(prisma);
// Configure email service based on environment
let emailService: EmailService;
if (process.env.NODE_ENV === "test" || process.env.NODE_ENV === "uat") {
  emailService = TestEmailService.getInstance();
} else {
  emailService = new NodemailerEmailService();
}

// Initialize use cases with their dependencies
const registerUserUseCase = new RegisterUserUseCase(userRepository, emailService);
const loginUseCase = new LoginUseCase(userRepository);
const createKudoUseCase = new CreateKudoUseCase(kudoRepository);

// Create and start the application
const app = createApp({
  registerUserUseCase,
  loginUseCase,
  createKudoUseCase,
});

app.listen(PORT, () => {
  console.log(`🚀 Digital Kudos Wall Backend running on port ${PORT}`);
});
