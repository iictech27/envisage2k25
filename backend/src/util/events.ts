export interface EventStructure {
    id: number,
    name: string,
    mode: string,
    fee: number
}

export const Events: Array<EventStructure> = [
    {
        id: 0,
        name: "Stockify",
        fee: 50,
        mode: "Virtual - Individual Participation",
    },
    {
        id: 1,
        name: "Promote It",
        fee: 30,
        mode: "Offline - Individual Participation",
    },
    {
        id: 2,
        name: "Hack-Ur-Way",
        fee: 200,
        mode: "Hybrid - Team of 5"
    },
    {
        id: 3,
        name: "B-Plan",
        fee: 150,
        mode: "On Campus - Team of 4"
    },
    {
        id: 4,
        name: "Case Study",
        fee: 60,
        mode: "On Campus - Team of 4"
    },
    {
        id: 5,
        name: "BizzQuiz",
        fee: 50,
        mode: "On Campus - Team of 2"
    },
    {
        id: 6,
        name: "Tweeters",
        fee: 30,
        mode: "On Campus - Individual Participation",
    },
    {
        id: 7,
        name: "Startup-Bid Auction",
        fee: 200,
        mode: "On Campus - Team of 4",
    }
];
