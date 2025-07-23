import { Datapoint } from "../models/datapoint";

export const dummyDatapoints: Datapoint[] = [
  new Datapoint({
    name: "Mood",
    type: "categories",
    color: "#81c784",
    config: {
      categories: ["Happy", "Sad", "Angry", "Neutral"],
    },
    history: {
      trackingPeriods: [
        { start: new Date("2025-07-01"), end: new Date("2025-07-07") },
        { start: new Date("2025-07-10"), end: new Date("2025-07-15") },
      ],
      results: []
    }
  }),
  new Datapoint({
    name: "Sleep Duration",
    type: "number",
    color: "#64b5f6",
    config: {
      unit: "hours",
      min: 0,
      max: 12,
    },
    history: {
      trackingPeriods: [
        { start: new Date("2025-07-03"), end: new Date("2025-07-08") },
        // ongoing
        { start: new Date("2025-07-20") },
      ],
      results: []
    }
  }),
  new Datapoint({
    name: "Exercise",
    type: "two-option",
    color: "#ffb74d",
    config: {
      options: ["Yes", "No"],
    },
    history: {
      trackingPeriods: [
        { start: new Date("2025-07-05"), end: new Date("2025-07-12") },
      ],
      results: []
    }
  }),
  new Datapoint({
    name: "Stress Level",
    type: "rating",
    color: "#e57373",
    config: {
      min: 1,
      max: 10,
    },
    history: {
      trackingPeriods: [
        { start: new Date("2025-07-02"), end: new Date("2025-07-04") },
        { start: new Date("2025-07-15"), end: new Date("2025-07-21") },
      ],
      results: []
    }
  })
];
