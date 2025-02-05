import HomeContent from "@/components/home/home-content";
import AsideLeft from "@/components/layout/aside-left";
import AsideRight from "@/components/layout/aside-right";

export default function Home() {
  return (
    <>
      <AsideLeft />
      <HomeContent />
      <AsideRight />
    </>
  );
}
