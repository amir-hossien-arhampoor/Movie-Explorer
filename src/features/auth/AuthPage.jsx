import { useState } from "react";
import AuthHero from "./AuthHero";
import AuthForm from "./AuthForm";

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);


  return (
    <main className="min-h-screen bg-[#020a13] text-white">
      
      <div className="flex min-h-screen ">
        
        <AuthHero />

        <section
          className="
            flex min-h-screen w-full
            items-center justify-center
            dark:bg-[#020a13]
            bg-white
            px-5 py-10
            lg:w-[50%] lg:px-10
          "
        >
          <AuthForm
            isLogin={isLogin}
            setIsLogin={setIsLogin}
          />
        </section>
      </div>
    </main>
  );
}

export default AuthPage;
