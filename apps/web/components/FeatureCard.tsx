import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-gradient-to-br from-purple-900/40 to-black/40 border border-purple-600/30 rounded-xl p-6 hover:border-purple-500/60 transition-all">
      <div className="relative h-48 bg-gradient-to-br from-purple-800/20 to-black/20 rounded-lg mb-4 flex items-center justify-center">
        <Icon size={64} className="text-purple-400" />
      </div>
      <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
      <p className="text-white/60 text-sm">{description}</p>
    </div>
  );
}
