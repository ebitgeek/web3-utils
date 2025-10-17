import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useState } from "react";
import * as OTPAuth from "otpauth";
import { useGoogle2FAStore } from "@/store/useGoogle2FAStore.ts";
import { toast } from "sonner"

export default function Google2FAToken() {
  const { secret, setSecret } = useGoogle2FAStore()
  const [token, setToken] = useState("");

  const handleClick = () => {
    const totp = new OTPAuth.TOTP({
      secret: secret, // Base32 secret
      digits: 6,
      period: 30,
      algorithm: 'SHA1'
    });

    // 生成当前动态密码
    const token = totp.generate();
    setToken(token);
  };

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(token);
      toast.success(`${token} Copied!`);
    } catch (e) {
      console.error(e);
    }
  }
  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Google 2FA 动态验证码获取</CardTitle>
          <CardDescription>
            在下面输入您的Google 2FA密钥以获取动态验证码
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label>密钥</Label>
              <Input
                type="text"
                placeholder="请输入Google 2FA密钥"
                value={secret}
                onChange={(e) => setSecret(e.target.value.trim())}
              />
            </div>
            <div className="grid gap-2">
              <Label>动态验证码</Label>
              <Textarea readOnly={true} value={token}/>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full" onClick={handleClick}>
            获取动态验证码
          </Button>
          <Button variant="outline" className="w-full" onClick={handleCopyClick}>
            拷贝至剪贴板
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}