import { useMutation } from "@tanstack/react-query";
import { fetcher } from "./fetcher";
import { queryClient } from "../lib/query-client";

export interface PaymentSheetDetails {
  customer: string;
  paymentIntent: string;
  ephemeralKey: string;
  publishableKey: string;
}

export interface PaymentSheetBody {
  products: {
    id: string;
    quantity: number;
  }[];
}

export const fetchPaymentSheetDetails = async (params: PaymentSheetBody) => {
  return fetcher("/checkout/payment-sheet", {
    body: JSON.stringify(params),
    method: "POST",
  })
    .then((data: PaymentSheetDetails) => {
      return data;
    })
    .catch((error) => {
      console.log("error", error);
      throw error;
    });
};

export const usePaymentSheetDetails = () => {
  return useMutation({
    mutationFn: fetchPaymentSheetDetails,
  });
};

export const notifyCheckoutSuccess = async (params: PaymentSheetBody) => {
  return fetcher("/checkout/success", {
    method: "POST",
    body: JSON.stringify(params),
  });
};

export const useNotifyCheckoutSuccess = () => {
  return useMutation({
    mutationFn: notifyCheckoutSuccess,
    onSuccess: () => {
      // Refetch products
      queryClient.invalidateQueries({
        queryKey: ["shoes"],
      });
    },
  });
};
