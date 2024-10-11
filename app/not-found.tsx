import Link from '@/components/Link';
import SvgNotFound from '@/public/static/images/not-found.svg';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center md:mt-24 md:flex-row md:space-x-6">
      <SvgNotFound className="h-50 w-80 md:-mt-10" />
      <div className="flex max-w-md flex-col items-center text-center">
        <p className="mb-4 text-xl font-bold leading-normal md:text-2xl">
          Sorry we couldn't find this page.
        </p>
        <p className="mb-5">
          But don’t worry, you can find plenty of other things on our homepage.
        </p>
        <Link
          href="/"
          className="inline-block rounded-lg border border-transparent bg-red-500 px-4 py-2 text-sm font-medium leading-5 text-white shadow transition-colors duration-150 hover:bg-red-700 focus:outline-none dark:hover:bg-red-700"
        >
          Back to homepage
        </Link>
      </div>
    </div>
  );
}
