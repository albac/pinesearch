interface Tag {
  children: React.ReactNode;
  className?: String;
}

export default function Tag({ children, className }: Tag) {
  return (
    <button
      className={`rounded-full bg-fig-grey-mint text-fig-gray px-[14px] py-[8px] font-poping inline-block ${className}`}
    >
      {children}
    </button>
  );
}
