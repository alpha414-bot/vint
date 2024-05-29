import { keys } from "@/System/function";
import { useCallback } from "react";
import { useQuery, useQueryClient } from "react-query";
import { getAwsMedia, getProductData } from "./Query";

export const useProductsData = (product_id?: any) => {
  const queryClient = useQueryClient();
  // listener to subscribe to firestore snappshot
  const snapshotListener = useCallback((data: any) => {
    queryClient.setQueryData(keys.product_data(product_id), data);
    return data;
  }, []);
  return useQuery(
    keys.product_data(product_id),
    () => getProductData(snapshotListener, product_id),
    {
      
    }
  );
};

export const useGetImage = (key: any) => {
  return useQuery(keys.amazon_media(key), () => getAwsMedia(key), {});
};
