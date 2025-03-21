import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { AdminsService } from '../admins/admins.service';
import { StudentsService } from '../students/students.service';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserType } from '../_security/enums/type.enum';

describe('AuthService', () => {
  let service: AuthService;
  let adminsService: AdminsService;
  let studentsService: StudentsService;
  let jwtService: JwtService;

  const mockAdminsService = {
    findByEmail: jest.fn(),
    create: jest.fn(),
  };

  const mockStudentsService = {
    findByEmail: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: AdminsService,
          useValue: mockAdminsService,
        },
        {
          provide: StudentsService,
          useValue: mockStudentsService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    adminsService = module.get<AdminsService>(AdminsService);
    studentsService = module.get<StudentsService>(StudentsService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('loginAdmin', () => {
    it('should successfully login an admin with correct credentials', async () => {
      const mockAdmin = {
        id: 1,
        email: 'admin@test.com',
        password: await bcrypt.hash('password123', 10),
        firstName: 'Test',
        lastName: 'Admin',
      };

      const loginDto = {
        email: 'admin@test.com',
        password: 'password123',
      };

      mockAdminsService.findByEmail.mockResolvedValue(mockAdmin);
      mockJwtService.sign.mockReturnValue('test-token');

      const result = await service.loginAdmin(loginDto);

      expect(result).toHaveProperty('access_token', 'test-token');
      expect(result.user).toHaveProperty('type', UserType.ADMIN);
      expect(mockAdminsService.findByEmail).toHaveBeenCalledWith(loginDto.email);
    });

    it('should throw UnauthorizedException for invalid admin credentials', async () => {
      const loginDto = {
        email: 'admin@test.com',
        password: 'wrongpassword',
      };

      mockAdminsService.findByEmail.mockResolvedValue(null);

      await expect(service.loginAdmin(loginDto)).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('loginStudent', () => {
    it('should successfully login a student with correct credentials', async () => {
      const mockStudent = {
        id: 1,
        email: 'student@test.com',
        password: await bcrypt.hash('password123', 10),
        firstName: 'Test',
        lastName: 'Student',
      };

      const loginDto = {
        email: 'student@test.com',
        password: 'password123',
      };

      mockStudentsService.findByEmail.mockResolvedValue(mockStudent);
      mockJwtService.sign.mockReturnValue('test-token');

      const result = await service.loginStudent(loginDto);

      expect(result).toHaveProperty('access_token', 'test-token');
      expect(result.user).toHaveProperty('type', UserType.STUDENT);
      expect(mockStudentsService.findByEmail).toHaveBeenCalledWith(loginDto.email);
    });

    it('should throw UnauthorizedException for invalid student credentials', async () => {
      const loginDto = {
        email: 'student@test.com',
        password: 'wrongpassword',
      };

      mockStudentsService.findByEmail.mockResolvedValue(null);

      await expect(service.loginStudent(loginDto)).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('logout', () => {
    it('should successfully blacklist a token', async () => {
      const token = 'test-token';
      const result = await service.logout(token);

      expect(result.status).toBe(200);
      expect(result.message).toBe('Başarıyla çıkış yapıldı');
    });
  });
}); 