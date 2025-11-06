import { Router } from "express";
import userRouter from "../routers/userRouter";
import inventarioRouter from "../routers/inventarioRouter";
import varianteRouter from "../routers/varianteRouter";
import almacenRouter from "../routers/almacenRouter";
import productoRouter from "../routers/productoRouter";
import sucursalRouter from "../routers/sucursalRouter";
import loteRouter from "../routers/loteRouter";
import movimientoLoteRouter from "../routers/movimientoLoteRouter";



const mainRouter = Router();

mainRouter.use("/users", userRouter);  
mainRouter.use("/inventarios", inventarioRouter);
mainRouter.use("/variantes", varianteRouter);
mainRouter.use("/almacenes", almacenRouter);
mainRouter.use("/productos", productoRouter);
mainRouter.use("/sucursales", sucursalRouter);
mainRouter.use("/lotes", loteRouter);
mainRouter.use("/movimientos-lotes", movimientoLoteRouter);






export { mainRouter };
