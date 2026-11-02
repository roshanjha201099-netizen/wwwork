import { useState, useEffect, type FC } from 'react';
import { Link } from 'react-router-dom';
import { User as UserIcon, Mail, ShieldCheck, Hash, Briefcase, ArrowRight, Calendar } from 'lucide-react';
import { authService } from '../services/authService';
import { mockUser } from '../data/mockUser';
import type { User } from '../types/auth';
import { useApplications } from '../hooks/useApplications';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Badge, Button } from '../components/common';

export const ProfilePage: FC = () => {
  const { appliedCount } = useApplications();
  const [currentUser, setCurrentUser] = useState<User>(mockUser);

  useEffect(() => {
    let isMounted = true;
    authService.getCurrentUser().then((user) => {
      if (isMounted && user) {
        setCurrentUser(user);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="space-y-1">
        <h2 className="text-[22px] sm:text-[24px] font-semibold text-[#171717] tracking-tight">
          User Profile
        </h2>
        <p className="text-[13px] text-[#737373]">
          Account details and application tracking statistics.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* User Card */}
        <Card className="md:col-span-2 bg-[#FFFFFF] border border-[#E5E5E5]">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-md bg-[#171717] text-[#FFFFFF] flex items-center justify-center text-[15px] font-bold font-mono shrink-0">
                {currentUser.avatarInitials}
              </div>
              <div>
                <CardTitle>{currentUser.name}</CardTitle>
                <CardDescription>{currentUser.role || 'Member'}</CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-4 pt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[13px]">
              <div className="p-3 border border-[#E5E5E5] rounded-md bg-[#FAFAFA] space-y-1">
                <div className="flex items-center gap-1.5 text-[#737373]">
                  <Mail size={14} />
                  <span>Email Address</span>
                </div>
                <div className="font-medium text-[#171717]">{currentUser.email}</div>
              </div>

              <div className="p-3 border border-[#E5E5E5] rounded-md bg-[#FAFAFA] space-y-1">
                <div className="flex items-center gap-1.5 text-[#737373]">
                  <Hash size={14} />
                  <span>User Identifier</span>
                </div>
                <div className="font-mono text-[12px] text-[#171717]">{currentUser.id}</div>
              </div>

              <div className="p-3 border border-[#E5E5E5] rounded-md bg-[#FAFAFA] space-y-1">
                <div className="flex items-center gap-1.5 text-[#737373]">
                  <ShieldCheck size={14} />
                  <span>Account Tier</span>
                </div>
                <div className="font-medium text-[#171717]">
                  <Badge variant="secondary" className="text-[11px] py-0">
                    {currentUser.accountType}
                  </Badge>
                </div>
              </div>

              <div className="p-3 border border-[#E5E5E5] rounded-md bg-[#FAFAFA] space-y-1">
                <div className="flex items-center gap-1.5 text-[#737373]">
                  <Calendar size={14} />
                  <span>Member Since</span>
                </div>
                <div className="font-medium text-[#171717]">{currentUser.joinedDate || 'Recently'}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Application Stats Card */}
        <Card className="bg-[#FFFFFF] border border-[#E5E5E5] flex flex-col justify-between">
          <div>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Briefcase size={16} className="text-[#171717]" />
                <CardTitle className="text-[15px]">Application Pipeline</CardTitle>
              </div>
              <CardDescription>
                Summary of submissions recorded in this session.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 border border-[#E5E5E5] rounded-md bg-[#FAFAFA] text-center space-y-1">
                <div className="text-[32px] font-bold text-[#171717] tracking-tight leading-none">
                  {appliedCount}
                </div>
                <div className="text-[12px] text-[#737373] uppercase tracking-wider font-medium">
                  {appliedCount === 1 ? 'Job Applied' : 'Jobs Applied'}
                </div>
              </div>
            </CardContent>
          </div>

          <div className="p-4 border-t border-[#E5E5E5]">
            <Link to="/applications" className="w-full block">
              <Button size="sm" variant="secondary" className="w-full" icon={<ArrowRight size={14} />} iconPosition="right">
                View Applications
              </Button>
            </Link>
          </div>
        </Card>
      </div>

      {/* Info notice */}
      <div className="p-3 border border-[#E5E5E5] rounded-md bg-[#FAFAFA] flex items-center gap-2 text-[12px] text-[#737373]">
        <UserIcon size={14} className="text-[#171717] shrink-0" />
        <span>Profile editing, password reset, and organization preferences will be unlocked in later phases.</span>
      </div>
    </div>
  );
};

export default ProfilePage;
