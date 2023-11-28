'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { KeyboardEvent } from 'react';

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  let timer: any;

  function handleKeyboardEvent(e: KeyboardEvent<HTMLInputElement>) {
    const target = e.target as HTMLInputElement;

    /* NOTE: this debouncing can implement with a library called use-debounce */

    if (target) {
      let term: string = target.value;

      clearTimeout(timer);

      timer = setTimeout(() => {
        handleSearch(term);
      }, 1000);
    }
  }

  function handleSearch(term: string) {
    console.log(`Seraching... ${term}`);
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        /* onChange={(e) => {
          handleSearch(e.target.value);
        }} */
        onKeyUp={handleKeyboardEvent}
        defaultValue={searchParams.get('query')?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
