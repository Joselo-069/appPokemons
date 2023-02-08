import axios from 'axios';

/*no hacer logica en el actions */

export function getPokemons() {
    return async function (dispatch) {
        const apiPokemons = await axios.get("http://localhost:3001/pokemons");
        const pokemons = await apiPokemons.data;
        dispatch({
            type: 'GET_POKEMONS',
            payload:pokemons 
        })
    } 
}

export function getNamePokemons(name){
    return async function (dispatch) {
        
        try {
            const apiPokemons = await axios.get(`http://localhost:3001/pokemons?name=${name}`);
            const pokemons = await apiPokemons.data;
                
            return dispatch ({
                    type:"GET_NAME_POKEMONS",
                    payload: pokemons
            })  
                
        } catch (error) {
            return dispatch ({
                    type : "SET_LOADING",
                }
            )
        }
    }
}

export function getIdPokemons(id){
    return async function (dispatch) {
        try {
            const apiPokemons = await axios.get(`http://localhost:3001/pokemons/${id}`);
            const pokemons = await apiPokemons.data;

            return dispatch ({
                type:"GET_ID_POKEMONS",
                payload: pokemons
            })  
        } catch (error) {
            console.log(error);
        }
    }
}

export function getTypePokemons(type) {
    return async function (dispatch) {
        try {
            const apiPokemons = await axios.get(`http://localhost:3001/pokemons/types/pokemon?type=${type}`);
            const pokemons = await apiPokemons.data;

            return dispatch ({
                type:"FILTER_BY_TYPE",
                payload: pokemons
            })  
        } catch (error) {
            console.log(error);
        }
    }
}

export function postPokemon(payload) {
    return async function (dispatch) {
        const res = await axios.post("http://localhost:3001/pokemons",payload);
        console.log(res);
        return res;
    }
}

export function  deletePokemon(payload) {
    return async function (dispatch) {
        try {
            const deletePokemon = await axios.delete(`http://localhost:3001/pokemons/${payload}`);
            
            return dispatch ({
                type:"DELETE_POKEMON",
                payload: deletePokemon
            })  
        } catch (error) {
            console.log(error);
        }

    }
}

export function editPokemon(payload) {
    return async function (dispatch) {
        try {
            const updatePokemon = await axios.updatePokemon(`http://localhost:3001/pokemons/${payload}`);
            return dispatch ({
                type:"UPDATE_POKEMON",
                payload: updatePokemon
            })  
        } catch (error) {
            console.log(error);
        }
    }
}

export function getTypes() {
    return async function (dispatch) {
        const api = await axios.get("http://localhost:3001/types");
        const types = await api.data;
        dispatch({
            type:"GET_TYPES",
            payload: types
        })
    }
}

export function getTools(payload) {
    return async function (dispatch) {
        const api = await axios.get(`http://localhost:3001/tools/images/${payload}`);
        const types = await api.data;
        dispatch({
            type:"GET_TOOLS",
            payload: types
        })
    }
}


export function filterOrder(payload) {
    return{
        type:"FILTER_BY_TYPE",
        payload
    }
}


export function filterSort(payload) {

    switch (payload) {
        case "asc":
            return {
                type: "ORDER_ASCENDING",
            };
        case "desc":
            return {
                type: "ORDER_DESCENDING",
            };
        case "bottom":
            return {
                type: "ORDER_ATTACK_ASCENDING",
            };   
        case "top":
            return {
                type: "ORDER_ATTACK_DESCENDING",
            }; 
            
        default:
            return async function (dispatch) {
                const apiPokemons = await axios.get("http://localhost:3001/pokemons");
                const pokemons = await apiPokemons.data;
                dispatch({
                    type: 'GET_POKEMONS',
                    payload:pokemons 
                })
            }
    }

    // if (payload === "asc") {
    //     return {
    //       type: "ORDER_ASCENDING",
    //     };
    // }
    // if (payload === "desc") {
    //     return {
    //       type: "ORDER_DESCENDING",
    //     };
    // }
    // if (payload === "bottom") {
    //     return {
    //         type: "ORDER_ATTACK_ASCENDING",
    //     };
    // }
    // if (payload === "top") {
    //     return {
    //         type: "ORDER_ATTACK_DESCENDING"
    //     };
    // }
}


export function filterOrigin(payload) {
    return{
        type:"FILTER_BY_ORIGIN",
        payload
    }
}


export function modifyPage(payload){
    return {
        type: "MODIFY_PAGE",
        payload: payload,
    }
}


export function especificPage(payload) {
    return{
        type: "CURRENT_PAGE",
        payload: payload
    }
}

export function topPage(){
    return {
        type: "TOP_PAGE",
    }
}

export function bottomPage(){
    return {
        type: "BOTTOM_PAGE",
    }
}

export const setLoading = (payload) =>{
    return {
        type : "SET_LOADING",
        payload
    }
}

export const getError = (payload) =>{
    return {
        type : "ERROR_SEARCH_POKEMON",
        payload
    }
}