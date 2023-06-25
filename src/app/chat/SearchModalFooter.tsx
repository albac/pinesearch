interface ISearchModalFooterProps {
  query: string;
  setQuery: (text: string) => void;
  onSubmitSearch: () => void;
}

export default function SearchModalFooter({
  onSubmitSearch,
  query,
  setQuery
}: ISearchModalFooterProps) {
  return (
    <div className="h-16 min-h-[64px] w-full bg-slate-100 flex items-center sticky bottom-0 mt-auto rounded-b-3xl px-4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="#ccc"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
        />
      </svg>
      <input
        type="text"
        className="h-full ml-2 appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
        placeholder="Ask a question about Science, Law, or Education..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div
        className="rounded-full bg-black h-10 w-10 flex items-center justify-center ml-auto cursor-pointer"
        onClick={onSubmitSearch}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="#fff"
          className="w-10 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
          />
        </svg>
      </div>
    </div>
  );
}
