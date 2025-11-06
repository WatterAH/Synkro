import React, { ReactNode } from "react";
import Loader from "./Loader";
import { Button } from "@/components/ui/button";

interface Props {
  loading: boolean;
  disabled?: boolean;
  children: ReactNode;
}

const SubmitButton: React.FC<Props> = ({ loading, disabled, children }) => {
  return (
    <div className="flex justify-center font-inter items-center relative">
      <Button className="w-full" type="submit" disabled={disabled}>
        {loading ? <Loader size="small" color="white" /> : children}
      </Button>
    </div>
  );
};

export default SubmitButton;
