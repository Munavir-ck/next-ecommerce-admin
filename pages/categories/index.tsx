import Layout from "@/components/Layout";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

type Category = {
    _id?: string;
    name: string;
    parent?: { name: string; _id: string | any } | any;
    properties: any[];
  
    
};
type Property = {
    name: string;
    values: string;
};

const Index: React.FC = () => {
    const { data: session } = useSession();
    let imageUrl: any = session?.user?.image;
    const [editedCategory, setEditedCategory] = useState<any>("");
    const [name, setName] = useState("");
    const [parentCategory, setParentCategory] = useState("");
    const [categories, setCategories] = useState<Category[]>([]);
    const [properties, setProperties] = useState<Property[]>([]);
    useEffect(() => {
        fetchCategories();
    }, []);

    function fetchCategories() {
        axios.get("/api/categories").then((result) => {
            setCategories(result.data);
        });
    }
    async function saveCategory(ev: any) {
        ev.preventDefault();
        const data:Category = {
            name,
            parentCategory,
            properties: properties.map((p) => ({
                name: p.name,
                values: p.values.split(","),
            })),
        };
        if (!data.name) {
            toast.warn("add category");
            return;
        }
        if (editedCategory) {
            data._id = editedCategory._id;
            await axios.put("/api/categories", data);
            setEditedCategory(null);
        } else {
            await axios.post("/api/categories", data);
        }
        setName("");
        setParentCategory("");
        setProperties([]);
        fetchCategories();
    }

    function editCategory(category: Category) {
        setEditedCategory(category);
        setName(category.name);
        setParentCategory(category.parent?._id);
        setProperties(
            category.properties.map(({ name, values }) => ({
                name,
                values: values.join(","),
            }))
        );
    }
    function deleteCategory(category: any) {
        Swal.fire({
            title: "Are you sure?",
            text: `Do you want to delete ${category.name}?`,
            showCancelButton: true,
            cancelButtonText: "Cancel",
            confirmButtonText: "Yes, Delete!",
            confirmButtonColor: "#d55",
            reverseButtons: true,
        }).then(async (result) => {
            if (result.isConfirmed) {
                const { _id } = category;
                await axios.delete("/api/categories?_id=" + _id);
                fetchCategories();
            }
        });
    }
    function addProperty() {
        setProperties((prev) => {
            return [...prev, { name: "", values: "" }];
        });
    }
    function handlePropertyNameChange(index: number, newName: string) {
        setProperties((prev) => {
            const properties: any = [...prev];
            properties[index].name = newName;
            return properties;
        });
    }
    function handlePropertyValuesChange(index: number, newValues: string) {
        setProperties((prev) => {
            const properties: any = [...prev];
            properties[index].values = newValues;
            return properties;
        });
    }
    function removeProperty(indexToRemove: any) {
        setProperties((prev) => {
            return [...prev].filter((p, pIndex) => {
                return pIndex !== indexToRemove;
            });
        });
    }
    return (
        <Layout>
            <div className="text-blue-900 flex justify-between ">
                <h2>
                    Hello, <b>{session?.user?.name}</b>
                </h2>
                <div className="flex  gap-1 text-black rounded-lg overflow-hidden">
                    {imageUrl ? <Image width={20} height={20} src={imageUrl} alt="profile" className="w-6 h-6" /> : ""}
                    <span className="px-2">{session?.user?.name}</span>
                </div>
            </div>
            <div className="bg-bgGray shadow-2xl  mt-4 rounded-lg h-full p-10">
                <h1>Categories</h1>

                <label>{editedCategory ? `Edit category ${editedCategory?.name}` : "Create new category"}</label>
                <form onSubmit={saveCategory}>
                    <div className="flex gap-1">
                        <input
                            type="text"
                            className=""
                            placeholder={"Category name"}
                            onChange={(ev) => setName(ev.target.value)}
                            value={name}
                        />
                        <select onChange={(ev) => setParentCategory(ev.target.value)} value={parentCategory}>
                            <option value="">No parent category</option>
                            {categories.length > 0 &&
                                categories.map((category) => (
                                    <option key={category._id} value={category._id}>
                                        {category.name}
                                    </option>
                                ))}
                        </select>
                    </div>
                    <div className="mb-2">
                        <label className="block">Properties</label>
                        <button onClick={addProperty} type="button" className="btn-default text-sm mb-2">
                            Add new property
                        </button>
                        {properties.length > 0 &&
                            properties.map((property, index) => (
                                <div key={index} className="flex gap-1 mb-2">
                                    <input
                                        type="text"
                                        name="property name"
                                        onChange={(ev) => handlePropertyNameChange(index, ev.target.value)}
                                        value={property.name}
                                        className="mb-0"
                                        placeholder="property name (example: color)"
                                    />
                                    <input
                                        type="text"
                                        className="mb-0"
                                        name="property value"
                                        onChange={(ev) => handlePropertyValuesChange(index, ev.target.value)}
                                        value={property.values}
                                        placeholder="values, comma separated"
                                    />
                                    <button onClick={() => removeProperty(index)} type="button" className="btn-red">
                                        Remove
                                    </button>
                                </div>
                            ))}
                    </div>
                    <div className="flex gap-1">
                        {editedCategory && (
                            <button
                                type="button"
                                onClick={() => {
                                    setEditedCategory("");
                                    setName("");
                                    setParentCategory("");
                                    setProperties([]);
                                }}
                                className="btn-default"
                            >
                                Cancel
                            </button>
                        )}
                        <button type="submit" className="btn-primary py-1">
                            Save
                        </button>
                    </div>
                </form>
                {!editedCategory && (
                    <table className="basic mt-4">
                        <thead>
                            <tr>
                                <td>Category name</td>
                                <td>Parent category</td>
                                <td></td>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.length > 0 &&
                                categories.map((category) => (
                                    <tr key={category._id}>
                                        <td>{category.name}</td>
                                        <td>{category?.parent?.name}</td>
                                        <td>
                                            <button onClick={() => editCategory(category)} className="btn-default mr-1">
                                                Edit
                                            </button>
                                            <button onClick={() => deleteCategory(category)} className="btn-red">
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                )}
            </div>
        </Layout>
    );
};

export default Index;
