import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';

export const dynamic = 'force-dynamic';

const WORKS_DATA = [
  {Покупатель: 'Иванов', Название: 'Телефон', 'Дата оплаты': '2024-03-30', Стоимость: 500, Статус: 'Оплачено'},
  {Покупатель: 'Петров', Название: 'Ноутбук', 'Дата оплаты': '2024-03-29', Стоимость: 1200, Статус: 'Оплачено'},
  {Покупатель: 'Сидорова', Название: 'Планшет', 'Дата оплаты': '2024-03-28', Стоимость: 700, Статус: 'Оплачено'},
  {Покупатель: 'Козлов', Название: 'Наушники', 'Дата оплаты': '2024-03-27', Стоимость: 100, Статус: 'Оплачено'},
  {Покупатель: 'Смирнов', Название: 'Монитор', 'Дата оплаты': '2024-03-26', Стоимость: 300, Статус: 'Оплачено'},
];

export default function WorksPage() {
  return (
    <div className="container mx-auto mt-3 py-3 md:px-5 sm:px-7 px-3 space-y-3 font-roboto">
      <div className="shadow-[0px_1px_4px_-1px_rgba(0,0,0,.15)] rounded-[10px]">
        <h3 className="pt-4 px-6 text-primary-text font-roboto font-medium">Заказы</h3>
        <div >
          <Tabs defaultValue="done" className="w-full">
            <TabsList className='px-6'>
              <TabsTrigger value="done">Выполнено</TabsTrigger>
              <TabsTrigger value="all">Все</TabsTrigger>
            </TabsList>
            <TabsContent value="done" className='px-6'>Make changes to your account here.</TabsContent>
            <TabsContent value="all" className='px-6'>Change your password here.</TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
