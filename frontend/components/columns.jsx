'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  ColumnFiltersState,
  getFilteredRowModel,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ArrowUpDown, ExternalLink } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { useState } from 'react';
import Link from 'next/link';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const containerColumns = [
  // {
  //   id: 'select',
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && 'indeterminate')
  //       }
  //       onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={value => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: 'id',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          ID
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <>{row.getValue('id').substring(0, 12)}</>;
    },
  },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Name
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
  },
  // {
  //   accessorKey: "cpu",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         CPU
  //         <ArrowUpDown className="w-4 h-4 ml-2" />
  //       </Button>
  //     );
  //   },
  // },
  // {
  //   accessorKey: "ram",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         RAM
  //         <ArrowUpDown className="w-4 h-4 ml-2" />
  //       </Button>
  //     );
  //   },
  // },
  {
    accessorKey: 'ports',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Ports
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => {
      return (
        <>
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            State
            <ArrowUpDown className="w-4 h-4 ml-2" />
          </Button>
        </>
      );
    },
    cell: ({ row }) => {
      const status = row.getValue('status');
      const state = row.getValue('state');
      return (
        <div className="">
          <p
            className={`${
              state === 'running' ? 'text-green-400' : 'text-red-500'
            }  rounded-full py-1 w-32 text-center capitalize `}
          >
            {status}
          </p>
        </div>
      );
    },

    filterable: true,
  },
  {
    accessorKey: 'state',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Status
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const status = row.getValue('state');
      return (
        <div className="">
          <p
            className={`${
              status === 'running' ? 'bg-green-400' : 'bg-red-500'
            }  rounded-full py-1 w-32 text-center capitalize `}
          >
            {status}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: 'image',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Image
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'created',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Created
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const timestamp = row.getValue('created');
      return (
        <div className="">
          {new Date(timestamp * 1000).toLocaleString('en-IN', {
            dateStyle: 'short',
            timeStyle: 'medium',
          })}
        </div>
      );
    },
  },
  {
    id: 'detail-link',
    cell: ({ row }) => {
      return (
        <Link href={`/containers/${row.getValue('id')}`}>
          <Button variant="ghost" className="w-8 h-8 p-0">
            <span className="sr-only">Open detailed page</span>
            <ExternalLink className="w-4 h-4" />
          </Button>
        </Link>
      );
    },
  },
];
