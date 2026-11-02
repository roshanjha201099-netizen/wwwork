import type { FC } from 'react';
import { UserRound } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Badge } from '../components/common';

export const ProfilePage: FC = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <h2 className="text-[22px] sm:text-[24px] font-semibold text-[#171717] tracking-tight">
            Profile
          </h2>
          <Badge variant="secondary">Phase 2</Badge>
        </div>
        <p className="text-[13px] text-[#737373]">
          This is the profile placeholder.
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <UserRound size={18} className="text-[#171717]" />
            <CardTitle>User Profile</CardTitle>
          </div>
          <CardDescription>
            Personal profile details, resume attachments, and preferences will be configured in subsequent phases.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="py-8 text-center text-[#737373] text-[13px] border border-dashed border-[#E5E5E5] rounded-md bg-[#FAFAFA]">
            Profile management view scheduled for subsequent phase implementation.
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
