import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us — DriveMatch',
  description: 'Get in touch with the DriveMatch team. We reply within 24 hours.',
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
