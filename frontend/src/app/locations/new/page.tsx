// src/app/locations/new/page.tsx
'use client';

import { useState } from 'react';
import { Button, LinkButton } from '@/components/ui/button';
import { LocationsAPI} from '@/libs/api';  // Assuming this is your API handler
import { Loader, Check, Plus } from 'lucide-react';

export default function NewLocationPage() {
  // State to manage the player name input
  const [name, setName] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  // Handle form input change
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Location Name is required.');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const newSession = await LocationsAPI.create({"name" : name, "address" : address});
      setSuccess(true);
      setAddress('');
      setName('')
    } catch (err) {
      setError('Failed to create player. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Start an open court session</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="location-name" className="block text-sm font-medium text-gray-700">
            Location Name
          </label>
          <input
            id="location-name"
            type="text"
            value={name}
            onChange={handleNameChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            placeholder="Enter Location Name"
          />
        </div>
        <div>
          <label htmlFor="location-address" className="block text-sm font-medium text-gray-700">
            Location Address
          </label>
          <input
            id="location-address"
            type="text"
            value={address}
            onChange={handleAddressChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            placeholder="Enter Location Address"
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-500 text-sm">Location added successfully!</p>}

        <div className="flex justify-between">
          <Button type="submit" disabled={loading} className="flex items-center">
            {loading ? <Loader className="animate-spin mr-2" size={16} /> : <Plus className="mr-2" />}
            {loading ? 'Starting...' : 'Add Location'}
          </Button>
        </div>
      </form>
    </div>
  );
}
