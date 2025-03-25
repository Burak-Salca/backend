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

  const mockAdminData = {
    id: 1,
    email: 'admin@test.com',
    password: 'hashedPassword123',
    firstName: 'Test',
    lastName: 'Admin'
  };

  const mockStudentData = {
    id: 2,
    email: 'student@test.com',
    password: 'hashedPassword456',
    firstName: 'Test',
    lastName: 'Student'
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

    mockAdminData.password = await bcrypt.hash('Admin123*', 10);
    mockStudentData.password = await bcrypt.hash('Student123*', 10);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Admin Login Tests', () => {
    it('should successfully login an admin with correct credentials', async () => {
      const loginDto = {
        email: 'admin@test.com',
        password: 'Admin123*'
      };

      mockAdminsService.findByEmail.mockResolvedValue(mockAdminData);
      mockJwtService.sign.mockReturnValue('admin-test-token');

      const result = await service.loginAdmin(loginDto);

      expect(result).toHaveProperty('access_token', 'admin-test-token');
      expect(result.user).toHaveProperty('type', UserType.ADMIN);
      expect(result.user).toHaveProperty('email', mockAdminData.email);
      expect(mockAdminsService.findByEmail).toHaveBeenCalledWith(loginDto.email);
      expect(mockJwtService.sign).toHaveBeenCalledWith({
        sub: mockAdminData.id,
        email: mockAdminData.email,
        type: UserType.ADMIN
      });
    });

    it('should throw UnauthorizedException for invalid admin password', async () => {
      const loginDto = {
        email: 'admin@test.com',
        password: 'Admin1234*'
      };

      mockAdminsService.findByEmail.mockResolvedValue(mockAdminData);

      await expect(service.loginAdmin(loginDto)).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('Student Login Tests', () => {
    it('should successfully login a student with correct credentials', async () => {
      const loginDto = {
        email: 'student@test.com',
        password: 'Student123*'
      };

      mockStudentsService.findByEmail.mockResolvedValue(mockStudentData);
      mockJwtService.sign.mockReturnValue('student-test-token');

      const result = await service.loginStudent(loginDto);

      expect(result).toHaveProperty('access_token', 'student-test-token');
      expect(result.user).toHaveProperty('type', UserType.STUDENT);
      expect(result.user).toHaveProperty('email', mockStudentData.email);
      expect(mockStudentsService.findByEmail).toHaveBeenCalledWith(loginDto.email);
      expect(mockJwtService.sign).toHaveBeenCalledWith({
        sub: mockStudentData.id,
        email: mockStudentData.email,
        type: UserType.STUDENT
      });
    });

    it('should throw UnauthorizedException for invalid student password', async () => {
      const loginDto = {
        email: 'student@test.com',
        password: 'Student1234*'
      };

      mockStudentsService.findByEmail.mockResolvedValue(mockStudentData);

      await expect(service.loginStudent(loginDto)).rejects.toThrow(UnauthorizedException);
    });
  });

}); 