
// import {CustomerUserCardConstant} from '../constants/CustomerUserCardConstant';

// const initialState = {
//     status: '',
//     data: {
//        cards:[]
//     },
//     error: {},
// };

// export function CustomerUserCardReducer(state = initialState, action) {
//     switch (action.type) {
//         case CustomerUserCardConstant.CUSTOMERUSER_CARD_CONSTANT_REQUEST:
//             return {
//                 status: CustomerUserCardConstant.CUSTOMERUSER_CARD_CONSTANT_REQUEST,
//                 data: {...state.data,...{cards: action.data}},
//                 error: {},
//             };
//         case CustomerUserCardConstant.SIGNIN_SUCCESS:
//             return {
//                 status: CustomerUserCardConstant.SIGNIN_SUCCESS,
//                 data: {...state.data,...{cards: action.data}},
//                 error: {},
//             };
//         case CustomerUserCardConstant.SIGNIN_FAILURE:
//             return {
//                 status: CustomerUserCardConstant.SIGNIN_FAILURE,
//                 data: {cards: {}},
//                 error: action.data
//             };
//         default:
//             return state;
//     }
// }
