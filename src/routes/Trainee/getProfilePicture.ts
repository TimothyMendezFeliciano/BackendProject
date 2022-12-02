import fs from 'fs';
import TraineeService from '../../services/TraineeService';
export const getProfilePicture = async (req, res, next) => {
    try {
        // console.log('Querry', req.query.traineeId);
        const result = await new TraineeService().getTrainee(
            req.query.traineeId,
        );
        // console.log('result', result);
        const filePath = result.profileImagePath.slice(`images\\`);
        // console.log('File Path', filePath);
        const image = fs.readFileSync(`./${filePath}`);
        const b64 = Buffer.from(image).toString('base64');
        return res.status(201).send(`data:${result.mimetype};base64,${b64}`);
    } catch (error) {
        console.error(error);
        return [];
    }
};
// {
//     fieldname: 'profileImage',
//         originalname: 'ProfessionalPhoto.jpg',
//     encoding: '7bit',
//     mimetype: 'image/jpeg',
//     destination: './images',
//     filename: '3b65079e542b94e604ee4fc985fbf9c8',
//     path: 'images\\3b65079e542b94e604ee4fc985fbf9c8',
//     size: 33708
// }
