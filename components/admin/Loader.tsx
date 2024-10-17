import { LoaderCircle } from 'lucide-react';

const AdminLoading: React.FC = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <LoaderCircle className="h-12 w-12 animate-spin text-white" />
    </div>
  );
};

export default AdminLoading;
