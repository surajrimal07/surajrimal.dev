import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function SectionContainer({ children }: Props) {
  return (
    <div className="mx-auto max-w-full px-4 sm:px-6 xl:max-w-5xl xl:px-0">
      <div className="flex min-h-screen flex-col">{children}</div>
    </div>
  );
}

// import { ReactNode } from 'react';

// interface Props {
//   children: ReactNode;
// }

// export default function SectionContainer({ children }: Props) {
//   return (
//     <section className="mx-auto max-w-4xl px-4 sm:px-6 xl:max-w-5xl xl:px-0">
//       {children}
//     </section>
//   );
// }
