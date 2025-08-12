import { keys } from "@/System/function";
import { AuthUserType } from "@/Types/Auth";
import { auth } from "@/firebase-config";
import { notify } from "@/notify";
import { onAuthStateChanged, signInAnonymously } from "firebase/auth";
import { useCallback, useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";
import {
  getAwsMedia,
  getCartProducts,
  getOrders,
  getProductData,
  getSimilarProductData,
} from "./Query";

export const useAuthUser = () => {
  const queryClient = useQueryClient();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      // for syncing all query data if auth user is changed
      queryClient.setQueryData("auth_user", user);
    });
  }, []);
  return useQuery(
    "auth_user",
    (): Promise<AuthUserType> =>
      new Promise((resolve, reject) =>
        onAuthStateChanged(auth, (user) => {
          try {
            if (!user?.uid) {
              // if user is not signed, sign in user anonymously
              signInAnonymously(auth)
                .then((new_user) => {
                  resolve(new_user.user);
                })
                .catch((error) => {
                  notify.error({
                    title: "Error",
                    text: "[Error %gBF]: Authentication instance unmet.<br/> Contact administrator or try to login",
                  });
                  reject(error);
                });
            } else {
              resolve(user);
            }
          } catch (error) {
            reject(error);
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
    {
      keepPreviousData: true,
      placeholderData: !!product_id ? [] : {},
    }
  );
};

export const useSimilarProductsData = (product: ProductItemType) => {
  const queryClient = useQueryClient();
  // listener to subscribe to firestore snappshot
  const snapshotListener = useCallback((data: any) => {
    queryClient.setQueryData(keys.similar_product_data(product.id), data);
    return data;
  }, []);
  return useQuery(
    keys.similar_product_data(product.id),
    () => getSimilarProductData(snapshotListener, product),
    {
      placeholderData: [],
    }
  );
};

export const useCartProducts = () => {
  const queryClient = useQueryClient();
  const { data: AuthUser } = useAuthUser();
  const snapshotListener = useCallback(
    (data: any, type?: "product") => {
      if (type == "product") {
        // the listener is meant for a single product inside the carts, so it can be updated
        const ProductsData = data as ProductItemType;
        const CartData = queryClient.getQueryData(
          keys.cart_data(AuthUser?.uid)
        ) as CartMetaItem[];
        if (CartData) {
          const CartUpdatedData = CartData.map((item) =>
            item.productID === ProductsData?.id
              ? { ...item, ...{ metadata: ProductsData } }
              : item
          );
          queryClient.setQueryData(
            keys.cart_data(AuthUser?.uid),
            CartUpdatedData
          );
        }
        return data;
      } else {
        queryClient.setQueryData(keys.cart_data(AuthUser?.uid), data);
        return data;
      }
    },
    [AuthUser]
  );

  return useQuery(
    keys.cart_data(AuthUser?.uid),
    (): Promise<CartMetaItem[]> => getCartProducts(snapshotListener),
    {
      placeholderData: [],
      initialData: []
    }
  );
};

export const useOrders = () => {
  const queryClient = useQueryClient();
  const { data: AuthUser } = useAuthUser();
  const snapshotListener = useCallback(
    (data: any) => {
      queryClient.setQueryData(keys.order_data(AuthUser?.uid), data);
      return data;
    },
    [AuthUser]
  );

  return useQuery(
    keys.order_data(AuthUser?.uid),
    (): Promise<OrderDataInterface[]> => getOrders(snapshotListener),
    {
      placeholderData: [],
    }
  );
};

export const useAwsImage = (key: any) => {
  return useQuery(keys.amazon_media(key), () => getAwsMedia(key), {});
};
