import MainBody from "../components/sections/main-body";
import TopHeader from "../components/sections/top-header";

export default function Home() {
  return (
    <div data-testid="home-page">
      <TopHeader />

      <MainBody />
    </div>
  );
}
