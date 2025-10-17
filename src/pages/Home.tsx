import Google2FAToken from "@/components/Google2FAToken.tsx";
import QrcodeText from "@/components/QrcodeText.tsx";
import Socks5Proxy from "@/components/Socks5Proxy.tsx";
import ShortcutCommandShare from "@/components/ShortcutCommandShare.tsx";


export default function Home() {

  return (
    <>
      <div className="m-2 grid grid-cols-3 gap-2 auto-rows-fr">
        <div className="row-span-2">
          <Socks5Proxy/>
        </div>
        <Google2FAToken/>
        <QrcodeText/>
        <ShortcutCommandShare/>
      </div>
    </>
  );
};