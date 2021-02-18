import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

let lastId = 1;

const slice = createSlice({
    name: "bugs",
    initialState: [],
    reducers: {
        bugAdded: (bugs, action) => {
            bugs.push({
                id: lastId++,
                description: action.payload.description,
                resolved: false,
                userID: -1
            })
        },
        bugResolved: (bugs, action) => {
            const index = bugs.findIndex(bug => bug.id === action.payload.id);
            bugs[index].resolved = true;
        },
        bugRemoved: (bugs, action) => {
            bugs.filter(bug => bug.id !== action.payload.id);
        },
        bugAssignedToUser: (bugs, action) => {
            const {bugID, userID} = action.payload;
            const index = bugs.findIndex(bug => bug.id === bugID);
            bugs[index].userID = userID;
        }
    }
})
export const {bugAdded,bugResolved,bugRemoved, bugAssignedToUser } = slice.actions;
export default slice.reducer;

//Selectors
// export const getUnresolvedBugs = state => 
//     state.entities.bugs.filter(bug => !bug.resolved);

//Memoization
export const getUnresolvedBugs = createSelector(
    state => state.entities.bugs,
    bugs => bugs.filter(bug => !bug.resolved)
);

export const getUserBugs = userID => createSelector(
    state => state.entities.bugs,
    bugs => bugs.filter(bug => bug.userID === userID)
);

//Multiple
// export const getUnresolvedBugs = createSelector(
//     state => state.entities.bugs,
//     state => state.entities.projects,
//     (bugs, projects) => bugs.filter(bug => !bug.resolved)
// );
