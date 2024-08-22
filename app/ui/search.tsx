'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { Input } from '@/app/ui/input';

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set('page', '1');
      params.set('q', term);
    } else {
      params.delete('page');
      params.delete('q');
    }

    replace(`${pathname}?${params.toString()}`);
  }, 300);

  if (pathname.endsWith('/')) {
    return false;
  } else if (pathname.split('/').length !== 2) {
    return false;
  }

  return (
    <Input
      type="search"
      placeholder={placeholder}
      autoComplete="off"
      onChange={(e) => handleSearch(e.target.value.trim())}
      defaultValue={searchParams.get('q')?.toString()}
      className="max-w-60"
    />
  );
}
