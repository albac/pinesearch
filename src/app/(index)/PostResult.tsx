import Image from "next/image"

export default function PostResult() {
    return (
        <div className="w-5/6 mb-4 px-8 flex items-center cursor-pointer">
            <div className="h-24 w-24 relative">
                <Image 
                    src="/dummy-post.png" 
                    fill={true}
                    alt="post"  
                />
            </div>

            <div className="flex flex-col h-full ml-8 w-3/4">
                <h1 className="font-bold text-left">
                    Exploring the Role of Gut Microbiota in Human Metabolism and Disease
                </h1>
                <p className="text-left text-sm text-ellipsis"> 
                    Explores the ecological consequences of microplastic pollution on aquatic ecosystems.
                    This research investigates how microplastics, tiny plastic...
                </p>
            </div>
        </div>
    )
}