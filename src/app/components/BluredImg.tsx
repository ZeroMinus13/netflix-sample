import clsx from 'clsx';
import Image from 'next/image';
import { useState, useEffect } from 'react';

type BluredImgProps = {
  src: string;
  alt: string;
  className?: string;
  width: number;
  height: number;
};

// function BluredImg(props: BluredImgProps) {
//   const [isLoading, setLoading] = useState(true);

//   useEffect(() => {
//     const loadingTimeout = setTimeout(() => {
//       setLoading(false);
//     }, 5000);
//     return () => clearTimeout(loadingTimeout);
//   }, []);

//   return (
//     <Image
//       {...props}
//       alt={props.alt}
//       className={clsx('duration-300 ease-linear', isLoading ? ' blur-sm' : ' blur-0 ')}
//       onLoadingComplete={() => setLoading(false)}
//     />
//   );
// }

function BluredImg(props: BluredImgProps) {
  return (
    <Image
      {...props}
      alt={props.alt}
      placeholder='blur'
      blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM8cuRFPQAHtQLxfqSEPgAAAABJRU5ErkJggg=='
    />
  );
}
export default BluredImg;
