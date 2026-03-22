import Link from 'next/link';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

export function NavLink({ href, children }: NavLinkProps): React.ReactElement {
  return (
    <Link href={href} className="text-gray-700 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium text-sm">
      {children}
    </Link>
  );
}
