import { getServerSession } from "next-auth";
import { NextApiRequest, NextApiResponse } from "next";
import mongooseConnect from "@/lib/mongooseConnect";
import Category from "@/model/category";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;
    await mongooseConnect();

    if (method === "GET") {
        res.json(await Category.find().populate("parent"));
    }

    if (method === "POST") {
        const { name, parentCategory, properties } = req.body;
        const categoryDoc = await Category.create({
            name,
            parent: parentCategory || undefined,
            properties,
        });
        res.json(categoryDoc);
    }

    if (method === "PUT") {
        const { name, parentCategory, properties, _id } = req.body;
        const categoryDoc = await Category.updateOne(
            { _id },
            {
                name,
                parent: parentCategory || undefined,
                properties,
            }
        );
        res.json(categoryDoc);
    }

    if (method === "DELETE") {
        const { _id } = req.query;
        await Category.deleteOne({ _id });
        res.json("ok");
    }
}
