import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import CodePreview from "@/components/old/code-preview";
import CustomizationForm from "@/components/old/customization-form";

export default function CustomFormPage() {
  return (
    <div className="container py-4">
      <div className="grid gap-11 grid-cols-1 xl:grid-cols-2 xl:auto-rows-fr">
        <div>
          This page is under construction. <br />
          Here is the old custom form for the moment.
        </div>
        <Tabs defaultValue="form" className="relative mr-auto w-full">
          <div className="flex items-center justify-between">
            <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
              <TabsTrigger
                value="form"
                className="relative h-10 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
              >
                Form
              </TabsTrigger>
              <TabsTrigger
                value="code"
                className="relative h-10 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
              >
                Code
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="form">
            <CustomizationForm />
          </TabsContent>
          <TabsContent value="code">
            <CodePreview />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
