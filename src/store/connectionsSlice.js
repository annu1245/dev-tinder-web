import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
  name: 'connections',
  initialState: {
    requestRecevied: [],
    requestSend: [],
    userConnections: null
  },

  reducers: {
    addRequestReceived: (state, action) => {
      state.requestRecevied = action.payload
    },
    addRequestSend: (state, action) => {
      state.requestSend = action.payload
    },
    filterRequestReceived: (state, action) => {
      const id = action.payload;
      state.requestRecevied = state.requestRecevied.filter(request => request._id != id)
    },
    filterRquestSend: (state, action) => {
      const id = action.payload;
      state.requestSend = state.requestSend.filter(request => request._id != id)
    }, 
    addConnections: (state, action) => {
      state.userConnections = action.payload
    },
    removeRequestRecieved: (state, action) => {
      state.requestRecevied = null;
    },
    removeRequestsend: (state, action) => {
      state.requestSend = null;
    },
  }
})

export const { addRequestReceived, addRequestSend, addConnections, filterRequestReceived, filterRquestSend } = connectionSlice.actions;
export default connectionSlice.reducer;