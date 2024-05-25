
import type { Metadata } from 'next';
import Pagination from '@/app/ui/invoices/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/customers/table';
import { TableRowSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchCustomers ,fetchCustomersPages, fetchFilteredCustomers} from '@/app/lib/data';
import { lusitana } from '@/app/ui/fonts';

export const metadata: Metadata = {
  title: 'Cutomers',
};


export default async function page({
  searchParams,
}:{
  searchParams?: {
    query?: string;
    page?: string;
  };
}){

  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  
  const customers = await fetchFilteredCustomers(query);
  // const totalPages = await fetchCustomersPages(query);
  // const customers = await fetchCustomers();
  // const totalPages=""
  // const customer=""

    return (
      <div className="w-full">
      {/* <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Customers</h1>
      </div> */}
      {/* <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search invoices..." />
      
      </div> */}
       <Suspense key={query + currentPage} fallback={<TableRowSkeleton />}>
        <Table  customers={customers}/>
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        {/* <Pagination totalPages={totalPages} /> */}
      </div>
    </div>)
}
