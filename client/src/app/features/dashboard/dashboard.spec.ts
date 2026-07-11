import { signal } from '@angular/core';

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideRouter } from '@angular/router';

import { of } from 'rxjs';

import { vi } from 'vitest';

import { User } from '../../core/models/user.model';

import { AuthService } from '../../core/services/auth.service';

import { UserService } from '../../core/services/user.service';

import { Dashboard } from './dashboard';

describe('Dashboard', () => {
  let component: Dashboard;
  let fixture: ComponentFixture<Dashboard>;

  const adminUser: User = {
    _id: 'admin-user-id',
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@angularhub.com',
    role: 'admin',
  };

  const userServiceMock = {
    getStatistics: vi.fn().mockReturnValue(
      of({
        totalUsers: 10,
        totalAdmins: 2,
        totalRegularUsers: 8,
        recentRegistrations: 3,
      }),
    ),
  };

  const authServiceMock = {
    currentUser: signal<User | null>(adminUser).asReadonly(),

    isAdmin: signal(true).asReadonly(),

    hasPermission: vi.fn().mockReturnValue(true),
  };

  beforeEach(async () => {
    vi.clearAllMocks();

    await TestBed.configureTestingModule({
      imports: [Dashboard],
      providers: [
        provideRouter([]),
        {
          provide: AuthService,
          useValue: authServiceMock,
        },
        {
          provide: UserService,
          useValue: userServiceMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Dashboard);

    component = fixture.componentInstance;

    fixture.detectChanges();

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load statistics for admin user', () => {
    expect(userServiceMock.getStatistics).toHaveBeenCalled();

    expect(component.statistics()).toEqual({
      totalUsers: 10,
      totalAdmins: 2,
      totalRegularUsers: 8,
      recentRegistrations: 3,
    });
  });
});
