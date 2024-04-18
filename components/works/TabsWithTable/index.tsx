"use client"

import React, { useState } from 'react';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table';
import {Pagination} from '@/components/ui/Pagination';

const ITEMS_PER_PAGE = 10;
const WORKS_DATA = [
  {consumer: 'Иванов', name: 'Телефон', date: '2024-03-30', cost: 500, status: 'Оплачено', id: 1},
  {consumer: 'Петров', name: 'Ноутбук', date: '2024-03-29', cost: 1200, status: 'Оплачено', id: 2},
  {consumer: 'Сидорова', name: 'Планшет', date: '2024-03-28', cost: 700, status: 'Оплачено', id: 3},
  {consumer: 'Козлов', name: 'Наушники', date: '2024-03-27', cost: 100, status: 'Оплачено', id: 4},
  {consumer: 'Смирнов', name: 'Монитор', date: '2024-03-26', cost: 300, status: 'Оплачено', id: 5},
];

export const TabsWithTable = () => {
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(10);
  const [totalItems, setTotalItems] = useState<number>(100);

  return (
    <Tabs defaultValue="done" className="w-full">
      <TabsList className="px-6">
        <TabsTrigger value="done">Выполнено</TabsTrigger>
        <TabsTrigger value="all">Все</TabsTrigger>
      </TabsList>
      <div className="p-6">
        <TabsContent value="done">
          <Table>
            <TableCaption className='mt-0'>
              
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="">Название</TableHead>
                <TableHead>Покупатель</TableHead>
                <TableHead>Оплачено</TableHead>
                <TableHead className="">Стоимость</TableHead>
                <TableHead className="">Статус</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {WORKS_DATA.map((w) => {
                return (
                  <TableRow key={w.id}>
                    <TableCell>{w.consumer}</TableCell>
                    <TableCell>{w.name}</TableCell>
                    <TableCell>{w.date}</TableCell>
                    <TableCell>{w.cost}</TableCell>
                    <TableCell>{w.status}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <div className='flex justify-end w-full'>
                  <Pagination
                    itemsPerPage={ITEMS_PER_PAGE}
                    totalPages={totalPages}
                    currentPage={page}
                    setPage={(p) => setPage(p)}
                    totalCount={totalItems}
                  />
              </div>
        </TabsContent>
        <TabsContent value="all">Change your password here.</TabsContent>
        
      </div>
    </Tabs>
  );
};
