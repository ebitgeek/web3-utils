import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import { QRCodeSVG } from "qrcode.react";
import { useQrcodeTextStore } from "@/store/useQrcodeTextStore.ts";

export default function QrcodeText() {
  const { qrcodeText, setQrcodeText } = useQrcodeTextStore();
  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>通过文本生成二维码</CardTitle>
          <CardDescription>
            在下面输入您要生成二维码的文本
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2">
            <Label>二维码内容</Label>
            <Textarea placeholder="输入要生成的内容..." value={qrcodeText}
                      onChange={(e) => setQrcodeText(e.target.value)}/>
            <QRCodeSVG value={qrcodeText}/>
          </div>
        </CardContent>
      </Card>
    </>
  );
}