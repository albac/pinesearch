interface ISelectionProps {
    text: string;
    onSubmitSearch: (text: string) => void;
}

export default function SearchSelection({ text, onSubmitSearch}: ISelectionProps) {
    return (
        <div 
            className="flex px-6 bg-slate-100 rounded-3xl w-1/2 h-24 items-center justify-between mb-4 cursor-pointer"
            onClick={() => onSubmitSearch(text) }>
            <p className="text-left w-3/4">{text}</p>
            <div className="rounded-full bg-black h-8 w-8 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#fff" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
            </div>
        </div>
    )
}