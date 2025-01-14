import { Loader } from '@/components/chat/loader';
import { Message } from '@/components/chat/message';

export default function Loading() {
  return (
    <div className="p-4">
      <Message
        message={{
          id: '',
          display: <Loader />,
          role: 'user',
        }}
      />
    </div>
  );
}
