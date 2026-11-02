import type { MockUser } from '../types/auth';

export const mockUser: MockUser = {
  id: 'demo_user_001',
  name: 'Demo User',
  email: 'demo@example.com',
  accountType: 'Internal Demo Account',
  joinedDate: 'October 2026',
  role: 'Software Engineer',
  avatarInitials: 'DU',
};

export default mockUser;
