import { useAwsImage } from "@/Services/Hook";
import { useEffect, useRef, useState } from "react";
import { Img } from "react-image";
import HALO from "vanta/dist/vanta.halo.min";
import NET from "vanta/dist/vanta.net.min";
import Spinner from "./Spinner";

interface ImagePropsType {
  path: string;
  className?: string | undefined;
  height: number;
  displayCanva?: boolean;
  typeOfCanva?: "halo" | "net";
}

const AwsImage: React.FC<ImagePropsType> = ({
  path,
  height,
  className,
  displayCanva,
  typeOfCanva = "halo",
}) => {
  const { data } = useAwsImage(path) as QueryUseType;
  const [vantaEffect, setVantaEffect] = useState<{ destroy: any } | null>(null);
  const myRef = useRef<HTMLDivElement>(null);
  const AnimationConfig = {
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
  } as VantaEffectOptions;
  useEffect(() => {
    if (!vantaEffect) {
      if (typeOfCanva == "halo") {
        setVantaEffect(HALO({ ...{ el: myRef.current }, ...AnimationConfig }));
      } else if (typeOfCanva == "net") {
        setVantaEffect(NET({ ...{ el: myRef.current }, ...AnimationConfig }));
      }
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
          // } overflow-hidden w-full h-[25rem] md:h-[30rem]`}
        } overflow-hidden w-full h-[${height}rem] md:h-[${height + 5}rem]  `}
      >
        <div
          ref={myRef}
          // className="rounded-lg min-w-full min-h-[35rem] md:min-h-[50rem]"
          className={`rounded-lg min-w-full min-h-[${
            height + 10
          }rem] md:min-h-[${height * 2}rem]`}
        >
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
