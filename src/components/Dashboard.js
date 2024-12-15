import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchServices,
  createService,
  updateService,
  deleteService,
} from "../services/api";

const Dashboard = () => {
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({
    name: "",
    status: "",
    description: "",
  });
  const navigate = useNavigate();

  const statusOptions = [
    "Operational",
    "Degraded Performance",
    "Partial Outage",
    "Major Outage",
  ];

  // Fetch services from the API
  const loadServices = async () => {
    try {
      const data = await fetchServices();
      setServices(data);
    } catch (error) {
      console.error("Error fetching services:", error);
      alert(error.message);
    }
  };

  // Create a new service
  const handleCreateService = async () => {
    try {
      await createService(newService);
      loadServices(); // Reload services after creating
      setNewService({ name: "", status: "", description: "" }); // Reset form
    } catch (error) {
      console.error("Error creating service:", error);
      alert(error.message);
    }
  };

  // Delete a service
  const handleDeleteService = async (serviceId) => {
    console.log("Deleting service with ID:", serviceId);
    try {
      await deleteService(serviceId);
      console.log("Service deleted successfully");
      loadServices(); // Reload services after deletion
    } catch (error) {
      console.error("Error deleting service:", error);
      alert(error.message);
    }
  };

  // Update a service's status
  const handleUpdateService = async (serviceId, newStatus) => {
    try {
      await updateService(serviceId, { status: newStatus });
      loadServices(); // Reload services after updating
    } catch (error) {
      console.error("Error updating service:", error);
      alert(error.message);
    }
  };

  // Fetch services when the component mounts
  useEffect(() => {
    loadServices();
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">
          Dashboard
        </h2>
        <button
          onClick={handleLogout}
          className="mb-6 py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none"
        >
          Logout
        </button>

        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Create Service
          </h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCreateService();
            }}
            className="space-y-4"
          >
            <div className="flex flex-col">
              <label
                className="text-sm font-medium text-gray-600"
                htmlFor="name"
              >
                Service Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Service Name"
                value={newService.name}
                onChange={(e) =>
                  setNewService({ ...newService, name: e.target.value })
                }
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col">
              <label
                className="text-sm font-medium text-gray-600"
                htmlFor="status"
              >
                Status
              </label>
              <select
                id="status"
                value={newService.status}
                onChange={(e) =>
                  setNewService({ ...newService, status: e.target.value })
                }
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled>
                  Select Status
                </option>
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label
                className="text-sm font-medium text-gray-600"
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                id="description"
                placeholder="Description"
                value={newService.description}
                onChange={(e) =>
                  setNewService({ ...newService, description: e.target.value })
                }
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none"
            >
              Create Service
            </button>
          </form>
        </div>

        <div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Services List
          </h3>
          <ul className="space-y-6">
            {services.map((service) => (
              <li
                key={service._id}
                className="p-4 border border-gray-200 rounded-lg shadow-md"
              >
                <h4 className="text-xl font-semibold text-gray-800">
                  {service.name}
                </h4>
                <p className="text-gray-600">Status: {service.status}</p>
                <p className="text-gray-600">{service.description}</p>
                <div className="mt-4 space-x-4">
                  <select
                    value={service.status}
                    onChange={(e) =>
                      handleUpdateService(service._id, e.target.value)
                    }
                    className="py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => handleDeleteService(service._id)}
                    className="py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
