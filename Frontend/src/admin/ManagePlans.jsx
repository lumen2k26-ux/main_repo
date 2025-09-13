// src/pages/admin/ManagePlans.jsx
import React, { useEffect, useState } from "react";
import PlanCard from "../components/PlanCard";
import planService from "../services/planService";

const ManagePlans = () => {
  const [plans, setPlans] = useState([]);
  const [form, setForm] = useState({
    id: null,
    name: "",
    price: "",
    quota: "",
    description: "",
  });

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const data = await planService.getPlans();
      setPlans(data);
    } catch (err) {
      console.error("Error fetching plans:", err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (form.id) {
        // Update existing plan
        await planService.updatePlan(form.id, form);
      } else {
        // Create new plan
        await planService.createPlan(form);
      }
      setForm({ id: null, name: "", price: "", quota: "", description: "" });
      fetchPlans();
    } catch (err) {
      console.error("Error saving plan:", err);
    }
  };

  const handleEdit = (id) => {
    const plan = plans.find((p) => p.id === id);
    if (plan) setForm(plan);
  };

  const handleDelete = async (id) => {
    try {
      await planService.deletePlan(id);
      fetchPlans();
    } catch (err) {
      console.error("Error deleting plan:", err);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Manage Plans</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md mb-6 max-w-md"
      >
        <h2 className="text-xl font-bold mb-4">
          {form.id ? "Edit Plan" : "Add New Plan"}
        </h2>

        <label className="block mb-2 font-medium">Name</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full border p-2 mb-4 rounded"
        />

        <label className="block mb-2 font-medium">Price ($)</label>
        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          required
          className="w-full border p-2 mb-4 rounded"
        />

        <label className="block mb-2 font-medium">Quota (GB)</label>
        <input
          type="number"
          name="quota"
          value={form.quota}
          onChange={handleChange}
          required
          className="w-full border p-2 mb-4 rounded"
        />

        <label className="block mb-2 font-medium">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full border p-2 mb-4 rounded"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {form.id ? "Update Plan" : "Add Plan"}
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {plans.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            isAdmin={true}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default ManagePlans;
