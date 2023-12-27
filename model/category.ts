import mongoose, { Model, model, models, Schema } from "mongoose";

interface CategoryDocument extends Document {
    name: string;
    parent?: Schema.Types.ObjectId | CategoryDocument;
    properties: object[];
}

const categorySchema: Schema = new Schema(
    {
        name: { type: String, require: true },
        parent: { type: mongoose.Types.ObjectId, ref: "Category" },
        properties: [{ type: Object }],
    },
    {
        timestamps: true,
    }
);

type CategoryModel = Model<CategoryDocument>;
const Category: CategoryModel = mongoose.models.Category || mongoose.model<CategoryDocument>("Category", categorySchema);
export default Category;
