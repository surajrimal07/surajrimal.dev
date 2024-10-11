export const Skeleton = ({ className = '' }) => {
  return (
    <div
      className={`animate-pulse rounded-lg bg-gray-200 ${className}`}
      style={{ width: '32px', height: '32px' }}
    />
  );
};
