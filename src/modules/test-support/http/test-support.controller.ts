import { Request, Response } from "express";
import { CreateTestUserUseCase } from "../application/CreateTestUserUseCase";
import { CleanupTestDataUseCase } from "../application/CleanupTestDataUseCase";
import { CreateTestTeamUseCase, CreateTestTeamDTO } from "../application/CreateTestTeamUseCase";
import { CreateTestCategoryUseCase, CreateTestCategoryDTO } from "../application/CreateTestCategoryUseCase";
import { RegisterUserDTO } from "../../user/application/use-cases/register-user/register-user.use-case";
import { TestEmailService } from "../../user/infrastructure/services/test-email.service";

export class TestSupportController {
  constructor(
    private readonly createTestUserUseCase: CreateTestUserUseCase,
    private readonly cleanupTestDataUseCase: CleanupTestDataUseCase,
    private readonly createTestTeamUseCase: CreateTestTeamUseCase,
    private readonly createTestCategoryUseCase: CreateTestCategoryUseCase
  ) {}

  async createUser(req: Request, res: Response): Promise<Response> {
    try {
      const { name, email, password } = req.body as RegisterUserDTO;

      if (!name || !email || !password) {
        return res.status(400).json({ error: "Missing required fields: name, email, password" });
      }

      const user = await this.createTestUserUseCase.execute({ name, email, password });
      return res.status(201).json(user);
    } catch (error: any) {
      return res.status(500).json({
        error: "Failed to create test user",
        message: error.message,
      });
    }
  }

  async createTeam(req: Request, res: Response): Promise<Response> {
    try {
      const { name } = req.body as CreateTestTeamDTO;

      if (!name) {
        return res.status(400).json({ error: "Missing required field: name" });
      }

      const team = await this.createTestTeamUseCase.execute({ name });
      return res.status(201).json(team);
    } catch (error: any) {
      return res.status(500).json({
        error: "Failed to create test team",
        message: error.message,
      });
    }
  }

  async createCategory(req: Request, res: Response): Promise<Response> {
    try {
      const { name } = req.body as CreateTestCategoryDTO;

      if (!name) {
        return res.status(400).json({ error: "Missing required field: name" });
      }

      const category = await this.createTestCategoryUseCase.execute({ name });
      return res.status(201).json(category);
    } catch (error: any) {
      return res.status(500).json({
        error: "Failed to create test category",
        message: error.message,
      });
    }
  }

  async cleanup(req: Request, res: Response): Promise<Response> {
    try {
      await this.cleanupTestDataUseCase.execute();
      // Also reset the email service stub
      TestEmailService.getInstance().reset();

      return res.status(200).json({ message: "Test data cleaned up successfully" });
    } catch (error: any) {
      console.error("Failed to cleanup test data:", error);
      return res.status(500).json({
        error: "Failed to cleanup test data",
        message: error.message,
      });
    }
  }

  async verifyEmailSent(req: Request, res: Response): Promise<Response> {
    try {
      const { email } = req.query;

      if (!email || typeof email !== "string") {
        return res.status(400).json({ error: "Missing required query parameter: email" });
      }

      const emailService = TestEmailService.getInstance();
      const wasEmailSent = emailService.wasEmailSentTo(email);

      return res.status(200).json({ sent: wasEmailSent });
    } catch (error: any) {
      return res.status(500).json({
        error: "Failed to verify email",
        message: error.message,
      });
    }
  }
}