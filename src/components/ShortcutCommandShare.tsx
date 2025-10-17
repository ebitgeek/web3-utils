import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button.tsx";
import { toast } from "sonner";


export default function ShortcutCommandShare() {

  const shortcutCommandShareArr = [{
    title: '扫描二维码至剪贴板',
    shareUrl: 'https://www.icloud.com/shortcuts/fbd7981c229e44869182d570f02c156b'
  }]

  // @ts-ignore
  const handleCopyClick = async (command) => {
    try {
      await navigator.clipboard.writeText(command.shareUrl);
      toast.success(`${command.title} Copied!`);
    } catch (e) {
      console.error(e);
    }
  }
  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>苹果快捷指令分享</CardTitle>
          <CardDescription>
            好用的苹果快捷指令分享
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            {
              shortcutCommandShareArr.map((item, index) => {
                return (
                  <div id={`${index}`} className="grid gap-2">
                    <Label>{item.title}</Label>
                    <div className="flex w-full items-center gap-2">
                      <Input
                        type="text"
                        placeholder="请输入Google 2FA密钥"
                        value={item.shareUrl}
                        readOnly={true}
                      />
                      <Button type="submit" variant="outline" onClick={() => handleCopyClick(item)}>
                        拷贝至剪贴板
                      </Button>
                    </div>

                    <QRCodeSVG value={item.shareUrl}/>
                  </div>
                )
              })
            }
          </div>
        </CardContent>
      </Card>
    </>
  );
}