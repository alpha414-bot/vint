import { isURL } from "@/System/function";
import { firestore } from "@/firebase-config";
import { getUrl } from "aws-amplify/storage";
import { User } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";

export const getProductData = (listener: any, product_id?: any) =>
  new Promise((resolve, reject) => {
    try {
      const ProductCollection = collection(firestore, "Products");
      onSnapshot(
        ProductCollection,
        async (snap) => {
          if (product_id) {
            // return only a single product using the product_id
            const ProductListDocs = doc(ProductCollection, product_id);
            onSnapshot(
              ProductListDocs,
              async (singleSnap) => {
                resolve(listener(singleSnap.data()));
              },
              reject
            );
          } else {
            // return all the products in the ProductCollection
            resolve(
              listener(snap.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
            );
          }
        },
        reject
      );
    } catch (error) {
      reject(error);
    }
  });

export const addCollectionDoc = (
  CollectionName: any,
  data: ProductItemType[]
) =>
  new Promise((resolve, reject) => {
    try {
      const ProductCollection = collection(firestore, CollectionName);
      data.forEach((item) => {
        const DataObject = {
          ...item,
          ...{
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        };
        addDoc(ProductCollection, DataObject).then(resolve).catch(reject);
      });
      // batch.commit().then(resolve).catch(reject);
    } catch (error) {
      reject(error);
    }
  });

type CartProductItem = { products: { productID: string; quantity: number }[] };
export const addToCartQuery = (
  user: User | null | undefined,
  product: ProductItemType
) =>
  new Promise((resolve, reject) => {
    try {
      if (user?.uid) {
        // there is an authenticated user
        const CartCollection = collection(firestore, "Carts");
        const UserCartDoc = doc(CartCollection, user.uid);
        getDoc(UserCartDoc).then((UserProductItems) => {
          if (UserProductItems.exists()) {
            // the user has made use of "Add to cart"
            const UserCartProducts = UserProductItems.data() as CartProductItem;
            const UpdateInUserProducts = UserCartProducts.products.map(
              (item) => {
                // check if about to be added products is already there
                return item.productID === product.id
                  ? {
                      ...item,
                      quantity: item.quantity + 1,
                      updatedAt: new Date(),
                    }
                  : item;
              }
            ); // this might not be necessary
            const NewUserProducts = UserCartProducts.products.some(
              (item) => item.productID === product.id
            )
              ? UpdateInUserProducts // no new products, work still on old products added
              : [
                  ...UpdateInUserProducts,
                  {
                    productID: product.id,
                    quantity: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                  },
                ];
            updateDoc(UserCartDoc, { products: NewUserProducts })
              .then(resolve)
              .catch(reject);
          } else {
            setDoc(UserCartDoc, {
              products: [
                {
                  productID: product.id,
                  quantity: 1,
                  createdAt: new Date(),
                  updatedAt: new Date(),
                },
              ],
            })
              .then(resolve)
              .catch(reject);
          }
        });
        // setDoc(doc(firestore, "Carts", user?.uid), ...);
      }
    } catch (error) {
      reject(error);
    }
  });

export const getFrontendSliders = (listener: any, slider_id?: any) =>
  new Promise((resolve, reject) => {
    const frontendCollectionRef = collection(firestore, "frontend"); // reference frontend as collection
    const slidersDocRef = doc(frontendCollectionRef, "sliders"); // reference sliders as doc
    onSnapshot(
      slidersDocRef,
      async (snapshot) => {
        try {
          if (slider_id) {
            const sliderSubCollectionRef = collection(slidersDocRef, slider_id); // reference the slider_id as a collection containing docs
            const sliderDocsQuery = query(
              sliderSubCollectionRef,
              orderBy("id", "asc")
            );
            onSnapshot(sliderDocsQuery, async (querySnapshot) => {
              resolve(
                listener(querySnapshot.docs.map((doc) => ({ ...doc.data() })))
              );
            });
          } else {
            const sliders = await Promise.all(
              snapshot.data()?.sliders_info?.map(async (slider: any) => {
                const sliderSubCollection = query(
                  collection(slidersDocRef, slider),
                  orderBy("id", "asc")
                );
                const sliderDocs = await getDocs(sliderSubCollection);
                return {
                  slider_name: slider,
                  banners: sliderDocs.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                  })),
                };
              })
            );
            resolve(sliders);
          }
        } catch (error) {
          reject(error);
        }
      },
      reject
    );
  });

export const getAwsMedia = (key: any) =>
  new Promise((resolve, reject) => {
    if (isURL(key)) {
      // key is an absolute url, no need for cross checking
      resolve(key);
      return key;
    } else {
      getUrl({
        key: key,
        options: {
          accessLevel: "guest", // can be 'private', 'protected', or 'guest' but defaults to `guest`
          // targetIdentityId?: 'XXXXXXX', // id of another user, if `accessLevel` is `guest`
          validateObjectExistence: false, // defaults to false
          expiresIn: 1000, // validity of the URL, in seconds. defaults to 900 (15 minutes) and maxes at 3600 (1 hour)
          useAccelerateEndpoint: false, // Whether to use accelerate endpoint.
        },
      })
        .then((result) => {
          resolve(result.url.href);
          return result.url.href;
        })
        .catch(reject);
    }
  });
