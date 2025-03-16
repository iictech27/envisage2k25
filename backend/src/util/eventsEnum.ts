interface EventsStructure {
    id: string,
    name: string,
    priceInr: number
}

const Events: Array<EventsStructure> = [
    {
        id: "envis_ev1",
        name: "Event 1",
        priceInr: 20
    },
    {
        id: "envis_ev2",
        name: "Event 2",
        priceInr: 25
    },
    {
        id: "envis_ev3",
        name: "Event 3",
        priceInr: 10
    },
    {
        id: "envis_ev4",
        name: "Event 4",
        priceInr: 30
    }
];

enum EventsEnum {
    Event1 = 0,
    Event2 = 1,
    Event3 = 2,
    Event4 = 3,
}

export { Events, EventsEnum };
