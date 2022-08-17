import {
    GraphQLID,
    GraphQLList,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
} from 'graphql/type';
import TrainerService from '../services/TrainerService';
import ExcerciseService from '../services/ExcerciseService';
import RoutineService from '../services/RoutineService';

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
        excerciseIds: {
            type: ExcerciseType,
            args: {
                id: { type: GraphQLID, defaultValue: '' },
                name: { type: GraphQLString, defaultValue: '' },
            },
            resolve(parent, args) {
                if (args.id || args.name) {
                    return new ExcerciseService().getExcercise(
                        args.id,
                        args.name,
                    );
                }
                return new ExcerciseService().getAllExcercises();
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
        routineIds: {
            type: RoutineType,
            args: {
                id: { type: GraphQLID, defaultValue: '' },
                name: { type: GraphQLString, defaultValue: '' },
            },
            resolve(parent, args) {
                if (args.id || args.name) {
                    return new RoutineService().getRoutine(args.id, args.name);
                }
                return new RoutineService().getAllRoutines();
            },
        },
    }),
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        excercises: {
            type: new GraphQLList(ExcerciseType),
            resolve(parent, args) {
                return new ExcerciseService().getAllExcercises();
            },
        },
        excercise: {
            type: ExcerciseType,
            args: { id: { type: GraphQLID }, name: { type: GraphQLString } },
            resolve(parent, args) {
                return new ExcerciseService().getExcercise(args.id, args.name);
            },
        },
        routines: {
            type: new GraphQLList(RoutineType),
            resolve(parent, args) {
                return new RoutineService().getAllRoutines();
            },
        },
        routine: {
            type: RoutineType,
            args: { id: { type: GraphQLID }, name: { type: GraphQLString } },
            resolve(parent, args) {
                return new RoutineService().getRoutine(args.id, args.name);
            },
        },
        trainers: {
            type: new GraphQLList(TrainerType),
            async resolve(parent, args) {
                return new TrainerService().getAllTrainers();
            },
        },
        trainer: {
            type: TrainerType,
            args: { id: { type: GraphQLID }, name: { type: GraphQLString } },
            resolve(parent, args) {
                return new TrainerService().getTrainer(args.id, args.name);
            },
        },
    },
});

const schema: GraphQLSchema = new GraphQLSchema({
    query: RootQuery,
});
export default schema;
