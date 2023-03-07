export const categoryListReducer = (state = {}, action) => {
  switch (action.type) {
    case "DATA_LIST_GET":
      return {
        loading: false,
        data: action.payload,
      };

    default:
      return state;
  }
};
export const upsertCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case "CATEGORY_UP_SERT":
      return {
        data: action.payload,
        loading: true,
      };
    default:
      return state;
  }
};
export const getCategoryIdReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_CATEGORY_ID":
      return {
        loading: false,
        data: action.payload,
      };

    default:
      return state;
  }
};
