import { ColorSelector } from "@/components/v2/color-selector";
import { ColorTable } from "@/components/v2/color-table";

const ColorPalette = () => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-6 gap-x-10">
      <div className="order-2 xl:order-1 col-span-full xl:col-span-4">
        <ColorTable />
      </div>

      <div className="order-1 xl:order-2 xl:col-span-2">
        <ColorSelector />
      </div>
    </div>
  );
};

export default ColorPalette;
