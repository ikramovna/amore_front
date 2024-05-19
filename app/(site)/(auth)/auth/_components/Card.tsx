"use client";

import { FC, ReactNode } from "react";
import { Card } from "@/components/ui/card";

const CustomCard: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Card className="sm:w-[540px] !min-w-full p-0 md:p-8 md:min-h-[529px]">
      {children}
    </Card>
  );
};

export default CustomCard;
