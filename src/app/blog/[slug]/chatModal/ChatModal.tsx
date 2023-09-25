import { CloseIcon } from "../../../../../public/icons/CloseIcon";
import { ChatForm } from "./ChatForm";

interface Props {
  containerRef: React.Ref<HTMLDivElement>;
  handleClose: () => void;
}

const dummyData = [
  {
    author: "saul",
    comment:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident omnis, aperiam in magnam vitae nesciunt, possimus consequatur exercitationem dicta blanditiis asperiores distinctio vero accusantium voluptatibus? Provident porro architecto fugiat iste. Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt ducimus earum dolore. Minus itaque, velit omnis molestias doloremque culpa temporibus ipsum laudantium aliquam modi incidunt consectetur earum. Earum, corporis architecto."
  },
  {
    author: null,
    comment:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident omnis, aperiam in magnam vitae nesciunt, possimus consequatur exercitationem dicta blanditiis asperiores distinctio vero accusantium voluptatibus? Provident porro architecto fugiat iste. Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt ducimus earum dolore. Minus, itaque, velit omnis molestias doloremque culpa temporibus ipsum laudantium aliquam modi incidunt consectetur earum. Earum, corporis architecto."
  }
];

export const ChatModal = ({ containerRef, handleClose }: Props) => {
  return (
    <div
      className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-opacity-50 bg-fig-dark backdrop-blur-sm"
      style={{ zIndex: 9999 }}
    >
      <div
        className="relative pb-24 bg-white p-4 rounded-lg shadow-lg w-10/12 lg:w-2/3"
        ref={containerRef}
      >
        <button
          className="absolute top-4 right-4 lg:top-5 lg:right-5 text-gray-500 hover:text-gray-800"
          onClick={handleClose}
        >
          <CloseIcon />
        </button>

        <section className="mt-10 flex flex-col items-center justify-between lg:px-16">
          <div>
            <p className="flex justify-center underline hover:cursor-pointer mb-8">
              Show last 10 comments &rarr;
            </p>

            <div className="space-y-5">
              {dummyData.map((data, i) => (
                <ChatItem key={String(i) + data.author} author={data.author}>
                  {data.comment}
                </ChatItem>
              ))}
            </div>
          </div>
          <ChatForm />
        </section>
      </div>
    </div>
  );
};

interface ChatItemProps {
  author: string | null;
  children: React.ReactNode;
}

const ChatItem = ({ author, children }: ChatItemProps) => {
  let createdBy = author ? author : "Pinebot";
  const firstLetter = createdBy[0].toUpperCase();
  const bg = createdBy === "Pinebot" ? "bg-blue-100" : "bg-green-100";

  return (
    <div className={`p-4 rounded-md ${bg ? bg : ""}`}>
      <div className="flex items-center justify-start gap-2">
        <span className="h-6 w-6 flex justify-center items-center rounded-full bg-green-950 text-white">
          {firstLetter}
        </span>
        <p className="font-bold">{createdBy}</p>
      </div>
      <div className="pl-8 pt-2">
        <p>{children}</p>
      </div>
    </div>
  );
};
