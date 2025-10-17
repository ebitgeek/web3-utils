import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import { useStickyNoteStore } from "@/store/useStickyNoteStore.ts";

export default function StickyNote() {
  const { stickyNoteText, setStickyNoteText } = useStickyNoteStore();
  return (
    <>
      <Card className="w-full flex flex-col"> {/* ✅ 给 Card 固定高度 */}
        <CardHeader>
          <CardTitle>便签</CardTitle>
          <CardDescription>快捷记录一些文本信息</CardDescription>
        </CardHeader>

        {/* ✅ 让内容部分自适应剩余空间 */}
        <CardContent className="flex-1 flex flex-col gap-3 h">
          <Label>便签内容</Label>
          <Textarea
            wrap="off"
            placeholder="请输入要记录的内容..."
            className="flex-1 w-full resize-none"
            value={stickyNoteText}
            onChange={(e) => setStickyNoteText(e.target.value)}
          />
        </CardContent>
      </Card>
    </>
  );
}