import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLList,
} from 'graphql/type';
import { routines, trainers, excercises } from '../SampleData';

const ExcerciseType = new GraphQLObjectType({
    name: 'Excercise',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
    }),
});

const RoutineType = new GraphQLObjectType({
    name: 'Routine',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        trainerId: { type: GraphQLID },
        excercises: {
            type: new GraphQLList(ExcerciseType),
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                console.log(
                    'What is parent and args',
                    parent.excercises.find(args.id),
                );
                return excercises.find((excercise) =>
                    parent.excercise.find((e) => excercise.id === e.id),
                );
            },
        },
    }),
});

const TrainerType = new GraphQLObjectType({
    name: 'Trainer',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        specialty: { type: GraphQLString },
    }),
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        excercises: {
            type: new GraphQLList(ExcerciseType),
            resolve(parent, args) {
                return excercises;
            },
        },
        excercise: {
            type: ExcerciseType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return excercises.find((excercise) => excercise.id === args.id);
            },
        },
        routines: {
            type: new GraphQLList(RoutineType),
            resolve(parent, args) {
                return routines;
            },
        },
        routine: {
            type: RoutineType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return routines.find((routine) => routine.id === args.id);
            },
        },
        trainers: {
            type: new GraphQLList(TrainerType),
            resolve(parent, args) {
                return trainers;
            },
        },
        trainer: {
            type: TrainerType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return trainers.find((trainer) => trainer.id === args.id);
            },
        },
    },
});

const schema: GraphQLSchema = new GraphQLSchema({
    query: RootQuery,
});
export default schema;
