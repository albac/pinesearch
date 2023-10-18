import { LoaderIcon } from "../../../public/icons/LoaderIcon";

interface Props {
  width: number;
  height: number;
}

export const LoaderSpinner = ({ height, width }: Props) => {
  return (
    <div className="flex justify-center items-center">
      <div
        className="bg-white opacity-75 flex justify-center items-center"
        style={{ width: width + "px", height: height + "px" }}
      >
        <LoaderIcon className="animate-spin w-16 h-16" />
      </div>
    </div>
  );
};
