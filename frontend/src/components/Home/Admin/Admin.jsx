// frontend/src/components/Home/Admin/Admin.jsx
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Search, Upload, Trash2 } from "lucide-react";

function Admin() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedDocs, setUploadedDocs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const apiUrl = "http://localhost:4000";
  const fileInputRef = useRef(null);

  // Fetch initial uploads
  useEffect(() => {
    const fetchInitialUploads = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await axios.get(`${apiUrl}/admin/uploads`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (Array.isArray(res.data)) {
          setUploadedDocs(res.data);
        } else if (Array.isArray(res.data.uploadedFiles)) {
          setUploadedDocs(res.data.uploadedFiles);
        }
      } catch (err) {
        console.error("Error fetching uploads:", err.message);
      }
    };

    fetchInitialUploads();
  }, [apiUrl]);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const formData = new FormData();
      formData.append("files", selectedFile);

      const res = await axios.post(`${apiUrl}/admin/upload`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (Array.isArray(res.data.uploadedFiles)) {
        setUploadedDocs((prev) => [...prev, ...res.data.uploadedFiles]);
      }

      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      console.error("Error uploading file:", err.message);
    }
  };

  const handleSearch = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await axios.get(`${apiUrl}/admin/search`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { q: searchTerm },
      });

      if (Array.isArray(res.data)) {
        setUploadedDocs(res.data);
      } else if (Array.isArray(res.data.results)) {
        setUploadedDocs(res.data.results);
      }
    } catch (err) {
      console.error("Error searching uploads:", err.message);
    }
  };

  const handleDelete = async (fileName) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return;

    await axios.delete(`${apiUrl}/admin/delete/${encodeURIComponent(fileName)}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setUploadedDocs((prev) => prev.filter((doc) => doc.fileName !== fileName));
  } catch (err) {
    console.error("Error deleting file:", err.response?.data || err.message);
    alert("Failed to delete file. Please try again.");
  }
};



  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        📂 Admin Dashboard
      </h1>

      {/* Search Section */}
      <div className="bg-white shadow-md rounded-xl p-5 mb-8 flex items-center gap-3 border border-gray-100">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search documents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
        <button
          onClick={handleSearch}
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg flex items-center gap-2 shadow"
        >
          <Search size={18} /> Search
        </button>
      </div>

      {/* Upload Section */}
      <div className="bg-white shadow-md rounded-xl p-6 mb-8 border border-gray-100">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Upload a Document
        </h2>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <input
            type="file"
            onChange={handleFileChange}
            ref={fileInputRef}
            className="w-full sm:w-auto border border-gray-300 rounded-lg px-3 py-2"
          />
          <button
            onClick={handleUpload}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg flex items-center gap-2 shadow"
          >
            <Upload size={18} /> Upload
          </button>
        </div>
        {selectedFile && (
          <p className="text-sm text-gray-500 mt-2">
            Selected: <span className="font-medium">{selectedFile.name}</span>
          </p>
        )}
      </div>

      {/* Uploaded Documents List */}
      <div className="bg-white shadow-md rounded-xl p-6 border border-gray-100">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Uploaded Documents
        </h2>
        {uploadedDocs.length === 0 ? (
          <p className="text-gray-500 text-sm">No documents uploaded yet.</p>
        ) : (
          <ul className="space-y-4">
            {uploadedDocs.map((doc) => (
              <li
                key={doc._id || doc.id}
                className="flex justify-between items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
              >
                <div>
                  <p className="font-medium text-gray-800">
                    {doc.fileName || doc.originalname || doc.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    Uploaded:{" "}
                    {doc.uploadedAt
                      ? new Date(doc.uploadedAt).toLocaleDateString()
                      : doc.date}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(doc.fileName)}
                  className="text-red-600 hover:bg-red-100 p-2 rounded-lg transition"
                >
                  <Trash2 size={18} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Admin;
