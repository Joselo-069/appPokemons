/*logica aca */
const initialState = {
    pokemons : [],
    pokemonDetail: [],
    types: [],
    allPokemos:[],
    
    /*paginate */
    currentPage: 1,
    
    // totalPokemons: 0,
    itemsByPage: 12, 
    
    //loading
    loading: false,
    
    //tools
    tools:[],
    
    //notfound
    notFoundSearch: false,

    //filter origin
    originFilter: false,

    //filter asc / desc
    sortFilter:false,

    //filter type
    typeFilter:[]
    
}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_POKEMONS':
            return {
                ...state,
                pokemons: action.payload,
                allPokemos:action.payload,
            };
        
        case 'GET_NAME_POKEMONS':
            return {
                ...state,
                pokemons: action.payload,
                
            };
        
        case 'GET_ID_POKEMONS':
            return {
                ...state,
                pokemonDetail: action.payload
            };

            
        case 'GET_TYPES':
            return{
                ...state,
                types: action.payload
            };

        case 'GET_TOOLS':
            return {
                ...state,
                tools: action.payload  
            }

        case 'POST_POKEMON':
            return {
                ...state
            };  
            
        case 'UPDATE_POKEMON':
            return {
                ...state
            };          
            
        case 'DELETE_POKEMON':
                return {
                ...state
        }
             
        case 'FILTER_BY_ORIGIN':

            let pokemos;

            if (state.sortFilter.length) {
                // pokemos = state.sortFilter.length  ? state.sortFilter : [...state.allPokemos];  
                pokemos = state.sortFilter;  
            }

            if (state.typeFilter.length) {
                // pokemos = state.sortFilter.length  ? state.sortFilter : [...state.allPokemos];  
                pokemos = state.typeFilter  
            }

            if (!state.sortFilter.length && !state.typeFilter.length) {
                pokemos = [...state.allPokemos];
            }
            // const pokemos = state.sortFilter.length  ? state.sortFilter : [...state.allPokemos];  
            // const pokemos = state.sortFilter.length  ? state.sortFilter : [...state.allPokemos];  

            // const originFilter = action.payload === 'created' ? pokemos.filter(e => e.createInDb ) :  pokemos.filter(e => !e.createInDb);
            let originFilter;
            
            if (action.payload) {
                originFilter = action.payload === 'created' ? pokemos.filter(e => e.createInDb ) :  pokemos.filter(e => !e.createInDb);
            }
            
            return {
                ...state,
                pokemons: action.payload === 'all' ?  pokemos : originFilter,
                originFilter:action.payload === 'all' ?  pokemos : originFilter,
                // pokemons: originFilter,
                // originFilter:originFilter,
                currentPage:1,
                // sortFilter:[]
            };

        case 'FILTER_BY_TYPE':

        // 
            return {
                ...state,
                pokemons:action.payload,
                allPokemos:action.payload,
                typeFilter:action.payload,
                currentPage:1
        }

        case "ORDER_ASCENDING":

            // const pokemonsAll = state.originFilter.length ? state.originFilter : [...state.allPokemos];  
            const pokemonsAll = [...state.allPokemos];
            const orderfilter =  pokemonsAll.sort((a, b) => {
                if (a.name < b.name) return -1;
                if (a.name > b.name) return 1;
                return 0;
                })

            return {
                ...state,
                pokemons: orderfilter,
                currentPage:1,
                originFilter:[],
                sortFilter:orderfilter
            };

        case "ORDER_DESCENDING":
            // let pokemonsAll1 = state.originFilter.length ? state.originFilter : [...state.allPokemos];     
            const pokemonsAll1 = [...state.allPokemos];
            const orderfilter1 = pokemonsAll1.sort((a, b) => {
                if (a.name > b.name) return -1;
                if (a.name < b.name) return 1;
                return 0;
            })

            return {
                ...state,
                pokemons: orderfilter1,
                currentPage:1,
                originFilter:[],
                sortFilter:orderfilter1
            };

        case "ORDER_ATTACK_ASCENDING":
            let pokemonsAll2 = [...state.allPokemos]; 
            
            const orderFilterNumber =  pokemonsAll2.sort((a, b) => {
                if (a.attack < b.attack) return -1;
                if (a.attack > b.attack) return 1;
                
                return 0;
                })

            return {
                ...state,
                pokemons:orderFilterNumber,
                currentPage:1,
                originFilter:[],
                sortFilter:orderFilterNumber
            };

        case "ORDER_ATTACK_DESCENDING":
            let pokemonsAll3 =  [ ...state.allPokemos];

            const orderFilterNumber1 = pokemonsAll3.sort((a, b) => {
                if (a.attack > b.attack) return -1;
                if (a.attack < b.attack) return 1;
                return 0;
                })

            return {
                ...state,
                pokemons: orderFilterNumber1,
                currentPage:1,
                originFilter:[],
                sortFilter:orderFilterNumber1
            };

        case "SET_LOADING" :   
            return {
                ...state,
                loading: action.payload
            }
        // case "CLEAR_STATE" :
        //     return {
        //         pokemons: state.pokemons,
        //     }    

        case "MODIFY_PAGE":{
            let valor = action.payload;
            if ((state.currentPage+valor) < 1) { valor = 0; };
            if ((state.currentPage+valor) > Math.ceil(state.totalPokemons/state.itemsByPage)) { valor = 0; };

            return {
                ...state,
                currentPage: state.currentPage + valor,
            }
        }

        case "CURRENT_PAGE":{
            let specific = action.payload;
            return {
                ...state,
                currentPage: specific,
            }
        }

        case "BOTTOM_PAGE":{
            return {
                ...state,
                currentPage: 1,
            }
        }

        case "TOP_PAGE":{
            return {
                ...state,
                currentPage:  (state.totalPokemons === 0) ? 1 : 
                                Math.ceil(state.totalPokemons/state.itemsByPage), // devuelve el numero entero
            }
        }

        case "ERROR_SEARCH_POKEMON": {
            return {
                ...state,
                notFoundSearch:  action.payload, 
                // searchingPokemon : true,
                // loadingPokemons: false,
            }
        }
        
        default:
            return state;
    }
}


export default rootReducer;