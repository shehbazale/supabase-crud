"use client"
import { usePathname } from "next/navigation";
import RatingDetail from "./dashboard/page";

export default function Home() {
  const pathname = usePathname();
  return (
    <>
    <RatingDetail/>
    </>

  );
}

