import { signal } from '@angular/core';

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { of } from 'rxjs';

import { vi } from 'vitest';

import { User } from '../../core/models/user.model';

import { AuthService } from '../../core/services/auth.service';

import { NotificationService } from '../../core/services/notification.service';

import { UserService } from '../../core/services/user.service';

import { Users } from './users';

describe('Users', () => {
  let component: Users;
  let fixture: ComponentFixture<Users>;

  const adminUser: User = {
    _id: 'admin-user-id',
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@angularhub.com',
    role: 'admin',
  };

  const regularUser: User = {
    _id: 'regular-user-id',
    firstName: 'Normal',
    lastName: 'User',
    email: 'user@angularhub.com',
    role: 'user',
    createdAt: '2026-07-11T10:00:00.000Z',
  };

  const userServiceMock = {
    getUsersPage: vi.fn().mockReturnValue(
      of({
        users: [regularUser],
        pagination: {
          page: 1,
          limit: 10,
          total: 1,
          totalPages: 1,
        },
      }),
    ),

    getStatistics: vi.fn().mockReturnValue(
      of({
        totalUsers: 2,
        totalAdmins: 1,
        totalRegularUsers: 1,
        recentRegistrations: 1,
      }),
    ),

    getUserById: vi.fn().mockReturnValue(of(regularUser)),

    updateUserRole: vi.fn(),

    deleteUser: vi.fn(),
  };

  const authServiceMock = {
    currentUser: signal<User | null>(adminUser).asReadonly(),
  };

  const notificationServiceMock = {
    success: vi.fn(),
    error: vi.fn(),
    warning: vi.fn(),
    info: vi.fn(),
  };

  beforeEach(async () => {
    vi.clearAllMocks();

    await TestBed.configureTestingModule({
      imports: [Users],
      providers: [
        {
          provide: UserService,
          useValue: userServiceMock,
        },
        {
          provide: AuthService,
          useValue: authServiceMock,
        },
        {
          provide: NotificationService,
          useValue: notificationServiceMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Users);

    component = fixture.componentInstance;

    fixture.detectChanges();

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load users', () => {
    expect(userServiceMock.getUsersPage).toHaveBeenCalled();

    expect(component.users()).toEqual([regularUser]);

    expect(component.totalUsers()).toBe(1);
  });

  it('should load statistics', () => {
    expect(userServiceMock.getStatistics).toHaveBeenCalled();

    expect(component.statistics()).toEqual({
      totalUsers: 2,
      totalAdmins: 1,
      totalRegularUsers: 1,
      recentRegistrations: 1,
    });
  });

  it('should identify current user', () => {
    expect(component.isCurrentUser(adminUser)).toBe(true);

    expect(component.isCurrentUser(regularUser)).toBe(false);
  });
});
