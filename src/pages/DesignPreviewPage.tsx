import { useState, type FC } from 'react';
import {
  Search,
  Plus,
  ArrowRight,
  Check,
  AlertCircle,
  Clock,
  Briefcase,
  FileText,
  Calendar,
  Layers,
  Settings,
  User,
  ExternalLink,
} from 'lucide-react';
import {
  Button,
  Input,
  SearchInput,
  Badge,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Separator,
} from '../components/common';

export const DesignPreviewPage: FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const [inputValue, setInputValue] = useState('Senior Backend Engineer');

  return (
    <div className="space-y-12 pb-16 y-scroll">
      {/* Page Header */}
      <div className="space-y-2 border-b border-[#E5E5E5] pb-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-[24px] font-semibold text-[#171717] tracking-tight">
              Design System Preview
            </h1>
            <p className="text-[13px] text-[#737373] mt-1">
              Component primitives, design tokens, and styling guidelines for the Job Tracker internal dashboard.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline">v0.1.0</Badge>
            <Badge variant="secondary">Phase 1</Badge>
          </div>
        </div>
      </div>

      {/* 1. Color System */}
      <section className="space-y-4">
        <div>
          <h2 className="text-[18px] font-semibold text-[#171717] tracking-tight">
            1. Global Color System
          </h2>
          <p className="text-[13px] text-[#737373]">
            Strict monochromatic palette inspired by GitHub and Linear. No neon, gradients, or decorative accents.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          <div className="p-3 border border-[#E5E5E5] rounded-md bg-[#FFFFFF] space-y-2">
            <div className="w-full h-10 rounded border border-[#E5E5E5] bg-[#FFFFFF]" />
            <div>
              <p className="text-[13px] font-medium text-[#171717]">Main background</p>
              <p className="text-[12px] font-mono text-[#737373]">#FFFFFF</p>
            </div>
          </div>

          <div className="p-3 border border-[#E5E5E5] rounded-md bg-[#FFFFFF] space-y-2">
            <div className="w-full h-10 rounded border border-[#E5E5E5] bg-[#FAFAFA]" />
            <div>
              <p className="text-[13px] font-medium text-[#171717]">Secondary background</p>
              <p className="text-[12px] font-mono text-[#737373]">#FAFAFA</p>
            </div>
          </div>

          <div className="p-3 border border-[#E5E5E5] rounded-md bg-[#FFFFFF] space-y-2">
            <div className="w-full h-10 rounded border border-[#E5E5E5] bg-[#F5F5F5]" />
            <div>
              <p className="text-[13px] font-medium text-[#171717]">Muted / Hover bg</p>
              <p className="text-[12px] font-mono text-[#737373]">#F5F5F5</p>
            </div>
          </div>

          <div className="p-3 border border-[#E5E5E5] rounded-md bg-[#FFFFFF] space-y-2">
            <div className="w-full h-10 rounded border border-[#E5E5E5] bg-[#E5E5E5]" />
            <div>
              <p className="text-[13px] font-medium text-[#171717]">Borders</p>
              <p className="text-[12px] font-mono text-[#737373]">#E5E5E5</p>
            </div>
          </div>

          <div className="p-3 border border-[#E5E5E5] rounded-md bg-[#FFFFFF] space-y-2">
            <div className="w-full h-10 rounded border border-[#E5E5E5] bg-[#171717]" />
            <div>
              <p className="text-[13px] font-medium text-[#171717]">Primary / Buttons</p>
              <p className="text-[12px] font-mono text-[#737373]">#171717</p>
            </div>
          </div>

          <div className="p-3 border border-[#E5E5E5] rounded-md bg-[#FFFFFF] space-y-2">
            <div className="w-full h-10 rounded border border-[#E5E5E5] bg-[#737373]" />
            <div>
              <p className="text-[13px] font-medium text-[#171717]">Secondary text</p>
              <p className="text-[12px] font-mono text-[#737373]">#737373</p>
            </div>
          </div>

          <div className="p-3 border border-[#E5E5E5] rounded-md bg-[#FFFFFF] space-y-2">
            <div className="w-full h-10 rounded border border-[#E5E5E5] bg-[#A3A3A3]" />
            <div>
              <p className="text-[13px] font-medium text-[#171717]">Muted text</p>
              <p className="text-[12px] font-mono text-[#737373]">#A3A3A3</p>
            </div>
          </div>

          <div className="p-3 border border-[#E5E5E5] rounded-md bg-[#FFFFFF] space-y-2">
            <div className="w-full h-10 rounded border border-[#E5E5E5] bg-[#FFFFFF] flex items-center justify-center">
              <span className="text-[11px] text-[#737373]">Text On Dark</span>
            </div>
            <div>
              <p className="text-[13px] font-medium text-[#171717]">Button text</p>
              <p className="text-[12px] font-mono text-[#737373]">#FFFFFF</p>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      {/* 2. Typography Hierarchy */}
      <section className="space-y-4">
        <div>
          <h2 className="text-[18px] font-semibold text-[#171717] tracking-tight">
            2. Typography Hierarchy
          </h2>
          <p className="text-[13px] text-[#737373]">
            Inter font family, compact scale, weights between 400 and 600.
          </p>
        </div>

        <div className="border border-[#E5E5E5] rounded-lg divide-y divide-[#E5E5E5] bg-[#FFFFFF]">
          <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-[24px] font-semibold text-[#171717] tracking-tight">
                Main Page Heading
              </span>
            </div>
            <div className="flex items-center gap-3 text-[12px] font-mono text-[#737373]">
              <span>24px (1.5rem)</span>
              <span>•</span>
              <span>Weight 600</span>
            </div>
          </div>

          <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-[18px] font-semibold text-[#171717] tracking-tight">
                Section Heading
              </span>
            </div>
            <div className="flex items-center gap-3 text-[12px] font-mono text-[#737373]">
              <span>18px (1.125rem)</span>
              <span>•</span>
              <span>Weight 600</span>
            </div>
          </div>

          <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-[16px] font-medium text-[#171717]">
                Subsection Title / Card Title
              </span>
            </div>
            <div className="flex items-center gap-3 text-[12px] font-mono text-[#737373]">
              <span>16px (1rem)</span>
              <span>•</span>
              <span>Weight 500</span>
            </div>
          </div>

          <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-[14px] text-[#171717]">
                Standard Body Text — Clean, readable data display for jobs, companies, and notes.
              </span>
            </div>
            <div className="flex items-center gap-3 text-[12px] font-mono text-[#737373]">
              <span>14px (0.875rem)</span>
              <span>•</span>
              <span>Weight 400</span>
            </div>
          </div>

          <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-[13px] text-[#737373]">
                Secondary Text — Descriptions, metadata, timestamps, and supporting information.
              </span>
            </div>
            <div className="flex items-center gap-3 text-[12px] font-mono text-[#737373]">
              <span>13px (0.8125rem)</span>
              <span>•</span>
              <span>Weight 400</span>
            </div>
          </div>

          <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-[12px] text-[#A3A3A3]">
                Muted Text — Placeholder indicators, subtle captions, and disabled states.
              </span>
            </div>
            <div className="flex items-center gap-3 text-[12px] font-mono text-[#737373]">
              <span>12px (0.75rem)</span>
              <span>•</span>
              <span>Weight 400</span>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      {/* 3. Buttons & Hover States */}
      <section className="space-y-4">
        <div>
          <h2 className="text-[18px] font-semibold text-[#171717] tracking-tight">
            3. Buttons & Hover States
          </h2>
          <p className="text-[13px] text-[#737373]">
            Simple black primary buttons, white secondary buttons with gray borders, and subtle hover transitions.
          </p>
        </div>

        <div className="border border-[#E5E5E5] rounded-lg p-5 bg-[#FFFFFF] space-y-6">
          {/* Variants */}
          <div className="space-y-2">
            <p className="text-[12px] font-medium uppercase tracking-wider text-[#737373]">
              Variants (Hover to test states)
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="primary">Primary Button</Button>
              <Button variant="secondary">Secondary Button</Button>
              <Button variant="outline">Outline Button</Button>
              <Button variant="ghost">Ghost Button</Button>
            </div>
          </div>

          {/* With Icons */}
          <div className="space-y-2">
            <p className="text-[12px] font-medium uppercase tracking-wider text-[#737373]">
              With Icons (16px)
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="primary" icon={<Plus size={16} />}>
                Create Record
              </Button>
              <Button variant="secondary" icon={<FileText size={16} />}>
                Export Report
              </Button>
              <Button variant="secondary" iconPosition="right" icon={<ArrowRight size={16} />}>
                Continue
              </Button>
              <Button variant="ghost" icon={<Settings size={16} />}>
                Settings
              </Button>
            </div>
          </div>

          {/* Sizes */}
          <div className="space-y-2">
            <p className="text-[12px] font-medium uppercase tracking-wider text-[#737373]">
              Sizes (sm: 28px, md: 32px, lg: 36px)
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Button size="sm" variant="secondary">Small (sm)</Button>
              <Button size="md" variant="secondary">Default (md)</Button>
              <Button size="lg" variant="secondary">Large (lg)</Button>
            </div>
          </div>

          {/* States: Loading & Disabled */}
          <div className="space-y-2">
            <p className="text-[12px] font-medium uppercase tracking-wider text-[#737373]">
              Loading & Disabled States
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="primary" isLoading>
                Processing
              </Button>
              <Button variant="primary" disabled>
                Disabled Primary
              </Button>
              <Button variant="secondary" disabled>
                Disabled Secondary
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      {/* 4. Text Inputs & Search Input */}
      <section className="space-y-4">
        <div>
          <h2 className="text-[18px] font-semibold text-[#171717] tracking-tight">
            4. Inputs & Search Fields
          </h2>
          <p className="text-[13px] text-[#737373]">
            Neutral input fields with 1px border, crisp focus rings, and clear typography.
          </p>
        </div>

        <div className="border border-[#E5E5E5] rounded-lg p-5 bg-[#FFFFFF] space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Standard Text Input"
              placeholder="e.g. Acme Corp"
              helperText="Helper text provides extra context."
            />

            <Input
              label="Input with Value"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              helperText="Interactive editable input."
            />

            <Input
              label="Input with Icon"
              placeholder="Search user..."
              leftIcon={<User size={16} />}
            />

            <Input
              label="Disabled Input"
              disabled
              value="Immutable configuration value"
              helperText="Disabled inputs have muted background."
            />
          </div>

          <div className="space-y-2 pt-2 border-t border-[#E5E5E5]">
            <p className="text-[13px] font-medium text-[#171717]">Search Input</p>
            <p className="text-[12px] text-[#737373]">
              Compact search input with Lucide search icon, shortcut hint, and clear action.
            </p>
            <div className="max-w-md">
              <SearchInput
                placeholder="Search jobs, companies, or tags..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onClear={() => setSearchValue('')}
                shortcutHint="/"
              />
            </div>
          </div>
        </div>
      </section>

      <Separator />

      {/* 5. Neutral Badges */}
      <section className="space-y-4">
        <div>
          <h2 className="text-[18px] font-semibold text-[#171717] tracking-tight">
            5. Neutral Badges
          </h2>
          <p className="text-[13px] text-[#737373]">
            Compact badges without neon colors. Uses neutral tones for tags, counts, and states.
          </p>
        </div>

        <div className="border border-[#E5E5E5] rounded-lg p-5 bg-[#FFFFFF] space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="default">Default (#171717)</Badge>
            <Badge variant="secondary">Secondary (#F5F5F5)</Badge>
            <Badge variant="outline">Outline (#E5E5E5)</Badge>
            <Badge variant="muted">Muted (#FAFAFA)</Badge>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#E5E5E5]">
            <Badge variant="secondary" dot>
              Active
            </Badge>
            <Badge variant="secondary" dot>
              In Review
            </Badge>
            <Badge variant="outline" dot>
              Draft
            </Badge>
            <Badge variant="secondary" icon={<Clock size={12} />}>
              Scheduled
            </Badge>
            <Badge variant="secondary" icon={<Briefcase size={12} />}>
              Engineering
            </Badge>
            <Badge variant="default" dot>
              Published
            </Badge>
          </div>
        </div>
      </section>

      <Separator />

      {/* 6. Cards & Surfaces */}
      <section className="space-y-4">
        <div>
          <h2 className="text-[18px] font-semibold text-[#171717] tracking-tight">
            6. Cards & Surfaces
          </h2>
          <p className="text-[13px] text-[#737373]">
            Structured containers with #E5E5E5 borders, 8px radius, and minimal elevation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Standard Surface Card</CardTitle>
                <Badge variant="secondary">White BG</Badge>
              </div>
              <CardDescription>
                Primary card structure for content grouping and record previews.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-[14px] text-[#171717] leading-relaxed">
                Clean white background (#FFFFFF) with a 1px border (#E5E5E5). Keeps focus entirely on data readability without unnecessary shadows or blur effects.
              </p>
            </CardContent>
            <CardFooter>
              <span className="text-[12px] text-[#737373]">Updated 2h ago</span>
              <Button size="sm" variant="secondary" icon={<ArrowRight size={14} />} iconPosition="right">
                View
              </Button>
            </CardFooter>
          </Card>

          <Card variant="secondary">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Secondary Surface Card</CardTitle>
                <Badge variant="outline">#FAFAFA BG</Badge>
              </div>
              <CardDescription>
                Subtle tinted container for secondary panels and sidebars.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-[14px] text-[#171717] leading-relaxed">
                Uses the secondary background (#FAFAFA) to establish gentle visual hierarchy against the primary white canvas while maintaining zero distraction.
              </p>
            </CardContent>
            <CardFooter>
              <span className="text-[12px] text-[#737373]">Read-only surface</span>
              <Button size="sm" variant="outline" icon={<ExternalLink size={14} />} iconPosition="right">
                Docs
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      <Separator />

      {/* 7. Borders, Separators & Spacing */}
      <section className="space-y-4">
        <div>
          <h2 className="text-[18px] font-semibold text-[#171717] tracking-tight">
            7. Borders & Separators
          </h2>
          <p className="text-[13px] text-[#737373]">
            Consistent 1px borders (#E5E5E5) for dividing content horizontally and vertically.
          </p>
        </div>

        <div className="border border-[#E5E5E5] rounded-lg p-5 bg-[#FFFFFF] space-y-5">
          <div>
            <p className="text-[12px] font-medium uppercase tracking-wider text-[#737373] mb-3">
              Horizontal Separator
            </p>
            <Separator />
          </div>

          <div>
            <p className="text-[12px] font-medium uppercase tracking-wider text-[#737373] mb-3">
              Inline Items with Vertical Separators
            </p>
            <div className="flex items-center gap-3 h-5 text-[13px] text-[#737373]">
              <span className="text-[#171717] font-medium">Pipeline: Active</span>
              <Separator orientation="vertical" />
              <span>14 Jobs</span>
              <Separator orientation="vertical" />
              <span>3 Interviews</span>
              <Separator orientation="vertical" />
              <span>Updated Today</span>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      {/* 8. Basic Icon Usage */}
      <section className="space-y-4">
        <div>
          <h2 className="text-[18px] font-semibold text-[#171717] tracking-tight">
            8. Iconography (Lucide React)
          </h2>
          <p className="text-[13px] text-[#737373]">
            Consistent icon sizes (16px and 20px) using neutral colors (#171717, #737373).
          </p>
        </div>

        <div className="border border-[#E5E5E5] rounded-lg p-5 bg-[#FFFFFF]">
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-4">
            <div className="p-3 border border-[#E5E5E5] rounded flex flex-col items-center justify-center gap-2 text-center">
              <Search size={18} className="text-[#171717]" />
              <span className="text-[11px] font-mono text-[#737373]">Search (18px)</span>
            </div>

            <div className="p-3 border border-[#E5E5E5] rounded flex flex-col items-center justify-center gap-2 text-center">
              <Plus size={18} className="text-[#171717]" />
              <span className="text-[11px] font-mono text-[#737373]">Plus (18px)</span>
            </div>

            <div className="p-3 border border-[#E5E5E5] rounded flex flex-col items-center justify-center gap-2 text-center">
              <Briefcase size={18} className="text-[#171717]" />
              <span className="text-[11px] font-mono text-[#737373]">Briefcase (18px)</span>
            </div>

            <div className="p-3 border border-[#E5E5E5] rounded flex flex-col items-center justify-center gap-2 text-center">
              <Calendar size={18} className="text-[#171717]" />
              <span className="text-[11px] font-mono text-[#737373]">Calendar (18px)</span>
            </div>

            <div className="p-3 border border-[#E5E5E5] rounded flex flex-col items-center justify-center gap-2 text-center">
              <Clock size={18} className="text-[#171717]" />
              <span className="text-[11px] font-mono text-[#737373]">Clock (18px)</span>
            </div>

            <div className="p-3 border border-[#E5E5E5] rounded flex flex-col items-center justify-center gap-2 text-center">
              <Check size={18} className="text-[#171717]" />
              <span className="text-[11px] font-mono text-[#737373]">Check (18px)</span>
            </div>

            <div className="p-3 border border-[#E5E5E5] rounded flex flex-col items-center justify-center gap-2 text-center">
              <AlertCircle size={18} className="text-[#171717]" />
              <span className="text-[11px] font-mono text-[#737373]">Alert (18px)</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer System Note */}
      <div className="p-4 border border-[#E5E5E5] rounded-lg bg-[#FAFAFA] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[13px] text-[#737373]">
        <div className="flex items-center gap-2">
          <Layers size={16} className="text-[#171717]" />
          <span>Internal Design System • GitHub / Linear inspired aesthetic</span>
        </div>
        <span className="font-mono text-[12px]">Phase 1 Complete</span>
      </div>
    </div>
  );
};

export default DesignPreviewPage;