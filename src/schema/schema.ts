import {
    GraphQLID,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
} from 'graphql/type';
import TrainerService from '../services/TrainerService';
import ExcerciseService from '../services/ExcerciseService';
import RoutineService from '../services/RoutineService';
import { GraphQLDateTime } from 'graphql-scalars';
import { SessionService } from '../services/SessionService';

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
    }),
});

const SessionType = new GraphQLObjectType({
    name: 'Session',
    fields: () => ({
        startDate: { type: GraphQLDateTime },
        endDate: { type: GraphQLDateTime },
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
        sessions: {
            type: new GraphQLList(SessionType),
            resolve(parent, args) {
                return new SessionService().getAllSessions();
            },
        },
        session: {
            type: SessionType,
            args: {
                excerciseId: { type: GraphQLID },
                routineId: { type: GraphQLID },
            },
            resolve(parent, args) {
                return new SessionService().getSession(
                    args.excerciseId,
                    args.routineId,
                );
            },
        },
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

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addTrainer: {
            type: TrainerType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                specialty: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
                return new TrainerService().addTrainer(
                    args.name,
                    args.specialty,
                );
            },
        },
        addExcercise: {
            type: ExcerciseType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
                return new ExcerciseService().addExcercise(args.name);
            },
        },
        addRoutine: {
            type: RoutineType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                trainerId: { type: new GraphQLNonNull(GraphQLID) },
            },
            resolve(parent, args) {
                return new RoutineService().addRoutine(
                    args.name,
                    args.trainerId,
                );
            },
        },
        // createSession: {
        //     type:
        // },
        deleteRoutine: {
            type: RoutineType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                trainerId: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
                return new RoutineService().deleteRoutine(
                    args.name,
                    args.trainerId,
                );
            },
        },
    },
});

const schema: GraphQLSchema = new GraphQLSchema({
    query: RootQuery,
    mutation,
});
export default schema;
