const listRouter=require("./listRoute");
const userRouter=require("./userRoute");
const authRouter=require("./authRoute");

const mountRoutes=(app)=>{
    app.use("/api/v1/lists",listRouter);
app.use("/api/v1/users",userRouter)
app.use("/api/v1/auth",authRouter);
};

module.exports=mountRoutes;