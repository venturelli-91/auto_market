import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-white dark:bg-gradient-to-br dark:from-purple-900/40 dark:to-black/40 border border-purple-200 dark:border-purple-600/30 rounded-xl p-6 hover:border-purple-400 dark:hover:border-purple-500/60 transition-all shadow-sm dark:shadow-none">
      <div className="relative h-48 bg-purple-50 dark:bg-gradient-to-br dark:from-purple-800/20 dark:to-black/20 rounded-lg mb-4 flex items-center justify-center">
        <Icon size={64} className="text-purple-500 dark:text-purple-400" />
      </div>
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-white/60 text-sm">{description}</p>
    </div>
  );
}
