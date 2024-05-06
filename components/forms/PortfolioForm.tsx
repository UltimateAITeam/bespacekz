import usePortfolioStore from "@/store/portfolioFormStore";
import { IconButton } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";

export default function PortfolioForm(props: { data: any }) {
  const { links, setLinks } = usePortfolioStore();
  const [links1, setLinks1] = useState<string[]>([]);

  useEffect(() => {
    setLinks1(links);
  }, []);

  useEffect(() => {
    fetch("/api/profile/portfolio", {
      method: "POST",
      body: JSON.stringify(links1),
    });
  }, [links1]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className={"m-auto flex flex-col justify-center items-center pb-4"}>
      <form className={"flex flex-col w-full "} onSubmit={onSubmit}>
        {links1.map((link, index: number) => (
          <div
            key={index}
            className={
              "relative mt-4 border-2 border-gray-200 shadow-sm rounded-2xl p-6 font-medium"
            }
          >
            <div className="flex justify-between items-center mb-1">
              <label htmlFor={`specialization-${index}`}>Ссылка:</label>
              <IconButton
                aria-label="Delete language"
                icon={<MdDelete />}
                onClick={() => setLinks1(links1.filter((_, i) => index !== i))}
                variant="ghost"
              />
            </div>
            <div className="flex flex-grow border-2 border-gray-300 transition rounded-lg items-center py-1.5 hover:bg-[#F3FFFC] hover:ring-2 ring-[#729bb3] w-full mb-4">
              <input
                type="url"
                value={link}
                className="flex-grow xl:w-full w-40 focus:outline-none bg-transparent text-zinc-700 focus:ring-0 border-0"
                onChange={(e) => setLinks1(links1.with(index, e.target.value))}
                required
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() => {
            setLinks1([...links1, ""]);
          }}
          className="w-full border-2 py-2 px-4 mt-4 hover:bg-[#397b8a] bg-[#4fa9bd] rounded-xl flex-grow xl:w-full focus:outline-none bg-transparent text-zinc-700 hover:text-white focus:ring-0"
        >
          Добавить cсылку
        </button>
      </form>
    </div>
  );
}
