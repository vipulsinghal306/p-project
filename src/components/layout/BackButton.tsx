import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => router.back()}
      className="rounded-full cursor-pointer"
      aria-label="Back"
    >
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-arrow-left"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
    </Button>
  );
};

export default BackButton; 