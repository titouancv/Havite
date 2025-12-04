"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/hooks/useAuth";
import glyph from "../../assets/glyph.svg";
import Button from "@/components/ui/Button";
import Image from "next/image";

const Login = () => {
  const { signInWithGoogle } = useAuth();

  const handleGoogle = async () => {
    try {
      await signInWithGoogle();
    } catch (err) {
      console.error("Google sign-in error", err);
    }
  };

  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="flex flex-col items-center justify-between w-full max-w-[1220px] h-full">
        <div className="flex flex-col relative items-start justify-start w-full flex-1 overflow-hidden gap-8 px-4 pt-4 md:gap-3">
          <div className="w-full h-full flex flex-col items-center justify-start gap-6">
            <div className="flex items-start justify-between w-full">
              <h1 className="font-bold max-w-[80%]">Se connecter</h1>
              <div className="p-3 cursor-pointer" onClick={goBack}>
                <Image src={glyph} alt="Close icon" />
              </div>
            </div>
            <div className="p-4 flex flex-col gap-4">
              <p>Connectez-vous ou créer votre compte Havite</p>
              <Button onClick={handleGoogle}>Se connecter avec Google</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
