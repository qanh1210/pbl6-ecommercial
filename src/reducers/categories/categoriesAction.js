// import { API_URL } from "../../utils/Config";
// import { timeoutPromise } from "../../utils/Tools";
// export const FETCH_CATEGORIES = "FETCH_CATEGORIES";
// export const CATEGORIES_LOADING = "CATEGORIES_LOADING";
// export const CATEGORIES_FAILURE = "CATEGORIES_FAILURE";

// export const fetchCategories = () => {
//   return async (dispatch) => {
//     dispatch({
//       type: CATEGORIES_LOADING,
//     });
//     try {
//       const response = await timeoutPromise(
//         fetch(`https://cbcf880m45.execute-api.eu-central-1.amazonaws.com/production/v1/categories`, {
//           method: "GET",
//         })
//       );

//       if (!response.ok) {
//         dispatch({
//           type: CATEGORIES_FAILURE,
//         });
//         throw new Error("Something went wrong!, can't get the categories");
//       }
//       const resData = await response.json();
//       dispatch({
//         type: FETCH_CATEGORIES,
//         categories: resData
//       });
//     } catch (err) {
//       throw err;
//     }
//   };
// };
