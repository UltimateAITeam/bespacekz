import { TabsWithTable } from '@/components/works/TabsWithTable';

export const dynamic = 'force-dynamic';


export default function WorksPage() {
  return (
    <div className="container mx-auto mt-3 py-3 md:px-5 sm:px-7 px-3 space-y-3 font-roboto">
      <div className="shadow-[0px_1px_4px_-1px_rgba(0,0,0,.15)] rounded-[10px]">
        <h3 className="pt-4 px-6 text-primary-text font-roboto font-medium">Заказы</h3>
        <div >
          <TabsWithTable />
        </div>
      </div>
    </div>
  );
}
