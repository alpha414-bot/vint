import { isURL } from "@/System/function";
import { AuthUserType } from "@/Types/Auth";
import { auth, firestore } from "@/firebase-config";
import { notify } from "@/notify";
import { getUrl } from "aws-amplify/storage";
import { signInAnonymously } from "firebase/auth";
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
              (error) => {
                notify.error({
                  title: "Error",
                  text: `[Error #BtG]: ON_SNAPSHOT_ERROR: ${JSON.stringify(
                    error
                  )}. <br/>Contact administrator.`,
                });
                reject(error);
              }
            );
          } else {
            // return all the products in the ProductCollection
            resolve(
              listener(snap.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
            );
          }
        },
        (error) => {
          // snapshot error
          notify.error({
            title: "Error",
            text: `[Error ^doon]: SNAPSHOT_ERROR_WHILE_RETRIEVING_PRODUCTS: ${JSON.stringify(
              error
            )}. <br/>Contact administrator`,
          });
          reject(error);
        }
      );
    } catch (error) {
      notify.error({
        title: "Error",
        text: `[Error #BnH]: try/catch: ${JSON.stringify(
          error
        )}. <br/>Contact administrator.`,
      });
      reject(error);
    }
  });

export const signInUserIfNotSign = (listener: any) =>
  new Promise((resolve, reject) => {
    signInAnonymously(auth)
      .then((new_user) => {
        if (!new_user.user.uid) {
          // failed to authenticate
          notify.error({
            title: "Error",
            text: "[Error #ProblemSignInA]: There was a problem with authorization instance.<br/> Contact administrator or try to login",
          });
          reject("No authorized user found.");
        } else {
          resolve(new_user);
          return listener();
        }
      })
      .catch((error) => {
        notify.error({
          title: "Error",
          text: "[Error #ProblemSignInB]: There was a problem with authorization instance.<br/> Contact administrator or try to login",
        });
        reject(error);
      });
  });

export const addCollectionDoc = (
  CollectionName: any,
  data: ProductItemType[],
  successMessage?: string
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
        addDoc(ProductCollection, DataObject)
          .then((data) => {
            notify.success({
              text: successMessage || `${CollectionName} successfully added.`,
            });
            resolve(data);
          })
          .catch((error) => {
            notify.error({
              title: "Error",
              text: "[Error &fjH]: Error while adding doc to collection. <br/>Contact administrator",
            });
            reject(error);
          });
      });
    } catch (error) {
      notify.error({
        title: "Error",
        text: `[Error #DnG]: try/catch: ${JSON.stringify(
          error
        )}. <br/>Contact administrator.`,
      });
      reject(error);
    }
  });

export const addToCartQuery = (user: AuthUserType, product: ProductItemType) =>
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
              .then((data) => {
                notify.success({
                  text: `<strong class="underline underline-offset-2 decoration-dotted">${product.name}</strong> added to cart.`,
                });
                resolve(data);
              })
              .catch((error) => {
                notify.error({
                  title: "Error",
                  text: `[Error @Kmop]: Error while configuring products ${JSON.stringify(
                    error
                  )}.<br/> Contact administrator`,
                });
                reject(error);
              });
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
              .then((data) => {
                notify.success({
                  text: `<strong class="underline underline-offset-2 decoration-dotted">${product.name}</strong> added to cart.`,
                });
                resolve(data);
              })
              .catch((error) => {
                notify.error({
                  title: "Error",
                  text: `[Error /&GNm]: ${JSON.stringify(
                    error
                  )}. <br/> Contact administrator`,
                });
                reject(error);
              });
          }
        });
      } else {
        notify.error({
          title: "Error",
          text: "[Error #ProblemSignInc]: There was a problem with authorization instance.<br/> Contact administrator or try to login",
        });
      }
    } catch (error) {
      notify.error({
        title: "Error",
        text: `[Error #Capi]: try/catch: ${JSON.stringify(
          error
        )}.<br/>Contact administrator.`,
      });
      reject(error);
    }
  });

export const getCartProducts = (
  listener: any,
  User?: AuthUserType
): Promise<ProductItemType[]> =>
  new Promise((resolve, reject) => {
    try {
      const CartCollection = collection(firestore, "Carts");
      // const q = query(CartCollection, orderBy("createdAt"));
      if (User?.uid) {
        const UserDocs = doc(CartCollection, User?.uid);
        onSnapshot(
          UserDocs,
          async (snap) => {
            const DocData = snap.data() as CartProductItem;
            const DocDataProducts = DocData.products;
            resolve(listener(DocDataProducts || []));
          },
          (error) => {
            notify.error({
              text: `[Error #DbG]: Problem fetching cart collection. ${error}. <br/> Contact Administrator`,
            });
          }
        );
      } else {
        resolve([]);
      }
    } catch (error) {
      notify.error({
        text: `[Error #bhs]: Try/catch. <br/> Contact Administrator.`,
      });
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
        .catch((error) => {
          // notify.error({
          //   text: `[Error xBaA]: Failed to connect to aws.<br/> Contact administrator`,
          // });
          reject(error);
        });
    }
  });

export const getUserDataLoader = async (): Promise<UserDataLoaderInterface> => {
  // fetching data from firebase and etc...
  const orders: any = await getProductData((data: any) => data);
  // const orders: any = await getAwsMedia("/public/hero.svg");
  return { orders: orders, carts: "my-carts", profile: "my-profile" };
};
