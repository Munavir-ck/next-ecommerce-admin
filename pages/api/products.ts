import mongooseConnect from "@/lib/mongooseConnect";
import { Product } from "@/model/Product";

export default async function handle(req: any, res: any) {
    const { method } = req;
    await mongooseConnect();

    if (method === "GET") {
        if (req.query?.id) {
            res.json(await Product.findOne({ _id: req.query.id }));
        } else {
            res.json(await Product.find());
        }
    }

    if (method === "POST") {
        const { title, description, price, images, category, properties } = req.body;
        const productDoc = await Product.create({
            title,
            description,
            price,
            images,
            properties,
        });
        res.json(productDoc);
    }

    if (method === "PUT") {
        const { title, description, price, images, category, properties, _id } = req.body;
        await Product.updateOne({ _id }, { title, description, price, images, category, properties });
        res.json(true);
    }

    if (method === "DELETE") {
        if (req.query?.id) {
            await Product.deleteOne({ _id: req.query?.id });
            res.json(true);
        }
    }
}
