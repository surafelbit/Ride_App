"use client";

export default function RideRequests() {
  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-2xl font-bold">🚗 Ride Requests</h1>

      <div className="mt-4 space-y-4">
        <div className="bg-white p-4 rounded shadow">
          <p>
            <strong>Passenger:</strong> John Doe
          </p>
          <p>
            <strong>Pickup:</strong> Bole Mall
          </p>
          <p>
            <strong>Destination:</strong> Mexico
          </p>
          <div className="mt-2 space-x-2">
            <button className="bg-green-600 text-white px-3 py-1 rounded">
              Accept
            </button>
            <button className="bg-red-600 text-white px-3 py-1 rounded">
              Reject
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
