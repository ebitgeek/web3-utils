import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import { useMemo } from "react";
import { Button } from "@/components/ui/button.tsx";
import { QRCodeSVG } from "qrcode.react";
import { useSocks5ProxyStore } from "@/store/useSocks5ProxyStore.ts";
import { toast } from "sonner";

export default function Socks5Proxy() {
  // const [ip, setIp] = useState<string>("");
  // const [port, setPort] = useState<string>("5555");
  // const [user, setUser] = useState<string>("bitcoin");
  // const [password, setPassword] = useState<string>("sadfq3345sgz");

  const {
    ip, setIp,
    port, setPort,
    user, setUser,
    password, setPassword,
    shadowrocketRemark, setShadowrocketRemark,
  } = useSocks5ProxyStore();

  const proxyUrl = useMemo(() => {
    let userPass = '';
    if (user.length > 0 && password.length > 0) {
      userPass = `${user}:${password}@`
    }
    return `socks5://${userPass}${ip}:${port}`;
  }, [ip, port, user, password]);


  const shadowrocketShareUrl = useMemo(() => {
    let userPass = '';
    if (user.length > 0 && password.length > 0) {
      userPass = `${user}:${password}@`
    }
    let s = `${userPass}${ip}:${port}`;
    return `socks://${btoa(
      new TextEncoder().encode(s)
        .reduce((acc, byte) => acc + String.fromCharCode(byte), "")
    )}?remarks=${encodeURIComponent(shadowrocketRemark)}`;
  }, [ip, port, user, password, shadowrocketRemark]);


  const fetchSelfPublicIp = async () => {
    try {
      const data = await fetch('https://api.ipify.org?format=json');
      return (await data.json()).ip
    } catch (e) {
      console.error(e);
    }
  };

  const handleUseSelfPublicIpClick = async () => {
    const selfIp = await fetchSelfPublicIp();
    setIp(selfIp);
  }


  const handleCopyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${text} Copied!`);
    } catch (e) {
      console.error(e);
    }
  }
  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Socks5 代理生成</CardTitle>
          <CardDescription>
            在下面输入您的Socks5代理信息以生成socks5代理信息
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label>IP地址</Label>
              <div className="flex w-full items-center gap-2">
                <Input
                  type="text"
                  placeholder="请输入代理的ip地址"
                  value={ip}
                  onChange={(e) => setIp(e.target.value.trim())}
                />
                <Button type="submit" variant="outline" onClick={handleUseSelfPublicIpClick}>
                  使用当前IP地址
                </Button>
              </div>
            </div>
            <div className="grid gap-2">
              <Label>端口</Label>
              <Input
                type="number"
                placeholder="请输入端口号"
                value={port}
                onChange={(e) => setPort(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label>用户名</Label>
              <Input
                type="text"
                placeholder="请输入代理的用户名"
                value={user}
                onChange={(e) => setUser(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label>密码</Label>
              <Input
                type="text"
                placeholder="请输入代理密码"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label>代理链接</Label>
              <div className="grid w-full items-center gap-2">
                <Textarea readOnly={true} value={proxyUrl}/>
                <Button type="submit" variant="outline" onClick={async () => await handleCopyToClipboard(proxyUrl)}>
                  拷贝至剪贴板
                </Button>
              </div>
            </div>
            <div className="grid gap-2">
              <Label>小火箭备注</Label>
              <Textarea
                placeholder="请输入备注信息..."
                value={shadowrocketRemark}
                onChange={(e) => setShadowrocketRemark(e.target.value)}/>
            </div>
            <div className="grid gap-2">
              <Label>小火箭链接</Label>
              <Textarea readOnly={true} value={shadowrocketShareUrl}/>
              <QRCodeSVG value={shadowrocketShareUrl}/>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}