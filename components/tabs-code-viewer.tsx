import { TabCodeProps } from "@/types/colors";

import { CopyButton } from "./copy-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Prism as SyntaxHighlighter} from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const TabCodeViewer = ({ data }: { data: TabCodeProps[] }) => {
  return (
    <div className="rounded-md overflow-hidden">
      <Tabs defaultValue="account" className="h-full">
        <TabsList className="h-9 text-sm">
          {data.map((item) => (
            <TabsTrigger key={item.tabValue} value={item.tabValue}>
              {item.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {data.map((item) => (
          <TabsContent key={item.tabValue} value={item.tabValue} className="h-full">
            <div className="relative h-full">
              <CopyButton
                value={item.code}
                className="absolute top-2 right-7 z-20"
              />
              <SyntaxHighlighter
                language={item.language}
                style={atomDark}
                className="h-full pb-10"
              >
                {item.code}
              </SyntaxHighlighter>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default TabCodeViewer;