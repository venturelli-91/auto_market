import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Newsletter — DriveMatch',
  description:
    'Get weekly vehicle market insights, price alerts, and exclusive deals. Join 12,000+ smart car buyers.',
};

export default function NewsletterLayout({ children }: { children: React.ReactNode }) {
  return children;
}
