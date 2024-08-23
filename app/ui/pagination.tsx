'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { generatePagination } from '@/app/lib/utils';
import { ELLIPSIS } from '@/app/lib/constants';

type PaginationArrowProps = {
  direction: 'left' | 'right';
  href: string;
  isDisabled: boolean;
};

function PaginationArrow({ direction, href, isDisabled }: PaginationArrowProps) {
  const Arrow = direction === 'left' ? <ChevronLeft size={16} /> : <ChevronRight size={16} />;

  if (isDisabled) {
    return (
      <span className="flex h-8 min-w-8 cursor-not-allowed items-center justify-center rounded-full bg-background opacity-50">
        {Arrow}
      </span>
    );
  }

  return (
    <Link
      className="flex h-8 min-w-8 items-center justify-center rounded-full hover:bg-accent hover:text-accent-foreground"
      href={href}
    >
      {Arrow}
    </Link>
  );
}

export default function Pagination({ pages }: { pages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const createPageUrl = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const totalPages = generatePagination(currentPage, pages);

  if (!totalPages.length) return false;

  return (
    <nav>
      <ul className="flex items-center gap-3">
        <li className="flex items-center justify-center">
          <PaginationArrow
            direction="left"
            href={createPageUrl(currentPage - 1)}
            isDisabled={currentPage <= 1}
          />
        </li>
        {totalPages.map((page) => {
          if (page === ELLIPSIS) return page;

          const key = `pagination-link-${page}`;

          const isCurrentPage = page === currentPage;

          const styles = clsx('flex items-center justify-center rounded-full min-w-8 h-8 text-sm', {
            'bg-primary text-secondary hover:bg-primary/90': isCurrentPage,
            'hover:bg-accent': !isCurrentPage,
          });

          return (
            <Link key={key} href={createPageUrl(page)} className={styles}>
              {page}
            </Link>
          );
        })}
        <li className="flex items-center justify-center">
          <PaginationArrow
            direction="right"
            href={createPageUrl(currentPage + 1)}
            isDisabled={currentPage >= pages}
          />
        </li>
      </ul>
    </nav>
  );
}
