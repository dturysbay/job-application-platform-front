import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IJob} from "../interfaces/i-job";

interface JobState {
    jobList: IJob[];
}

const initialState: JobState = {
    jobList: [],
};

const jobSlice = createSlice({
    name: "jobs",
    initialState,
    reducers: {
        addJob: (state, action: PayloadAction<IJob>) => {
            state.jobList.push(action.payload);
        },
    },
});

export const {addJob} = jobSlice.actions;
export default jobSlice.reducer;
