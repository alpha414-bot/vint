import { keys } from "@/System/function";
import { useCallback } from "react";
import { useQuery, useQueryClient } from "react-query";
import { getAwsMedia, getProductData } from "./Query";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase-config";

export const useAuthUser = () => {
  const queryClient = useQueryClient();
  // snapshot: realtime update
  onAuthStateChanged(auth, (user) => {
    queryClient.setQueryData("auth_user", user);
  });
  return useQuery(
    "auth_user",
    (): Promise<User | null> =>
      new Promise((resolve, reject) =>
        onAuthStateChanged(auth, (user) => {
          try {
            resolve(user);
          } catch (error) {
            reject({
              error: true,
              message: `Error when retrieving authenticated user: ${error}`,
            });
          }
        })
      )
  );
};

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
    {}
  );
};

export const useCartProducts = () => {
  const queryClient = useQueryClient();
  onAuthStateChanged(auth, (user) => {
    queryClient.setQueryData("auth_user", user);

  });
};

export const useGetImage = (key: any) => {
  return useQuery(keys.amazon_media(key), () => getAwsMedia(key), {});
};
