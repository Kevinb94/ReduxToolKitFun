import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { apiCallBegan } from './api';

let lastId = 1;

const slice = createSlice({
    name: "bugs",
    initialState: {
        list: [],
        loading: false,
        lastFetch: null
    },
    reducers: {

        bugsRequested: (bugs, action) => {
            bugs.loading = true;
        },


        bugsRequestFailed: (bugs, action) => {
            bugs.loading = false;
        },  

        bugAdded: (bugs, action) => {
            bugs.list.push({
                id: lastId++,
                description: action.payload.description,
                resolved: false,
                userID: -1
            })
        },
        bugResolved: (bugs, action) => {
            const index = bugs.list.findIndex(bug => bug.id === action.payload.id);
            bugs.list[index].resolved = true;
        },
        bugRemoved: (bugs, action) => {
            bugs.list.filter(bug => bug.id !== action.payload.id);
        },
        bugAssignedToUser: (bugs, action) => {
            const {bugID, userID} = action.payload;
            const index = bugs.list.findIndex(bug => bug.id === bugID);
            bugs.list[index].userID = userID;
        },

        bugsRecieved: (bugs, action) => {
            bugs.list = action.payload;
            bugs.loading = false;
            bugs.lastFetch = Date.now();
        }
    }
})
export const {
    bugAdded,
    bugResolved,
    bugRemoved,
    bugAssignedToUser, 
    bugsRecieved, 
    bugsRequested,
    bugsRequestFailed 

} = slice.actions;
export default slice.reducer;
const url = "/bugs";

export const loadBugs = () => apiCallBegan({
    url,
    onStart: bugsRequested.type,
    onSuccess: bugsRecieved.type,
    onError: bugsRequestFailed.type
})

//Selectors
// export const getUnresolvedBugs = state => 
//     state.entities.bugs.filter(bug => !bug.resolved);

//Memoization
export const getUnresolvedBugs = createSelector(
    state => state.entities.bugs,
    bugs => bugs.list.filter(bug => !bug.resolved)
);

export const getUserBugs = userID => createSelector(
    state => state.entities.bugs,
    bugs => bugs.list.filter(bug => bug.userID === userID)
);

//Multiple
// export const getUnresolvedBugs = createSelector(
//     state => state.entities.bugs,
//     state => state.entities.projects,
//     (bugs, projects) => bugs.filter(bug => !bug.resolved)
// );
