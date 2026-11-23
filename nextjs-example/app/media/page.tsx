import Image from "next/image";
import { Geist } from "next/font/google";

// latin 문자 범위만 미리 불러온다
const geist = Geist({ subsets: ["latin"] });

const imageUrl = "https://images.unsplash.com/photo-1516321318423-f06f85e504b3";

export default function MediaPage() {
  return (
    <>
      <h1 className={geist.className}>Hello, Next.js!</h1>
      <p>next/image로 표시한 이미지</p>
      {/* width, height로 비율과 자리를 정하고, sizes로 화면에서 차지할 너비를 알려 준다 */}
      <Image
        src={imageUrl}
        alt="노트북으로 함께 작업하는 모습"
        width={600}
        height={400}
        sizes="600px"
      />
      <p>같은 원본을 img로 표시한 이미지</p>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageUrl}
        alt="노트북으로 함께 작업하는 모습"
        width={600}
        height={400}
      />
    </>
  );
}
