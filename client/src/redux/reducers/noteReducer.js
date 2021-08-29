const initialstate = {
    notes: [],
    data: {}
}



const noteReducer = (state = initialstate, action) =>{
    switch (action.type) {
        case "GET_POST":
            return {notes: action.payload};

              case "POST_NOTE":
            return {
                data: action.payload,
            };

            case "UPDATE":
               // console.log(notes);
                return {
                    data: action.payload
                }
                case "DELETE":
                    // console.log(notes);
                    return {
                        data: action.payload
                    }

    
        default:
            return state;
    }
}

export default noteReducer;