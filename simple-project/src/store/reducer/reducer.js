import * as actionType from '../action/actionType';

const initialState = {
  card_details: '',
  isLoading: false,
  enrolment: '',
  invoice:''
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.UPDATE_LOADER:
      return {
        ...state,
        isLoading: action.value
      };
    case actionType.CARDNODETAILS:
      return {
        ...state,
        card_details: action.value
      };
    case actionType.SAVEENROLMENT:
      return {
        ...state,
        enrolment: action.value
      };
      case actionType.EDITINVOICE:
        return{
          ...state,
          invoice:action.value
        }
    default:
      return state;
  }
};

export default reducer;
