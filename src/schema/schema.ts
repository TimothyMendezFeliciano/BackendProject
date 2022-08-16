import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLList,
} from 'graphql/type';
import { routines, trainers, excercises } from '../SampleData';

const RoutineType = new GraphQLObjectType({
    name: 'Routine',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        trainerId: { type: GraphQLID },
        excercises: { type: new GraphQLList(GraphQLID) },
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
        routines: {
            type: new GraphQLList(RoutineType),
            resolve(parent, args) {
                return routines;
            },
        },
        routine: {
            type: RoutineType,
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
