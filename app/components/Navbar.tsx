import Image from "next/image";
import Logo from "../asset/logo.png"

export default function Navbar() {
  return (
    <nav className="w-full">
      <div>
        <div className="flex items-center gap-3">
          <Image src={Logo} alt="Logo" width={35} className="object-cover rounded-md" />
          <p className="font-bold text-lg">Templezzy</p>
        </div>
      </div>
    </nav>
  );
}