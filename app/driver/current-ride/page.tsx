"use client";
export default function CurrentRide() {
  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-2xl font-bold">🛣️ Current Ride</h1>

      <div className="mt-4 bg-white p-4 rounded shadow">
        <p>
          <strong>Passenger:</strong> John Doe
        </p>
        <p>
          <strong>Pickup:</strong> Bole
        </p>
        <p>
          <strong>Destination:</strong> Mexico Square
        </p>
        <div className="mt-3 space-x-2">
          <button className="bg-yellow-600 text-white px-3 py-1 rounded">
            Picked Up
          </button>
          <button className="bg-gray-500 text-white px-3 py-1 rounded">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
