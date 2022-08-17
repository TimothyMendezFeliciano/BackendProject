import {
    GraphQLID,
    GraphQLList,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
} from 'graphql/type';
import { excercises, routines, trainers } from '../SampleData';
import TrainerService from '../services/TrainerService';
import { Trainer } from '../models/Trainer';
import { database } from '../index';

const TrainerConn = Trainer(database);

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
                return new TrainerService().getAllTrainers();
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
