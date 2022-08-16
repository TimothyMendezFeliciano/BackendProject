export const trainers = [
    {
        id: '1',
        name: 'Gabriel',
        specialty: 'Muscle Growth',
    },
    {
        id: '2',
        name: 'Emmanuel',
        specialty: 'Weight Loss',
    },
];

export const excercises = [
    {
        id: '1',
        name: 'Dumbells',
    },
    {
        id: '2',
        name: 'Squats',
    },
    {
        id: '3',
        name: 'Leg Pulls',
    },
    {
        id: '4',
        name: 'Bar Lifts',
    },
    {
        id: '5',
        name: 'Pull Ups',
    },
];

export const routines = [
    {
        id: '1',
        name: 'Upper Body',
        trainerId: '1',
        excercises: ['1', '4', '5'],
    },
    {
        id: '2',
        name: 'Lower Body',
        trainerId: '2',
        excercises: ['2', '3'],
    },
];
