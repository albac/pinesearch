interface Props {
  author: string;
  comment: string;
  gpt_response: string;
}

export const ChatItem = ({ author, comment, gpt_response }: Props) => {
  return (
    <div className="mt-10 space-y-2">
      <div className="bg-fig-grey-mint p-4 rounded-md">
        <Item author={author} comment={comment} />
      </div>
      <div className="bg-fig-ligth-mint ml-10 p-4 rounded-md">
        <Item author={author} comment={gpt_response} isBot />
      </div>
    </div>
  );
};

interface ItemProps {
  author: string;
  comment: string;
  isBot?: boolean;
}

const Item = ({ author, comment, isBot }: ItemProps) => {
  return (
    <>
      <div className="flex items-center justify-start gap-2">
        <span className="h-6 w-6 flex justify-center items-center rounded-full bg-black text-white">
          {isBot ? "P" : author[0].toUpperCase()}
        </span>
        <p className="font-bold">{isBot ? "Pinebot" : author}</p>
      </div>
      <div className="pl-8 pt-2">
        <p>{comment}</p>
      </div>
    </>
  );
};
