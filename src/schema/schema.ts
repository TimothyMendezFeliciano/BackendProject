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
import SessionService from '../services/SessionService';
import TraineeService from '../services/TraineeService';

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
        trainer: {
            type: TrainerType,
            resolve(parent, args) {
                return new TrainerService().getTrainer(parent.trainerId);
            },
        },
    }),
});

const SessionType = new GraphQLObjectType({
    name: 'Session',
    fields: () => ({
        sessionDate: { type: GraphQLString },
        routine: {
            type: RoutineType,
            resolve(parent, args) {
                return new RoutineService().getRoutine(parent.routineId);
            },
        },
        trainee: {
            type: TraineeType,
            resolve(parent, args) {
                return new TraineeService().getTrainee(parent.traineeId);
            },
        },
        excercise: {
            type: ExcerciseType,
            resolve(parent, args) {
                return new ExcerciseService().getExcercise(parent.excerciseId);
            },
        },
    }),
});

const TraineeType = new GraphQLObjectType({
    name: 'Trainee',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        interest: { type: GraphQLString },
        publicAddress: { type: GraphQLString },
        trainer: {
            type: TrainerType,
            resolve(parent, args) {
                return new TrainerService().getTrainer(parent.trainerId);
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
        publicAddress: { type: GraphQLString },
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
        trainees: {
            type: new GraphQLList(TraineeType),
            resolve(parent, args) {
                return new TraineeService().getAllTrainees();
            },
        },
        trainee: {
            type: TraineeType,
            args: {
                id: { type: GraphQLID },
                name: { type: GraphQLString },
                interest: { type: GraphQLString },
                publicAddress: {type: GraphQLString}
            },
            resolve(parent, args) {
                return new TraineeService().getTrainee(
                    args.id,
                    args.name,
                    args.interest,
                    args.publicAddress
                );
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
            args: { id: { type: GraphQLID }, name: { type: GraphQLString }, publicAddress: { type: GraphQLString } },
            resolve(parent, args) {
                return new TrainerService().getTrainer(args.id, args.name, args.publicAddress);
            },
        },
    },
});

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        changeName: {
            type: TraineeType,
            args: {
                traineeId: { type: new GraphQLNonNull(GraphQLID) },
                newName: { type: new GraphQLNonNull(GraphQLID) },
            },
            async resolve(parent, args) {
                return new TraineeService().changeName(args.traineeId, args.newName);
            },
        },
        subscribeToTrainer: {
            type: TraineeType,
            args: {
                traineeId: { type: new GraphQLNonNull(GraphQLID) },
                trainerId: { type: new GraphQLNonNull(GraphQLID) },
            },
            resolve(parent, args) {
                const result = new TraineeService().subscribeToTrainer(args.traineeId, args.trainerId);
                console.log('Result my dudde', result);
                return result;
            },
        },
        addTrainee: {
            type: TraineeType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                interest: { type: new GraphQLNonNull(GraphQLString) },
                publicAddress: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
                return new TraineeService().addTrainee(args.name, args.interest, args.publicAddress);
            },
        },
        addTrainer: {
            type: TrainerType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                specialty: { type: new GraphQLNonNull(GraphQLString) },
                publicAddress: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
                return new TrainerService().addTrainer(
                    args.name,
                    args.specialty,
                    args.publicAddress
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
        addSession: {
            type: SessionType,
            args: {
                sessionDate: { type: GraphQLDateTime },
                routineId: { type: GraphQLID },
                traineeId: { type: GraphQLID },
                excerciseId: { type: GraphQLID },
            },
            resolve(parent, args) {
                return new SessionService().addSession(args.sessionDate, args.routineId, args.traineeId, args.excerciseId);
            },
        },
        deleteExcercise: {
            type: ExcerciseType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
            },
            resolve(parent, args) {
                return new ExcerciseService().deleteExcercise(args.id);
            },
        },
        deleteRoutine: {
            type: RoutineType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
                trainerId: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
                return new RoutineService().deleteRoutine(
                    args.id,
                    args.trainerId,
                );
            },
        },
        deleteSession: {
            type: SessionType,
            args: {
                id: { type: GraphQLID },
            },
            resolve(parent, args) {
                return new SessionService().deleteSession(args.id);
            },
        },
    },
});

const schema: GraphQLSchema = new GraphQLSchema({
    query: RootQuery,
    mutation,
});
export default schema;
