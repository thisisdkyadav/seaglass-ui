import { useState } from "react";
import {
  DirectionProvider, Breadcrumbs, Field, Input, Switch, Slider, Tabs, TabsList, Tab, TabsContent, Pagination, Badge, Stack,
} from "seaglass-ui";

export default function Rtl() {
  const [page, setPage] = useState(2);
  return (
    <DirectionProvider dir="rtl">
      <div dir="rtl" lang="ar" style={{ width: "min(520px, 100%)" }}>
        <Stack gap={4}>
          <Breadcrumbs aria-label="المسار" items={[{ label: "الرئيسية", href: "#" }, { label: "المشاريع", href: "#" }, { label: "المد والجزر" }]} />
          <Tabs defaultValue="overview">
            <TabsList aria-label="الأقسام">
              <Tab value="overview">نظرة عامة</Tab>
              <Tab value="activity">النشاط</Tab>
              <Tab value="settings">الإعدادات</Tab>
            </TabsList>
            <TabsContent value="overview">ملخص المشروع وآخر التغييرات.</TabsContent>
            <TabsContent value="activity">سجل النشاط.</TabsContent>
            <TabsContent value="settings">إعدادات المشروع.</TabsContent>
          </Tabs>
          <Field label="اسم المشروع" description="يظهر في الشريط الجانبي.">
            <Input defaultValue="بركة المد" />
          </Field>
          <Stack direction="row" gap={3} align="center" justify="between">
            <Switch label="إشعارات البريد" defaultChecked />
            <Badge tone="mint" dot>نشط</Badge>
          </Stack>
          <Slider aria-label="مستوى الصوت" defaultValue={[30]} />
          <Pagination aria-label="الصفحات" page={page} pageCount={6} onPageChange={setPage} />
        </Stack>
      </div>
    </DirectionProvider>
  );
}
