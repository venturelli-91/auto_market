import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog — DriveMatch',
  description:
    'Automotive market insights, buying guides, and pricing intelligence from the DriveMatch team.',
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
