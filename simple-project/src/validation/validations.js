export const validate = (event, errors) =>{
  
  const { name, value } = event.target;

  switch (name) {
    case 'card_number':

      errors.card_number =
        value.length !== 16 | ! /^[0-9]+$/.test(value)
          ? 'Invalid Card Number!'
          : '';
      break;
      
    default:
      break;
  }
  //console.log(errors);
  return errors;
}


export const validateForm = (errors) => {
  let valid = true;
  Object.keys(errors).map((item, key) => {
    if(errors[item].length > 0)
      valid = false;
  });
  return valid;
}
