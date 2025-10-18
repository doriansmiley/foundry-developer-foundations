import { AnimatedEllipsis } from './AnimatedEllipsis';

export function Loader({ message = 'Loading' }: { message?: string }) {
  return (
    <div className="flex items-center justify-center p-6">
      <div className="text-center">
        <div className="text-sm mb-2">
          <span className="shimmer-loading">{message}</span>
          <AnimatedEllipsis />
        </div>
      </div>
    </div>
  );
}
