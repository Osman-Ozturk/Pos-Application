import mongoose from "mongoose"

const CategorySchema = mongoose.Schema(
        {
                title:{type:String,require:true}
        },
        {timestamps : true}
)
const Category =mongoose.model("categorys",CategorySchema)

export default Category