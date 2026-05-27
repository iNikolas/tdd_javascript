import React from "react";
import { toast } from "sonner";

import { extractErrorMessage } from "shared/utils";

export function useErrorToast(error: unknown) {
  React.useEffect(() => {
    if (error) {
      toast.error(extractErrorMessage(error), {});
    }
  }, [error]);
}
