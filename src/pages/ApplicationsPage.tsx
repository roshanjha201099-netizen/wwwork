import type { FC } from 'react';
import { BriefcaseBusiness } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Badge } from '../components/common';

export const ApplicationsPage: FC = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <h2 className="text-[22px] sm:text-[24px] font-semibold text-[#171717] tracking-tight">
            My Applications
          </h2>
          <Badge variant="secondary">Phase 2</Badge>
        </div>
        <p className="text-[13px] text-[#737373]">
          This is the applications placeholder.
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <BriefcaseBusiness size={18} className="text-[#171717]" />
            <CardTitle>Application Pipeline</CardTitle>
          </div>
          <CardDescription>
            Application statuses, interview stages, and notes will be integrated in subsequent phases.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="py-8 text-center text-[#737373] text-[13px] border border-dashed border-[#E5E5E5] rounded-md bg-[#FAFAFA]">
            Applications tracking view scheduled for subsequent phase implementation.
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApplicationsPage;

