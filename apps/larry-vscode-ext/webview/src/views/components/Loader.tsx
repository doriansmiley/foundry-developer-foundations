import { AnimatedEllipsis } from './AnimatedEllipsis';

export function Loader({ message = 'Loading' }: { message?: string }) {
  return (
    <div className="flex items-center justify-center p-6">
      <div className="text-center">
        <div className="text-sm text-gray-500 mb-2">
          {message}
          <AnimatedEllipsis />
        </div>
        <div className="animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
      </div>
    </div>
  );
}
