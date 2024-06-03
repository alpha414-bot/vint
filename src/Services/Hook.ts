import { keys } from "@/System/function";
import { AuthUserType } from "@/Types/Auth";
import { auth } from "@/firebase-config";
import { notify } from "@/notify";
import { onAuthStateChanged, signInAnonymously } from "firebase/auth";
import { useCallback } from "react";
import { useQuery, useQueryClient } from "react-query";
import { getAwsMedia, getCartProducts, getProductData } from "./Query";

export const useAuthUser = () => {
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
    {}
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
    (): Promise<CartMetaItem[]> => getCartProducts(snapshotListener, AuthUser),
    {
      placeholderData: [],
    }
  );
};

export const useGetImage = (key: any) => {
  return useQuery(keys.amazon_media(key), () => getAwsMedia(key), {});
};
