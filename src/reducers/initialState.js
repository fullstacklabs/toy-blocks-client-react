const initialState = () => ({
  nodes: {
    list: [
      {
        url: "https://thawing-springs-53971.herokuapp.com",
        online: false,
        name: "Node 1",
        loading: false,
        blocks: []
      },
      {
        url: "https://secret-lowlands-62331.herokuapp.com",
        online: false,
        name: "Node 2",
        loading: false,
        blocks: []
      },
      {
        url: "https://calm-anchorage-82141.herokuapp.com",
        online: false,
        name: "Node 3",
        loading: false,
        blocks: []
      },
      {
        url: "http://localhost:3002",
        online: false,
        name: "Node 4",
        loading: false,
        blocks: []
      },
    ],
  },
});
export default initialState;
