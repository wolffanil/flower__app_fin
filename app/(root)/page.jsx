import { FirstComponent } from "@/components/screen/root";
import CommentSection from "@/components/screen/root/commentsComponent/CommentSection";
import SecondSection from "@/components/screen/root/secondComponent/SecondSection";
import ThirdSection from "@/components/screen/root/thirdComponent/ThirdSection";

export const metadata = {
  alternates: {
    canonical: `${process.env.CLIENT_URL}`,
  }
}

async function getFlowers() {
  try {
    const api = process.env.API_URL;
    const res = await fetch(`${api}/products?sort=-createAt&limit=3`, {
      next: {
        revalidate: 60,
      },
    });
    const data = await res.json();
    return data.products;
  } catch (error) {
    console.log(error);
  }
}

async function RootPage() {
  const cards = await getFlowers();

  return (
    <>
      <FirstComponent />
      {cards ? <SecondSection cards={cards} /> : ""}
      <ThirdSection />
      <CommentSection />
    </>
  );
}

export default RootPage;
