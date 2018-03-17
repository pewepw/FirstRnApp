import { ADD_PLACE, DELETE_PLACE } from '../actions/actionTypes'

const initialState = {
    places: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PLACE:
            return {
                ...state,
                places: state.places.concat({
                    key: Math.random(), 
                    name: action.placeName,
                    image: {
                      uri: "https://i0.wp.com/lovecuteanimals.objects.cdn.dream.io/wp-content/uploads/2016/01/Cute-Netherland-Dwarf-Rabbit.jpg?w=1160"
                    },
                    location: action.location
                })
            };

        case DELETE_PLACE:
            return {
                ...state,
                places: state.places.filter(place => {
                    return place.key !== action.placeKey;
                    })
            };

        default:
            return state;
    }
};

export default reducer;