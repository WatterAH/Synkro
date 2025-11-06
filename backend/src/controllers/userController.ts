import bcryptjs from "bcryptjs";
import userService from "../service/userService";
import { User } from "../interfaces/User";
import { Request, Response } from "express";
import { sendError, sendSuccess } from "../libs/responseHandler";
import { createAccessToken, validateToken } from "../libs/token";


class UserController {

    async createProfile(req: Request, res: Response) {
        try {
            const data: User = req.body;
            data.password = await bcryptjs.hash(data.password, 10);

            const user = await userService.createProfile(data);

            if (!user) {
                return sendError(res, "Error al crear perfil", 500);
            }

            const { password, ...userWithoutPassword } = user;
            const token = await createAccessToken(userWithoutPassword);
            return sendSuccess(res, { user: userWithoutPassword, token });
        } catch (error: any) {
            console.log(error);
            return sendError(res, error.message, 500);
        }
    }

    async auth(req: Request, res: Response) {
        try {
            const { username, password } = req.body;



            const user = await userService.getProfilByEmail(username);

            if (!user) {
                return sendError(res, "Verifica tus credenciales", 401);
            }

            const isValidPassword = await bcryptjs.compare(password, user.password);

            if (!isValidPassword) {
                return sendError(res, "Verifica tus credenciales", 401);
            }

            const token = await createAccessToken(user);
            return sendSuccess(res, { user: user, token });
        } catch (error: any) {
            return sendError(res, error.message, 500);
        }
    }

    async checkToken(req: Request, res: Response) {
        try {
            const { token } = req.body;
            const user = await validateToken(token);
            
            if (!user) {
                return sendError(res, "Unauthorized", 401);
            }

            return sendSuccess(res, { user, token });
        } catch (error: any) {
            return sendError(res, error.message, 500);
        }
    }

    async getProfileById(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const user = await userService.getProfileById(id);

            if (!user) {
                return sendError(res, "Usuario no encontrado", 404);
            }

            const { password, ...userWithoutPassword } = user;
            return sendSuccess(res, userWithoutPassword);
        } catch (error: any) {
            return sendError(res, error.message, 500);
        }
    }

    async updateProfile(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data: Partial<User> = req.body;

            if (data.password) {
                data.password = await bcryptjs.hash(data.password, 10);
            }

            const user = await userService.updateProfile(id, data);

            if (!user) {
                return sendError(res, "Error al actualizar perfil", 500);
            }

            const { password, ...userWithoutPassword } = user;
            return sendSuccess(res, userWithoutPassword);
        } catch (error: any) {
            return sendError(res, error.message, 500);
        }
    }

    async deleteProfile(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const deleted = await userService.deleteProfile(id);

            if (!deleted) {
                return sendError(res, "Error al eliminar perfil", 500);
            }

            return sendSuccess(res, { message: "Perfil eliminado exitosamente" });
        } catch (error: any) {
            return sendError(res, error.message, 500);
        }
    }


}
export default new UserController();