"use client";

import logoMonogram from "@/assets/logoMonogram.svg";
import { useAuth } from "@/lib/hooks/useAuth";
import Button from "./ui/Button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

function Header() {
  const { user } = useAuth();

  const router = useRouter();

  const goLogin = () => {
    router.push("/login");
  };

  const goProfil = () => {
    router.push("/profil");
  };

  return (
    <header className="flex w-full gap-2 items-center justify-center px-4 py-2">
      <Link href="/">
        <div className="flex gap-2 items-center justify-center">
          <Image className="w-10 h-10" src={logoMonogram} alt="Havite logo" />
          <h1 className="font-bold">HAVITE</h1>
        </div>
      </Link>
      <div className="ml-auto">
        {user ? (
          <Button onClick={goProfil}>
            {user.avatarUrl && (
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="h-8 w-8 rounded-full object-cover sm:mr-1 mr-0"
              />
            )}
            <div className="hidden sm:block">{user.name}</div>
          </Button>
        ) : (
          <Button variant="primary" onClick={() => goLogin()}>
            Se connecter
          </Button>
        )}
      </div>
    </header>
  );
}

export default Header;
