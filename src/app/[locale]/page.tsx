import { setRequestLocale } from "next-intl/server";
import Sidebar from "@/components/Sidebar";
import MobileNav from "@/components/MobileNav";
import MobileIntro from "@/components/MobileIntro";
import About from "@/components/About";
import Education from "@/components/Education";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import MouseGlow from "@/components/MouseGlow";
import { MainScroll } from "@/components/ScrollLayout";
import layoutStyles from "@/components/ScrollLayout/ScrollLayout.module.scss";
import { routing } from "@/i18n/routing";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <MouseGlow />
      <MobileNav />

      <div className={layoutStyles.shell}>
        <Sidebar />
        <MainScroll>
          <MobileIntro />
          <Reveal>
            <About />
          </Reveal>
          <Reveal>
            <Education />
          </Reveal>
          <Reveal>
            <Experience />
          </Reveal>
          <Reveal>
            <Skills />
          </Reveal>
          <Footer />
        </MainScroll>
      </div>
    </>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
