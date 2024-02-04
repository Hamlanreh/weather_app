import './globals.css';
import Image from 'next/image';

export default function Loading() {
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 z-50 bg-white/40 dark:bg-black/40 flex justify-center items-center"> 
        <Image 
            className="spinner" 
            src="/images/spinner.svg" 
            alt="spinner" 
            width="400" 
            height="400" 
        />
    </div>
  )
}
