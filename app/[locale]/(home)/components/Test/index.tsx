"use client";

import { toast } from "sonner";

import Button from "@/lib/components/Button";

const Test = () => {
  return (
    <div>
      <Button onClick={() => toast("Toast")}>Render Toast</Button>
    </div>
  );
};

export default Test;
