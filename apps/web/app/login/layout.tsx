import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In — DriveMatch',
  description: 'Sign in to your DriveMatch account to browse vehicles with intelligent pricing.',
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
