import LandingPage from "@/components/LandingPage";
import SignUpPage from "@/components/SignUpPage";

export default function Home() {
  return (
    <main>
      <div>
        <LandingPage />;
        <SignUpPage />
      </div>
    </main>
  )
}