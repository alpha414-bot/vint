import { useGetImage } from "@/Services/Hook";
import { useEffect, useRef, useState } from "react";
import { Img } from "react-image";
import HALO from "vanta/dist/vanta.halo.min";
import Spinner from "./Spinner";

interface ImagePropsType {
  path: string;
  className?: string | undefined;
  displayCanva?: boolean;
}

const AwsImage: React.FC<ImagePropsType> = ({
  path,
  className,
  displayCanva,
}) => {
  const { data } = useGetImage(path) as QueryUseType;
  const [vantaEffect, setVantaEffect] = useState<{ destroy: any } | null>(null);
  const myRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        HALO({
          el: myRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          // minHeight: 500.0,
          // minWidth: 100.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color1: 0xffffff,
          backgroundColor: 0x1f2937,
          size: 1.1,
          yOffset: 0.16,
        } as VantaEffectOptions)
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    <>
      <div
        className={`${
          !data || displayCanva ? "block" : "hidden"
        } rounded-3xl overflow-hidden w-96 h-[20rem] md:h-[30rem]`}
      >
        <div ref={myRef} className="rounded-lg min-w-[25rem] min-h-[50rem]">
          <></>
        </div>
      </div>
      <div className={`${!data || displayCanva ? "hidden" : "block"}`}>
        <Img
          loader={
            <div className={`${className} flex items-center justify-center`}>
              <Spinner text="loading..." className="fill-palma-700 w-10 h-10" />
            </div>
          }
          src={data}
          className={className}
        />
      </div>
    </>
  );
};

export default AwsImage;
