import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Account — DriveMatch',
  description: 'Create your DriveMatch account and start browsing vehicles with intelligent pricing.',
  robots: { index: false, follow: true },
};

export default function SignupLayout({ children }: { children: React.ReactNode }) {
  return children;
}
