import MainLayout from "@/Layouts/MainLayout";
import { addProduct } from "@/Services/Query";
import { useForm } from "react-hook-form";


const AgentDashboard = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()

    const handleFormSubmit = (data: any) => {
        addProduct(data)
        console.log("Are you sure you want to add this product?", data);
    };

    return (
        <MainLayout title="Agent Dashboard" description="Work with your products">
            <div className="max-w-md mx-auto mt-8 p-6 bg-gray-800 rounded shadow-lg text-white">
                <h2 className="text-xl font-bold mb-4">Add New Product</h2>
                <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Product Name"
                        {...register("name", { required: "Name is required" })}
                        className="w-full border text-gray-950 px-3 py-2 rounded"
                    />
                    {
                        errors.name && <span className="text-rose-500 text-sm mt-2">{errors.name.message as string}</span>
                    }
                    <textarea
                        placeholder="Description"
                        {...register("description", { required: "Description is required" })}
                        className="w-full border text-gray-950 px-3 py-2 rounded"
                    />
                    {
                        errors.description && <span className="text-rose-500 text-sm mt-2">{errors.description.message as string}</span>
                    }
                    <input
                        type="text"
                        placeholder="Image URL"
                        {...register("image")}
                        className="w-full border text-gray-950 px-3 py-2 rounded"
                    />
                    <select {...register("category", { required: "Category is required" })} className="w-full border text-gray-950 px-3 py-2 rounded">
                        <option value="">Select a category</option>
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                    </select>
                    {
                        errors.category && <span className="text-rose-500 text-sm mt-2">{errors.category.message as string}</span>
                    }
                    <button
                        type="submit"
                        className="block bg-rose-600 text-white px-4 py-2 rounded hover:bg-rose-700"
                    >
                        Add Product
                    </button>
                </form>
            </div>

        </MainLayout>
    );
};

export default AgentDashboard;
