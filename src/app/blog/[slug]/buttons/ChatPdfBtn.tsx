import { PdfIcon } from "../../../../../public/icons/PdfIcon";

export const ChatPdfBtn = () => {
  return (
    <button className="flex text-white bg-fig-teal p-[10px] rounded-md mt-6 font-medium gap-1 hover:scale-110">
      <PdfIcon /> <span className="font-medium">Source PDF</span>
    </button>
  );
};
