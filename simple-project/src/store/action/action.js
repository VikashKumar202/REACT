import * as actionType from './actionType';

export const updateLoader = (isLoading) => {
  return{
    type:actionType.UPDATE_LOADER,
    value: isLoading
  }
};

export const get_card_details = (card_no) => {
  return {
    type: actionType.CARDNODETAILS,
    value: card_no
  };
};

export const save_enrolment = (value) => {
  return {
    type: actionType.SAVEENROLMENT,
    value: value
  };
};

export const edit_invoice = (value) => {
  return {
    type: actionType.EDITINVOICE,
    value: value
  };
};