import { Img } from "react-image";
import Spinner from "./Spinner";
import { useGetImage } from "@/Services/Hook";

interface ImagePropsType {
  path: string;
  className?: string | undefined;
}

const AwsImage: React.FC<ImagePropsType> = ({ path, className }) => {
  const { data, isLoading: imageIsLoading } = useGetImage(path) as QueryUseType;
  return (
    <>
      {(imageIsLoading && (
        <div className={`${className} flex items-center justify-center`}>
          <Spinner
            text="Loading..."
            className="fill-palma-700 w-10 h-10"
          />
        </div>
      )) ||
        (data && (
          <>
            <Img
              loader={
                <div
                  className={`${className} flex items-center justify-center`}
                >
                  <Spinner
                    text="Image is being fetched.."
                    className="fill-palma-700 w-10 h-10"
                  />
                </div>
              }
              src={data}
              className={className}
            />
          </>
        )) || (
          <div
            className={`${className} flex flex-col items-center justify-center gap-3`}
          >
            <svg
              className="w-20 h-20 text-rose-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <p className="font-medium text-white underline underline-offset-2 decoration-dotted tracking-wide">
              Error on loading image
            </p>
          </div>
        )}
    </>
  );
};

export default AwsImage;
